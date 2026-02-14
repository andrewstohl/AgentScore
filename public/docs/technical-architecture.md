# AgentScore: Technical Architecture and Implementation Plan
## A Non-Technical Founder's Guide to Building the Subnet

---

## Executive Summary

This document explains exactly what needs to be built to launch the AgentScore Bittensor subnet.

**Bottom Line:**
- 4-6 month project from zero to mainnet
- 2-3 senior developers needed
- $150K-250K in development costs
- $2K-5K/month ongoing infrastructure
- Minimum viable testnet possible in 8-10 weeks with 2 developers

---

## 1. Architecture Overview

### What We're Building

Think of AgentScore as a quality control factory with four layers:

```
LAYER 1: TARGET ENDPOINTS (the things being rated)
  Price feeds, RPC nodes, x402 APIs, oracle services
          ↕
LAYER 2: MINER NETWORK (the prediction engines)
  Hundreds of independent computers running ML models
  They continuously probe endpoints and predict quality
          ↕
LAYER 3: VALIDATOR NETWORK (the auditors)
  ~20 trusted nodes that verify miner predictions
  They spend real money testing endpoints via x402
          ↕
LAYER 4: BITTENSOR CHAIN (the payment system)
  Yuma Consensus calculates who gets paid based on accuracy
  TAO emissions flow automatically every 72 minutes
          ↕
LAYER 5: PUBLIC SERVICES (the product)
  Ratings API, public leaderboard, dashboard
```

### What Runs Where

**On the Bittensor blockchain (permanent record):**
- Subnet registration (our ID on the network)
- Validator weight submissions (who scored what)
- Emission distribution (automatic payment)
- Miner/validator registration

**On validator servers (we run at least one):**
- Commit-reveal protocol (blind testing)
- x402 test transactions (real money)
- Scoring engine (comparing predictions vs reality)
- Ground truth database

**On miner servers (others run these):**
- Endpoint probing (continuous monitoring)
- ML models (XGBoost predictions)
- ATS submission (sending predictions to validators)

**On our cloud infrastructure:**
- Public API server
- Leaderboard dashboard
- Database (historical scores)

---

## 2. Components to Build

### 2.1 Subnet Registration and Configuration

**What it is:** Our "license" on the Bittensor network. Sets the rules for how our subnet operates.

- **Complexity:** Moderate
- **Dev time:** 2-3 weeks
- **Skills:** Bittensor SDK knowledge, Python
- **Cost:** Registration requires burning TAO (~$500-2,000 depending on demand)

Key settings: epoch timing (72 min), commit-reveal windows, miner immunity period, minimum validator stake.

### 2.2 Miner Node Software

**What it is:** The software miners download and run to compete in our subnet. They probe endpoints, build prediction models, and submit quality forecasts.

**Modules:**
- Probing harness (HTTP client that tests endpoints continuously)
- Feature pipeline (converts raw data into model inputs)
- XGBoost model (predicts next-epoch quality metrics)
- ATS submission (packages and sends predictions)
- Wallet integration (hotkey management, receives TAO)

- **Complexity:** Complex
- **Dev time:** 8-10 weeks
- **Skills:** Python, ML (XGBoost level, not deep learning), async programming, Bittensor SDK
- **Miner hardware:** 4 CPU cores, 8GB RAM, 50GB storage, $50-150/month cloud server

### 2.3 Validator Node Software

**What it is:** The auditor software. Validators test endpoints with real money, compare results to miner predictions, and report scores.

**Modules:**
- Commit-reveal manager (cryptographic blind testing protocol)
- x402 test executor (sends real micro-payments, measures results)
- Scoring engine (compares predictions to ground truth)
- Weight setter (submits scores to Bittensor chain)

- **Complexity:** Complex (handles real money)
- **Dev time:** 8-10 weeks
- **Skills:** Python, cryptography basics, web3/blockchain interaction, Bittensor SDK
- **Validator cost:** $0.02-0.25 per epoch in x402 test transactions + server costs

**Security critical:** Validators hold private keys controlling funds. Server compromise = stolen money.

### 2.4 Scoring Engine

**What it is:** The mathematical heart. Takes predictions and ground truth, outputs scores that determine miner payments.

