import ProductSalesCard from "@/components/dashboard/ProductSalesCard"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-purple-soft/5">
      <div className="container mx-auto py-4">
        <ProductSalesCard />
      </div>
    </main>
  )
}
