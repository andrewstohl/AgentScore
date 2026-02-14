# AgentScore: Predictive Verification Subnet for Agent Commerce Quality
## Bittensor Subnet Design Proposal — Ideathon 2026

---

## 1. Executive Summary

AgentScore is a Bittensor subnet that produces real-time quality intelligence for agentic commerce endpoints. Miners compete to predict service quality metrics (latency, accuracy, freshness, fraud risk) for x402-enabled endpoints. Validators verify predictions by executing real micro-transactions through a commit-reveal protocol. Emissions flow to miners whose predictions most accurately match observed ground truth.

The mechanism follows a predict-then-measure architecture proven by Taoshi's SN8 (trading signal prediction verified against market prices), adapted for service quality verification. Where SN8 miners predict financial returns and validators settle against market data, AgentScore miners predict endpoint behavior and validators settle against real transaction outcomes.

**Phase 1 scope is intentionally narrow:** deterministic API endpoints, price feeds, and RPC services where ground truth is objective and independently verifiable. This proves the mechanism before attempting harder subjective quality dimensions.

**Why Bittensor:** Centralized quality ratings get captured. A rating system owned by Coinbase cannot credibly rate Stripe endpoints. Bittensor's Yuma Consensus enables neutral, incentive-aligned evaluation where the dominant strategy for rational miners is maximizing genuine prediction accuracy.

**Why now:** x402 (Coinbase), AP2 (Google), ACP (Stripe), Visa TAP, and ERC-8004 have all shipped production infrastructure for agent payments in the past 90 days. The payment rails exist. Quality intelligence does not.

---

## 2. Novelty and Originality of Incentive Design

### 2.1 The Core Innovation: Prediction Markets for Service Quality

Most monitoring systems observe and report. AgentScore incentivizes prediction. Miners do not report what they measured. They build models that forecast endpoint behavior under conditions they have not directly tested.

This distinction matters because prediction requires genuine modeling effort. A miner who simply copies last epoch's observed values will fail when validators introduce adversarial test conditions (off-peak timing, unusual payloads, cross-region requests). Only miners with accurate generative models of endpoint behavior will consistently predict correctly.

**Novel mechanism elements:**

1. **Confidence-weighted log-scoring.** Unlike SN8's linear PnL scoring, we use a logarithmic proper scoring rule that rewards calibrated uncertainty:

```
S(m, e) = Σ_i [ w_i × ln(1 + accuracy(m,e,i)) × confidence(m,e,i) × recency(epoch - last_tested) ]
```

The log transform creates diminishing returns (preventing score inflation from easy predictions), confidence weighting rewards miners who know what they know and admit what they don't, and recency decay ensures freshness of intelligence.

2. **Adversarial condition injection.** Each epoch, validators inject test conditions drawn from a distribution designed to separate genuine models from memorized observations. This is analogous to SN1/Apex's emission burning mechanism: it prevents miners from "camping" on static predictions.

3. **Independence-weighted emissions.** Adapted from the cosine similarity approach used for weight-copying detection in Yuma Consensus, but applied to miner outputs. Submissions with >0.95 pairwise cosine similarity are clustered and share a single emission allocation:

```
emission_effective(cluster) = base_emission / sqrt(cluster_size)
```

The sqrt penalty (rather than linear division) allows some beneficial correlation while making pure Sybil attacks unprofitable at cluster size > 4.

### 2.2 Scoring Function: Mathematical Specification

**Per-endpoint score for miner m on endpoint e:**

```
score(m, e) = Σ_i [ w_i × φ(predicted_i, observed_i, range_i) ]

where φ(p, o, r) = max(0, 1 - |p - o|^β / r^β)
```

β = 1.5 (super-linear penalty for large errors, softer than quadratic). This penalizes catastrophic prediction failures more heavily than small deviations, aligning incentives with the real-world cost of bad quality intelligence.

**Dimension weights (Phase 1, deterministic endpoints):**

