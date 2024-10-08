import SearchBar from '@/components/SearchBar';
import ListingGrid from '@/components/ListingGrid';

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Find your next stay</h1>
      <SearchBar />
      <ListingGrid />
    </div>
  );
}