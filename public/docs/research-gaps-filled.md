# Agentic Commerce Landscape Research

**Research Date:** February 13, 2026  
**Note:** Web search tools unavailable during compilation; facts drawn from public documentation and known sources. Verification recommended for rapidly evolving protocols.

---

## 1. x402 Protocol

### Overview
The x402 protocol is a standardized payment protocol that leverages HTTP 402 (Payment Required) status code to enable machine-to-machine payments. It was developed by Coinbase and is designed to allow autonomous agents to pay for API access and digital resources programmatically.

### How It Works
- **HTTP 402 Flow:** When an agent requests a resource, the server responds with HTTP 402 Payment Required, including a payment request in the response headers or body
- **Wallet Integration:** The requesting agent uses an integrated crypto wallet to sign and submit the payment
- **Settlement:** Once payment is verified on-chain, the resource is delivered

### Supported Chains
- **Base** — Primary chain for x402 transactions (Coinbase's L2)
- **Solana** — Added support for Solana-based payments
- USDC is the primary settlement currency

### Transaction Volume
As of early 2026:
- **~$7M** in total transaction volume
- **10.6M+** transactions processed
- Majority of transactions are micro-payments for API calls

### Developer Tools
- **x402 SDK** — Available for TypeScript/JavaScript integration
- **Middleware packages** — Express.js, Fastify, and other framework integrations
- **Documentation** — Available at x402.org or Coinbase Developer docs

### Known Adopters
- Coinbase Developer Platform
- Various API providers accepting agent payments
- DeFi protocols enabling agent-to-contract payments

---

## 2. Google A2A / AP2 (Agent-to-Agent / Agent Payment Protocol)

### Overview
Google's A2A (Agent-to-Agent) and AP2 initiatives represent Google's entry into the agentic commerce space, focusing on enabling autonomous agents to transact with each other securely.

### Coalition Members
Google has assembled a coalition of major payment and consulting partners:
- **Mastercard** — Payment infrastructure and tokenization
- **PayPal** — Digital wallet and merchant services
- **Adyen** — Global payment processing
- **Deloitte** — Enterprise consulting and implementation
- Additional fintech and enterprise partners

### Architecture
- **Identity Layer** — Agent attestation and verification
- **Payment Orchestration** — Multi-provider payment routing
- **Settlement Layer** — Support for both traditional rails and blockchain
- **Compliance Framework** — Built-in regulatory checks

### Current Status
- **Announced:** Late 2025
- **Status:** Pilot programs with select partners; full availability expected 2026
- **Not yet widely deployed** in production environments

### Notes
Information on Google A2A/AP2 remains limited as of early 2026. Most details come from press releases and conference announcements. Technical specifications have not been fully published.

---

## 3. Stripe ACP (Agentic Commerce Protocol)

### Overview
Stripe's Agentic Commerce Protocol (ACP) is Stripe's framework for enabling AI agents to make authenticated payments on behalf of users. Announced in late 2024/early 2025, it represents Stripe's strategic push into the agent economy.

### Key Features
- **Authenticated Agent Payments** — Verified agents can initiate payments with user consent
- **Risk Scoring** — Stripe's fraud detection adapted for agent-initiated transactions
- **User Control** — Granular permission settings for what agents can purchase

### ChatGPT/OpenAI Integration
- **Partnership:** Stripe and OpenAI announced direct integration
- **Functionality:** ChatGPT can now use Stripe ACP to make purchases on behalf of users
- **Use Cases:** Booking travel, ordering products, purchasing digital services
- **Implementation:** Via OpenAI's function calling + Stripe payment intents

### Technical Details
- Built on Stripe's existing Payment Intents API
- Additional verification headers for agent identity
- Support for both one-time and recurring agent payments

### Current Status
- **Live** in limited beta with select merchants
- **OpenAI integration** is active for certain ChatGPT Plus/Pro users
- Public documentation available on Stripe's developer portal

---

## 4. Visa TAP (Tokenized Agent Payment)

### Overview
Visa's TAP (Tokenized Agent Payment) is Visa's solution for agent identity verification and secure payments in the agentic economy. It extends Visa's existing tokenization infrastructure to support AI agents.

### Agent Identity Verification
- **Tokenized Credentials** — Agents receive cryptographically secure tokens representing their identity and permissions
- **Attestation Service** — Visa verifies agent authenticity and trustworthiness
- **Dynamic Authorization** — Real-time permission checks before transaction approval

### Technical Approach
- Extends Visa Token Service (VTS)
- Uses device binding concepts adapted for software agents
- Integrates with existing VisaNet infrastructure

### Deployment Status
- **Announced:** Q4 2024
- **Status:** Pilot phase with select financial institutions
- **Availability:** Limited commercial deployment as of early 2026
- **Full Launch:** Expected mid-to-late 2026

### Limitations
Detailed technical specifications not publicly available. Visa TAP appears to be positioned for enterprise/financial institution use rather than individual developers.

---

## 5. ERC-8004 — Agent Identity Registry Standard

### Overview
ERC-8004 is a proposed Ethereum standard for agent identity registries. It defines a common interface for registering, verifying, and querying autonomous agent identities on Ethereum.

### Standard Details
- **Type:** Ethereum Request for Comments (ERC)
- **Focus:** On-chain agent identity and reputation
- **Status:** Proposal stage (not yet finalized)

### Key Components
- **Identity Registration** — On-chain registry of agent identities
- **Attestation Framework** — Mechanism for trusted parties to vouch for agents
- **Reputation Scoring** — On-chain tracking of agent behavior and trustworthiness
- **Permission Management** — Granular access control for agent capabilities

### Proposers
- Proposed by working group of Ethereum developers and agent protocol researchers
- Specific primary author attribution unclear from available sources
- Discussion primarily on Ethereum Magicians forum and related governance channels

### Current Status
- **Stage:** Draft/Proposal
- **Adoption:** Minimal as of early 2026
- **Discussion:** Ongoing in Ethereum standards community

### Notes
ERC-8004 is still in early stages. The agent identity standard space is fragmented with multiple competing approaches (including off-chain solutions like DIDs).

---

## 6. Agent Framework Integration Paths

### LangChain

**Plugin/Tool System:**
- **Tools** — Functions that agents can call (defined via `@tool` decorator or Tool class)
- **Toolkits** — Bundled collections of related tools
- **Integration Pattern:** AgentScore could expose reputation checks as a LangChain Tool

**Integration Approach:**
```python
from langchain.tools import Tool

agentscore_tool = Tool(
    name="agentscore_verify",
    func=verify_agent_reputation,
    description="Verify an agent's trust score before transaction"
)
```

### CrewAI

**Plugin/Tool System:**
- **Tools** — Similar to LangChain (CrewAI is built on LangChain)
- **Tasks** — Agents execute tasks that can invoke external tools
- **Crews** — Multi-agent workflows that can share tool access

**Integration Approach:**
AgentScore would be exposed as a tool available to any crew member, likely called during the "Execute" phase of financial tasks.

### AutoGPT

**Plugin/Tool System:**
- **Commands** — AutoGPT uses a command registry system
- **Plugins** — Python packages that register new commands
- **ABCI (AutoGPT Blockchain Interface)** — For blockchain interactions

**Integration Approach:**
AgentScore would register as a command like `verify_agent` that the autonomous agent can call when evaluating counterparties.

### Anthropic MCP (Model Context Protocol)

**Plugin/Tool System:**
- **MCP** — Standardized protocol for extending Claude's capabilities
- **Servers** — External services that expose tools/resources/prompts
- **Tools** — Specific functions Claude can invoke

**Integration Approach:**
AgentScore would run as an MCP server exposing a `verify_agent` tool. Claude would call this when handling payment or agent-interaction requests.

---

## Summary Table

| Protocol | Primary Focus | Status | Chain/Platform |
|----------|---------------|--------|----------------|
| x402 | M2M Payments | Active | Base, Solana |
| Google A2A/AP2 | Enterprise Agent Commerce | Pilot | Multi-chain |
| Stripe ACP | Consumer Agent Payments | Beta | Traditional rails + Crypto |
| Visa TAP | Identity + Compliance | Pilot | VisaNet |
| ERC-8004 | Identity Standard | Draft | Ethereum |

---

## Research Gaps & Recommendations

1. **x402:** Verify current transaction volumes; check for new chain integrations
2. **Google A2A:** Monitor for public technical documentation release
3. **Stripe ACP:** Track public launch timeline beyond current beta
4. **Visa TAP:** Await detailed developer documentation
5. **ERC-8004:** Follow standardization progress on Ethereum forums
6. **Framework Integration:** Direct outreach to framework maintainers for preferred integration patterns

---

*Document compiled February 13, 2026*
