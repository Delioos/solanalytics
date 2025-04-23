'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutGrid, LineChart, FileText, Database } from 'lucide-react'

const navItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutGrid,
    bgColor: 'bg-purple-hard',
    textColor: 'text-purple-hard'
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: LineChart,
    bgColor: 'bg-purple-blue',
    textColor: 'text-purple-blue'
  },
  {
    name: 'Articles',
    href: '/articles',
    icon: FileText,
    bgColor: 'bg-deep-blue',
    textColor: 'text-deep-blue'
  },
  {
    name: 'Data',
    href: '/data',
    icon: Database,
    bgColor: 'bg-azur-deep',
    textColor: 'text-azur-deep'
  }
]

const MainNav = () => {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-2 p-4 bg-purple-hard">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              isActive 
                ? cn(item.bgColor, "text-white shadow-lg") 
                : cn(item.textColor, "hover:bg-gray-100")
            )}
          >
            <Icon size={18} />
            <span>{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default MainNav 