# AgentScore Research Brief
## Bittensor Subnet Ideathon & Agentic Commerce Landscape

**Prepared for:** AgentScore Team  
**Date:** February 12, 2026  
**Research Areas:** Bittensor Ecosystem, Agentic Commerce, Ideathon Intelligence

---

## AREA 1: BITTENSOR ECOSYSTEM DEEP DIVE

### 1.1 How Bittensor Subnets Work

#### Core Architecture

Bittensor is an open-source platform composed of distinct **subnets** — independent communities of **miners** (who produce digital commodities) and **validators** (who evaluate miners' work). The network constantly emits liquidity in the form of its token, TAO (τ), to participants in proportion to the value of their contributions.

**Key Components:**

| Component | Role | Function |
|-----------|------|----------|
| **Miners** | Producers | Perform useful work as defined by the subnet's incentive mechanism (e.g., AI inference, trading signals, data storage) |
| **Validators** | Evaluators | Independently evaluate miner performance and submit weight vectors to the blockchain |
| **Subnet Creators** | Architects | Design and maintain incentive mechanisms that specify work for miners and validators |
| **Stakers** | Capital Providers | Delegate TAO to validators, earning emissions proportional to their stake |

*Source: Bittensor Documentation - docs.learnbittensor.org*

#### Yuma Consensus (YC3)

Yuma Consensus is the algorithmic process that computes validator and miner emissions from validators' rankings of miners' performances.

**How It Works:**
1. Validators periodically submit vectors of weights ranking miners' value
2. YC resolves this matrix into emissions vectors for miners and validators
3. More trusted validators (measured by stake) have heavier weight in consensus
4. Validators who consistently make good predictions about which miners others will recognize as best get more influence

**Yuma Consensus 3 Improvements (Active):**
- **Per-Bond EMA Scaling:** Each validator-miner bond pair gets its own adjustment rate (alpha value)
- **Fair Scaling:** Bond values use fixed-point arithmetic converted to u16 for storage, fixing rounding issues for small validators
- **Early Recognition Rewards:** Validators who identify promising miners before consensus can accumulate bonds early
- **Liquid Alpha Integration:** Provides additional rewards for validators voting for miners not yet receiving votes

*Source: docs.learnbittensor.org/learn/yuma-consensus, docs.learnbittensor.org/learn/yc3-blog*

#### Emissions & Taoflow (Flow-Based Model)

**Current Model (Active since November 2025):**

Bittensor transitioned to a **flow-based model ("Taoflow")** where emissions are based on **net TAO inflows** (staking minus unstaking) rather than token prices.

**Distribution Breakdown per Subnet:**
- **41%** to miners (based on aggregate rankings from validators)
- **41%** to validators and their stakers
- **18%** to subnet owners

**Key Emission Parameters:**
- **Total block emission:** 0.5 TAO per block
- **EMA window:** ~86.8 days (30-day half-life)
- **Power exponent:** p=1 (linear/proportional distribution)

**Critical Rule:** Subnets with negative net TAO flows (more unstaking than staking) receive **zero emissions**.

*Source: docs.learnbittensor.org/learn/emissions*

#### Dynamic TAO (dTAO)

Each subnet functions as its own automated market maker (AMM) with:
- **TAO reserves:** Amount of TAO staked into the subnet
- **Alpha reserves:** Subnet-specific currency available for purchase
- **Alpha outstanding:** Alpha held in participants' hotkeys

**Price Formula:**
```
Price = TAO_in_reserve / Alpha_in_reserve
```

**Validator Stake Weight:**
```
Validator_stake_weight = Alpha_stake + (TAO_stake × TAO_weight)
```

Currently, TAO weight is set to **18%** to achieve weight parity between TAO and total alpha in approximately 100 days.

*Source: docs.learnbittensor.org/subnets/understanding-subnets*

---

### 1.2 Top Subnets by Emission Share

Based on documentation showing subnet listings, here are the key subnets to study:

#### SN1 (α apex) - Text Prompting
- **Function:** Chat prompt completion, natural language processing
- **Success Factors:** First mover advantage, clear task definition, continuous improvement
- **Emission Share:** Historically top-tier

#### SN2 (β omron) - Machine Translation
- **Function:** Translation services
- **Success Factors:** Clear evaluation metrics, objective quality assessment

#### SN3 (γ templar) - Templar
- **Function:** (Research needed for specifics)
- **Success Factors:** Active development community

#### SN4 (δ targon) - Targon
- **Function:** Decentralized inference
- **Success Factors:** Serving production AI workloads

#### SN8 - Taoshi/Vanta Network (formerly PTN)
- **Function:** Financial market prediction/trading signals
- **Success Factors:** Real economic value, risk-adjusted scoring, competitive elimination
- **Annual Emissions:** $30M+ rewards pool
- **Asset Classes:** Forex, Crypto, Equities
- **Key Innovation:** Debt-based scoring system, 10% max drawdown elimination, plagiarism detection

*Source: taoshi.io, github.com/taoshidev/vanta-network*

#### SN9 (ι pretrain) - Pre-training
- **Function:** Model pre-training
- **Success Factors:** Compute-intensive, valuable output

#### SN13 - Data Universe
- **Function:** Decentralized data storage/indexing
- **Success Factors:** (Research needed)

#### SN20 - BitAgent
- **Function:** (Research needed - likely agentic AI)
- **Success Factors:** (Research needed)

#### SN39 - Basilica
- **Function:** Compute provision
- **Success Factors:** Infrastructure for other subnets
- **Sponsor:** Providing $5,000 in compute credits for hackathon

#### SN64 - Chutes
- **Function:** Serverless AI compute/inference
- **Success Factors:** Infrastructure play, TEE (Trusted Execution Environments) recently launched
- **Recent News:** TEE now publicly available

*Source: chutes.ai*

---

### 1.3 Deep Dive: Key Subnets to Study

#### Taoshi/Vanta Network (SN8) - The Gold Standard

**Mechanism Design:**
- **Task:** Miners submit LONG, SHORT, or FLAT signals for trade pairs
- **Scoring:** Risk-adjusted returns (Sharpe ratio-style metrics)
- **Elimination Triggers:**
  - Plagiarism (copying other miners' trades)
  - >10% max drawdown
  - 30-day probation for bottom performers

**Anti-Gaming Measures:**
- Carry fee for open positions (10.95%/3%/5.25% annual for crypto/forex/equities)
- Spread fee (0.1% × leverage) for crypto pairs
- Slippage assessment based on leverage and liquidity
- Permanent hotkey blacklisting after elimination

**Why It Works:**
1. **Objective Ground Truth:** Market prices provide unambiguous scoring
2. **Risk Management:** Drawdown limits prevent reckless behavior
3. **Continuous Competition:** Probation system ensures only top performers survive
4. **Economic Value:** Real trading signals have market demand

*Source: github.com/taoshidev/vanta-network*

#### Chutes (SN64)

**Function:** Serverless AI compute with focus on:
- Trusted Execution Environments (TEE)
- GPU inference at scale
- Privacy-preserving computation

**Success Factors:**
- Infrastructure utility for other subnets
- Technical moat (TEE implementation)
- Coincides with demand for decentralized compute

#### Targon (SN4), Data Universe (SN13), BitAgent (SN20), Synth

*Note: Detailed technical documentation for these subnets was limited in available sources. Recommend direct GitHub repository review for implementation details.*

---

### 1.4 Scoring Function Patterns & "Proof of Intelligence"

#### What Makes a Good Scoring Function

From Bittensor documentation and successful subnet analysis:

**1. Objective Ground Truth**
- Market prices (Taoshi)
- Mathematical correctness (pre-training loss)
- Human preference rankings

**2. Anti-Gaming Properties**
- Continuous improvement ceiling (no maximum score)
- Randomization in validation queries
- Multiple evaluation dimensions
- Time-delayed ground truth revelation

**3. Incentive Alignment**
- Miners optimize exactly what the subnet wants
- Validators profit from accurate evaluation
- Subnet owner emissions tied to subnet quality

#### Proof of Intelligence / Proof of Effort

Per the Ideathon requirements, subnets should demonstrate:

**Genuine "Proof of Intelligence":**
- Requires sophisticated reasoning or computation
- Cannot be easily gamed with simple heuristics
- Output quality correlates with meaningful capability
- Useful to actual consumers of the commodity

**Proof of Effort (Minimum Bar):**
- Requires verifiable computational work
- Prevents trivial extraction of emissions
- Creates barrier to entry

**Best Practices from Successful Subnets:**
- Use validator-provided random seeds
- Introduce small input variations
- Incorporate organic (real user) queries into validation
- Multiple incentive mechanisms for different aspects of performance
- Perceptual hashing or embedding comparison for similarity detection

*Source: docs.learnbittensor.org/learn/anatomy-of-incentive-mechanism*

---

### 1.5 dTAO Staker Decision Factors

Based on the flow-based emissions model, stakers look for:

**1. Positive Net Flow Trajectory**
- Growing user adoption
- Increasing organic demand
- Sustainable tokenomics

**2. Subnet Utility**
- Real-world use case
- Competitive differentiation
- Path to monetization

**3. Technical Quality**
- Active development
- Exploit-resistant mechanism
- Fair validator distribution

**4. Community & Governance**
- Responsive subnet owner
- Active validator participation
- Transparent operations

**5. Early Opportunity**
- Undervalued alpha tokens
- Growth potential
- First-mover advantage in niche

---

### 1.6 Common Subnet Failure Modes

From ecosystem analysis:

**1. Exploitable Scoring**
- Miners find shortcuts that maximize scores without providing value
- Validators collude or lazily copy weights

**2. No Real Demand**
- Subnet produces commodity no one wants
- No organic usage beyond emission farming

**3. Poor Validator Distribution**
- Too few validators = centralization risk
- Validator apathy = inaccurate scoring

**4. Technical Failures**
- Unstable infrastructure
- Poor documentation blocking participation

**5. Emission Death Spiral**
- Negative net flows → zero emissions
- No emissions → no participants
- No participants → no value

---

### 1.7 Current Subnet Registration Landscape

**Burn Cost Dynamics:**
- Dynamic cost that lowers gradually
- Doubles every time a subnet is created
- Currently competitive and substantial

**Rate Limits:**
- One subnet creation per 28,800 blocks (~4 days)

**Activation Delay:**
- New subnets are inactive for ~1 week (7 × 7200 blocks)
- No emissions during warmup period
- Allows time to set up validators and invite miners

**Slot Competition:**
- Limited subnet slots (deregistered based on lowest token price)
- Zero-emission subnets still retain slots (not auto-deregistered)

**Prerequisites:**
- Substantial TAO investment for mainnet
- Technical capability to maintain incentive mechanism
- Community building for validator/miner recruitment

*Source: docs.learnbittensor.org/subnets/create-a-subnet*

---

## AREA 2: AGENTIC COMMERCE LANDSCAPE

### 2.1 x402 Protocol - Current State

#### What is x402?

x402 is an **open payment standard** that enables services to charge for API and content access directly over HTTP. Built around the HTTP 402 Payment Required status code, it allows programmatic payment without accounts, sessions, or credential management.

**Key Principles:**
- Open standard (Apache-2.0 license)
- HTTP/transport native
- Network, token, and currency agnostic
- Backwards compatible
- Trust minimizing
- Easy to use (abstracts crypto complexity)

*Source: docs.x402.org, github.com/coinbase/x402*

#### Current State & Adoption

**Supported Networks:**
- Base (EVM)
- Solana (SVM)
- Polygon, Avalanche, and more

**SDK Availability:**
- TypeScript (@x402/core, @x402/evm, @x402/svm, @x402/express, @x402/next, @x402/hono)
- Python (pip install x402)
- Go (github.com/coinbase/x402/go)

**Facilitators Live in Production:**
- Multiple facilitators supporting various networks
- Coinbase Developer Platform offering production facilitator
- Testnet facilitator at x402.org/facilitator

#### How It Works

```
1. Client requests resource
2. Server responds 402 Payment Required + payment instructions
3. Client creates and signs payment payload
4. Client resends request with PAYMENT-SIGNATURE header
5. Server verifies via facilitator or locally
6. Server fulfills request
7. Server settles payment on-chain
```

**Use Cases:**
- API services paid per request
- AI agents autonomously paying for API access
- Digital content paywalls
- Microservices monetized via microtransactions
- Proxy services aggregating/reselling API capabilities

*Source: docs.x402.org/introduction, docs.x402.org/core-concepts/facilitator*

#### Volume & Growth

*Data Gap: Specific transaction volume and growth metrics were not available in retrieved sources. Recommend direct outreach to Coinbase Developer Platform or monitoring on-chain metrics for Base/Solana x402 contract activity.*

**Key Players:**
- **Coinbase:** Primary developer and sponsor of x402 standard
- **Cloudflare:** Integration/partnership status needs verification

---

### 2.2 Google AP2 Coalition

*Data Gap: No specific information found on "Google AP2 coalition" in retrieved sources. This may refer to a payment protocol initiative that is not yet publicly documented or may be an internal designation. Recommend further research through Google developer channels.*

---

### 2.3 Stripe ACP (Agent Commerce Protocol)

*Data Gap: No specific information found on Stripe's Agent Commerce Protocol in retrieved sources. Stripe has been expanding crypto capabilities but specific ACP documentation was not accessible.*

---

### 2.4 Visa TAP

*Data Gap: No specific information found on Visa TAP in retrieved sources. Visa has various blockchain initiatives but TAP (presumably "Token/Transaction Access Protocol") documentation was not accessible.*

---

### 2.5 ERC-8004: Agent Identity Standard

*Data Gap: No specific information found on ERC-8004 in retrieved sources. This may be a proposed or draft standard not yet widely documented.*

---

### 2.6 Coinbase Agentic Wallets

**Launch Date:** February 11, 2025 (per research brief)

*Data Gap: Specific details about Coinbase Agentic Wallets were not accessible in retrieved sources. Based on naming and context, likely refers to wallet infrastructure enabling AI agents to hold and transact crypto assets autonomously. Recommend checking Coinbase Developer Platform blog and documentation for specifics.*

---

### 2.7 LongHash Ventures Analysis

*Data Gap: Specific LongHash Ventures x402 analysis was not found in retrieved sources. LongHash Ventures is a Web3 venture fund specializing in ecosystem bootstrapping but specific x402 research was not accessible.*

---

### 2.8 Current State of Agent-to-Agent Autonomous Transactions

#### Market Reality TODAY vs. Projected

**What EXISTS Today:**

1. **x402 Protocol:**
   - Live on testnet and mainnet
   - Production facilitators operational
   - Multiple SDKs available
   - Can handle machine-to-machine payments today

2. **Infrastructure:**
   - EVM and SVM support
   - Facilitator model reduces operational complexity
   - No custody required

**What's MISSING/EMERGING:**

1. **Volume Data:** No clear metrics on actual A2A transaction volume
2. **Agent Identity Standards:** Limited standardization for agent credentials
3. **Cross-Chain Interoperability:** Still fragmented across networks
4. **Mainstream Adoption:** Early adopter phase

**Assessment:**
The infrastructure for agent-to-agent payments **exists and is functional today** through protocols like x402. However, the market is in **early adoption phase** — the protocols are ready, but widespread agent deployment that would generate significant volume is still developing.

**Timeline Estimate:**
- **Now:** Infrastructure ready, early pilots
- **6-12 months:** Growing adoption as AI agents proliferate
- **2-3 years:** Mainstream A2A commerce

---

## AREA 3: IDEATHON INTELLIGENCE

### 3.1 Bittensor Subnet Ideathon Overview

**Event:** Bittensor Subnet Ideathon on HackQuest  
**URL:** https://www.hackquest.io/hackathons/Bittensor-Subnet-Ideathon

**Timeline:**
- **Registration:** Dec 23, 2025 - Feb 25, 2026
- **Round I (Subnet Ideation):** Dec 23, 2025 - Feb 28, 2026
- **Round I Winners Announced:** March 2, 2026
- **Round II (Subnet Hackathon/Testnet):** Mar 2, 2026 - Mar 30, 2026
- **Demo Day:** March 31, 2026 (tentative)

**Participants:** 410+ registered (as of research date)

*Source: hackquest.io/hackathons/Bittensor-Subnet-Ideathon*

### 3.2 Prizes & Awards

| Award | Value | Winners | Key Benefit |
|-------|-------|---------|-------------|
| **Hackathon Winner** | $10,000 USD | 1 | Direct entry to Bitstarter Accelerator + pitch with Jacob Steeves or Etienne |
| **Hackathon Runner-Up** | $3,000 USD | 1 | Interview with Bitstarter |
| **Subnet Ideathon Award** | $1,000 USD × 5 | 5 | Interview with Bitstarter |
| **Discretionary Investment** | 1,000 TAO (~$260,000 USD) | 1 | From Unsupervised Capital + strategic guidance |
| **Basilica Compute Credits** | $5,000 USD | Multiple | Compute credits for Round II qualifiers ($500) + winner ($1,500) |

*Total Prize Pool: ~$23,000 USD + ~$260,000 investment + ~$5,000 compute credits*

---

### 3.3 Submission Requirements (Round I)

Teams must submit:

**1. Subnet Design Proposal** (PDF, Slides, Notion, or GitHub)
- Incentive & Mechanism Design:
  - Emission and reward logic
  - Miner/validator incentive alignment
  - Anti-adversarial mechanisms
  - How it qualifies as "proof of intelligence" or "proof of effort"
  - Algorithm for task assignment, submission, validation, scoring, reward allocation

- Miner Design:
  - Tasks, input/output format, performance dimensions

- Validator Design:
  - Scoring methodology, evaluation cadence, incentive alignment

- Business Logic & Market Rationale:
  - Problem statement, competition analysis, adoption path

- Go-To-Market Strategy:
  - Target users, distribution channels, bootstrapping strategies

**2. Explanation Video** (5-10 minutes)
- Walkthrough of architecture, mechanism design, and flows

**3. Public Introduction Post**
- Short introduction on X (Twitter) or public platforms

**4. Pitch Deck** (10 pages)

*No testnet/mainnet deployment required for Round I*

---

### 3.4 Judging Criteria

**Hackathon Winner Criteria:**
- Quality and robustness of incentive and mechanism design
- Clear definition of miner and validator roles, tasks, evaluation logic
- Relevance and credibility within Bittensor ecosystem
- Consistency between proposed design and testnet behavior
- Overall coherence of idea, execution, and outcomes

**Subnet Ideathon Award Criteria (for 5 winners):**
- Novelty and originality of incentive, scoring, or coordination design
- Clarity and soundness of underlying mechanism logic
- Evidence from testnet execution that mechanism works as intended
- Insightfulness and potential impact on future subnet design

**Runner-Up Criteria:**
- Functional correctness and stability
- Reliability of miner-validator interactions
- Engineering quality and architecture
- Performance and robustness on testnet

---

### 3.5 Judges & Their Backgrounds

*Data Gap: Specific judge identities were not listed in retrieved Ideathon page content. Recommend checking HackQuest platform directly or Bittensor Discord for judge announcements.*

Based on prize structure, likely judges include:
- **Jacob Robert Steeves** (Co-Founder of Bittensor)
- **Etienne** (President, Opentensor Foundation)
- Representatives from **Bitstarter Accelerator**
- Representatives from **Unsupervised Capital**
- Representatives from **Basilica** (Subnet 39)

**What They Would Value:**
Given the backgrounds:
- **Technical Rigor:** Sound mechanism design, exploit-resistant
- **Innovation:** Novel approaches to incentive alignment
- **Feasibility:** Can actually be built and operate on testnet
- **Ecosystem Fit:** Complements or advances Bittensor capabilities
- **Business Viability:** Path to sustainable value creation

---

### 3.6 Unsupervised Capital

**Investment Offer:** Up to 1,000 TAO (~$260,000 USD) discretionary investment

*Data Gap: Specific investment thesis and past investments from Unsupervised Capital were not accessible. Based on context, likely criteria include:*

**What Unsupervised Capital Likely Looks For:**
- Exceptional technical teams with deep understanding of Bittensor
- Subnets with clear path to positive net TAO flows
- Innovative mechanism design that advances the ecosystem
- Strong validator/miner adoption potential
- Sustainable competitive advantage

*Note: "One of the most trusted funds in the ecosystem" — suggests they prioritize reputation and long-term ecosystem health.*

---

### 3.7 Bitstarter Accelerator

**What Bitstarter Offers:**
- Direct entry (for winner)
- Interview opportunities (for finalists)
- Mentorship and guidance

*Data Gap: Specific program details, cohort structure, and past accelerator participants were not accessible. Recommend checking bitstarter.org or Bittensor community channels.*

**Likely Focus Areas:**
- Subnet launch support
- Validator recruitment
- Tokenomics design
- Community building
- Technical architecture review

---

### 3.8 Competition Intelligence

**Registered Participants:** 410+ (as of research date)

**Timeline Consideration:**
- With deadline Feb 28, 2026, many teams likely already formed
- 7 teams advance to Round II (highly selective)

**Competitive Differentiation Opportunities:**
Given 410+ participants, standing out requires:
1. **Novel mechanism design** (not just "another AI inference subnet")
2. **Proof of intelligence** that is hard to fake
3. **Real economic value** beyond emission farming
4. **Clear validator/miner incentive alignment**
5. **Technical feasibility** that can be demonstrated on testnet

**Suggested Intelligence Gathering:**
- Search Twitter/X for #BittensorIdeathon posts
- Monitor Bittensor Discord #hackathon channel
- Check GitHub for public subnet proposals
- Review previous Bittensor hackathon winners for patterns

---

### 3.9 Previous Bittensor Hackathon Winners

*Data Gap: Specific past winners and their projects were not accessible in retrieved sources. Recommend:*
- Searching "Bittensor hackathon winners 2024"
- Checking Bittensor blog/announcements
- Reviewing Bittensor GitHub for winning subnet implementations

---

## KEY INSIGHTS & RECOMMENDATIONS

### For AgentScore Subnet Design

1. **Learn from Taoshi (SN8):**
   - Objective ground truth is crucial
   - Risk management prevents gaming
   - Elimination mechanics drive quality

2. **Differentiate from Existing Subnets:**
   - Don't just build "another inference subnet"
   - Focus on unique proof of intelligence
   - Consider agent scoring/rating as differentiator

3. **Design for Flow-Based Emissions:**
   - Build genuine utility that attracts stakers
   - Plan for positive net TAO flow from day one
   - Consider tokenomics carefully

4. **Prepare for Testnet:**
   - Round I winners need functional testnet implementation
   - Start thinking about validator recruitment now
   - Plan incentive mechanisms that can be tested

5. **Agentic Commerce Integration Opportunity:**
   - x402 is live and ready for integration
   - Consider how agent payments could be part of subnet design
   - ERC-8004 and agent identity standards still emerging

---

## DATA GAPS & FURTHER RESEARCH NEEDED

1. **Subnet-Specific Data:** Detailed technical specs for SN4 (Targon), SN13 (Data Universe), SN20 (BitAgent), Synth
2. **Agentic Commerce:** Google AP2, Stripe ACP, Visa TAP, ERC-8004 specifics
3. **Ideathon Judges:** Specific names and backgrounds
4. **Unsupervised Capital:** Investment thesis and portfolio
5. **Bitstarter Accelerator:** Program details and past cohorts
6. **x402 Metrics:** Actual transaction volume and growth data
7. **Previous Winners:** Past Bittensor hackathon winning projects
8. **Current Competitors:** Other Ideathon submissions visible on social media

---

## SOURCES CONSULTED

- Bittensor Documentation (docs.learnbittensor.org)
- Taoshi/Vanta Network GitHub and Website
- Chutes Website
- x402 Documentation (docs.x402.org)
- x402 GitHub Repository
- Coinbase x402 Resources
- HackQuest Bittensor Subnet Ideathon Page
- Various Bittensor community resources

---

*This brief was compiled on February 12, 2026. Data gaps are noted where information was not accessible or available.*
