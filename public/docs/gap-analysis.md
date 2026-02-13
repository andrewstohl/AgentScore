# AgentScore Gap Analysis
## Bittensor Subnet Ideathon — February 2026

**Objective:** Identify what stands between the current proposal and WINNING (not placing) the Ideathon.

**Context:** 410+ registered teams. 7 selected for Round II. Prize: up to 1,000 TAO (~$260K) + Bitstarter Accelerator. Judges include Jacob Steeves and Etienne from Opentensor Foundation.

---

## EXECUTIVE SUMMARY: THE VERDICT

The current proposal is **competent but generic**. It describes a solid subnet idea that could work. What it does NOT do is demonstrate the deep Bittensor-native expertise and novel mechanism design that would make judges say "this team fundamentally understands subnet incentive mechanics at a level few others do."

**Bottom line:** The proposal reads like a business plan for a Web2.5 startup that happens to use Bittensor, rather than a native Bittensor mechanism design innovation. That's fixable, but requires significant changes.

---

## CRITERION 1: NOVELTY/ORIGINALITY OF INCENTIVE/SCORING DESIGN

### What We Currently Say

- Miners submit "Agent Trust Scorecards" (ATS) with probabilistic predictions about service quality
- Validators verify via blind challenges using commit-reveal
- Scoring: weighted accuracy across quality dimensions (data accuracy 30%, fraud detection 25%, etc.)
- Novelty bonus for adversarial conditions; consistency penalty for stale copying
- Anti-gaming: cosine similarity clustering for Sybil detection

### What a WINNING Submission Would Say

- **Explicit innovation in Yuma Consensus application.** Not just "we use Yuma Consensus" but "here's how we modify YC3's bond accumulation dynamics to reward early prediction accuracy" or "we implement a custom validator weight curve that decays for stale measurements."
- **Novel cryptographic commitment scheme.** Commit-reveal is standard. A winning proposal describes something like: "We use a two-phase commit where miners commit to model parameters, not just predictions, enabling verifiable model uniqueness without revealing proprietary strategies."
- **Cross-miner learning incentives.** How do we incentivize miners to share insights without enabling collusion? How do we reward miners who improve the *collective* prediction accuracy, not just their own?
- **Temporal scoring innovations.** The current proposal treats each epoch independently. A winning design would describe how prediction accuracy compounds or decays over time, with mechanisms like Taoshi's carry fees or drawdown penalties adapted for service quality prediction.

### Specific Improvements Needed

1. **Replace generic "weighted accuracy" with a mathematically novel scoring function.** The current proposal uses:
   ```
   score(m, e) = Σ_i [ w_i × (1 - |predicted_i - observed_i| / range_i) ]
   ```
   This is linear regression with weights. A winning proposal would use something like:
   ```
   S(m) = Σ_e [ ln(1 + accuracy(m,e)) × confidence(m,e) × recency_factor(epoch - last_tested) ]
   ```
   with explicit justification for the log transform (diminishing returns), confidence weighting (uncertainty quantification), and recency decay (freshness matters).

2. **Add a novel validator coordination mechanism.** Current proposal says "multiple validators test overlapping endpoints." Winning proposal says: "We implement a Byzantine-fault-tolerant consensus where validators stake on measurement outcomes, with slashing for >2σ deviations. Validators who consistently agree with the eventual consensus earn bond multipliers."

3. **Describe a unique bond/weight accumulation pattern.** How do miner bonds evolve? What about the Liquid Alpha integration? How do we use YC3's per-bond EMA scaling to our advantage?

### What Would Make Judges Say "This Team Gets It"

A detailed mathematical appendix showing:
- Exact emission calculation under YC3 with our custom modifications
- Bond accumulation curves for miners with different prediction strategies
- How our scoring function creates the desired Nash equilibrium
- Simulation results showing miner convergence behavior

**Example:** "Under YC3 with our modified alpha values, a miner with 90% accuracy accumulates bonds 3.2x faster than a miner with 80% accuracy, creating exponential separation that ensures quality prediction dominates the subnet within 14 epochs."

