'use client'

import { useEffect, useState, useRef } from 'react'
import { Shield, Navigation, Scale, ChevronDown, ArrowRight } from 'lucide-react'

// Simple fade-in hook using Intersection Observer
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// FadeInSection component
function FadeInSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useFadeIn()
  
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    if (typeof document !== 'undefined') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-as-bg text-as-text">
      {/* TOP BAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-as-bg/80 backdrop-blur-md border-b border-as-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <span className="font-display font-bold text-xl text-as-text tracking-tight">
              AgentScore
            </span>

            {/* Login */}
            <a
              href="/login"
              className="group flex items-center gap-2 px-4 py-2 bg-as-surface border border-as-border text-as-muted text-sm font-medium rounded-lg hover:text-white hover:border-as-accent/50 transition-all duration-300"
            >
              Mission Control
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center hero-bg">
        {/* Grid overlay */}
        <div className="hero-grid"></div>
        {/* Extra gradient orb */}
        <div className="hero-bg-extra"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          {/* Eyebrow */}
          <FadeInSection>
            <p className="text-xs uppercase tracking-[0.3em] text-as-dim mb-8">
              Decentralized Trust Infrastructure
            </p>
          </FadeInSection>

          {/* Headline */}
          <FadeInSection delay={100}>
            <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-8">
              The credit rating agency for{' '}
              <span className="text-as-ice text-glow">the agent economy.</span>
            </h1>
          </FadeInSection>

          {/* Subheadline */}
          <FadeInSection delay={200}>
            <p className="text-as-muted text-lg sm:text-xl max-w-2xl mx-auto mb-12">
              Every payment network gets a trust layer. Autonomous commerce is no different.
            </p>
          </FadeInSection>

          {/* Scroll indicator */}
          <FadeInSection delay={400}>
            <button
              onClick={() => scrollToSection('setup')}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 scroll-indicator"
            >
              <ChevronDown className="w-6 h-6 text-as-dim" />
            </button>
          </FadeInSection>
        </div>
      </section>

      {/* THE SETUP */}
      <section id="setup" className="py-32 lg:py-40">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeInSection>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-8">
              Agents are learning to spend money.
              <br />
              Nobody is checking where it goes.
            </h2>
          </FadeInSection>

          <FadeInSection delay={150}>
            <p className="text-as-muted text-lg leading-relaxed max-w-2xl mx-auto">
              The biggest companies in tech are building payment infrastructure for AI agents — wallets, identity, checkout. The missing piece is intelligence. A neutral layer that tells agents what&apos;s worth paying for, who to trust, and what to avoid.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* MARQUEE TICKER */}
      <section className="py-0">
        <div className="bg-as-surface border-y border-as-border overflow-hidden marquee-container">
          <div className="flex animate-marquee whitespace-nowrap py-6">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="font-display text-sm uppercase tracking-[0.4em] text-as-dim mx-8"
              >
                Neutral &nbsp;·&nbsp; Verified &nbsp;·&nbsp; Predictive &nbsp;·&nbsp; Decentralized &nbsp;·&nbsp; Real-Time &nbsp;·&nbsp; Trustless &nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* THREE CARDS */}
      <section className="py-32 lg:py-40">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <FadeInSection delay={0}>
              <div className="bg-as-surface border border-as-border rounded-xl p-8 card-hover h-full">
                <div className="w-12 h-12 rounded-lg bg-as-accent/10 flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-as-accent" />
                </div>
                <h3 className="font-display font-bold text-xl mb-4 text-as-text">
                  Quality Intelligence
                </h3>
                <p className="text-as-muted leading-relaxed">
                  Continuous, adversarial monitoring of service endpoints across the agent economy. Real transactions. Real measurements. No self-reporting.
                </p>
              </div>
            </FadeInSection>

            {/* Card 2 */}
            <FadeInSection delay={100}>
              <div className="bg-as-surface border border-as-border rounded-xl p-8 card-hover h-full">
                <div className="w-12 h-12 rounded-lg bg-as-accent/10 flex items-center justify-center mb-6">
                  <Navigation className="w-6 h-6 text-as-accent" />
                </div>
                <h3 className="font-display font-bold text-xl mb-4 text-as-text">
                  Verified Routing
                </h3>
                <p className="text-as-muted leading-relaxed">
                  Agents don&apos;t just get scores — they get the best path. Quality-adjusted routing that saves money and prevents bad transactions before they happen.
                </p>
              </div>
            </FadeInSection>

            {/* Card 3 */}
            <FadeInSection delay={200}>
              <div className="bg-as-surface border border-as-border rounded-xl p-8 card-hover h-full">
                <div className="w-12 h-12 rounded-lg bg-as-accent/10 flex items-center justify-center mb-6">
                  <Scale className="w-6 h-6 text-as-accent" />
                </div>
                <h3 className="font-display font-bold text-xl mb-4 text-as-text">
                  Structural Neutrality
                </h3>
                <p className="text-as-muted leading-relaxed">
                  Built as decentralized infrastructure. No single platform controls the ratings. The agent economy needs a trust layer that isn&apos;t owned by the players it rates.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* THE MANIFESTO LINE */}
      <section className="py-32 lg:py-48 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-as-border to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-as-border to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeInSection>
            <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-as-text leading-tight">
              When machines spend money, trust can&apos;t be a feature. It has to be the foundation.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* BUILT ON */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeInSection>
            <p className="text-as-dim text-sm mb-3">Built on</p>
            <p className="font-display text-2xl text-as-muted mb-6">Bittensor</p>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-as-border text-as-dim text-xs">
              Bittensor Subnet
            </span>
          </FadeInSection>
        </div>
      </section>

      {/* CTA / CLOSER */}
      <section id="cta" className="py-32 lg:py-40 cta-glow">
        <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <FadeInSection>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-6">
              Launching soon.
            </h2>
          </FadeInSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-as-border py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-as-dim text-sm">
            © 2026 AgentScore · Decentralized intelligence for agentic commerce
          </p>
        </div>
      </footer>
    </main>
  )
}
