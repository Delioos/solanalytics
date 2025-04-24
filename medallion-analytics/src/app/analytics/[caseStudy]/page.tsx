import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Example case study data
const caseStudyData = {
  'mass-deployers': {
    title: 'Mass Deployers',
    description: 'Deep dive into the performance metrics of leading DeFi protocols',
    metrics: {
      tvl: '$2.5B',
      users: '45K',
      growth: '+15%',
      protocols: '12',
      chains: '3'
    },
    insights: [
      'Protocol X shows strongest growth in TVL',
      'User retention increased by 25%',
      'New feature adoption at 78%'
    ]
  },
};

type Params = {
  params: {
    caseStudy: keyof typeof caseStudyData;
  };
};

export async function generateStaticParams() {
  return Object.keys(caseStudyData).map((caseStudy) => ({
    caseStudy,
  }));
}

export default async function CaseStudyPage({ params }: Params) {
  const study = caseStudyData[params.caseStudy];

  if (!study) {
    return <div>Case study not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Breadcrumb
        items={[
          { label: 'Analytics', href: '/analytics' },
          { label: study.title, href: `/analytics/${params.caseStudy}` }
        ]}
      />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">{study.title}</h1>
        <p className="text-gray-600 mb-8">{study.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(study.metrics).map(([key, value]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="text-lg capitalize">{key}</CardTitle>
                <CardDescription className="text-2xl font-bold">{value}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {study.insights.map((insight, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardDescription>{insight}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 