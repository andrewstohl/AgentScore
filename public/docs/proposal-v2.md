# AgentScore Subnet Design Proposal
## Bittensor Ideathon Submission — February 2026

---

## 1. Executive Summary

The agent payment rails are being built now. Coinbase launched Agentic Wallets in February 2026. Stripe shipped x402 payments on Base the same week. Google's AP2 coalition includes Mastercard, PayPal, Adyen, and Deloitte. Visa released TAP for agent identity verification. ERC-8004 formalized agent identity registries on Ethereum.

These protocols solve how agents pay. Nobody solves what they should pay for, who they should trust, or whether the service they are buying is any good.

AgentScore is a Bittensor subnet that continuously probes, evaluates, and ranks service endpoints across the agent economy. Miners build predictive models of service quality. Validators independently verify those predictions with real micro-transactions. The output is a real-time trust and quality API that any AI agent can query before spending money.

The scoring function follows the same predict-then-measure architecture that makes Taoshi's prop trading network (SN8) one of Bittensor's most successful subnets. Miners predict service quality across conditions they have not directly observed. Validators test those predictions against ground truth measured via blind challenges. Accurate predictions earn emissions; inaccurate predictions do not.

The subnet generates revenue through API query fees, enterprise subscriptions for real-time quality data feeds, and eventually transaction verification fees for agents routing through the AgentScore proxy. We acknowledge significant uncertainty about the size and timing of the agentic commerce market. The x402 protocol has processed millions of transactions but total volume remains modest. Our phased approach starts with endpoints that have objective, verifiable ground truth to prove the mechanism works before expanding to more subjective quality dimensions.

AgentScore addresses a structural gap in the emerging agent economy: every payment network in history has spawned a credit-rating or trust layer, yet the agent economy has none. The opportunity window is open now and will close within 12-18 months as centralized platforms build walled-garden alternatives.

---

## 2. Novelty and Originality of Incentive Design

### 2.1 What Makes This Incentive Mechanism Unique

Most service monitoring systems measure and report. Datadog measures infrastructure metrics. Pingdom reports uptime percentages. These are observation tools, not intelligence systems.

AgentScore incentivizes prediction, not observation. Miners do not simply report what they measured. They build models that predict service behavior under conditions they have not directly tested: peak-hour performance from off-peak measurements, degradation likelihood from trend analysis, fraud probability from anomaly detection.

The incentive alignment works as follows:

**Miners compete to minimize prediction error.** Each epoch, miners submit an Agent Trust Scorecard (ATS) containing probabilistic predictions about service quality metrics: uptime probability, latency percentiles, data freshness, accuracy scores, and fraud risk. These predictions are tested against validator-measured ground truth. Miners whose predictions match reality earn emissions; miners whose predictions diverge lose emissions.

**Novelty is explicitly rewarded.** Validators deliberately introduce adversarial test conditions each epoch: off-peak timing, unusual payload sizes, cross-region requests. Miners who genuinely model service dynamics capture bonus multipliers. Miners who copy prior observations or submit static predictions miss these edge cases and score poorly.

**Independence is enforced.** Miner prediction vectors are compared pairwise. Submissions with >0.95 cosine similarity are clustered and share a single emission allocation. Running fifty copies of the same model earns one times emissions, not fifty times.

### 2.2 Predict-Then-Measure Applied to Service Quality

This architecture is proven in financial prediction markets but novel in service quality evaluation.

Traditional quality assurance is reactive: observe a problem, then report it. AgentScore is predictive: forecast problems before they occur, then verify whether the forecast was accurate. This produces actionable intelligence rather than historical reports.

The mechanism creates three competitive dimensions:

1. **Coverage.** Miners must probe broadly enough to build representative models.
2. **Precision.** Models must predict accurately across diverse test conditions.
3. **Timeliness.** Models must detect degradation trends before they become obvious.

A miner who predicts that Endpoint X will degrade during off-peak hours, and is proven correct by validator tests, earns more than a miner who simply reports Endpoint X's current average performance.

### 2.3 Why This Has Not Been Done Before

Three structural barriers prevented prior implementations:

**Barrier 1: Ground truth verification is expensive.** Measuring service quality requires real transactions. Before x402 and similar protocols, there was no cheap, programmatic way to make micro-payments to arbitrary endpoints for testing purposes. Credit card minimums ($0.50+), KYC requirements, and API friction made continuous verification economically infeasible.

x402 enables sub-cent test transactions on Base. Validator challenge costs are comparable to the compute costs that Chutes validators incur for inference verification. The cost barrier has fallen.

