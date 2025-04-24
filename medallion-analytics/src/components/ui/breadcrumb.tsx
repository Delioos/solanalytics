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
    <nav className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 ? (
            <ArrowRight className="h-4 w-4 mx-2 text-gray-400" strokeWidth={1.5} />
          ) : null}
          <Link
            href={item.href}
            className={`flex items-center py-1 rounded-lg transition-colors text-gray-600 hover:text-gray-900`}
          >
            <FolderOpen
              className={`h-4 w-4 mr-2 ${
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