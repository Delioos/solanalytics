import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Send } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-400 text-white rounded-t-3xl">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            <Image
              src="/MedallionAnalytics.png"
              alt="Medallion Analytics"
              width={120}
              height={40}
              className="hover:opacity-90 transition-opacity"
            />
          </Link>
          <div className="flex space-x-6">
            <Link href="/analytics" className="text-gray-300 hover:text-white transition-colors">
              Analytics
            </Link>
            <Link href="/articles" className="text-gray-300 hover:text-white transition-colors">
              Articles
            </Link>
            <Link href="/data" className="text-gray-300 hover:text-white transition-colors">
              Data
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <a 
            href="https://t.me/reytardio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <Send className="w-4 h-4 mr-2" />
            Contact
          </a>
          <div className="text-gray-300 text-sm">
            © {currentYear} Medallion Analytics. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 