**Components:**
- Per-dimension accuracy (how close was each prediction?)
- Confidence weighting (reward calibrated uncertainty)
- Novelty bonus (reward genuine new predictions)
- Stale penalty (punish copying last epoch's data)
- Sybil clustering (detect and penalize duplicate miners)

- **Complexity:** Moderate-Complex
- **Dev time:** 4-6 weeks
- **Skills:** Statistics, information theory, Python (NumPy/SciPy)
- **Critical:** Must be formally verified to create correct incentives

### 2.5 Public API Server

**What it is:** The commercial product. REST API that agents query before making purchases.

```
GET /v1/endpoints/{id}/scores    → quality scores
GET /v1/leaderboard              → ranked endpoints
POST /v1/query                   → paid query via x402
```

- **Complexity:** Moderate (standard web API + crypto payments)
- **Dev time:** 4-5 weeks
- **Skills:** Python (FastAPI) or Node.js, PostgreSQL, Redis

### 2.6 Public Leaderboard Dashboard

**What it is:** Web app showing real-time endpoint rankings. Our marketing surface.

- **Complexity:** Moderate
- **Dev time:** 4-5 weeks
- **Skills:** React/Next.js, charting libraries, WebSockets
- **Hosting:** Vercel (same as current site)

### 2.7 Data Storage

**What it is:** Database layer storing all measurements, predictions, scores.

- PostgreSQL (primary, with TimescaleDB for time-series)
- Redis (caching, real-time)
- S3/GCS (long-term archive)
- Estimated storage: ~50GB/month raw, ~5GB/month processed

---

## 3. Infrastructure Requirements

### Servers Needed

| Component | Count | Specs | Monthly Cost |
|-----------|-------|-------|-------------|
| Validator node | 1 | 8 CPU, 32GB RAM, 200GB SSD | $50-80 |
| API servers | 2 | 4 CPU, 16GB RAM, 100GB SSD | $60-100 |
| Database primary | 1 | 8 CPU, 32GB RAM, 1TB SSD | $80-150 |
| Database replica | 1 | 4 CPU, 16GB RAM, 1TB SSD | $50-80 |
| Cache (Redis) | 1 | 2 CPU, 8GB RAM | $20-40 |
| Monitoring | 1 | 2 CPU, 4GB RAM | $15-25 |
| **Total** | **7** | | **$275-475/month** |

**Recommended provider:** Hetzner (cheapest, reliable) or DigitalOcean (simpler). AWS if we need managed services later.

### Other Infrastructure

- **Domain:** agentscore.ai (already have agentscore.ai?)
- **SSL:** Let's Encrypt (free) or Cloudflare
- **CDN:** Cloudflare free tier
- **Monitoring:** Prometheus + Grafana (open source, free)

---

## 4. Security Considerations

### Key Management (Most Critical)

**Coldkey** (master key, controls all funds):
- NEVER on a server. Hardware wallet only (Ledger).
- Used only for registration and emergency recovery.
- Drew should control this personally.

**Validator hotkey** (daily operations):
- Lives on validator server, encrypted at rest.
- Controls x402 test wallet (keep balance low, $50-100 max).
- Rotate quarterly or if any suspicion of compromise.

**Miner hotkeys** (miners manage their own):
- We provide documentation on key security.
- Not our responsibility, but our reputation depends on it.

### Validator Security

- x402 test wallet: keep minimal balance, auto-refill from cold storage
- Firewall: only expose Bittensor P2P port and API port
- SSH: key-only auth, no password login
- Updates: automated security patches
- Monitoring: alert on unusual transaction patterns

### API Security

- Rate limiting (prevent abuse)
- API key authentication
- DDoS protection via Cloudflare
- Input validation on all endpoints
- No user data stored (privacy by design)

### Operational Security

- 2FA on all cloud provider accounts
- Separate accounts for production and development
- Principle of least privilege (developers get minimum access needed)
- Incident response plan documented

---

## 5. Development Roadmap

### Critical Path (What Must Happen in Order)

```
Week 1-2:   Subnet registration on testnet
            ↓
Week 3-6:   Scoring engine + miner node (parallel)
            ↓
Week 5-8:   Validator node (starts after scoring engine basics)
            ↓
Week 7-10:  Integration testing (miner + validator + scoring)
            ↓
Week 8-12:  API server + dashboard (can parallel with testing)
            ↓
Week 10-14: Testnet launch, bug fixes, parameter tuning
            ↓
Week 14-20: Mainnet preparation, security audit, launch
```

### Minimum Viable Testnet (Fastest Path)

To get something running on Bittensor testnet as fast as possible:

1. Register subnet on testnet (Week 1)
2. Build simplest possible miner: just submits static predictions (Week 2-3)
3. Build simplest possible validator: tests one endpoint, scores one dimension (Week 3-5)
4. Connect them: miner submits, validator scores, emissions flow (Week 5-6)
5. Iterate: add real ML, more endpoints, full scoring (Week 6-10)

**Minimum viable testnet: 6-8 weeks with 2 developers**

### What Can Be Parallelized

- Miner node and validator node (different developers)
- API server and dashboard (can start once scoring engine exists)
- Documentation and onboarding guides (non-developer task)

---

## 6. Where to Start (Literally)

### Step 1: Set Up Development Environment (Day 1)

```bash
# Install Python 3.10+
# Install Bittensor SDK
pip install bittensor

# Create project repo
git init agentscore-subnet
cd agentscore-subnet

# Create wallet for testnet
btcli wallet new_coldkey --wallet.name agentscore
btcli wallet new_hotkey --wallet.name agentscore --wallet.hotkey default

# Get testnet TAO from faucet
btcli wallet faucet --wallet.name agentscore --subtensor.network test
```

### Step 2: Register Subnet on Testnet (Day 2-3)

```bash
# Register a new subnet
btcli subnet create --wallet.name agentscore --subtensor.network test

# Note: This gives you a NetUID (like subnet 234)
# Configure hyperparameters via btcli subnet set commands
```

### Step 3: Build Skeleton Miner (Week 1-2)

Start with the Bittensor subnet template:
```bash
git clone https://github.com/opentensor/bittensor-subnet-template
```

Modify the template to:
- Accept incoming requests from validators
- Return a simple quality prediction (hardcoded at first)
- Register as a miner on your testnet subnet

### Step 4: Build Skeleton Validator (Week 2-3)

Using the same template:
- Query registered miners for predictions
- Compare against a hardcoded "ground truth"
- Set weights on the Bittensor chain
- Verify emissions are flowing

### Step 5: Add Real Logic (Week 3-6)

- Replace hardcoded predictions with actual endpoint probing
- Replace hardcoded ground truth with real x402 test transactions
- Implement the full scoring engine
- Add commit-reveal protocol

### Step 6: Test and Iterate (Week 6-10)

- Run multiple miners and validators on testnet
- Tune scoring parameters
- Test anti-gaming measures
- Fix bugs

### Repos to Create

1. `agentscore-subnet` — Core subnet code (miner, validator, scoring)
2. `agentscore-api` — Public API server
3. `agentscore-dashboard` — Leaderboard frontend
4. `agentscore-docs` — Documentation site

---

## 7. Team Requirements

### Minimum Team (2 people)

**Developer 1: Subnet Engineer (Critical Path)**
- Skills: Python, Bittensor SDK, distributed systems, basic ML
- Builds: Miner node, validator node, scoring engine
- Cost: $150-200/hr contractor or $180-220K salary
- This is the hardest role to fill. Bittensor experience is rare.

**Developer 2: Full-Stack/Infrastructure**
- Skills: Python/Node.js, PostgreSQL, React, DevOps
- Builds: API server, dashboard, data storage, deployment
- Cost: $100-150/hr contractor or $140-180K salary

### Nice to Have (adds speed, not critical path)

**Developer 3: ML/Data Engineer**
- Skills: XGBoost, time-series analysis, feature engineering
- Builds: Better reference miner, model evaluation, simulation
- Cost: $120-170/hr contractor

**Advisor: Bittensor Expert**
- Skills: Deep Yuma Consensus knowledge, subnet experience
- Role: Review mechanism design, parameter tuning
- Cost: $200-300/hr, 5-10 hrs/month

### Drew's Role

- Product direction and priorities
- Business development (validator recruitment, partnerships)
- Community engagement (Discord, X/Twitter)
- Fundraising (if needed for runway)
- Final approval on all user-facing design

---

## 8. Cost Estimates

### Development Costs (One-Time)

| Item | Low Estimate | High Estimate |
|------|-------------|---------------|
| Subnet engineer (16-20 weeks) | $96K | $160K |
| Full-stack dev (14-18 weeks) | $56K | $108K |
| ML/Data engineer (8 weeks, optional) | $38K | $54K |
| Bittensor advisor (20 hrs) | $4K | $6K |
| **Total (minimum)** | **$152K** | **$268K** |
| **Total (without ML eng)** | **$114K** | **$214K** |

### Infrastructure Costs (Monthly)

| Item | Monthly Cost |
|------|-------------|
| Cloud servers (7 instances) | $275-475 |
| Domain + SSL + CDN | $20 |
| Monitoring tools | $0 (open source) |
| x402 test transactions | $50-150 |
| Bittensor transaction fees | $10-30 |
| **Total** | **$355-675/month** |

### Bittensor Registration Costs (One-Time)

| Item | Cost |
|------|------|
| Subnet registration (mainnet) | 1-5 TAO ($300-1,500) |
| Validator registration | 0.1-1 TAO ($30-300) |
| Initial TAO stake (for emission share) | 100+ TAO ($30,000+) |
| **Total** | **$30,330-31,800** |

Note: The TAO stake is not spent, it is staked. You can unstake later (with cooldown period). But you need it to start earning emissions.

### Total Budget to Mainnet

| Category | Low | High |
|----------|-----|------|
| Development | $114K | $268K |
| Infrastructure (6 months) | $2.1K | $4.1K |
| Bittensor costs | $30.3K | $31.8K |
| **Grand Total** | **$146K** | **$304K** |

---

## 9. Risks and Unknowns

### Technical Risks

**Risk 1: x402 SDK instability**
x402 is new. The Python SDK may have bugs or breaking changes. Our entire validator verification depends on it.
- Mitigation: Build abstraction layer so we can swap x402 implementation
- Severity: High

**Risk 2: Bittensor SDK changes**
Bittensor is actively developing. SDK updates can break subnet code.
- Mitigation: Pin SDK versions, test upgrades in staging
- Severity: Medium

**Risk 3: Scoring function exploits**
Despite our anti-gaming measures, clever miners will find exploits we didn't anticipate. Every Bittensor subnet has dealt with this.
- Mitigation: Plan for rapid response. Monitor miner behavior daily. Budget time for scoring function updates.
- Severity: High (but expected and manageable)

**Risk 4: Validator economics don't work**
If validator costs (x402 transactions) exceed validator earnings (emissions), nobody will validate.
- Mitigation: Model economics before launch. Adjust test frequency and endpoint count to keep costs below emissions.
- Severity: Medium

### What We Don't Know Yet

1. **Exact x402 transaction costs at scale.** We have estimates ($0.001-0.01) but haven't tested thousands of transactions.
2. **Optimal scoring parameters.** The novelty bonus weight, stale penalty threshold, and clustering sensitivity all need tuning against real data.
3. **How many miners will join.** Our economics assume 50-200 miners. Fewer means less competition. More means more infrastructure.
4. **Base L2 reliability.** We're dependent on Base for x402 transactions. Extended Base outages would break validator verification.

### What Requires R&D vs Known Patterns

**Known patterns (low risk):**
- Bittensor subnet registration and configuration
- XGBoost model training on tabular data
- REST API development
- PostgreSQL database design
- React dashboard

**Requires R&D (higher risk):**
- Commit-reveal protocol with x402 (novel combination)
- Scoring function parameter tuning (needs simulation)
- Anti-gaming measure effectiveness (needs real-world testing)
- Cross-chain coordination (Bittensor + Base L2)

### Biggest Technical Challenges

1. **Getting the scoring function right.** If miners can game it, the subnet fails. This requires game theory analysis and ongoing iteration.
2. **Validator reliability.** Validators must execute x402 transactions every 72 minutes without fail. Network issues, wallet balance problems, or bugs cause missed epochs and bad data.
3. **Cold start.** Getting initial miners and validators before there's meaningful emission flow. Chicken-and-egg problem.

---

## Appendix: Glossary for Drew

| Term | Plain English |
|------|--------------|
| Subnet | A mini-network within Bittensor with its own rules and workers |
| Miner | A computer running our software to predict endpoint quality |
| Validator | A computer that checks if miner predictions are correct |
| Epoch | One round of predict-test-score, happens every 72 minutes |
| Emissions | New TAO tokens created each epoch and distributed to workers |
| Hotkey | A public identity key used for daily operations on the network |
| Coldkey | A master key stored securely offline, controls all funds |
| x402 | A payment protocol that lets computers pay each other via HTTP |
| Commit-reveal | A two-step process: first commit to a secret, then reveal it later |
| Yuma Consensus | The algorithm that decides how much each miner and validator gets paid |
| TAO | The cryptocurrency token of the Bittensor network |
| Base L2 | A fast, cheap Ethereum layer where x402 transactions happen |
| XGBoost | A popular, lightweight machine learning algorithm |
| ATS | Agent Trust Scorecard, our format for quality predictions |
| dTAO | Dynamic TAO, the system that determines how much emission share each subnet gets |

---

*Prepared for Drew Stohl, AgentScore Founder*
*February 14, 2026*