**Barrier 2: Neutrality is structurally difficult.** A quality rating system owned by Coinbase, Google, or Stripe cannot credibly rate competing platforms. A neutral third party could theoretically provide this service, but collecting sufficient data to compete with platform-native ratings requires massive scale that centralized startups cannot achieve profitably.

Bittensor's incentive mechanism solves this: miners fund their own data collection in pursuit of emission rewards. The network coordinates distributed data gathering without a centralized budget.

**Barrier 3: Predictive modeling requires adversarial testing.** Without a mechanism to introduce novel test conditions, miners converge on copying observed values. The commit-reveal scheme plus deliberately adversarial validator challenges is a novel mechanism design element that prevents lazy convergence.

### 2.4 How Miners Are Incentivized

Miner rewards follow standard Yuma Consensus with task-specific modifications:

```
emission(m) = S(m) / Σ_m' S(m') × total_miner_emissions

where S(m) = accuracy_score(m) × novelty_bonus(m) × consistency_penalty(m)
```

**Accuracy score:** Weighted sum of prediction accuracy across seven quality dimensions (data accuracy, fraud detection, price honesty, latency percentiles, freshness, uptime). Weights reflect economic importance: data accuracy and fraud detection together account for 55% of the score.

**Novelty bonus:** Multiplier from 1.0 to 1.2 rewarding accurate predictions on adversarial test conditions. Miners who correctly anticipate off-peak degradation or cross-region variance earn this bonus.

**Consistency penalty:** Multiplier from 0.5 to 1.0 penalizing predictions highly correlated with prior-epoch ground truth. This prevents stale-copying attacks.

The result: miners must invest genuine modeling effort to capture emissions. Simple observation strategies fail.

---

## 3. Clarity and Soundness of Mechanism Logic

### 3.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Service Endpoints                         │
│         (x402, AP2, REST APIs, deterministic APIs)          │
└──────────────┬────────────────────────────────┬─────────────┘
               │                                │
      ┌────────▼─────────┐            ┌─────────▼─────────┐
      │     MINERS       │            │    VALIDATORS      │
      │ Continuous probe │            │ Blind challenges   │
      │ Build models     │            │ Real micro-trans   │
      │ Submit ATS       │            │ Measure ground     │
      └────────┬─────────┘            │      truth         │
               │                      └─────────┬─────────┘
               │                                │
               └────────────────┬───────────────┘
                                │
                    ┌───────────▼────────────┐
                    │     SCORING ENGINE      │
                    │  Compare predictions    │
                    │  vs. ground truth       │
                    │  Apply weights, bonuses │
                    └───────────┬────────────┘
                                │
                    ┌───────────▼────────────┐
                    │    AgentScore API       │
                    │  Real-time scores       │
                    │  Routing recommendations│
                    └─────────────────────────┘
```

### 3.2 Miner Scoring: Agent Trust Scorecards (ATS)

Each epoch (72 minutes), miners submit a structured scorecard per endpoint:

```json
{
  "endpoint_id": "0x7f3a...b2c1",
  "epoch": 14832,
  "predictions": {
    "uptime_probability": 0.9971,
    "p50_latency_ms": 47.2,
    "p95_latency_ms": 128.6,
    "p99_latency_ms": 341.0,
    "data_freshness_seconds": 12.4,
    "data_accuracy_score": 0.982,
    "price_honesty": true,
    "fraud_risk_score": 0.003,
    "degradation_trend": -0.02
  },
  "confidence_interval": 0.85,
  "model_hash": "sha256:9f86d0..."
}
```

Miners generate these predictions through continuous probing during the epoch, combined with predictive modeling. The intelligence is the model that generalizes from observed samples to unobserved conditions.

### 3.3 Validator Verification: Blind Challenges via Commit-Reveal

Validators serve as ground-truth authorities. Their challenge flow:

**Step 1: Commit**
- Validator selects target endpoints and generates unique nonce
- Commits hash(endpoint_id, nonce, test_params) to chain
- Miners cannot see which endpoints or conditions will be tested

**Step 2: Test**
- Validator executes real micro-transactions against selected endpoints
- Each x402 transaction on Base costs < $0.01
- Measures ground truth: latency, accuracy, freshness, price, delivery
- Includes deliberately adversarial conditions:
  - Off-peak timing (tests temporal modeling)
  - Unusual payload sizes (tests generalization)
  - Cross-region requests (tests geographic awareness)
  - Known-bad endpoints (tests fraud detection)

**Step 3: Reveal**
- Validator reveals nonce and publishes measured ground truth
- Miner scorecards are compared against measurements

**Step 4: Score**
- Score = weighted accuracy of predictions vs. observed reality
- Multiple validators test overlapping endpoints for consistency

The commit-reveal scheme ensures miners cannot tailor predictions to specific challenges. The blind nature of tests prevents service operators from detecting when they are being evaluated.

### 3.4 Weighted Accuracy Scoring

For each endpoint tested, the miner's score is:

```
score(m, e) = Σ_i [ w_i × (1 - |predicted_i - observed_i| / range_i) ]