---

## CRITERION 2: CLARITY/SOUNDNESS OF MECHANISM LOGIC

### What We Currently Say

- 72-minute epochs (standard)
- Miners probe continuously, submit ATS each epoch
- Validators execute commit-reveal with real x402 micro-transactions
- Scoring engine compares predictions vs. ground truth

### What a WINNING Submission Would Say

- **Precise state machine with formal transitions.** Define exactly when commitments are made, when reveals happen, when disputes can be raised, when emissions are calculated. Use formal notation (State_A → Action → State_B).
- **Explicit handling of all edge cases.** What happens when an endpoint goes offline mid-epoch? What if a validator's test transaction fails due to network issues, not endpoint quality? What if x402 protocol changes?
- **Gas cost analysis.** Validator operations cost money. A winning proposal quantifies: "Each validator spends ~$0.05/epoch in Base gas for commits + reveals. At 20 validators, this is $1/epoch or ~$10/day, which is covered by 0.3% of subnet emissions at 0.5% network share."
- **Latency analysis.** How quickly can miners respond to degradation? What's the detection-to-score-update latency? A winning proposal says: "Endpoint degradation is detectable within 3 epochs (3.6 hours) with 95% confidence, and scores update immediately upon validator reveal."

### Specific Improvements Needed

1. **Define the exact commit-reveal specification.** Current proposal says "hash(endpoint_id, nonce, test_params)." This is vague. Specify:
   - Commit format: `keccak256(endpoint_id || nonce || validator_pubkey || epoch_number)`
   - Reveal format: `endpoint_id || nonce || test_params_json || validator_signature`
   - On-chain storage: which chain (Base?), which contract, gas optimization strategy
   - Dispute window: how long after reveal can challenges be raised?

2. **Quantify validator economics.** How much TAO must validators stake? What are their expected returns? What's the slashing condition? Current proposal mentions "flagging" validators with >2σ deviations. A winning proposal says: "Validators staking <1,000 TAO receive reduced weight. Validators with >3 consecutive epochs of >2σ deviation lose 10% of stake and are temporarily removed from consensus."

3. **Specify miner hardware/software requirements.** Current proposal mentions "commodity GPU inference." A winning proposal specifies:
   - Minimum VRAM: 8GB for XGBoost, 16GB for deep learning models
   - Storage: 100GB for historical quality data
   - Network: <50ms latency to x402 endpoints
   - Expected compute cost: $0.50-2.00/epoch

4. **Address the cold start problem explicitly.** What happens in epoch 1 when no historical data exists? A winning proposal describes a bootstrap mechanism: "First 10 epochs use a simplified scoring function with higher tolerance. Miners who join early receive bonus multipliers that decay over time."

### What Would Make Judges Say "This Team Gets It"

A sequence diagram showing every on-chain and off-chain interaction:
```
T+0:   Validator commits hash to Base (tx: 0xabc...)
T+60:  Validator executes x402 test, stores result locally
T+72:  Epoch ends, miner submissions close
T+72:  Validator reveals nonce and measurements (tx: 0xdef...)
T+72:  Scoring contract calculates scores
T+73:  Yuma Consensus processes new weights
T+74:  Emissions distributed
```

With explicit gas costs, failure modes, and recovery procedures for each step.

---

## CRITERION 3: INSIGHTFULNESS AND IMPACT ON FUTURE SUBNET DESIGN

### What We Currently Say

- "Reusable pattern for real-world verification"
- "Service quality intelligence is a primitive"
- "Broadens viable subnet designs beyond neural network training"

### What a WINNING Submission Would Say