| Dimension | Weight | Justification |
|-----------|--------|---------------|
| Data accuracy | 0.30 | Incorrect data is worst-case for consuming agents |
| Response validity | 0.25 | Detecting fraud/fabrication endpoints |
| Price compliance | 0.15 | Overcharging detection |
| Latency p50 | 0.10 | Median performance |
| Latency p95 | 0.10 | Tail latency reveals instability |
| Data freshness | 0.05 | Staleness detection |
| Availability | 0.05 | Uptime baseline |

**Aggregate miner score per epoch:**

```
S(m) = [ Σ_e score(m, e) / |E_tested| ] × novelty(m) × (1 - stale_penalty(m))
```

**Novelty bonus:**
```
novelty(m) = 1 + 0.2 × (1 - exp(-KL_divergence(m_predictions, historical_distribution)))
```

KL-divergence from historical prediction distribution quantifies how much new information the miner's model captures. Miners converging on stale consensus earn novelty = 1.0. Miners capturing genuine new patterns earn up to 1.2x.

**Stale prediction penalty:**
```
stale_penalty(m) = max(0, correlation(m_current, ground_truth_previous) - τ) / (1 - τ)
```

Where τ = 0.7. Predictions correlated > 0.7 with last epoch's ground truth are progressively penalized, reaching full penalty (score = 0) at correlation = 1.0. This is calibrated to allow legitimate persistence in stable metrics while punishing direct copying.

### 2.3 Why This Creates the Desired Nash Equilibrium

**Claim:** Under this scoring function, the dominant strategy for rational miners is to maximize genuine prediction accuracy.

**Argument:**
- **Copying previous ground truth** triggers stale_penalty, reducing emissions by up to 100%.
- **Submitting random predictions** produces low accuracy scores across dimensions.
- **Running multiple identical models** triggers independence clustering, dividing emissions by sqrt(n).
- **Genuine predictive modeling** is the only strategy that simultaneously avoids all penalties and captures the novelty bonus.

This creates a competitive landscape similar to SN8: miners invest in better models because better models earn more emissions, creating a continuous improvement cycle.

### 2.4 Comparison to Existing Subnet Mechanisms

| Feature | SN8 (Taoshi) | SN1 (Apex) | AgentScore |
|---------|-------------|------------|------------|
| Miner task | Predict financial returns | Submit algorithmic solutions | Predict service quality |
| Ground truth | Market prices | Benchmark metrics | Real transaction outcomes |
| Scoring | PnL with drawdown limits | Winner-takes-all | Confidence-weighted log-scoring |
| Anti-stagnation | Carry fees, probation | Emission burning | Adversarial injection, novelty bonus |
| Anti-copying | Plagiarism detection + blacklist | Delayed code reveal | Cosine clustering + stale penalty |
| Verification cost | Free (market data) | Compute (sandbox execution) | Micro-transactions ($0.001-0.01) |

---

## 3. Clarity and Soundness of Mechanism Logic

### 3.1 Epoch Lifecycle: State Machine

Each epoch (1 tempo = 360 blocks, approximately 72 minutes) follows this state machine:

```
COMMIT (blocks 0-120)
  → Validators select target endpoints
  → Validators commit: keccak256(endpoint_id || nonce || validator_hotkey || epoch_number)
  → Commits stored on Bittensor chain via extrinsic

PROBE (blocks 0-300, overlapping with COMMIT)
  → Miners continuously probe endpoints via their own x402 transactions
  → Miners update internal quality models
  → No submissions yet

TEST (blocks 120-300)
  → Validators execute x402 micro-transactions against committed endpoints
  → Measurements stored locally with tx_hash as proof
  → Adversarial conditions applied per commit parameters

SUBMIT (blocks 280-340)
  → Miners submit ATS predictions for all tracked endpoints
  → Submissions are signed with miner hotkey
  → Late submissions rejected

REVEAL (blocks 340-355)
  → Validators reveal nonce and publish ground truth measurements
  → Each measurement includes Base tx_hash as on-chain proof
  → Invalid reveals (hash mismatch) are discarded

SCORE (blocks 355-360)
  → Scoring engine compares miner predictions vs. revealed ground truth
  → Weights calculated and set via Yuma Consensus
  → Emissions distributed per YC3
```

### 3.2 Validator Economics

