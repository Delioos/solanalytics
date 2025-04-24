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

type DataType = NewVsReturningData | BehavioralPatternData | Top10VsMedianData | ProfitableDeployersData | Stats42;

export function loadCsvData<T extends DataType>(csvFileName: string): T[] {
  const filePath = path.join(process.cwd(), 'data', csvFileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  }) as T[];
} 