Where:
- i indexes quality dimensions
- w_i is economic importance weight
- range_i is normalization range
- predictions outside valid range clamp to 0
```

**Dimension weights:**

| Dimension | Weight | Rationale |
|-----------|--------|-----------|
| Data accuracy | 0.30 | Wrong data is worst outcome |
| Fraud detection | 0.25 | Catching malicious endpoints is critical |
| Price honesty | 0.15 | Overcharging erodes trust |
| Latency (p50) | 0.10 | Speed matters for real-time tasks |
| Latency (p95/p99) | 0.10 | Tail latency reveals instability |
| Data freshness | 0.05 | Staleness detection |
| Uptime | 0.05 | Availability baseline |

Aggregate miner score per epoch:

```
S(m) = mean(score(m, e)) for all endpoints e tested
       × novelty_bonus(m)
       × consistency_penalty(m)
```

### 3.5 Anti-Gaming Measures

**Attack: Sybil miners submitting identical predictions**

Mitigation: Independence scoring. Submissions with >0.95 cosine similarity share a single emission allocation. Running many copies of the same model earns the same as running one.

**Attack: Validator-miner collusion**

Mitigation: Multi-validator overlap (each endpoint tested by 3+ validators), validator rotation pseudorandomly determined from block hash, and cross-validator consistency checks. Validators whose measurements deviate >2σ from majority are flagged.

**Attack: Service operator self-rating**

Mitigation: Miner scores are computed across ALL endpoints they rate, not individual ones. A miner must model the entire ecosystem accurately; perfect prediction on one endpoint provides minimal advantage.

**Attack: Stale prediction copying**

Mitigation: Consistency penalty for predictions highly correlated with prior-epoch ground truth. Novelty bonus for accurate predictions on adversarial conditions that differ from typical patterns.

**Attack: Adversarial endpoints performing well during tests**

Mitigation: Validator test transactions are indistinguishable from real user traffic. Commit-reveal prevents services from knowing when they are tested. Miners who detect this pattern (high quality during regular intervals, lower quality otherwise) earn bonus scores for identifying the anomaly.

### 3.6 Honesty About Ground Truth Limitations

Ground truth is easy for some endpoints and brutal for others. We acknowledge this explicitly:

**Easy ground truth:** Price feeds with cross-referenceable sources, RPC endpoints with deterministic responses, APIs returning blockchain state. Validator measurements can be objectively verified against independent sources.

**Hard ground truth:** LLM inference quality, creative output evaluation, subjective service ratings. These require human judgment or reference models that introduce bias.

**Phase 1 scope is intentionally limited to objective ground truth endpoints.** We focus on deterministic APIs, price feeds, and RPC endpoints where validator measurements are verifiable. This proves the mechanism before attempting the harder problem of subjective quality evaluation.

---

## 4. Insightfulness and Impact on Future Subnet Design

### 4.1 A Reusable Pattern: Real-World Verification via Micro-Transactions

AgentScore introduces a mechanism pattern applicable to any subnet requiring real-world verification:

1. Miners make predictions about real-world outcomes
2. Validators verify via actual micro-transactions (not synthetic tests)
3. Scoring compares predictions against ground truth measured on-chain
4. Emissions flow to accurate predictors

This pattern extends beyond service quality to any domain where real-world outcomes can be verified programmatically:

- **Oracle verification:** Predict off-chain data source accuracy, verify via actual queries
- **Supply chain tracking:** Predict delivery reliability, verify via actual shipments
- **Energy markets:** Predict renewable generation, verify via meter readings
- **Insurance underwriting:** Predict claim likelihood, verify via actual claims

The key insight: Bittensor subnets can verify real-world outcomes by embedding actual economic transactions in the validation loop. This is stronger than synthetic tests because it measures the same experience that users will have.

### 4.2 Why Service Quality Intelligence Is a Primitive

Service quality evaluation is not a feature; it is infrastructure. Any subnet exposing an API needs quality verification:

- Chutes (SN64) inference endpoints need reliability ratings
- Taoshi (SN8) needs verified data source quality
- Synth needs validated price feed freshness
- Data Universe (SN13) needs source credibility scores

AgentScore provides this primitive as a public good consumed by other subnets. This creates composability: subnets improve their own quality by being rated, and AgentScore improves by rating more subnets.

### 4.3 Impact on Bittensor Ecosystem Architecture

The subnet demonstrates that Bittensor's incentive mechanism works for non-ML intelligence tasks. Predictive modeling of service quality uses classical ML (XGBoost, time-series analysis), not deep learning. This broadens the range of viable subnet designs beyond neural network training.

It also establishes a template for subnets that serve other subnets. The "rating other subnets" model creates natural viral loops within the ecosystem: every subnet wants to know its score, driving engagement and staking attention.

### 4.4 Long-Term Implications for Decentralized Trust Infrastructure

If AgentScore succeeds, it establishes that decentralized quality rating is viable for the agent economy. This has implications for:

- **Web service discovery:** Decentralized alternatives to centralized app stores and directories
- **Reputation systems:** Portable, verifiable service reputation across platforms
- **Automated procurement:** AI agents that autonomously select service providers based on verified quality metrics

The mechanism design choices in AgentScore (predict-then-measure, commit-reveal, weighted accuracy) become reference implementations for future trust infrastructure subnets.

---

## 5. Market Context and Timing

### 5.1 The Agentic Commerce Stack Assembling Now

The following protocols and platforms are all shipping production code in early 2026:

| Layer | Protocol | Status |
|-------|----------|--------|
| Payment Rails | x402 (Coinbase + Cloudflare) | Live, 50M+ transactions |
| Payment Rails | AP2 (Google) | Coalition formed, early adoption |
| Checkout | ACP (Stripe + OpenAI) | Live in ChatGPT |
| Agent Identity | Visa TAP | Deployed |
| Agent Identity | ERC-8004 | Finalized August 2025 |
| Agent Wallets | Coinbase Agentic Wallets | Launched February 2026 |
| **Service Intelligence** | **AgentScore** | **Proposed** |

### 5.2 Why the Timing Is Critical

Quality infrastructure must exist before fraud and degradation become systemic problems. Building it after the fact is exponentially harder:

- Once agents lose money to bad endpoints, trust in the entire agent economy suffers
- Once centralized platforms build walled-garden trust systems, neutral alternatives face distribution headwinds
- Once service operators learn to game quality signals, anti-gaming mechanisms must be more sophisticated

The 12-18 month window is real. Coinbase, Google, and Stripe will build native quality features for their ecosystems. The opportunity for a neutral, cross-platform rating layer closes as these platforms achieve lock-in.

### 5.3 Honest Assessment of Market Size Uncertainty

We cannot confidently project the size of the agentic commerce market. Current x402 volume is modest ($7-17M total through early 2026). Growth is exponential (98.5% of volume occurred in the final 15 days of measurement in late 2025), but exponential growth from a small base does not guarantee large absolute numbers.

**What we know:**
- Major payment companies are investing heavily in agent infrastructure
- AI agent market projections range from $50B to $200B by 2030
- x402 transaction volume is growing rapidly on both Base and Solana

**What we do not know:**
- Whether agents will actually transact autonomously at meaningful scale
- Whether the payment protocols will achieve mainstream adoption
- What percentage of agent transactions will require external quality verification

Our phased approach reflects this uncertainty. Phase 1 targets existing API endpoints with objective ground truth, generating value regardless of x402 adoption pace. Phase 2 and 3 expand into agent-native services as the market develops. If agentic commerce stalls, the subnet still provides valuable API quality intelligence for traditional use cases.

### 5.4 Market Traction Indicators

We will monitor these metrics to assess market timing:

- Daily x402 transaction volume
- Number of x402-enabled endpoints
- Agent framework adoption (LangChain, CrewAI, AutoGPT)
- Enterprise interest in agent procurement

If these indicators underperform, we maintain optionality to focus on the broader API quality market rather than agent-specific endpoints.

---

## 6. Go-To-Market Strategy

### 6.1 The Core Insight: Distribution Is the Whole Game

A quality rating system without distribution is useless. Agents must actually query AgentScore before making purchases. Our GTM prioritizes distribution above all else.

### 6.2 Phase 1: Public Leaderboard (The Viral Engine)

**The Product:** A real-time public dashboard ranking all rated endpoints by ATS score, updated every epoch.

**Why It Works:**
- Every subnet team wants to know their score
- High-scoring teams share their scores (endorsement)
- Low-scoring teams dispute scores (engagement)
- Creates natural viral loops within the Bittensor community

**Tactics:**
- Publish ATS leaderboard daily on X/Twitter, Discord, Telegram
- Weekly "Subnet of the Week" analysis with tagged teams
- Integration bounties: 5-10% of first month revenue to developers who integrate AgentScore into other subnets
- Alpha token airdrops to early stakers in rated subnets (cross-pollinates communities)

**The Goal:** Make AgentScore the most-discussed topic in Bittensor. Drive awareness, which drives staking consideration, which drives TAO inflows, which drives emission share under dTAO.

### 6.3 Phase 2: Ratings API (Primary Revenue Driver)

**The Product:** A simple API that agents query before making purchases.

```python
# One-line integration
import agentscore

