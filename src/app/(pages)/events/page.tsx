/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect } from 'react';
import { useServerAction } from '@/hooks/useServerAction';
import { projectEvents, ProjectionResult } from '@/actions/events/project-events';
import { filterEvents, FilterEventsData } from '@/actions/events/filter-events';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function EventsPage() {
  const availableFields = [
    { id: 'event_id', label: 'Event ID' },
    { id: 'name', label: 'Name' },
    { id: 'event_type', label: 'Type' },
    { id: 'location', label: 'Location' },
  ];

  // Initialize with all fields selected
  const [selectedFields, setSelectedFields] = useState<string[]>([
    availableFields[0].id,
    availableFields[1].id,
  ]);

  // State for filters
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);

  const {
    mutateAsync: projectData,
    data: projectionData,
    isError: isProjectionError,
    error: projectionError,
  } = useServerAction<ProjectionResult, FormData>(projectEvents);

  const {
    mutateAsync: filterData,
    data: filterResults,
    isError: isFilterError,
    error: filterError,
  } = useServerAction<FilterEventsData, FormData>(filterEvents);

  const displayData = isFiltering ? filterResults : projectionData;
  const isError = isFiltering ? isFilterError : isProjectionError;
  const error = isFiltering ? filterError : projectionError;

  // Fetch data whenever selected fields change
  useEffect(() => {
    if (selectedFields.length > 0 && !isFiltering) {
      const formData = new FormData();
      selectedFields.forEach((field) => {
        formData.append('attributes', field);
      });

      projectData(formData);
    }
  }, [selectedFields, isFiltering]);

  // Load data on initial render
  useEffect(() => {
    if (!isFiltering) {
      const formData = new FormData();
      selectedFields.forEach((field) => {
        formData.append('attributes', field);
      });

      projectData(formData);
    }
  }, []);

  const handleFieldChange = (fieldId: string, checked: boolean) => {
    setSelectedFields((prev) => {
      if (!checked) {
        if (prev.length === 1) return prev;
        return prev.filter((field) => field !== fieldId);
      } else {
        return [...prev, fieldId];
      }
    });
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFiltering(true);

    const formData = new FormData();
    if (eventType) formData.append('event_type', eventType);
    if (location) formData.append('location', location);

    // Include the selected attributes in the filter request
    selectedFields.forEach((field) => {
      formData.append('attributes', field);
    });

    filterData(formData);
  };

  const handleResetFilters = () => {
    setEventType('');
    setLocation('');
    setIsFiltering(false);

    // Reload projection data
    const formData = new FormData();
    selectedFields.forEach((field) => {
      formData.append('attributes', field);
    });
    projectData(formData);
  };

  return (
    <div className="container mx-auto h-full w-full px-4">
      <h1 className="mb-6 text-2xl font-bold">Events</h1>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Event Fields</CardTitle>
            <CardDescription>Select which fields to display in the table</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6">
              {availableFields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={field.id}
                    checked={selectedFields.includes(field.id)}
                    onCheckedChange={(checked) => handleFieldChange(field.id, checked as boolean)}
                  />
                  <label
                    htmlFor={field.id}
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {field.label}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Filter Events</CardTitle>
            <CardDescription>Filter events by type and location</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFilter} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="event_type">Event Type</Label>
                <Input
                  id="event_type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  placeholder="Filter by event type..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Filter by location..."
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Apply Filters</Button>
                {isFiltering && (
                  <Button type="button" variant="outline" onClick={handleResetFilters}>
                    Reset Filters
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {isError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {displayData && (
        <Card>
          <CardHeader>
            <CardTitle>Event Data</CardTitle>
            <CardDescription>
              {isFiltering
                ? `Filtered results - ${displayData.length} events`
                : `Showing ${displayData.length} events with ${selectedFields.length} columns`}
              {isFiltering && eventType && ` - Type: ${eventType}`}
              {isFiltering && location && ` - Location: ${location}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {selectedFields.map((field) => (
                      <TableHead key={field}>
                        {availableFields.find((f) => f.id === field)?.label || field}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayData.map((event, index) => (
                    <TableRow key={index}>
                      {selectedFields.map((field) => (
                        <TableCell key={field}>
                          {/* @ts-ignore */}
                          {event[field] !== null ? String(event[field]) : '-'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
