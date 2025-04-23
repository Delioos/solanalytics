'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LineChart, FileText, Database } from 'lucide-react'

const navItems = [
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
    <nav className="flex items-center space-x-8 p-6 text-black">
      <Link href="/" className="mr-16">
        <Image
          src="/MedallionAnalytics.png"
          alt="Medallion Analytics"
          width={300}
          height={100}
          className="hover:opacity-90 transition-opacity"
          priority
        />
      </Link>
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href)
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-6 py-4 rounded-full text-md font-medium transition-all",
              isActive 
                ? "bg-black text-white shadow-lg"
                : "bg-white hover:bg-gray-100"
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