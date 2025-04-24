import Link from 'next/link'
import { cn } from "@/lib/utils"

interface NavItemProps {
  href: string
  icon: string
  label: string
  isActive?: boolean
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
        isActive ? "bg-black text-black" : "text-black/90 hover:text-black hover:bg-black/10"
      )}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </Link>
  )
}

export function AnalyticsNav() {
  return (
    <nav className="flex gap-2 mb-12">
      <NavItem href="/dashboard" icon="📊" label="Dashboard" />
      <NavItem href="/analytics" icon="📈" label="Analytics" isActive={true} />
      <NavItem href="/articles" icon="📄" label="Articles" />
      <NavItem href="/data" icon="💾" label="Data" />
    </nav>
  )
} 