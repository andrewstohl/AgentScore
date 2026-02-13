# Winning Bittensor Subnet Designs: Research Analysis

**Research Date:** February 13, 2026  
**Purpose:** Analyze successful Bittensor subnet proposals to understand what makes them win

---

## Executive Summary

This document analyzes 3-5 of the most successful Bittensor subnet designs to identify common patterns, incentive mechanisms, anti-gaming measures, and terminology conventions that contribute to subnet success. The research focuses on Taoshi's SN8 (Vanta Network), SN1 (Apex/formerly Prompting), and other top-performing subnets.

---

## 1. Taoshi SN8 (Vanta Network / Proprietary Trading Network)

### Overview
SN8, now known as the **Vanta Network**, is widely cited as one of Bittensor's most successful subnets. It has distributed millions of dollars in payouts to top traders and maintains a highly competitive environment for quantitative trading signals.

### Core Incentive Mechanism

**Predict-then-Measure Architecture:**
- Miners submit **LONG, SHORT, or FLAT signals** for Forex, Crypto, or Equities trade pairs
- Validators receive trade signals, ensure validity, store them, and track portfolio returns
- Rewards are based on **debt-based scoring system** that tracks emissions, performance, and penalties

**How Miners Earn:**
- Miners provide futures-based signals (long/short) across various markets
- Top miners are those that provide **most returns while never exceeding drawdown limits**
- Weights are set based on **previous week's performance** (PnL scaled by penalties)
- Payouts target completion by midnight Sunday each week

**How Validators Verify:**
- Validators ensure trades are valid and store them
- Track portfolio returns over time
- Apply multiple fee structures to simulate real-world trading costs

### Novel/Elegant Scoring Function

**Multi-Factor Scoring with Realistic Fee Structure:**

1. **Carry Fee (Cost of Carry):**
   - Forex: 3% annually (0.008% × max seen leverage, triple on Wednesdays)
   - Crypto: 10.95% annually (0.03% × max seen leverage, every 8 hours)
   - Indices: 5.25% annually (0.014% × max seen leverage, triple on Wednesdays)

2. **Spread (Transaction) Fee:**
   - Applied to crypto pairs only
   - 0.1% × leverage per order
   - Simulates realistic exchange transaction costs

3. **Slippage Assessment:**
   - Greater for higher leverage orders
   - Higher in assets with lower liquidity

4. **Performance Weighting:**
   - Returns-based with drawdown penalties
   - Consistency tracking over time
   - Previous week's performance scaled by penalties

### Ground Truth Problem Solution

**Objective Market Data:**
- Trade signals are validated against actual market prices
- Portfolio returns are tracked against real market movements
- No subjective interpretation—performance is measurable in dollars

**External Price Oracles:**
- While validators track performance, the ultimate ground truth comes from market price data
- This eliminates the "judge's preference" problem common in creative tasks

### Anti-Gaming Measures

1. **Plagiarism Detection & Elimination:**
   - System analyzes uniqueness of each submitted order
   - Miners copying another miner's trades are **eliminated**
   - Hotkeys are permanently blacklisted after elimination

2. **Max Drawdown Elimination (10% Threshold):**
   - Miners exceeding 10% max drawdown are eliminated
   - Continuous tracking of portfolio value drops from peak
   - Risk control mechanism prevents reckless trading

3. **Probation System:**
   - Miners scoring below 15th rank enter probation
   - 30 days to outscore the 15th-ranked miner
   - Failure results in elimination

4. **Hotkey Blacklisting:**
   - Once eliminated or deregistered, hotkeys are permanently blacklisted
   - Cannot re-register with same hotkey
   - Ensures accountability and prevents circumvention

5. **Carry Fees Discourage Buy-and-Hold:**
   - Fees for leaving positions open prevent passive strategies
   - Forces active position management
   - Rewards traders who actively trade, not those who just hold

6. **Leverage-Based Slippage:**
   - Higher leverage = higher slippage costs
   - Prevents abuse of excessive leverage