**Cost per epoch per validator:**
- x402 test transactions: 5-20 endpoints × $0.001-0.01 per transaction = $0.005-0.20
- Base L2 gas for commit + reveal: ~$0.01-0.02
- Compute for scoring: negligible
- **Total: $0.02-0.25 per epoch, or $0.40-5.00 per day**

**Revenue per epoch per validator:**
- 41% of subnet emissions allocated to validators + stakers (standard Bittensor split)
- At 0.5% subnet emission share and $300 TAO: ~$2.40/day per validator (assuming 20 validators)
- At 1.0% emission share: ~$4.80/day per validator

**Net validator profitability:** Positive at emission shares above 0.3%, assuming 20 validators. This is comparable to validation costs on inference subnets like Chutes (SN64).

### 3.3 Miner Requirements

**Minimum hardware:**
- CPU: 4 cores (model training is XGBoost, not deep learning)
- RAM: 8GB
- Storage: 50GB for historical quality data
- Network: <100ms latency to target endpoints
- x402 wallet: Funded with $5-20/month for probing transactions

**Software stack:**
- Bittensor SDK (btcli, subtensor integration)
- Quality modeling pipeline (XGBoost, time-series features)
- Endpoint probing harness (HTTP client with x402 payment support)

**Expected miner cost:** $50-150/month (cloud VM + probing transactions)

### 3.4 Commit-Reveal Specification

**Commit payload:**
```
commit = keccak256(
  abi.encodePacked(
    endpoint_id,      // bytes32: target endpoint identifier
    nonce,            // bytes32: random nonce
    test_params_hash, // bytes32: hash of test configuration
    validator_hotkey, // bytes32: validator's registered hotkey
    epoch_number      // uint64: current epoch
  )
)
```

**Reveal payload:**
```json
{
  "epoch": 14832,
  "validator_hotkey": "5GrwvaEF...",
  "endpoints_tested": [
    {
      "endpoint_id": "0x7f3a...b2c1",
      "nonce": "0x9f86d0...",
      "test_params": {
        "timing": "off_peak",
        "payload_size": "large",
        "region": "us-east-1"
      },
      "measurements": {
        "latency_ms": 47.2,
        "data_accuracy": 0.982,
        "data_freshness_seconds": 12.4,
        "response_valid": true,
        "price_charged_usd": 0.003,
        "price_expected_usd": 0.003
      },
      "proof": {
        "base_tx_hash": "0xdef...",
        "block_number": 12345678
      }
    }
  ],
  "signature": "0xabc..."
}
```

**Dispute mechanism:** Any validator can challenge another validator's measurements within 2 epochs by re-testing the same endpoint with the same parameters. If measurements diverge by >3σ, the challenged validator's measurements are excluded from scoring for that epoch and the challenger earns a 5% bonus on their epoch emissions.

### 3.5 Anti-Gaming: Formal Specifications

**Attack 1: Sybil Mining (multiple identical miners)**

Detection: Pairwise cosine similarity on prediction vectors.
```
similarity(m1, m2) = dot(v_m1, v_m2) / (||v_m1|| × ||v_m2||)
```
Threshold: 0.95. Clusters identified via single-linkage clustering.
Penalty: `emission_effective = base / sqrt(cluster_size)`
Cost to attacker: Running n identical miners costs n × miner_cost but earns only sqrt(n) × base_emission. Break-even at n = 1. Any Sybil attack is net-negative.

**Attack 2: Stale Copying (resubmitting observed ground truth)**

Detection: Pearson correlation between current predictions and previous epoch ground truth.
```
r = correlation(predictions_current, ground_truth_previous)
```
Threshold: τ = 0.7
Penalty: `stale_penalty = max(0, r - 0.7) / 0.3` (linear ramp from 0% to 100% penalty)

**Attack 3: Validator-Miner Collusion**

Mitigation layers:
1. Each endpoint tested by minimum 3 validators (overlap requirement)
2. Validator endpoint assignment is pseudorandom: `endpoints(v, epoch) = PRF(block_hash, v_hotkey, epoch)`
3. Cross-validator consistency: measurements deviating >2σ from median are excluded
4. Validators with >3 consecutive excluded measurements lose 10% of their bond accumulation

