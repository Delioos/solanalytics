import { getAnalysisData } from './DataProvider';
import DataPageClient from './DataPageClient';

export default async function DataPage() {
  const analyses = await getAnalysisData();
  return <DataPageClient analyses={analyses} />;
} 