'use client';

import { useState } from 'react';
import { projectEvents } from '@/actions/events/project-events';
import { useServerAction } from '@/hooks/useServerAction';
import { Button } from '@/components/ui/button';

const attributes = [
  { key: 'event_id', label: 'Event ID' },
  { key: 'name', label: 'Event Name' },
  { key: 'event_type', label: 'Event Type' },
  { key: 'location', label: 'Location' },
  { key: 'date', label: 'Date' },
];

export default function ProjectEventsForm() {
  const [selectedAttrs, setSelectedAttrs] = useState<string[]>([]);
  const { mutateAsync, data, isError, error } = useServerAction(projectEvents);

  const toggleAttr = (attr: string) => {
    setSelectedAttrs((prev) =>
      prev.includes(attr) ? prev.filter((a) => a !== attr) : [...prev, attr]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    selectedAttrs.forEach((attr) => formData.append('attributes', attr));

    await mutateAsync(formData);
  };

  return (
    <div className="text-white w-full max-w-md bg-black bg-opacity-80 p-8 rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Project Events</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <fieldset>
          <legend className="text-sm mb-1 font-medium">Select Attributes to View</legend>
          <div className="flex flex-col gap-2">
            {attributes.map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={key}
                  checked={selectedAttrs.includes(key)}
                  onChange={() => toggleAttr(key)}
                  className="accent-white"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <Button
          type="submit"
          className="w-full border border-white bg-black text-white hover:bg-gray-900 rounded-md"
        >
          Run Projection
        </Button>
      </form>

      {data && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Results:</h2>
          <div className="max-h-64 overflow-y-auto border border-white p-3 rounded-md">
            {data.length > 0 ? (
              <ul className="space-y-2">
                {data.map((row, index) => (
                  <li key={index} className="border border-white p-3 rounded-md text-sm">
                    {Object.entries(row).map(([key, val]) => (
                      <div key={key}>
                        <strong>{key.replace(/_/g, ' ')}:</strong> {String(val)}
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300">No results found.</p>
            )}
          </div>
        </div>
      )}

      {isError && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
