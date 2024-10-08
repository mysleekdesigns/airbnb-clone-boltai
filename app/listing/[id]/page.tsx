import { notFound } from 'next/navigation';
import Image from 'next/image';
import { listings } from '@/lib/listings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import DateRangePicker from '@/components/DateRangePicker';

export function generateStaticParams() {
  return listings.map((listing) => ({
    id: listing.id.toString(),
  }));
}

export default function ListingPage({ params }: { params: { id: string } }) {
  const listing = listings.find(l => l.id === parseInt(params.id));

  if (!listing) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: listing.title, href: `/listing/${listing.id}` }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Breadcrumbs items={breadcrumbItems} />
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{listing.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-[400px] mb-6">
            <Image
              src={listing.image}
              alt={listing.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <p className="text-xl"><strong>Address:</strong> {listing.address}</p>
            <p className="text-xl"><strong>Price:</strong> ${listing.price} / night</p>
            <div>
              <h3 className="text-xl font-semibold mb-2">Amenities:</h3>
              <ul className="list-disc list-inside">
                {listing.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Select Dates:</h3>
              <DateRangePicker />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}