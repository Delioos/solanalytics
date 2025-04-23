import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Example dashboard data
const dashboardData = {
  'defi-protocol': {
    title: 'DeFi Protocol Dashboard',
    metrics: {
      dailyVolume: '$450M',
      activeUsers: '12K',
      transactions: '45K',
      fees: '$1.2M'
    },
    charts: [
      {
        title: 'TVL Growth',
        description: 'Total Value Locked over time'
      },
      {
        title: 'User Activity',
        description: 'Daily active users'
      }
    ]
  },
  'nft-marketplace': {
    title: 'NFT Marketplace Dashboard',
    metrics: {
      dailyVolume: '$120M',
      activeTraders: '8K',
      listings: '25K',
      royalties: '$800K'
    },
    charts: [
      {
        title: 'Trading Volume',
        description: 'Daily trading volume'
      },
      {
        title: 'Collection Performance',
        description: 'Top collections by volume'
      }
    ]
  }
};

export default function DashboardPage({ params }: { params: { caseStudy: string; dashboard: string } }) {
  const dashboard = dashboardData[params.caseStudy as keyof typeof dashboardData];

  if (!dashboard) {
    return <div>Dashboard not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Breadcrumb
        items={[
          { label: 'Analytics', href: '/analytics' },
          { label: params.caseStudy.replace('-', ' '), href: `/analytics/${params.caseStudy}` },
          { label: 'Dashboard', href: `/analytics/${params.caseStudy}/${params.dashboard}` }
        ]}
      />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-8">{dashboard.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(dashboard.metrics).map(([key, value]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="text-lg capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
                <CardDescription className="text-2xl font-bold">{value}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboard.charts.map((chart, index) => (
            <Card key={index} className="h-64">
              <CardHeader>
                <CardTitle>{chart.title}</CardTitle>
                <CardDescription>{chart.description}</CardDescription>
              </CardHeader>
              <div className="p-4">
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart visualization</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 