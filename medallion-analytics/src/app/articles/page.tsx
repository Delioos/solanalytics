import Link from "next/link";
export default function ArticlesPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto py-4">
        <h1 className="text-3xl font-bold mb-8 font-space-grotesk">Articles</h1>
        coming soon, for now check out our medium page <span className="text-blue-blue text-lg underline"><Link href="https://medium.com/@MedallionAnalytics">here</Link></span >
      </div>
    </main>
  )
} 