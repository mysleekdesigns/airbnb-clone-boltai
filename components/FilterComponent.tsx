"use client"

import { Button } from '@/components/ui/button';

const homeTypes = ['Apartment', 'House', 'Unique stays', 'Entire place', 'Private room', 'Shared room'];

interface FilterComponentProps {
  selectedTypes: string[];
  onFilterChange: (type: string) => void;
}

export default function FilterComponent({ selectedTypes, onFilterChange }: FilterComponentProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {homeTypes.map(type => (
        <Button
          key={type}
          variant={selectedTypes.includes(type) ? "default" : "outline"}
          onClick={() => onFilterChange(type)}
        >
          {type}
        </Button>
      ))}
    </div>
  );
}