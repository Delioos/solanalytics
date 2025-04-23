import Link from 'next/link';
import { ArrowRight, FolderOpen } from 'lucide-react';

interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
  }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-base">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 ? (
            <ArrowRight className="h-5 w-5 mx-3 text-gray-400" strokeWidth={1.5} />
          ) : null}
          <Link
            href={item.href}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              index === items.length - 1
                ? 'text-gray-600 bg-gray-100/80'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <FolderOpen
              className={`h-5 w-5 mr-2.5 ${
                index === items.length - 1 ? 'text-gray-500' : 'text-gray-600'
              }`}
              strokeWidth={1.5}
            />
            <span className="font-medium">{item.label}</span>
          </Link>
        </div>
      ))}
    </nav>
  );
} 