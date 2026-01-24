'use client';
import { useState } from 'react';
import { List, LayoutGrid } from 'lucide-react';
import OutlineToggleGroup from './OutlineToggleGroup';

export default function TableOrCards() {
  const getInitialView = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('table_or_card') || 'cards';
    }
    return 'cards';
  };

  const [viewAs, setViewAs] = useState(getInitialView);

  const handleChange = (newValue) => {
    setViewAs(newValue);
    localStorage.setItem('table_or_card', newValue);
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  const options = [
    {
      value: 'table',
      label: <List className="h-4 w-4" aria-label="Table view" />,
      ariaLabel: 'Table view'
    },
    {
      value: 'cards',
      label: <LayoutGrid className="h-4 w-4" aria-label="Cards view" />,
      ariaLabel: 'Cards view'
    }
  ];

  return (
    <OutlineToggleGroup
      value={viewAs}
      onValueChange={handleChange}
      options={options}
      size="compact"
    />
  );
}