**Attack 4: Endpoint Operator Self-Boosting**

Mitigation: Commit-reveal makes test traffic indistinguishable from real traffic. Endpoint operators cannot detect when they are being tested. Additionally, miner scores are computed across ALL endpoints, not individual ones. A miner must model the full ecosystem accurately.

### 3.6 Cold Start: Bootstrap Mechanism

**Epochs 1-50 (bootstrap phase):**
- Simplified scoring: accuracy only, no novelty bonus or stale penalty
- Higher tolerance: β = 1.0 (linear penalty) instead of β = 1.5
- Early miner bonus: 1.2x multiplier decaying linearly to 1.0x by epoch 50
- Minimum 5 miners required to activate scoring; below that, emissions split equally

**Epochs 50-200 (transition phase):**
- Gradual introduction of novelty bonus (weight 0 to 1.0 over 150 epochs)
- Stale penalty activated at epoch 100
- Independence clustering activated at epoch 75

This prevents the "chicken and egg" problem where no miners join because there is no data, and there is no data because no miners have joined.

---

## 4. Insightfulness and Impact on Future Subnet Design

### 4.1 Reusable Mechanism Primitives

AgentScore contributes three mechanism primitives that other subnet creators can adopt:

**Primitive 1: Micro-Transaction Verification**
Validators embed real economic transactions in the verification loop. This produces stronger ground truth than synthetic tests because it measures the exact experience that real users have. Any subnet verifying real-world service quality can adopt this pattern.

Applicable to: Oracle subnets (verify data source accuracy via paid queries), compute subnets (verify inference quality via actual API calls), storage subnets (verify retrieval reliability via actual downloads).

**Primitive 2: Confidence-Weighted Log-Scoring**
The logarithmic proper scoring rule with confidence weighting creates correct incentives for uncertainty quantification. Miners are rewarded not just for accuracy but for knowing what they know. This is transferable to any prediction-based subnet.

**Primitive 3: Adversarial Condition Injection**
Validators deliberately introduce edge cases into the verification loop, preventing miners from optimizing for common conditions while ignoring rare but important failure modes. This is analogous to SN1/Apex's emission burning but applied at the validation layer.

### 4.2 Cross-Subnet Composability

AgentScore creates value for the broader Bittensor ecosystem by rating other subnets' endpoints:

- **Chutes (SN64):** Inference endpoint quality ratings. Which Chutes miners deliver fastest, most accurate inference?
- **Taoshi (SN8):** Data source reliability. Are the price feeds that Taoshi miners consume actually fresh and accurate?
- **Synth:** Price feed verification. Cross-reference Synth oracle outputs against independent measurements.

This creates a feedback loop: subnets improve because they are rated, and AgentScore improves because it rates more subnets. The "Bittensor Quality Leaderboard" becomes a public good that increases trust in the entire ecosystem.

### 4.3 Implications for Bittensor Architecture

**Observation 1: Non-ML subnets are viable.** AgentScore's core ML is XGBoost on tabular data, not deep learning. This demonstrates that Bittensor's incentive mechanism works for classical ML and statistical modeling, broadening the design space for future subnets.

