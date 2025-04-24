-- Comparison: Top 10 Deployers vs. Median Deployer
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

-- Calculate time between launches using self-join instead of window function
launch_intervals AS (
  SELECT
    t1.creator_address,
    t1.account_mint,
    t1.launch_time,
    MIN(DATE_DIFF('hour', t2.launch_time, t1.launch_time)) AS hours_since_previous
  FROM token_launches t1
  JOIN token_launches t2 
    ON t1.creator_address = t2.creator_address
    AND t2.launch_time < t1.launch_time
  WHERE t1.creator_address IN (SELECT creator_address FROM prolific_creators)
  GROUP BY t1.creator_address, t1.account_mint, t1.launch_time
),

creator_stats AS (
  SELECT
    t.creator_address,
    COUNT(DISTINCT t.account_mint) AS tokens_created,
    SUM(COALESCE(s.minSolOutput / 1e9, 0)) AS total_profit_sol,
    -- Calculate average hours between launches from our pre-computed intervals
    (SELECT AVG(hours_since_previous) 
     FROM launch_intervals li 
     WHERE li.creator_address = t.creator_address
    ) AS avg_hours_between_launches,
    MIN(DATE_DIFF('second', t.launch_time, s.call_block_time)) AS min_seconds_to_first_sell
  FROM token_launches t
  LEFT JOIN pumpdotfun_solana.pump_call_sell s 
    ON t.account_mint = s.account_mint 
    AND t.creator_address = s.account_user
    AND s.call_block_time > t.launch_time
  WHERE t.creator_address IN (SELECT creator_address FROM prolific_creators)
  GROUP BY t.creator_address
),

median_values AS (
  SELECT
    APPROX_PERCENTILE(total_profit_sol, 0.5) AS median_profit,
    APPROX_PERCENTILE(tokens_created, 0.5) AS median_tokens_created,
    APPROX_PERCENTILE(avg_hours_between_launches, 0.5) AS median_hours_between_launches,
    APPROX_PERCENTILE(min_seconds_to_first_sell, 0.5) AS median_seconds_to_first_sell
  FROM creator_stats
  WHERE avg_hours_between_launches IS NOT NULL
)

SELECT 
  'TOP_10_DEPLOYERS' AS category,
  AVG(cs.total_profit_sol) AS avg_profit_sol,
  AVG(cs.tokens_created) AS avg_tokens_created,
  AVG(cs.avg_hours_between_launches) AS avg_hours_between_launches,
  AVG(cs.min_seconds_to_first_sell) AS avg_seconds_to_first_sell
FROM (
  SELECT * FROM creator_stats 
  ORDER BY total_profit_sol DESC 
  LIMIT 10
) cs

UNION ALL

SELECT
  'MEDIAN_DEPLOYER' AS category,
  mv.median_profit AS avg_profit_sol,
  mv.median_tokens_created AS avg_tokens_created,
  mv.median_hours_between_launches AS avg_hours_between_launches,
  mv.median_seconds_to_first_sell AS avg_seconds_to_first_sell
FROM median_values mv;