- **Explicit mechanism primitives that other subnets can adopt.** Not just "this pattern applies elsewhere" but "we have extracted three reusable primitives: (1) prediction-verification bonds, (2) adversarial test injection, (3) cosine-similarity clustering. Here's how other subnets can import them."
- **Formal analysis of incentive compatibility.** A winning proposal proves mathematically that the mechanism is incentive-compatible: "Theorem: Under assumptions X, Y, Z, the dominant strategy for rational miners is to maximize genuine prediction accuracy. Proof in Appendix A."
- **Contribution to Bittensor governance/tokenomics.** How does this subnet's success improve dTAO dynamics? A winning proposal says: "By demonstrating that non-ML subnets can capture significant emission share, we expand the design space for future subnet creators, potentially increasing total network utility and TAO value."
- **Specific integration points with existing subnets.** Not just "other subnets can use this" but "Chutes SN64 can verify inference quality using AgentScore validators as a secondary oracle, creating a composable quality layer without protocol changes."

### Specific Improvements Needed

1. **Create a "Subnet Design Pattern" section.** Explicitly extract reusable components:
   - **Pattern: Predict-Then-Verify** — Miners predict, validators verify with real transactions. Applicable to oracle subnets, insurance subnets, supply chain subnets.
   - **Pattern: Independence-Weighted Emissions** — Cosine similarity clustering. Applicable to any subnet where model diversity matters.
   - **Pattern: Commit-Reveal Validation** — Blind testing. Applicable to any subnet where miners might game known test conditions.

2. **Propose specific Bittensor protocol improvements.** Bold but grounded suggestions:
   - "Our experience suggests Bittensor should add native support for time-delayed reveal transactions, reducing validator gas costs by ~40%."
   - "We propose a new validator metadata standard for documenting measurement methodology, enabling cross-subnet validator reputation."

3. **Demonstrate ecosystem composability.** Show specific code for how other subnets integrate:
   ```python
   # Chutes SN64 integration example
   from agentscore import verify_endpoint
   
   def validate_inference(endpoint_id, output):
       ats_score = verify_endpoint(endpoint_id)
       if ats_score < 0.8:
           return False  # Reject low-quality endpoints
       return validate_output(output)
   ```

4. **Publish a "Lessons Learned" for subnet creators.** Even though we haven't launched, describe what we've learned from mechanism design simulations: "Lesson 1: Always include a novelty bonus. Without it, miners converge to mean predictions within 50 epochs. Lesson 2: Validator stake should scale with measurement cost..."

### What Would Make Judges Say "This Team Gets It"

A concluding section titled "Implications for Bittensor Architecture" that says:

"AgentScore demonstrates that subnets can verifiably consume and produce real-world economic signals. This has three implications for future subnet design:

1. **Subnet Interoperability Protocol:** We propose a standard for subnets to publish validated real-world measurements, enabling a composable oracle layer without centralizing trust.

2. **Validator Specialization:** Our design shows that validators benefit from domain-specific measurement capabilities. Future Bittensor versions might support validator roles with differentiated reward curves.

3. **Emission Allocation Efficiency:** By proving that non-ML intelligence tasks can generate measurable utility, we expand the addressable market for subnet creators, potentially increasing aggregate network value."

---

## TOP 3 WEAKNESSES THAT COULD SINK US

### 1. ZERO MENTION OF DTAO MECHANICS

**The Problem:** The proposal mentions dTAO exactly once in passing. This is disqualifying. dTAO is the core economic engine of Bittensor. A proposal that doesn't explicitly describe how it will generate positive net TAO flows (staking > unstaking) fundamentally misunderstands the game.

**Why It Matters:** Under Taoflow, subnets with negative net flows get ZERO emissions. The entire mechanism design is moot if we can't attract stakers.

**Fix Required:** Add a full section on dTAO strategy:
- Target alpha token price trajectory
- Planned TAO buyback schedule from revenue
- Staker incentives (revenue share, early access)
- Why stakers should choose us over Chutes, Taoshi, etc.

### 2. HAND-WAVY ANTI-GAMING WITHOUT PROOF

**The Problem:** The proposal lists several attacks and mitigations, but none are backed by simulation, formal analysis, or reference to proven mechanisms from other subnets.

