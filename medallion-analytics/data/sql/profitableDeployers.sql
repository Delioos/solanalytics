-- First filter to only consider tokens created in last 180 days
WITH token_launches AS (
  SELECT 
    account_mint, 
    account_user AS creator_address,
    call_block_time AS launch_time
  FROM pumpdotfun_solana.pump_call_create
  WHERE call_instruction_name = 'create'
  AND call_program_name = 'pump'
  AND call_block_time > DATE_ADD('day', -180, NOW()) -- Fixed to 180 days
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

-- Calculate total launches by prolific creators
total_launches_by_prolific AS (
  SELECT COUNT(DISTINCT account_mint) AS total_launches
  FROM token_launches
  WHERE creator_address IN (SELECT creator_address FROM prolific_creators)
),

-- Calculate creator profits (simplified - only counting sells since they get tokens for free)
creator_profits AS (
  SELECT
    t.creator_address,
    -- Only count sells since deployers get tokens for free
    SUM(COALESCE(s.minSolOutput / 1e9, 0)) AS total_profit_sol,
    COUNT(DISTINCT t.account_mint) AS tokens_created,
    -- Count profitable tokens (any token with at least 0.1 SOL profit to filter noise)
    COUNT(DISTINCT CASE WHEN (COALESCE(s.minSolOutput / 1e9, 0) > 0.1) THEN t.account_mint END) AS profitable_tokens
  FROM token_launches t
  INNER JOIN prolific_creators pc ON t.creator_address = pc.creator_address
  LEFT JOIN pumpdotfun_solana.pump_call_sell s 
    ON t.account_mint = s.account_mint 
    AND t.creator_address = s.account_user
    AND s.call_block_time > DATE_ADD('day', -180, NOW())
  GROUP BY t.creator_address
),

-- Categorize creators as profitable (net positive) or not
creator_categories AS (
  SELECT
    cp.creator_address,
    cp.tokens_created,
    cp.total_profit_sol,
    cp.profitable_tokens,
    CASE WHEN cp.total_profit_sol > 0.1 THEN 1 ELSE 0 END AS is_profitable
  FROM creator_profits cp
)

-- Final results showing profitable deployers statistics
SELECT
  (SELECT COUNT(DISTINCT creator_address) FROM prolific_creators) AS total_prolific_deployers,
  (SELECT COUNT(DISTINCT creator_address) FROM creator_categories WHERE is_profitable = 1) AS profitable_deployers,
  (SELECT total_launches FROM total_launches_by_prolific) AS total_launches_by_prolific,
  (SELECT COUNT(DISTINCT account_mint) FROM token_launches 
    WHERE creator_address IN (SELECT creator_address FROM creator_categories WHERE is_profitable = 1)) AS launches_by_profitable,
  
  ROUND(
    (SELECT COUNT(DISTINCT creator_address) FROM creator_categories WHERE is_profitable = 1) * 100.0 / 
    NULLIF((SELECT COUNT(DISTINCT creator_address) FROM prolific_creators), 0),
    2
  ) AS pct_profitable_deployers,
  
  ROUND(
    (SELECT COUNT(DISTINCT account_mint) FROM token_launches 
     WHERE creator_address IN (SELECT creator_address FROM creator_categories WHERE is_profitable = 1)) * 100.0 /
    NULLIF((SELECT total_launches FROM total_launches_by_prolific), 0),
    2
  ) AS pct_launches_by_profitable