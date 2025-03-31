'use client';

import { useState } from 'react';
import { projectEvents } from '@/actions/events/project-events';
import { useServerAction } from '@/hooks/useServerAction';
import { Button } from '@/components/ui/button';

const attributes = ['event_id', 'name', 'event_type', 'location', 'date'];

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
    <div className="text-white max-w-lg mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset>
          <legend className="font-semibold mb-2">Select Attributes to View</legend>
          <div className="flex flex-wrap gap-4">
            {attributes.map((attr) => (
              <label key={attr} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={attr}
                  checked={selectedAttrs.includes(attr)}
                  onChange={() => toggleAttr(attr)}
                />
                {attr}
              </label>
            ))}
          </div>
        </fieldset>

        <Button type="submit" className="border border-white text-white bg-transparent hover:bg-white hover:text-black">
          Run Projection
        </Button>
      </form>

      {data && (
        <div className="mt-6">
          <h2 className="font-bold mb-2">Results:</h2>
          {data.length > 0 ? (
            <ul className="space-y-2">
              {data.map((row, index) => (
                <li key={index} className="border border-white p-3 text-sm">
                  {Object.entries(row).map(([key, val]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {String(val)}
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}

      {isError && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
