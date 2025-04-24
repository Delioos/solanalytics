-- P&L Aggregation for Mass Deployers (5+ tokens in 180 days)
WITH token_launches AS (
  SELECT 
    account_mint, 
    account_user AS creator_address,
    call_block_time AS launch_time
  FROM pumpdotfun_solana.pump_call_create
  WHERE call_instruction_name = 'create'
  AND call_program_name = 'pump'
  AND call_block_time > DATE_ADD('day', -180, NOW())
),

prolific_creators AS (
  SELECT 
    creator_address,
    COUNT(DISTINCT account_mint) AS token_count
  FROM token_launches
  GROUP BY creator_address
  HAVING COUNT(DISTINCT account_mint) >= 5
),

creator_profits AS (
  SELECT
    t.creator_address,
    SUM(COALESCE(s.minSolOutput / 1e9, 0)) AS total_profit_sol,
    COUNT(DISTINCT t.account_mint) AS tokens_created,
    SUM(CASE WHEN (COALESCE(s.minSolOutput / 1e9, 0) > 0.1) THEN 1 ELSE 0 END) AS profitable_tokens
  FROM token_launches t
  LEFT JOIN pumpdotfun_solana.pump_call_sell s 
    ON t.account_mint = s.account_mint 
    AND t.creator_address = s.account_user
  WHERE t.creator_address IN (SELECT creator_address FROM prolific_creators)
  GROUP BY t.creator_address
),

aggregate_stats AS (
  SELECT
    APPROX_PERCENTILE(total_profit_sol, 0.5) AS median_profit,
    APPROX_PERCENTILE(tokens_created, 0.5) AS median_tokens_created
  FROM creator_profits
)

-- Final P&L results
SELECT
  'ALL_DEPLOYERS' AS metric,
  COUNT(DISTINCT creator_address) AS deployer_count,
  SUM(total_profit_sol) AS total_profit_sol,
  AVG(total_profit_sol) AS avg_profit_per_deployer,
  (SELECT median_profit FROM aggregate_stats) AS median_profit_per_deployer,
  SUM(tokens_created) AS total_tokens_created,
  SUM(profitable_tokens) AS total_profitable_tokens,
  SUM(profitable_tokens) * 100.0 / SUM(tokens_created) AS profitable_token_rate
FROM creator_profits

UNION ALL

SELECT
  'PER_DEPLOYER' AS metric,
  NULL AS deployer_count,
  total_profit_sol,
  NULL AS avg_profit_per_deployer,
  NULL AS median_profit_per_deployer,
  tokens_created,
  profitable_tokens,
  profitable_tokens * 100.0 / tokens_created AS profitable_token_rate
FROM creator_profits
ORDER BY metric DESC, total_profit_sol DESC;