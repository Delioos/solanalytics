'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Download, ExternalLink, Database, BarChart2, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { CSVLink } from 'react-csv';
import { Table } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisData } from './DataProvider';

const AnalysisCard = ({ title, description, duneUrl, csvData, sqlQuery, csvFileName, icon }: AnalysisData & { icon: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Generate table columns based on CSV data
  const columns = csvData[0] ? Object.keys(csvData[0]).map(key => ({
    title: key,
    dataIndex: key,
    key: key,
  })) : [];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 transition-all duration-300 hover:shadow-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-purple-hard/10 rounded-lg">
            {icon}
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 border-t border-gray-200"
          >
            <div className="flex space-x-4 mb-6">
              <a
                href={duneUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-purple-soft text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
              >
                <ExternalLink size={16} className="mr-2" />
                View on Dune
              </a>
              <CSVLink
                data={csvData}
                filename={csvFileName}
                className="flex items-center px-4 py-2 bg-deep-blue text-white rounded-lg hover:bg-purple-blue transition-colors shadow-sm"
              >
                <Download size={16} className="mr-2" />
                Download CSV
              </CSVLink>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium mb-4 text-gray-900">Data Preview</h4>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <Table
                  dataSource={csvData}
                  columns={columns}
                  pagination={{ pageSize: 5 }}
                  scroll={{ x: true }}
                  size="small"
                  className="rounded-lg"
                  rowKey={(record) => {
                    // Create a unique key by combining all column values
                    const keyParts = Object.entries(record).map(([key, value]) => 
                      `${key}:${value}`
                    );
                    return keyParts.join('|');
                  }}
                />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4 text-gray-900">SQL Query</h4>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-800 border border-gray-200">
                <code>{sqlQuery}</code>
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const getIconForAnalysis = (title: string) => {
  switch (title) {
    case "New vs Returning Deployers":
      return <Users className="text-purple-hard" size={24} />;
    case "Behavioral Patterns of Top 100 Deployers":
      return <Activity className="text-purple-blue" size={24} />;
    case "Top 42 Deployers Analysis":
      return <DollarSign className="text-azur-deep" size={24} />;
    case "Top 10 vs Median Deployer Comparison":
      return <BarChart2 className="text-azur-green" size={24} />;
    case "Profitable Deployers Analysis":
      return <TrendingUp className="text-green-mint" size={24} />;
    default:
      return <Database className="text-gray-500" size={24} />;
  }
};

export default function DataPageClient({ analyses }: { analyses: AnalysisData[] }) {
  const analysesWithIcons = analyses.map(analysis => ({
    ...analysis,
    icon: getIconForAnalysis(analysis.title)
  }));

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Token Deployment Analytics Data Room</h1>
          <p className="text-xl text-gray-600">
            Explore detailed analyses of token deployment patterns, profitability, and market behavior
          </p>
        </div>

        <div className="space-y-6">
          {analysesWithIcons.map((analysis, index) => (
            <AnalysisCard key={index} {...analysis} />
          ))}
        </div>
      </div>
    </div>
  );
} 