### Bittensor-Native Terminology Usage

- **Emissions** (distributed based on performance)
- **Weights** (set based on previous week's PnL)
- **Validators** (ensure trade validity and track returns)
- **Miners** (provide trading signals)
- **Hotkey blacklisting** (permanent bans for eliminated miners)
- **Immunity period** (protection for new registrations)
- **Registration burn cost** (dynamic based on network demand)

### What Made Their Proposal Compelling

1. **Objective, Measurable Output:** Trading performance is unambiguous
2. **Real-World Value:** Trading signals have immediate commercial value
3. **Proven Team:** Taoshi had credibility in quant trading
4. **Robust Anti-Gaming:** Multi-layered elimination and penalty systems
5. **Continuous Competition:** Weekly payouts keep miners engaged
6. **Dashboard Transparency:** https://dashboard.taoshi.io/ shows real-time performance
7. **Economic Realism:** Fee structure mirrors actual trading costs

---

## 2. SN1 (Apex - Formerly Text Prompting/Chat)

### Overview
SN1 was the original subnet (hence "Subnet 1") and has undergone significant evolution. Originally focused on text prompting/chat, it has been transformed by Macrocosmos into **Apex**—a subnet for algorithmic innovation and computational competitions.

### Core Incentive Mechanism

**Competition-Based Architecture:**
- Miners submit Python-based algorithmic solutions through the Apex CLI
- Each **Competition** consists of multiple **Rounds** of evaluation
- Validators continuously evaluate submissions against benchmarks
- Blockchain-based rewards distributed to best-performing miners

**Multiple Competitions Running Simultaneously:**
- Matrix Compression V1 (Lossless)
- Matrix Compression V2 (Lossy)
- RL Battleship (Reinforcement Learning)

**How Miners Earn:**
- Submit solutions to competition API
- Solutions run in isolated secure sandboxes
- Metrics generated: compression ratio, speed, accuracy
- **Winner-takes-all** reward structure

**How Validators Verify:**
- Retrieve scores from subnet orchestrator
- Run solutions in Code Executor (isolated sandbox)
- Convert metrics to scores based on competition's scoring mechanism
- Determine winning miner

### Novel/Elegant Scoring Function

**Sandboxed Execution + Objective Metrics:**

1. **Isolated Secure Sandbox:**
   - All miner code runs in isolated environment
   - Prevents malicious code from affecting validators
   - Standardized compute environment ensures fair comparison

2. **Competition-Specific Metrics:**
   - **Matrix Compression:** Compression ratio + task_time (speed)
   - **RL Battleship:** Win rate + turns to victory
   - Each competition defines its own evaluation criteria

3. **Delayed Code Reveal:**
   - Winner's code is hidden for a set period after winning
   - Duration depends on competition type
   - Guarantees creators exercise submission rewards
   - Code eventually revealed for community learning

4. **Emission Burning Mechanism:**
   - Once a top-performing solution is submitted, emissions gradually burn
   - Longer solution remains unchallenged = higher burn rate
   - Motivates continuous innovation and competition
   - Prevents "camping" on winning solutions

### Ground Truth Problem Solution

**Deterministic Benchmarks:**
- Competitions use objective, reproducible benchmarks
- Compression ratios measured in bits saved
- Speed measured in execution time
- Game outcomes determined by rule-based simulation

**Open-Source Verification:**
- Competition rules and evaluation criteria are public
- Community can verify benchmark correctness
- Disputes can be resolved by re-running evaluation

**Sandbox Consistency:**
- Same hardware/software environment for all submissions
- Eliminates hardware advantages (mostly)
- Fair comparison across all miners

### Anti-Gaming Measures

1. **Sandbox Isolation:**
   - Third-party code runs in isolated, disposable environments
   - Prevents malicious code from compromising validators
   - System damage/data loss contained within sandbox

2. **Delayed Reveal (Anti-Copying):**
   - Winning code not immediately visible
   - Prevents immediate copying of winning strategies
   - Rewards original innovation

3. **Emission Burning (Anti-Camping):**
   - Top solutions face increasing burn rate over time
   - Forces continuous improvement
   - Prevents miners from "resting on laurels"

4. **Code Execution Disclaimers:**
   - Macrocosmos explicitly disclaims responsibility for miner code
   - Validators must use isolated environments
   - Shifts security responsibility to validator operators

5. **Winner-Takes-All Competition:**
   - Only best solution receives full reward
   - If improved solution submitted, new winner takes over
   - All previous rewards from that competition transfer to new winner
   - Creates intense competition to be #1

### Bittensor-Native Terminology Usage

- **Emissions** (distributed to competition winners)
- **Weights** (based on competition scores)
- **Validators** (run Code Executor and evaluate submissions)
- **Miners** (submit algorithmic solutions)
- **Competitions** (mechanism-specific incentive pools)
- **Bonds** (validator-miner relationships via Yuma Consensus)
- **Tempo** (360 blocks between reward distribution)

### What Makes SN1/Apex Compelling

1. **Clear Objective Functions:** Each competition has well-defined success metrics
2. **Real-World Impact:** Matrix compression directly benefits SN9 (IOTA)
3. **Open Source Ethos:** Winning solutions eventually become public goods
4. **Multiple Competitions:** Parallel competitions attract diverse talent
5. **Anti-Stagnation:** Emission burning forces continuous improvement
6. **Security-First:** Sandboxed execution protects validators
7. **Cross-Subnet Synergy:** Solutions benefit other subnets (e.g., SN9)

---

## 3. SN9 (IOTA / Pretraining)

### Overview
SN9 focuses on **distributed pretraining of large language models**. It represents a different approach from SN8's financial signals or SN1's algorithmic competitions—it's about collective model training.

### Core Incentive Mechanism

**Gradient Contribution Scoring:**
- Miners contribute gradients from training large language models
- Validators evaluate gradient quality and alignment with global model
- Rewards based on contribution to model performance improvement

**Model-Centric Evaluation:**
- Not evaluating outputs directly, but evaluating training contributions
- Uses techniques from federated learning and distributed optimization

### Ground Truth Problem Solution

**Held-Out Validation Sets:**
- Miners train on public datasets
- Performance measured on held-out validation data
- No single validator defines "correct" output
- Objective: Lower perplexity / higher accuracy on standard benchmarks

**Checkpoint Verification:**
- Miners submit model checkpoints
- Validators can re-run evaluation on checkpoints
- Verifiable computation, not just claimed results

### Anti-Gaming Measures

1. **Gradient Verification:**
   - Cryptographic verification of gradient computation
   - Prevents fake gradient submission

2. **Sybil Resistance:**
   - Multiple registrations don't help if gradients are low quality
   - Quality-based scoring prevents Sybil attacks

3. **Checkpoint Auditing:**
   - Any validator can audit any checkpoint
   - Public verifiability of claimed performance

---

## 4. Common Patterns Across Successful Subnets

### What Top-Tier Subnets Have in Common

1. **Objective Ground Truth:**
   - SN8: Market prices (can't be disputed)
   - SN1: Benchmark metrics (compression ratio, game outcomes)
   - SN9: Validation set performance (standard ML metrics)
   - *Lesson: Successful subnets minimize subjective judgment*

2. **Continuous Competition:**
   - SN8: Weekly payouts, continuous trading
   - SN1: Multiple competitions, emission burning
   - SN9: Continuous training, checkpoint submissions
   - *Lesson: Static leaderboards lead to stagnation*

3. **Multi-Layered Anti-Gaming:**
   - SN8: Plagiarism detection, drawdown limits, probation, hotkey blacklisting
   - SN1: Sandboxing, delayed reveal, emission burning
   - *Lesson: Single anti-gaming measures get exploited; defense in depth wins*

4. **Real-World Value Proposition:**
   - SN8: Trading signals (immediate commercial value)
   - SN1: Compression algorithms (infrastructure optimization)
   - SN9: Pretrained models (foundational AI infrastructure)
   - *Lesson: Abstract research is harder to sustain than practical tools*

5. **Transparent Scoring:**
   - SN8: Dashboard shows real-time PnL
   - SN1: Open benchmarks, reproducible evaluation
   - *Lesson: Miners must understand how to improve*

6. **Validator Protection:**
   - SN8: Simple validation (check trades, track PnL)
   - SN1: Sandboxed execution (isolated from miner code)
   - *Lesson: Validators won't participate if validation is dangerous/expensive*

7. **Economic Sustainability:**
   - All successful subnets have mechanisms to prevent value extraction without contribution
   - Registration costs, performance thresholds, elimination mechanics
   - *Lesson: Open participation requires economic filtering*

---

## 5. What the Bittensor Community Values

### Design Principles from Official Documentation

1. **Endless Improvement:**
   - "Subnets should be endlessly improving"
   - Static mechanisms get exploited; continuous evolution required

2. **Discourage Exploits:**
   - "Well-designed incentive mechanisms foster virtuous cycles"
   - "Flawed mechanisms encourage shortcuts"
   - Expect to continuously monitor and update mechanisms

3. **Proof Against Gaming:**
   - Thorough modeling and testing required
   - Community vetting before mainnet launch
   - Expect emergent exploits; plan for rapid response

4. **Validator Independence:**
   - Validators should independently evaluate miners
   - Weight copying is a major concern (hence Commit-Reveal)
   - Validators rewarded for early discovery of good miners

5. **Hardware Consideration:**
   - Account for hardware differences in output
   - Set tight similarity thresholds for reproducibility
   - Consider using embeddings/perceptual hashing for comparison

### Community Discourse Patterns

From documentation and ecosystem communications:

- **Emphasis on "trustless" evaluation** — minimize human judgment
- **Preference for objective metrics** over subjective quality assessment
- **Concern about "weight copying"** — validators free-riding on others
- **Focus on "emissions efficiency"** — ensuring TAO goes to real value creation
- **Importance of "liquidity flows"** (post-Dynamic TAO) — subnets must attract stakers

---

## 6. Common Mistakes in Subnet Proposals

### Proposals That Get Rejected or Fail

1. **Subjective Scoring:**
   - "Quality" metrics without clear operationalization
   - Creative tasks without objective evaluation criteria
   - *Problem: Validators can't agree on subjective quality*

2. **Insufficient Anti-Gaming:**
   - Single-layer defense mechanisms
   - No plan for emergent exploits
   - *Problem: Miners will find and exploit any weakness*

3. **Expensive Validation:**
   - Requiring validators to run expensive computations
   - API costs that make validation unprofitable
   - *Problem: Validators won't participate at a loss*

4. **Unclear Value Proposition:**
   - Research projects without clear users
   - Solutions looking for problems
   - *Problem: Hard to attract stakers without clear utility*

5. **Static Incentive Mechanisms:**
   - Fixed scoring functions that don't evolve
   - No mechanisms to force continuous improvement
   - *Problem: Miners optimize to the test and stop improving*

6. **Poor Documentation:**
   - Insufficient miner/validator onboarding docs
   - Undocumented incentive mechanisms
   - *Problem: Participation barrier too high*

7. **Ignoring Network Economics:**
   - Not accounting for Dynamic TAO mechanics
   - Registration costs that don't filter quality
   - *Problem: Economic sustainability failure*

---

## 7. Key Bittensor Terminology (Must Use Correctly)

### Core Economic Terms

| Term | Definition | Usage Context |
|------|-----------|---------------|
| **TAO (τ)** | Native token of Bittensor network | Network-wide emissions, staking |
| **Alpha (α)** | Subnet-specific token | Subnet emissions, subnet-specific staking |
| **Emissions** | Distribution of newly created TAO/alpha | "Emissions distributed every tempo" |
| **Dividends** | Validator rewards from bonds | "Validators earn dividends from bonds" |
| **Bonds** | Validator-miner relationships | "Bonds strengthen with consistent evaluation" |

### Network Architecture Terms

| Term | Definition | Usage Context |
|------|-----------|---------------|
| **NetUID** | Subnet unique identifier | "Subnet 8 (NetUID 8)" |
| **Tempo** | Epoch duration (~360 blocks, ~72 min) | "Rewards distributed every tempo" |
| **UID** | Unique neuron identifier within subnet | "Miner UID 42" |
| **Hotkey** | Network interaction key (public) | "Register with hotkey" |
| **Coldkey** | Secure storage key (private) | "Store funds in coldkey" |

### Consensus Terms

| Term | Definition | Usage Context |
|------|-----------|---------------|
| **Yuma Consensus (YC)** | On-chain consensus algorithm | "YC calculates emissions from weights" |
| **Weight-setting** | Validators assigning scores to miners | "Validators set weights every tempo" |
| **Clipping** | Capping outlier weights | "Weights above consensus are clipped" |
| **Consensus Score** | Stake-weighted median of weights | "Consensus score determines clipping threshold" |
| **VTrust** | Validator trust metric | "VTrust measures validator alignment" |
| **Kappa (κ)** | Consensus majority ratio (default 0.5) | "Kappa=0.5 means 50% stake threshold" |

### Hyperparameters

| Term | Definition | Usage Context |
|------|-----------|---------------|
| **Immunity Period** | Blocks after registration with protection | "New miners have 5000-block immunity" |
| **Commit-Reveal** | Time-lock for weight submission | "Commit-reveal prevents weight copying" |
| **Rho (ρ)** | Weight decay rate | "Rho controls how fast weights decay" |
| **Kappa** | Consensus threshold | "See above" |
| **Min/Max Burn** | Registration cost bounds | "Registration burn adjusts between min and max" |
| **Activity Cutoff** | Minimum activity threshold | "Miners must set weights within activity_cutoff" |

### Dynamic TAO Terms (Post-November 2025)

| Term | Definition | Usage Context |
|------|-----------|---------------|
| **Flow-based emissions** | Emissions based on net TAO flows | "Taoflow replaced price-based emissions" |
| **TAO Reserve** | TAO staked in subnet pool | "Price = TAO reserve / Alpha reserve" |
| **Alpha Reserve** | Subnet token in pool | "Alpha reserves provide liquidity" |
| **Alpha Outstanding** | Subnet tokens held by participants | "Stake held as alpha outstanding" |
| **Root Subnet (SN0)** | Subnet without alpha token | "Stake TAO in root for subnet-agnostic validation" |

### Validator/Miner Terms

| Term | Definition | Usage Context |
|------|-----------|---------------|
| **Axon** | Miner's API server endpoint | "Miner exposes Axon for validator queries" |
| **Dendrite** | Validator's client for querying miners | "Validator uses Dendrite to query Axons" |
| **Synapse** | Data object for miner-validator communication | "Request/response packaged in Synapse" |
| **Incentive Mechanism** | Scoring model defining subnet work | "Subnet's incentive mechanism defines the task" |

### Anti-Gaming Terms

| Term | Definition | Usage Context |
|------|-----------|---------------|
| **Weight Copying** | Validators copying others' weights | "Commit-reveal prevents weight copying" |
| **Plagiarism** | Miners copying others' work | "SN8 eliminates miners for plagiarism" |
| **Deregistration** | Removing neuron from subnet | "Poor performance leads to deregistration" |
| **Blacklist** | Permanent hotkey ban | "Eliminated hotkeys are blacklisted" |
| **Liquid Alpha** | Dynamic bond adjustment rates | "Liquid Alpha enables per-bond EMA scaling" |

---

## 8. Technical Implementation Guidance

### For Subnet Creators

1. **Use Commit-Reveal:**
   - Enable `commit_reveal_weights_enabled`
   - Set `commit_reveal_period` appropriately (measured in tempos)
   - Ensure immunity period > commit_reveal_period × tempo

2. **Set Appropriate Hyperparameters:**
   - `immunity_period`: Long enough for meaningful evaluation
   - `min_allowed_weights`: Ensures validators evaluate sufficiently
   - `max_weight_limit`: Prevents concentration
   - `activity_cutoff`: Keeps validators active

3. **Implement Multiple Incentive Mechanisms (if applicable):**
   - Each mechanism operates independently
   - Separate bond pools per mechanism
   - Allows diverse work types within one subnet

4. **Use Liquid Alpha (YC3):**
   - Enable `liquid_alpha_enabled` for fair validator rewards
   - Set `alpha_low` and `alpha_high` for EMA bounds
   - Allows early validators to build bonds faster

### Critical Formulas

**Subnet Token Price:**
```
Price = TAO_reserve / Alpha_reserve
```

**Validator Stake Weight:**
```
Stake_Weight = Alpha_stake + (TAO_stake × TAO_weight)
```

**Emissions Distribution (within subnet):**
- 41% to miners (via Yuma Consensus)
- 41% to validators + stakers
- 18% to subnet owner

**Bond EMA Update:**
```
B(t) = α × ΔB + (1-α) × B(t-1)
```
Where α can be dynamic per validator-miner pair (YC3)

---

## 9. Resources for Further Research

### Official Documentation
- https://docs.bittensor.com (now docs.learnbittensor.org)
- https://docs.learnbittensor.org/learn/yuma-consensus
- https://docs.learnbittensor.org/learn/emissions

### Successful Subnet Repositories
- **SN8 (Vanta):** https://github.com/taoshidev/vanta-network
- **SN1 (Apex):** https://github.com/macrocosm-os/apex
- **Subnet Listings:** https://tao.app

### Community Resources
- Bittensor Discord: https://discord.gg/GtgHWakpDs
- Taoshi Discord: https://discord.gg/2XSw62p9Fj
- Macrocosmos Discord: https://discord.gg/vdyz4JZ9Ww

### Academic/Technical Papers
- Dynamic TAO White Paper: https://drive.google.com/file/d/1vkuxOFPJyUyoY6dQzfIWwZm2_XL3AEOx/view
- Yuma Consensus documentation in Subtensor repo

---

## 10. Key Takeaways for New Subnet Proposals

1. **Start with Objective Ground Truth:** If you can't measure it objectively, it won't work at scale

2. **Design for Evolution:** Your first mechanism will have exploits; plan to iterate

3. **Protect Validators:** Make validation safe, cheap, and profitable

4. **Prevent Stagnation:** Static winners kill subnets; build in continuous competition

5. **Use Correct Terminology:** Community fluency signals credibility

6. **Think Economically:** Dynamic TAO means subnets compete for stakers; what's your value prop?

7. **Document Everything:** Good documentation is the difference between 10 miners and 1000

8. **Study Precedents:** Don't reinvent the wheel; adapt mechanisms from successful subnets

9. **Plan for Anti-Gaming:** Assume miners will exploit everything; design accordingly

10. **Build in Public:** Open source your subnet code; transparency builds trust

---

## Conclusion

Successful Bittensor subnets share a common DNA: objective evaluation, continuous competition, robust anti-gaming, clear value propositions, and proper use of Bittensor-native mechanisms like Yuma Consensus and Commit-Reveal. The evolution from SN1's original text prompting to SN8's trading network shows the ecosystem's maturation toward measurable, economically valuable outputs.

For new subnet creators, the path to success involves studying these precedents, using correct terminology, designing for continuous evolution, and always prioritizing objective ground truth over subjective judgment.

---

*Document compiled from official Bittensor documentation, subnet GitHub repositories, and community resources.*
