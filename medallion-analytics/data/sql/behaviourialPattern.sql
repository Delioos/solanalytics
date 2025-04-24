-- First filter to only consider tokens created in last 180 days
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

-- Filter creators who have launched multiple tokens (5+ in 180 days)
prolific_creators AS (
  SELECT 
    tl.creator_address,
    COUNT(DISTINCT tl.account_mint) AS token_count
  FROM token_launches tl
  GROUP BY tl.creator_address
  HAVING COUNT(DISTINCT tl.account_mint) >= 5
),

-- Calculate time between launches for each creator (with seconds precision)
launch_intervals AS (
  SELECT
    creator_address,
    account_mint,
    launch_time,
    -- Calculate exact seconds since previous launch
    DATE_DIFF('second', 
      LAG(launch_time) OVER (PARTITION BY creator_address ORDER BY launch_time), 
      launch_time
    ) AS seconds_since_previous,
    -- Calculate deployment duration in days (with fractional precision)
    DATE_DIFF('second',
      FIRST_VALUE(launch_time) OVER (PARTITION BY creator_address ORDER BY launch_time),
      LAST_VALUE(launch_time) OVER (PARTITION BY creator_address ORDER BY launch_time RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)
    ) / 86400.0 AS deployment_duration_days
  FROM token_launches
  WHERE creator_address IN (SELECT creator_address FROM prolific_creators)
),

-- Aggregate launch timing metrics per creator (preserving precision)
launch_timing_stats AS (
  SELECT
    creator_address,
    -- Keep full precision for time intervals
    AVG(seconds_since_previous) AS avg_seconds_between_launches,
    MIN(seconds_since_previous) AS min_seconds_between_launches,
    MAX(seconds_since_previous) AS max_seconds_between_launches,
    MAX(deployment_duration_days) AS days_active,
    -- Calculate exact tokens per day
    COUNT(DISTINCT account_mint) / NULLIF(MAX(deployment_duration_days), 0) AS tokens_per_day
  FROM launch_intervals
  WHERE seconds_since_previous IS NOT NULL -- Exclude first launch for each creator
  GROUP BY creator_address
),

-- Calculate first sell timing for each token (with maximum precision)
first_sells AS (
  SELECT
    t.account_mint,
    t.creator_address,
    t.launch_time,
    MIN(s.call_block_time) AS first_sell_time,
    -- Exact seconds to first sell
    MIN(DATE_DIFF('second', t.launch_time, s.call_block_time)) AS seconds_to_first_sell
  FROM token_launches t
  JOIN pumpdotfun_solana.pump_call_sell s 
    ON t.account_mint = s.account_mint 
    AND t.creator_address = s.account_user
    AND s.call_block_time > t.launch_time
  WHERE t.creator_address IN (SELECT creator_address FROM prolific_creators)
  GROUP BY t.account_mint, t.creator_address, t.launch_time
),

-- Aggregate sell timing metrics per creator (full precision)
sell_timing_stats AS (
  SELECT
    creator_address,
    -- Keep exact values in seconds
    AVG(seconds_to_first_sell) AS avg_seconds_to_first_sell,
    MIN(seconds_to_first_sell) AS min_seconds_to_first_sell,
    MAX(seconds_to_first_sell) AS max_seconds_to_first_sell,
    -- Alternative representations in hours/minutes
    AVG(seconds_to_first_sell)/3600 AS exact_avg_hours_to_first_sell,
    MIN(seconds_to_first_sell)/60 AS exact_min_minutes_to_first_sell,
    MAX(seconds_to_first_sell)/3600 AS exact_max_hours_to_first_sell
  FROM first_sells
  GROUP BY creator_address
),

-- Calculate profitability (simplified - only counting sells)
creator_profits AS (
  SELECT
    t.creator_address,
    SUM(COALESCE(s.minSolOutput / 1e9, 0)) AS total_profit_sol,
    COUNT(DISTINCT t.account_mint) AS tokens_created,
    COUNT(DISTINCT CASE WHEN (COALESCE(s.minSolOutput / 1e9, 0) > 0.1) THEN t.account_mint END) AS profitable_tokens
  FROM token_launches t
  LEFT JOIN pumpdotfun_solana.pump_call_sell s 
    ON t.account_mint = s.account_mint 
    AND t.creator_address = s.account_user
  WHERE t.creator_address IN (SELECT creator_address FROM prolific_creators)
  GROUP BY t.creator_address
)

-- Final results with maximum precision for timing metrics
SELECT
  CONCAT('<a href="https://gmgn.ai/sol/address/', pc.creator_address, '" target="_blank">', 
         "left"(pc.creator_address, 4) || '...' || "right"(pc.creator_address, 4), '</a>') AS creator,
  pc.token_count AS tokens_created,
  
  -- Launch frequency metrics (full precision)
  lts.avg_seconds_between_launches,
  lts.min_seconds_between_launches,
  lts.max_seconds_between_launches,
  -- Alternative representations
  lts.avg_seconds_between_launches/60 AS avg_minutes_between_launches,
  lts.min_seconds_between_launches/60 AS min_minutes_between_launches,
  lts.max_seconds_between_launches/3600 AS max_hours_between_launches,
  lts.tokens_per_day,
  
  -- Activity duration
  lts.days_active,
  
  -- Sell timing metrics (full precision)
  sts.avg_seconds_to_first_sell,
  sts.min_seconds_to_first_sell,
  sts.max_seconds_to_first_sell,
  -- Alternative representations
  sts.exact_avg_hours_to_first_sell,
  sts.exact_min_minutes_to_first_sell,
  sts.exact_max_hours_to_first_sell,
  
  -- Profitability (only these get rounded)
  ROUND(cp.total_profit_sol, 3) AS total_profit_sol,
  cp.profitable_tokens,
  ROUND(cp.profitable_tokens * 100.0 / pc.token_count, 1) AS profit_rate_percent
FROM prolific_creators pc
JOIN launch_timing_stats lts ON pc.creator_address = lts.creator_address
JOIN sell_timing_stats sts ON pc.creator_address = sts.creator_address
JOIN creator_profits cp ON pc.creator_address = cp.creator_address
ORDER BY pc.token_count DESC, cp.total_profit_sol DESC
LIMIT 100;