import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Example articles data
const articlesData = {
  'defi-trends-2024': {
    title: 'DeFi Trends in 2024',
    author: 'John Doe',
    date: 'March 15, 2024',
    category: 'Analysis',
    content: [
      {
        type: 'paragraph',
        text: 'The DeFi landscape in 2024 has seen significant growth and innovation. With the rise of new protocols and the maturation of existing ones, the ecosystem continues to evolve rapidly.'
      },
      {
        type: 'paragraph',
        text: 'Key trends include the integration of AI in protocol governance, the emergence of cross-chain solutions, and the growing importance of user experience in DeFi applications.'
      }
    ],
    metrics: {
      views: '12.5K',
      shares: '1.2K',
      comments: '45'
    }
  },
  'nft-market-analysis': {
    title: 'NFT Market Analysis Q1 2024',
    author: 'Jane Smith',
    date: 'March 10, 2024',
    category: 'Research',
    content: [
      {
        type: 'paragraph',
        text: 'The NFT market has shown remarkable resilience in Q1 2024, with several high-profile collections achieving record sales.'
      },
      {
        type: 'paragraph',
        text: 'Our analysis reveals interesting patterns in collector behavior and the impact of new marketplace features on trading volume.'
      }
    ],
    metrics: {
      views: '8.7K',
      shares: '950',
      comments: '32'
    }
  }
};

export default function ArticlePage({ params }: { params: { article: string } }) {
  const article = articlesData[params.article as keyof typeof articlesData];

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Breadcrumb
        items={[
          { label: 'Articles', href: '/articles' },
          { label: article.title, href: `/articles/${params.article}` }
        ]}
      />
      
      <div className="mt-8 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-sm text-gray-500">{article.date}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{article.category}</span>
            </div>
            <CardTitle className="text-3xl">{article.title}</CardTitle>
            <CardDescription className="text-lg">By {article.author}</CardDescription>
          </CardHeader>
          
          <div className="p-6">
            {article.content.map((section, index) => (
              <p key={index} className="mb-4 text-gray-700">
                {section.text}
              </p>
            ))}
          </div>

          <div className="p-6 border-t">
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(article.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <p className="text-sm text-gray-500 capitalize">{key}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 