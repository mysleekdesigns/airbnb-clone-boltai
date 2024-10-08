"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import FilterComponent from './FilterComponent';
import { listings } from '@/lib/listings';

export default function ListingGrid() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredListings = selectedTypes.length === 0
    ? listings
    : listings.filter(listing => selectedTypes.includes(listing.type));

  const handleFilterChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div>
      <FilterComponent selectedTypes={selectedTypes} onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredListings.map(listing => (
          <Link href={`/listing/${listing.id}`} key={listing.id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4">
                <h3 className="text-lg font-semibold">{listing.title}</h3>
                <p className="text-sm text-gray-500">{listing.type} in {listing.location}</p>
                <p className="text-sm font-bold mt-2">${listing.price} / night</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}