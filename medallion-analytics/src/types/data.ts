export interface NewVsReturningData {
  deployment_date: string;
  new_deployers: number;
  returning_deployers: number;
}

export interface BehavioralPatternData {
  creator: string;
  tokens_created: number;
  avg_seconds_between_launches: number;
  min_seconds_between_launches: number;
  max_seconds_between_launches: number;
  avg_minutes_between_launches: number;
  min_minutes_between_launches: number;
  max_hours_between_launches: number;
  tokens_per_day: number;
  days_active: number;
  avg_seconds_to_first_sell: number;
  min_seconds_to_first_sell: number;
  max_seconds_to_first_sell: number;
  exact_avg_hours_to_first_sell: number;
  exact_min_minutes_to_first_sell: number;
  exact_max_hours_to_first_sell: number;
  total_profit_sol: number;
  profitable_tokens: number;
  profit_rate_percent: number;
}

export interface PnlPerDeployerData {
  metric: string;
  deployer_count?: number;
  total_profit_sol: number;
  avg_profit_per_deployer?: number;
  median_profit_per_deployer?: number;
  total_tokens_created: number;
  total_profitable_tokens: number;
  profitable_token_rate: number;
}

export interface Top10VsMedianData {
  category: string;
  avg_profit_sol: number;
  avg_tokens_created: number;
  avg_hours_between_launches: number;
  avg_seconds_to_first_sell: number;
}

export interface ProfitableDeployersData {
  total_prolific_deployers: number;
  profitable_deployers: number;
  total_launches_by_prolific: number;
  launches_by_profitable: number;
  pct_profitable_deployers: number;
  pct_launches_by_profitable: number;
} 