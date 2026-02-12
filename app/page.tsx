import { ArrowDown, Shield, Zap, Network, ChevronRight, Activity, Server, Lock } from 'lucide-react'

export default function Home() {
  const scrollToSection = (id: string) => {
    if (typeof document !== 'undefined') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-as-dark to-as-navy text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-as-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-as-accent flex items-center justify-center">
                <Activity className="w-5 h-5 text-as-dark" />
              </div>
              <span className="font-bold text-xl tracking-tight">AgentScore</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#problem" className="text-sm text-as-muted hover:text-white transition-colors">Problem</a>
              <a href="#solution" className="text-sm text-as-muted hover:text-white transition-colors">Solution</a>
              <a href="#how-it-works" className="text-sm text-as-muted hover:text-white transition-colors">How It Works</a>
              <a href="#ecosystem" className="text-sm text-as-muted hover:text-white transition-colors">Ecosystem</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-as-accent/10 text-as-accent text-xs font-medium border border-as-accent/20">
                Bittensor Subnet
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-as-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-as-accent animate-pulse"></span>
            <span className="text-sm text-as-muted">The Decentralized Intelligence Layer</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            The Credit Rating Agency for the{' '}
            <span className="text-as-accent text-glow">AI Agent Economy</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-as-muted max-w-3xl mx-auto mb-10 leading-relaxed">
            Decentralized intelligence layer for agentic commerce. Real-time trust scores for every service endpoint.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => scrollToSection('problem')}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-as-accent text-as-dark font-semibold hover:bg-as-accent-hover transition-all glow-accent flex items-center justify-center gap-2"
            >
              Learn More
              <ArrowDown className="w-4 h-4" />
            </button>
            <a 
              href="#"
              onClick={(e) => { e.preventDefault(); alert('Whitepaper coming soon!'); }}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Read the Whitepaper
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-as-muted" />
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Problem</h2>
            <p className="text-as-muted max-w-2xl mx-auto">
              As AI agents autonomously transact at machine speed, a critical gap emerges in service verification.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual Stack */}
            <div className="relative">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <span className="font-medium">User Intent</span>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-400 font-bold">2</span>
                  </div>
                  <span className="font-medium">Orchestration Layer</span>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-bold">3</span>
                  </div>
                  <span className="font-medium">Payment Rails</span>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center relative z-10">
                    <span className="text-red-400 font-bold text-xl">?</span>
                  </div>
                  <span className="font-medium text-red-400 relative z-10">Service Intelligence ???</span>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <span className="text-orange-400 font-bold">4</span>
                  </div>
                  <span className="font-medium">Service Providers</span>
                </div>
              </div>
            </div>
            
            {/* Problem Description */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Agents Pay Blindly</h3>
                    <p className="text-as-muted text-sm leading-relaxed">
                      Without quality verification, AI agents cannot distinguish between reliable service providers and fraudulent ones, leading to wasted resources and failed transactions.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Fraud at Machine Speed</h3>
                    <p className="text-as-muted text-sm leading-relaxed">
                      Traditional verification methods are too slow for autonomous agents. Bad actors can exploit this latency to execute sophisticated fraud schemes before detection.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <Network className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">No Quality Verification</h3>
                    <p className="text-as-muted text-sm leading-relaxed">
                      The agentic economy lacks a standardized mechanism to evaluate and rate service providers, creating friction and uncertainty in every transaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section id="solution" className="py-24 relative bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Solution</h2>
            <p className="text-as-muted max-w-2xl mx-auto">
              AgentScore provides real-time trust scoring through a decentralized network of miners and validators.
            </p>
          </div>
          
          {/* Architecture Diagram */}
          <div className="mb-16">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Miners */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-as-accent/10 border border-as-accent/30 flex items-center justify-center mb-4">
                    <Server className="w-10 h-10 text-as-accent" />
                  </div>
                  <h3 className="font-semibold mb-1">Miners</h3>
                  <p className="text-xs text-as-muted">Build predictive models</p>
                </div>
                
                <div className="hidden lg:block w-16 h-px bg-gradient-to-r from-as-accent/50 to-blue-500/50"></div>
                
                {/* Validators */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4">
                    <Lock className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-1">Validators</h3>
                  <p className="text-xs text-as-muted">Blind verification</p>
                </div>
                
                <div className="hidden lg:block w-16 h-px bg-gradient-to-r from-blue-500/50 to-purple-500/50"></div>
                
                {/* Scoring Engine */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-4">
                    <Activity className="w-10 h-10 text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-1">Scoring Engine</h3>
                  <p className="text-xs text-as-muted">Aggregate & compute</p>
                </div>
                
                <div className="hidden lg:block w-16 h-px bg-gradient-to-r from-purple-500/50 to-green-500/50"></div>
                
                {/* API */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4">
                    <Network className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-1">API</h3>
                  <p className="text-xs text-as-muted">Real-time scores</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Predict-then-Measure Model */}
          <div className="max-w-3xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-as-accent/5 to-blue-500/5 border border-as-accent/20">
              <h3 className="text-xl font-bold mb-4 text-center">Predict-Then-Measure Model</h3>
              <p className="text-as-muted text-center leading-relaxed">
                Our hybrid approach combines predictive quality models with ground-truth verification. Miners compete to build the most accurate prediction models, while validators continuously verify actual service quality through blind sampling. This creates a robust, self-improving trust scoring system that adapts to evolving service landscapes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-as-muted max-w-2xl mx-auto">
              A three-phase approach to building trust in the agentic economy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Miners */}
            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-as-accent/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-as-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-as-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Server className="w-7 h-7 text-as-accent" />
                </div>
                <div className="text-as-accent text-sm font-semibold mb-2">Phase 1</div>
                <h3 className="text-xl font-bold mb-4">Miners</h3>
                <p className="text-as-muted leading-relaxed">
                  Specialized miners build predictive quality models by analyzing historical service data, reputation signals, and behavioral patterns to forecast service reliability.
                </p>
              </div>
            </div>
            
            {/* Card 2: Validators */}
            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Lock className="w-7 h-7 text-blue-400" />
                </div>
                <div className="text-blue-400 text-sm font-semibold mb-2">Phase 2</div>
                <h3 className="text-xl font-bold mb-4">Validators</h3>
                <p className="text-as-muted leading-relaxed">
                  Validators conduct blind verification by executing real transactions against service endpoints, measuring actual performance, reliability, and quality metrics.
                </p>
              </div>
            </div>
            
            {/* Card 3: Output */}
            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Activity className="w-7 h-7 text-purple-400" />
                </div>
                <div className="text-purple-400 text-sm font-semibold mb-2">Phase 3</div>
                <h3 className="text-xl font-bold mb-4">Output</h3>
                <p className="text-as-muted leading-relaxed">
                  Real-time Agent Trust Scores (ATS) are generated and made available via API, enabling agents to make informed decisions about service providers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Bittensor Section */}
      <section className="py-24 relative bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Bittensor</h2>
            <p className="text-as-muted max-w-2xl mx-auto">
              Built on the world's most advanced decentralized AI network.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-as-accent/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-as-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Structural Neutrality</h3>
              <p className="text-as-muted text-sm leading-relaxed">
                Bittensor's decentralized architecture ensures no single entity controls the scoring process, guaranteeing fair and unbiased trust assessments.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-as-accent/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-as-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Proven Incentive Mechanism</h3>
              <p className="text-as-muted text-sm leading-relaxed">
                Years of battle-tested token economics ensure miners and validators are properly incentivized to provide accurate, high-quality predictions.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-as-accent/10 flex items-center justify-center mx-auto mb-6">
                <Network className="w-8 h-8 text-as-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Ecosystem Composability</h3>
              <p className="text-as-muted text-sm leading-relaxed">
                Native integration with the Bittensor ecosystem enables seamless interaction with other AI subnets and leverages collective intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Partners Section */}
      <section id="ecosystem" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ecosystem Partners</h2>
            <p className="text-as-muted max-w-2xl mx-auto">
              Built for the emerging agent payment stack.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'x402', status: 'Payment Protocol' },
              { name: 'Coinbase', status: 'Exchange' },
              { name: 'Stripe', status: 'Payments' },
              { name: 'Google AP2', status: 'Agent Protocol' },
              { name: 'Visa TAP', status: 'Network' },
              { name: 'Bittensor', status: 'AI Network' },
            ].map((partner) => (
              <div 
                key={partner.name}
                className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center hover:border-as-accent/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-3 group-hover:bg-as-accent/20 transition-colors">
                  <span className="text-lg font-bold text-as-muted group-hover:text-as-accent transition-colors">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <span className="font-semibold text-sm">{partner.name}</span>
                <span className="text-xs text-as-muted mt-1">{partner.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-as-accent flex items-center justify-center">
                <Activity className="w-6 h-6 text-as-dark" />
              </div>
              <div>
                <span className="font-bold text-xl">AgentScore</span>
                <span className="ml-4 px-3 py-1 rounded-full bg-as-accent/10 text-as-accent text-xs font-medium border border-as-accent/20">
                  A Bittensor Subnet
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Twitter coming soon!'); }} className="text-as-muted hover:text-white transition-colors text-sm">
                Twitter/X
              </a>
              <a href="https://github.com/andrewstohl/AgentScore" target="_blank" rel="noopener noreferrer" className="text-as-muted hover:text-white transition-colors text-sm">
                GitHub
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Documentation coming soon!'); }} className="text-as-muted hover:text-white transition-colors text-sm">
                Docs
              </a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-as-muted text-sm">
              © 2026 AgentScore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
