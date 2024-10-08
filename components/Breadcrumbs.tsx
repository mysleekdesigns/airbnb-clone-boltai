import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; href: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index === 0 ? (
              <Link href={item.href} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                <Home className="w-4 h-4 mr-2" />
                {item.label}
              </Link>
            ) : (
              <div className="flex items-center">
                <ChevronRight className="w-6 h-6 text-gray-400" />
                <Link href={item.href} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                  {item.label}
                </Link>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}