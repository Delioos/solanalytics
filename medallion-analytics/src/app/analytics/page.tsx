import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

// Example case studies data
const caseStudies = [
  {
    id: 'mass-deployers',
    title: 'Mass Deployers',
    description: 'Metrics to light up the shadowy world of pumpfun exploiters',
    image: '/pump-fun-logo.png', // Add your image path here
    metrics: {
      "Stolen Funds": '$2.5B',
      "Coins Deployed": '45K',
      "Botted volume": '$20B'
    }
  }
  
];

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-8 ">
      <h1 className="text-3xl font-bold mb-8 font-heading">Recent Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
        {caseStudies.map((study) => (
          <Link key={study.id} href={`/analytics/${study.id}`} className="w-full max-w-xl">
            <Card className="hover:shadow-lg transition-all bg-white duration-300 hover:scale-[1.02] overflow-hidden w-full">
              <div className="relative w-full h-48">
                {study.image ? (
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold font-heading">{study.title}</CardTitle>
                <CardDescription className="text-gray-600">{study.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 
