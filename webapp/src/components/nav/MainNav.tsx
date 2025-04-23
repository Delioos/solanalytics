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
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: LineChart,
  },
  {
    name: 'Articles',
    href: '/articles',
    icon: FileText,
  },
  {
    name: 'Data',
    href: '/data',
    icon: Database,
  }
]

const MainNav = () => {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-2 p-4 text-black">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-6 py-4 rounded-full text-md font-medium transition-all",
              isActive 
                ? cn(item.bgColor, "bg-gradient-to-r from-purple-soft to-blue-blue text-white shadow-lg") 
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