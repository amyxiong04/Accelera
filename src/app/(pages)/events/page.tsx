/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect } from 'react';
import { useServerAction } from '@/hooks/useServerAction';
import { projectEvents, ProjectionResult } from '@/actions/events/project-events';
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

  const { mutateAsync, data, isError, error } = useServerAction<ProjectionResult, FormData>(
    projectEvents,
  );

  // Fetch data whenever selected fields change
  useEffect(() => {
    if (selectedFields.length > 0) {
      const formData = new FormData();
      selectedFields.forEach((field) => {
        formData.append('attributes', field);
      });

      mutateAsync(formData);
    }
  }, [selectedFields]);

  // Load data on initial render
  useEffect(() => {
    const formData = new FormData();
    selectedFields.forEach((field) => {
      formData.append('attributes', field);
    });

    mutateAsync(formData);
  }, []);

  const handleFieldChange = (fieldId: string, checked: boolean) => {
    setSelectedFields((prev) => {
      if (!checked) {
        // Don't allow removing the last field
        if (prev.length === 1) return prev;
        return prev.filter((field) => field !== fieldId);
      } else {
        return [...prev, fieldId];
      }
    });
  };

  return (
    <div className="container mx-auto h-full w-full px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Events</h1>

      <Card className="mb-6">
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

      {isError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Event Data</CardTitle>
            <CardDescription>
              Showing {data.length} events with {selectedFields.length} columns
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
                  {data.map((event, index) => (
                    <TableRow key={index}>
                      {selectedFields.map((field) => (
                        <TableCell key={field}>
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