**Specific Gaps:**
- "Cosine similarity clustering" — How exactly? What's the threshold? What's the computational cost?
- "Consistency penalty" — What's the formula? How do you distinguish copying from genuine convergence on truth?
- "Novelty bonus" — How is "novelty" quantified? Who decides what's adversarial?

**Why It Matters:** Judges have seen dozens of subnets fail to gaming. Claims without proof are dismissed. Taoshi and Chutes survived because they invested heavily in anti-gaming engineering and published their methods.

**Fix Required:** For each attack, provide:
- Formal description of the attack vector
- Mathematical specification of the mitigation
- Simulation results showing attack suppression
- Comparison to how other subnets handle similar attacks

### 3. BUSINESS PLAN HEAVY, MECHANISM DESIGN LIGHT

**The Problem:** The proposal spends 60% of its words on market opportunity, revenue models, and go-to-market strategy. These matter for execution but are IRRELEVANT for the Ideathon. The competition judges mechanism design, not business planning.

**Evidence:**
- 8 pages on business/revenue vs. 4 pages on mechanism
- Extensive discussion of "transaction verification fees" which doesn't exist in Phase 1
- Multiple pages on MCP servers, LangChain plugins — all Phase 2+ features

**Why It Matters:** Judges scanning for technical depth will see marketing fluff and assume there's no substance underneath.

**Fix Required:** Rebalance to 70% mechanism design, 30% business context. Cut all Phase 2+ content to a brief "Future Work" section.

---

## TOP 3 STRENGTHS TO DOUBLE DOWN ON

### 1. REAL-WORLD GROUND TRUTH VERIFICATION

**Why It's Strong:** Most subnets struggle with subjective or easily-gamed ground truth. AgentScore's use of actual x402 transactions creates objective, verifiable, economically-meaningful measurements.

**How to Amplify:**
- Emphasize the "skin in the game" aspect — validators spend real money, not just compute
- Contrast with subnets that use synthetic tests or human evaluators
- Quantify the cost: "Each validator measurement costs $0.01 in real economic value, making Sybil attacks 1000x more expensive than compute-only verification"

### 2. COMPOSABILITY WITH EXISTING BITTENSOR ECOSYSTEM

**Why It's Strong:** The "rate other subnets" angle is genuinely novel and creates natural viral loops. Most subnets are isolated; this one creates value for the whole ecosystem.

**How to Amplify:**
- List specific subnets that would benefit from ratings (Chutes, Synth, Data Universe)
- Show how AgentScore improves their security/quality
- Propose a "Bittensor Quality Council" or similar collective governance

### 3. TIMING AND MARKET WINDOW

**Why It's Strong:** x402 just launched. Agentic commerce is emerging. Being first to build quality infrastructure is a legitimate strategic advantage.

**How to Amplify:**
- Replace vague "12-18 month window" with specific protocol milestones
- Show that we understand x402 better than competitors (detailed protocol analysis)
- Demonstrate existing relationships (if any) with x402 ecosystem participants

---

## WHAT WE SHOULD CUT (IMMEDIATELY)

### 1. CUT: Entire "AI Agent Army" Section

**Why:** This makes us look like we don't understand what we're building. "AI coding agents for boilerplate" signals that the founder doesn't write code and doesn't understand the technical complexity of Bittensor integration. It's a red flag for technical judges.

**Replace with:** Actual technical team credentials or explicit acknowledgement that we're recruiting senior Bittensor devs.

### 2. CUT: All Revenue Projections and "Transaction Verification Fees"

**Why:** These are Phase 2+ features that don't exist yet. Including them signals that we're more interested in the business fantasy than the technical reality. The proxy model is unproven and adds complexity to a submission that should focus on the core mechanism.

**Keep:** Brief mention in "Future Work" section only.

### 3. CUT: "Dev Candidate in Pipeline" and Solo Founder Discussion

**Why:** Announcing that you're solo and haven't hired yet signals execution risk. Judges want to see that the team can actually build this.

