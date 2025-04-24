import React from 'react';
import HeatmapChart from './HeatmapChart';

const AnalyticsView: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Deployer Analytics</h1>
        <p className="text-gray-600">
          Comparison of metrics between median deployers and top 10 deployers
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Deployer Performance Heatmap</h2>
        <div className="h-[600px]">
          <HeatmapChart />
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>This heatmap visualizes the relationship between:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Hours between launches (x-axis)</li>
            <li>Number of tokens created (y-axis)</li>
            <li>Profit in SOL (color intensity)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView; 