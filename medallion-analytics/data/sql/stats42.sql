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

token_profits AS (
  SELECT
    t.account_mint,
    t.creator_address,
    t.launch_time,
    MAX(COALESCE(s.minSolOutput / 1e9, 0)) AS token_profit_sol,
    MAX(CASE WHEN (COALESCE(s.minSolOutput / 1e9, 0) > 0.1) THEN 1 ELSE 0 END) AS is_profitable
  FROM token_launches t
  LEFT JOIN pumpdotfun_solana.pump_call_sell s 
    ON t.account_mint = s.account_mint 
    AND t.creator_address = s.account_user
  WHERE t.creator_address IN (SELECT creator_address FROM prolific_creators)
  GROUP BY t.account_mint, t.creator_address, t.launch_time
),

creator_stats AS (
  SELECT
    creator_address,
    COUNT(DISTINCT account_mint) AS tokens_created,
    MIN(launch_time) AS first_launch_time,
    MAX(launch_time) AS last_launch_time,
    SUM(token_profit_sol) AS total_profit_sol,
    SUM(is_profitable) AS profitable_tokens
  FROM token_profits
  GROUP BY creator_address
)

SELECT
  creator_address,
  tokens_created,
  total_profit_sol,
  profitable_tokens,
  CASE 
    WHEN tokens_created > 0 THEN profitable_tokens * 100.0 / tokens_created 
    ELSE 0 
  END AS profit_rate_percent,
  GREATEST(1, DATE_DIFF('day', first_launch_time, last_launch_time)) AS days_active,
  tokens_created / GREATEST(1, DATE_DIFF('day', first_launch_time, last_launch_time)) AS tokens_per_day
FROM creator_stats
ORDER BY total_profit_sol DESC;