**Replace with:** Either (a) confirm a technical co-founder, or (b) acknowledge the gap and describe specific plan to close it (not "2-4 weeks to close" but "we have offers out to 3 candidates with Bittensor experience").

### 4. CUT: Phrases That Sound Like We Don't Understand Bittensor

**Remove these specific phrases:**
- "The hard work (continuous probing, model building...) is done by miners pursuing emissions. Our small team focuses on what cannot be crowdsourced..."
  - **Why wrong:** This fundamentally misunderstands the subnet owner role. The owner designs the incentive mechanism — that's the core value. Miners optimize for whatever the mechanism rewards, good or bad. If the mechanism is broken, miners will exploit it.

- "Bittensor's incentive mechanism solves this: miners fund their own data collection..."
  - **Why wrong:** Miners don't "fund" anything — they invest compute in pursuit of emission ROI. If the ROI is negative or the mechanism is exploitable, they leave or attack.

- "We operate a lean execution model leveraging AI agents for development acceleration"
  - **Why wrong:** See point 1. This screams "I can't code and don't understand distributed systems."

### 5. CUT: The Entire "Execution Risk" Section with "Mitigation: AI agent acceleration"

**Why:** Admitting execution risk is good. Claiming AI agents mitigate it is disqualifying.

---

## SPECIFIC TECHNICAL DETAILS WE MUST ADD

### 1. YUMA CONSENSUS MECHANICS

**Current state:** "Miner rewards follow standard Yuma Consensus"

**Required addition:**
- Exact specification of how we use YC3 vs. earlier versions
- Our alpha (bond accumulation rate) values and justification
- How we handle Liquid Alpha integration
- Validator weight calculation with our custom modifications
- Emission split specifics (exact percentages to miners/validators/owner)

**Example addition:**
```
We implement YC3 with the following parameters:
- Bond alpha: 0.1 for established miners (>100 epochs), 0.5 for new miners
- Validator weight: stake-weighted with 18% TAO component
- Owner emission: 18% of total subnet emissions
- Miner emission: 41%, distributed according to S(m) scores
- Validator emission: 41%, distributed according to stake × consistency_score
```

### 2. EMISSION SCHEDULES AND BOOTSTRAPPING

**Required addition:**
- How emissions are distributed during the first 7 epochs (warmup period)
- Bootstrapping incentives for early miners
- How we handle the transition from bootstrap to steady-state

### 3. WEIGHT-SETTING SPECIFICATION

**Required addition:**
- Exact formula for how validators set weights on miners
- How often weights are updated (every block? every epoch?)
- Validator incentive alignment (why should validators evaluate accurately?)
- Penalties for lazy or malicious validators

**Example:**
```python
def validator_weight_update(validator, miner, measurement):
    # Validator stake-weighted by consistency with eventual consensus
    predicted_score = validator.predict_score(miner)
    actual_score = measurement.ground_truth
    error = abs(predicted_score - actual_score)
    
    # Update bond with EMA
    validator.bonds[miner] = (1 - alpha) * validator.bonds[miner] + alpha * (1 - error)
    
    # Consistency score affects validator's own emission share
    validator.consistency_score = ema(validator.consistency_score, 1 - error)
```

### 4. VTRUST (VALIDATOR TRUST) MECHANICS

**Required addition:**
- How we calculate and use validator trust scores
- What happens when validator trust falls below threshold
- How new validators gain trust over time

### 5. REGISTRATION AND BURN MECHANICS

