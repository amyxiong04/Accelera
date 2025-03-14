import * as React from 'react';
import { Button } from '@/components/ui/button';
import { createSchema } from '@/db/init';

export const SchemaUpdater = () => {
  const handleRecreateSchemaClick = async () => {
    'use server';
    await createSchema();
  };

  return (
    <Button className="absolute top-2 right-2" onClick={handleRecreateSchemaClick}>
      Recreate Schema
    </Button>
  );
};
