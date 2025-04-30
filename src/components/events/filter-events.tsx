'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useServerAction } from '@/hooks/useServerAction';
import { filterEvents } from '@/actions/events/filter-events';

// Define the expected shape of one event
type Event = {
  event_id: string | number;
  name: string;
  event_type: string;
  location: string;
  date: string; // assuming it's an ISO string
};

export default function FilterEventsForm() {
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState('');

  const {
    mutateAsync,
    data,
    isError,
    error,
  } = useServerAction(filterEvents);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('event_type', eventType);
    formData.append('location', location);

    await mutateAsync(formData);
  };

  const events = data as Event[] | undefined;

  return (
    <div className="text-white w-full max-w-md bg-black bg-opacity-80 p-8 rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Filter Events</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="eventType" className="block text-sm mb-1">Event Type</label>
          <select
            id="eventType"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="border border-white p-2 w-full bg-black text-white rounded-md"
          >
            <option value="">All Types</option>
            <option value="Workshop">Workshop</option>
            <option value="Pitch Day">Pitch Day</option>
            <option value="Networking">Networking</option>
            <option value="Talk">Talk</option>
            <option value="Panel">Panel</option>
            <option value="Showcase">Showcase</option>
            <option value="Competition">Competition</option>
            <option value="Conference">Conference</option>
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm mb-1">Location</label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-white p-2 w-full bg-black text-white rounded-md"
          >
            <option value="">All Locations</option>
            <option value="Vancouver">Vancouver</option>
            <option value="Toronto">Toronto</option>
            <option value="Online">Online</option>
            <option value="San Francisco, CA">San Francisco</option>
            <option value="Boston, MA">Boston</option>
            <option value="New York, NY">New York</option>
            <option value="Seattle, WA">Seattle</option>
            <option value="Austin, TX">Austin</option>
          </select>
        </div>

        <Button
          type="submit"
          className="w-full border border-white bg-black text-white hover:bg-gray-900 rounded-md"
        >
          Search
        </Button>
      </form>

      {events && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Search Results:</h2>
          <div className="max-h-64 overflow-y-auto border border-white p-3 rounded-md">
            {events.length > 0 ? (
              <ul className="space-y-2">
                {events.map((event) => (
                  <li key={String(event.event_id)} className="border border-white p-3 rounded-md">
                    <strong>{event.name}</strong><br />
                    Type: {event.event_type}<br />
                    Location: {event.location}<br />
                    Date: {new Date(event.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300">No events found.</p>
            )}
          </div>
        </div>
      )}

      {isError && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}