**Required addition:**
- Miner registration cost and mechanism
- Validator registration requirements (minimum stake?)
- How we handle subnet slot competition (we're targeting registration post-Ideathon)

### 6. SPECIFIC SMART CONTRACT ARCHITECTURE

**Required addition:**
- Which contracts exist (commit-reveal contract, scoring contract, etc.)
- What chain they're on (Base? Bittensor native?)
- Key functions and gas costs
- Upgrade mechanisms

### 7. DETAILED ANTI-GAMING MATHEMATICS

**Required addition for each attack:**

**Sybil Attack:**
- Threshold for clustering: cosine similarity > 0.95
- Cluster size detection algorithm
- Emission redistribution formula: `emission_cluster = base_emission / sqrt(cluster_size)`

**Copying Attack:**
- Consistency penalty formula: `penalty = 1 - exp(-λ × correlation_with_previous_epoch)`
- λ parameter value and justification
- Detection window (how many epochs back do we check?)

**Validator-Miner Collusion:**
- Multi-validator overlap requirement: minimum 3 validators per endpoint
- Slashing condition: `deviation > 2σ` for 3+ consecutive epochs
- Slashing amount: 10% of stake

**Stale Prediction:**
- Novelty quantification: KL-divergence from historical distribution
- Bonus formula: `novelty_bonus = 1 + 0.2 × (1 - exp(-novelty_score))`

### 8. GROUND TRUTH SPECIFICATION

**Required addition:**
- Exact JSON schema for ground truth measurements
- How validators handle measurement failures (endpoint down, network error, etc.)
- Quality control: what percentage of measurements are spot-checked?
- Data retention: how long are measurements stored?

**Example:**
```json
{
  "measurement_id": "uuid",
  "epoch": 14832,
  "validator": "0xabc...",
  "endpoint_id": "0x7f3a...",
  "timestamp": 1707734400,
  "ground_truth": {
    "latency_ms": 47.2,
    "data_accuracy": 0.982,
    "success": true
  },
  "proof": {
    "tx_hash": "0xdef...",
    "block_number": 12345678,
    "signature": "0xghi..."
  }
}
```

### 9. LIFECYCLE AND STATE MANAGEMENT

**Required addition:**
- Full state machine diagram
- What happens during network partitions
- Recovery procedures for validator failures
- How the subnet handles Bittensor chain upgrades

### 10. SIMULATION RESULTS

**Required addition:**
- Agent-based simulation of miner behavior under the mechanism
- Convergence analysis (how many epochs to reach steady-state?)
- Gaming attack simulations and outcomes
- Comparison to baseline mechanisms

---

## CONCLUSION: THE PATH TO WINNING

To win this Ideathon, we need to transform the proposal from a **business plan** into a **mechanism design specification**. The judges are not venture capitalists evaluating a startup pitch — they are protocol designers evaluating technical innovation.

**The work required:**

1. **Remove 50% of the current content** (business fluff, future phases, AI agent nonsense)
2. **Add mathematical specifications** for every component of the mechanism
3. **Demonstrate deep Yuma Consensus knowledge** with specific parameter choices
4. **Prove anti-gaming claims** with simulations or formal analysis
5. **Show ecosystem insight** with reusable patterns and protocol contributions

**If we do this:** The proposal becomes a reference implementation for predictive verification subnets, potentially winning the discretionary 1,000 TAO investment.

**If we don't:** We might place in the top 7 (the idea is good), but we won't win. The judges will select teams that demonstrate deeper technical mastery.

**Time estimate:** This is 2-3 days of focused work for someone with strong technical writing skills and Bittensor expertise. The foundation is there — it just needs to be rebuilt with the right emphasis.

---

## APPENDIX: RED FLAGS FOR JUDGES (SELF-AUDIT CHECKLIST)

Before submitting, verify NONE of these are in the proposal:

- [ ] Any mention of "AI agents doing the work" or "AI coding assistants"
- [ ] Vague phrases like "standard Yuma Consensus" without specifics
- [ ] Revenue projections as a substitute for mechanism detail
- [ ] Claims about future phases without Phase 1 fully specified
- [ ] Hand-wavy anti-gaming without mathematical backing
- [ ] Zero mention of dTAO or staker incentives
- [ ] No specification of validator economics or slashing
- [ ] Claims that "miners fund their own data collection"
- [ ] No formal specification of the commit-reveal mechanism
- [ ] No simulation or proof of mechanism soundness

If any checkbox is unchecked, fix before submitting.

---

*Gap analysis completed: February 13, 2026*
*Recommendation: Major revision required. Current draft would likely place but not win.*