# Check quality before purchase
score = agentscore.rate("0x7f3a...b2c1")
# Returns: ATS 0.94, latency 47ms, freshness 12s, no fraud flags

# Route to best provider
best = agentscore.route(task="realtime_price_feed", token="BTC")
```

**Pricing:** $0.001-$0.01 per query via x402 (we eat our own cooking)

**Distribution Strategy:**
- LangChain plugin
- CrewAI integration
- AutoGPT module
- Anthropic MCP server (Claude can natively use AgentScore)

The MCP angle is critical. An AgentScore MCP server means every Claude user with agent capabilities automatically has access to quality checks. This is distribution at scale with zero customer acquisition cost.

### 6.4 Phase 3: Enterprise Subscriptions

**Target Customers:**
- Agent framework providers ($1,000-5,000/month)
- Wallet providers ($2,000-10,000/month)
- DeFi protocols ($500-5,000/month)
- Enterprise AI teams ($5,000-25,000/month for SLA'd access)

**Value Proposition:** Real-time feeds of all ATS data for integration into routing engines, with quality-adjusted pricing recommendations.

### 6.5 Proxy Routing: De-Emphasized for Phase 1

The transaction verification fee model (routing agent transactions through AgentScore and taking 0.5-2% fee) remains in the roadmap but is de-emphasized in initial phases.

**Why:** Proxy routing requires significant trust and integration depth. Agents must route their actual transactions through our infrastructure. This is a higher-friction adoption path than simply querying quality scores.

**When:** Proxy routing becomes the focus in Phase 2/3, after the ratings API has established trust and demonstrated value. At that point, agents who already use the quality API will naturally consider the convenience of verified routing.

### 6.6 Content Marketing: The Watchdog Angle

Create research reports documenting actual fraud, stale data, and overcharging in the x402 ecosystem. Name names. Show the data. "These five x402 endpoints are serving stale data and charging full price."

Loss stories are the most shareable content in crypto. Every time an agent commerce fraud story breaks, AgentScore is positioned as the cited authority.

---

## 7. Team and Execution

### 7.1 Current Team

**Solo founder** with quantitative finance background, product strategy expertise, and deep understanding of the Bittensor ecosystem.

This is a product and strategy-heavy play, not a deep ML research problem. The ML component is supervised learning on tabular data (XGBoost territory, not transformer territory).

### 7.2 Execution Model: AI Agent Army

We operate a lean execution model leveraging AI agents for development acceleration:
- AI coding agents for boilerplate and scaffolding
- AI research agents for competitive analysis and documentation
- AI testing agents for continuous validation

This model enables a solo founder to punch above their weight class on implementation velocity.

### 7.3 Dev Candidate in Pipeline

We are actively recruiting one senior Python/systems developer with:
- Bittensor SDK familiarity
- Distributed systems experience
- Basic ML background (XGBoost-level)

This hire is the critical path for mainnet launch. Timeline: 2-4 weeks to close.

### 7.4 Why This Team Structure Works

The Bittensor model means intelligence production is crowdsourced via miners. We do not need 20 engineers because the network does the actual modeling work. Our role is mechanism design, coordination, and distribution.

This is exactly the type of subnet that benefits from Bittensor's architecture: the hard work (continuous probing, model building, prediction generation) is done by miners pursuing emissions. Our small team focuses on what cannot be crowdsourced: scoring function design, business development, and ecosystem relationships.

### 7.5 Honest Assessment of Execution Risk

**Risk:** Solo founder with limited engineering bandwidth
**Mitigation:** AI agent acceleration, imminent senior dev hire, Bittensor SDK handles most consensus complexity

**Risk:** Small team outpaced by well-funded competitors
**Mitigation:** Crowdsourced miner network provides scale we could not hire for; decentralized architecture provides moat that centralized teams cannot replicate

---

## 8. Technical Roadmap

### 8.1 Phase 1: Objective Ground Truth Endpoints (Months 1-3)

**Scope:** 2-3 endpoint classes with objective, verifiable ground truth

**Target Endpoints:**
1. **Price feeds** - Crypto price APIs with cross-referenceable sources (Binance, Coinbase, Kraken comparison)
2. **RPC endpoints** - Blockchain RPC services with deterministic responses
3. **Deterministic APIs** - Services returning verifiable data (block heights, timestamps, on-chain state)

**Why this scope:** Ground truth is easy for these endpoints. Validator measurements can be objectively verified against independent sources. This proves the mechanism works before attempting harder subjective quality evaluation.

**Deliverables:**
- Probe harness making real x402 micro-purchases
- Miner node with XGBoost-based quality modeling
- Validator node with commit-reveal mechanism
- Scoring engine with all weights and bonuses
- Public leaderboard dashboard
- AgentScore API (query-based, not proxy)

**Success Metrics:**
- 10-20 endpoints rated continuously
- <5% validator measurement variance across validators
- Miner prediction accuracy >80% on held-out test conditions

### 8.2 Phase 2: Expanded Coverage (Months 3-6)

**Scope:** Broader endpoint coverage as x402 ecosystem matures

**Target Endpoints:**
- x402-native services beyond price feeds
- LLM inference endpoints (with reference model evaluation)
- Cross-protocol support (AP2 endpoints)

**Deliverables:**
- 100+ endpoints rated
- Enterprise subscription tier
- LangChain/CrewAI integrations
- Historical quality database

**Success Metrics:**
- 100,000+ daily API queries
- 10+ enterprise subscribers
- $500K+ annualized revenue

### 8.3 Phase 3: Verified Routing Proxy (Months 6+)

**Scope:** Transaction verification fee model and proxy routing

**The Model:** Agents route transactions through AgentScore, which verifies quality in real-time and takes 0.5-2% verification fee.

**Deliverables:**
- AgentScore Proxy smart contracts on Base
- Verified transaction receipts
- Quality guarantee insurance option
- Cross-chain routing (Base, Solana, Ethereum L2s)

**Success Metrics:**
- $1M+ daily transaction volume routed
- Self-sustaining revenue exceeding emission dependency

### 8.4 Acknowledgment of Ground Truth Difficulty

We explicitly acknowledge that ground truth is easy for price feeds and RPC endpoints, but brutal for subjective quality dimensions like LLM output quality or creative service evaluation. Our roadmap respects this gradient:

- **Phase 1:** Objective, verifiable ground truth only
- **Phase 2:** Semi-objective quality (inference latency, uptime, price compliance)
- **Phase 3:** Subjective quality with human-in-the-loop validation (if viable)

We will not claim to solve subjective quality evaluation in Phase 1. We solve the objectively verifiable problem first, prove the mechanism, then expand scope.

### 8.5 Risk Mitigation and Optionality

If x402 adoption stalls, Phase 1 still generates value for the broader API economy. If subjective quality evaluation proves intractable, we remain a valuable provider of objective quality metrics. If proxy routing faces adoption friction, the ratings API remains a viable standalone business.

The phased approach maintains strategic optionality while building toward the full vision.

---

## Appendix: Revenue Projections (Conservative)

We present conservative revenue projections acknowledging market uncertainty:

| Revenue Layer | Year 1 | Year 2 | Year 3 |
|---------------|--------|--------|--------|
| API Queries | $50K | $250K | $1M |
| Enterprise Subscriptions | $50K | $500K | $3M |
| Transaction Verification | $25K | $500K | $5M |
| **Total** | **$125K** | **$1.25M** | **$9M** |

Plus subnet emissions (owner take) at various emission share scenarios:

| Emission Share | Annual Owner Take (at $300 TAO) |
|---------------|----------------------------------|
| 0.5% | $355K |
| 1.0% | $710K |
| 2.0% | $1.4M |

These projections assume modest market growth. If agentic commerce achieves even 1% of Stripe's volume, the transaction verification layer alone could generate $10M+ annually.

---

*AgentScore: Decentralized Intelligence Layer for Agentic Commerce*
*Bittensor Ideathon — February 2026*
