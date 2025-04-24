WITH token_launches AS (
  SELECT
    account_mint,
    account_user AS creator_address,
    call_block_time AS launch_time
  FROM pumpdotfun_solana.pump_call_create
  WHERE call_instruction_name = 'create'
  AND call_program_name = 'pump'
  AND call_block_time > DATE_ADD('day', -180, NOW()) -- Only look at last X days
),

deployer_status AS (
  SELECT
    creator_address,
    MIN(launch_time) AS first_launch_time
  FROM token_launches
  GROUP BY creator_address
),

daily_deployments AS (
  SELECT
    DATE_TRUNC('day', t.launch_time) AS deployment_date,
    t.creator_address,
    CASE
      WHEN t.launch_time = d.first_launch_time THEN 'new'
      ELSE 'returning'
    END AS deployer_type
  FROM token_launches t
  JOIN deployer_status d ON t.creator_address = d.creator_address
)

SELECT
  deployment_date,
  COUNT(DISTINCT CASE WHEN deployer_type = 'new' THEN creator_address END) AS new_deployers,
  COUNT(DISTINCT CASE WHEN deployer_type = 'returning' THEN creator_address END) AS returning_deployers
FROM daily_deployments
GROUP BY deployment_date
ORDER BY deployment_date;
