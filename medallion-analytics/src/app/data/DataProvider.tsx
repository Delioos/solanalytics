import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import {
  NewVsReturningData,
  BehavioralPatternData,
  Top10VsMedianData,
  ProfitableDeployersData,
  Stats42
} from '../../types/data';


export interface AnalysisData {
  title: string;
  description: string;
  duneUrl: string;
  csvData: (NewVsReturningData | BehavioralPatternData | Top10VsMedianData | ProfitableDeployersData | Stats42)[];
  sqlQuery: string;
  csvFileName: string;
}

export async function getAnalysisData(): Promise<AnalysisData[]> {
  const dataDir = path.join(process.cwd(), 'data');
  const sqlDir = path.join(dataDir, 'sql');

  // Read SQL queries
  const newVsReturningSql = fs.readFileSync(path.join(sqlDir, 'newVsReturning.sql'), 'utf-8');
  const behaviourialPatternSql = fs.readFileSync(path.join(sqlDir, 'behaviourialPattern.sql'), 'utf-8');
  const top10vsMedianDeployerSql = fs.readFileSync(path.join(sqlDir, 'top10vsMedianDeployer.sql'), 'utf-8');
  const profitableDeployersSql = fs.readFileSync(path.join(sqlDir, 'profitableDeployers.sql'), 'utf-8');
  const stats42TopDeployersSql = fs.readFileSync(path.join(sqlDir, 'stats42.sql'), 'utf-8');
  // Read CSV files with type casting
  const newVsReturningCsv = parse(fs.readFileSync(path.join(dataDir, 'newvsreturning-dune-2025-04-24T10-02-36.141Z.csv'), 'utf-8'), {
    columns: true,
    skip_empty_lines: true
  }) as NewVsReturningData[];

  const behaviourialPatternCsv = parse(fs.readFileSync(path.join(dataDir, 'behaviourialPatternTOP100-2025-04-24T10-16-19.959Z.csv'), 'utf-8'), {
    columns: true,
    skip_empty_lines: true
  }) as BehavioralPatternData[];

  const stats42TopDeployersCsv = parse(fs.readFileSync(path.join(dataDir, 'stats42topdeployers-2025-04-24T18-46-17.667Z.csv'), 'utf-8'), {
    columns: true,
    skip_empty_lines: true
  }) as Stats42[];

  const top10vsMedianCsv = parse(fs.readFileSync(path.join(dataDir, 'dune-[top10againstMedian]-2025-04-24T10-05-19.776Z.csv'), 'utf-8'), {
    columns: true,
    skip_empty_lines: true
  }) as Top10VsMedianData[];

  const profitableDeployersCsv = parse(fs.readFileSync(path.join(dataDir, 'profitable_deployers_analysis.csv'), 'utf-8'), {
    columns: true,
    skip_empty_lines: true
  }) as ProfitableDeployersData[];

  return [
    {
      title: "New vs Returning Deployers",
      description: "Analysis of new and returning token deployers over time, showing trends in deployment behavior. This analysis tracks the number of new and returning deployers on a daily basis over the last 180 days.",
      duneUrl: "https://dune.com/queries/5014815",
      csvData: newVsReturningCsv,
      sqlQuery: newVsReturningSql,
      csvFileName: "newvsreturning-dune.csv"
    },
    {
      title: "Behavioral Patterns of Top 100 Deployers",
      description: "Detailed analysis of deployment patterns, timing, and profitability metrics for the most active deployers. This analysis focuses on creators who have launched 5 or more tokens in the last 180 days, examining their launch frequency, time to first sell, and overall profitability.",
      duneUrl: "https://dune.com/queries/5021345",
      csvData: behaviourialPatternCsv,
      sqlQuery: behaviourialPatternSql,
      csvFileName: "behaviourialPatternTOP100.csv"
    },
    {
      title: "Top 42 Deployers Analysis",
      description: "Analysis of the top 42 most profitable deployers, showing their total profits, token counts, success rates, and activity metrics. This analysis provides insights into the most successful token creators and their deployment patterns.",
      duneUrl: "https://dune.com/queries/5034062",
      csvData: stats42TopDeployersCsv,
      sqlQuery: stats42TopDeployersSql,
      csvFileName: "stats42topdeployers.csv"
    },
    {
      title: "Top 10 vs Median Deployer Comparison",
      description: "Comparison of key metrics between the top 10 most profitable deployers and the median deployer. This analysis compares average profit, token creation rate, launch frequency, and time to first sell between the most successful deployers and the median performer.",
      duneUrl: "https://dune.com/queries/5022552",
      csvData: top10vsMedianCsv,
      sqlQuery: top10vsMedianDeployerSql,
      csvFileName: "top10againstMedian.csv"
    },
    {
      title: "Profitable Deployers Analysis",
      description: "Analysis of deployer profitability, showing success rates and overall market impact. This analysis classifies deployers as profitable or not based on their total SOL profit, and calculates the percentage of profitable deployers and their contribution to total token launches.",
      duneUrl: "https://dune.com/queries/5015016",
      csvData: profitableDeployersCsv,
      sqlQuery: profitableDeployersSql,
      csvFileName: "profitable_deployers_analysis.csv"
    }
  ];
} 