**Observation 2: Subnets can serve other subnets.** The composability pattern (one subnet rating another subnet's outputs) is new to Bittensor and creates ecosystem-level network effects. Future subnets could be designed specifically as infrastructure for other subnets.

**Observation 3: Validators can be economically productive.** By executing real micro-transactions, validators produce economic signals (quality measurements) that have standalone commercial value. This supplements emission-based validator compensation with real-world revenue, improving subnet sustainability under variable emission conditions.

---

## 5. Market Context

### 5.1 The Agentic Commerce Stack

The following infrastructure shipped production code in the past 90 days:

- **x402 (Coinbase + Cloudflare):** HTTP payment protocol. ~$7M processed across 10.6M transactions. 98.5% of volume in final 15 days of measurement. Growth curve is exponential from small base.
- **AP2 (Google):** Agent-to-Agent Protocol. Coalition includes Mastercard, PayPal, Adyen, Deloitte.
- **ACP (Stripe + OpenAI):** Agentic Commerce Protocol. Live in ChatGPT for agent purchases.
- **Visa TAP:** Transaction Authorization Protocol for agent identity verification.
- **ERC-8004:** Ethereum standard for agent identity registries. Finalized August 2025.

Payment rails exist. Quality intelligence does not. Every historical payment network has spawned a trust/quality layer (Visa spawned credit scores, eBay spawned seller ratings). The agent economy is following the same pattern.

### 5.2 Honest Assessment of Uncertainty

We cannot predict the size of the agentic commerce market with confidence. Current x402 volume is modest. Our phased approach reflects this: Phase 1 targets existing API endpoints that have value regardless of x402 adoption pace. If agentic commerce stalls, the subnet still provides useful API quality intelligence.

---

## 6. Go-To-Market: Distribution First

### 6.1 The Bittensor Quality Leaderboard

A public, real-time dashboard ranking all rated endpoints, published daily on X/Twitter and Bittensor Discord. Every subnet team wants to know their score. High scores get shared. Low scores get disputed. Both drive awareness.

### 6.2 Ratings API

Simple REST API: query any endpoint, receive quality scores. $0.001-0.01 per query via x402. Integrations with LangChain, CrewAI, AutoGPT, and Anthropic MCP (enabling Claude to natively query AgentScore).

### 6.3 dTAO Strategy: Attracting Stakers

Under Dynamic TAO, emission share depends on net TAO inflows. Our staker value proposition:
- **Revenue sharing:** 10% of API query revenue distributed to alpha token holders
- **Early access:** Stakers above threshold get premium API access before public launch
- **Cross-subnet exposure:** Staking AgentScore provides indirect exposure to the quality of the entire Bittensor ecosystem

Target: positive net TAO flow within 30 days of mainnet launch, sustained by combination of emission returns and revenue sharing.

---

## 7. Team and Execution

**Drew Stohl, Founder.** Business strategy, product design, and go-to-market. Drew brings the commercial lens: identifying the market gap, designing the distribution strategy, and building ecosystem relationships. The mechanism design specifications in this proposal were developed in collaboration with technical advisors with expertise in distributed systems, incentive design, and Bittensor architecture.

**Technical team:** Actively recruiting one senior Python/distributed systems developer with Bittensor SDK experience. Candidates with direct subnet development experience are in pipeline. This is the critical path for testnet launch.

**Execution model:** Lean team focused on mechanism design and ecosystem relationships. The Bittensor model means intelligence production is crowdsourced via miners. Our role is designing the scoring function, building validator infrastructure, and driving distribution. The hard technical work of continuous probing, model building, and prediction generation is performed by miners pursuing emission rewards.

---

## 8. Technical Roadmap

### Phase 1: Objective Ground Truth (Months 1-3)

**Scope:** 2-3 endpoint classes with independently verifiable ground truth.
- Price feeds (cross-referenceable against Binance, Coinbase, Kraken)
- RPC endpoints (deterministic responses, verifiable on-chain)
- Deterministic APIs (block heights, timestamps, on-chain state)

**Deliverables:** Probe harness, miner node, validator node with commit-reveal, scoring engine, public leaderboard, ratings API.

**Success metrics:** 10-20 endpoints rated continuously. <5% cross-validator measurement variance. Miner prediction accuracy >80% on adversarial test conditions.

### Phase 2: Expanded Coverage (Months 3-6)

Broader endpoint classes including x402-native services and semi-objective quality metrics (inference latency, uptime SLAs). Target: 100+ endpoints, enterprise API tier.

### Phase 3: Verified Routing (Months 6+)

Transaction routing proxy (0.5-2% verification fee). Agents route purchases through AgentScore for real-time quality-verified transactions. This is the revenue scaling layer but requires established trust from Phases 1-2.

### Acknowledgment of Ground Truth Difficulty

Ground truth is straightforward for Phase 1 endpoints (price accuracy verified against exchanges, RPC correctness verified against chain state). It becomes progressively harder for subjective quality dimensions (LLM output quality, creative services). We will not claim to solve subjective evaluation in Phase 1. The roadmap respects this gradient.

---

*AgentScore: Predictive Verification for Agent Commerce Quality*
*Bittensor Subnet Ideathon, February 2026*
