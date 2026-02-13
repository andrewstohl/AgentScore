import Link from 'next/link'
import { FileText, ArrowLeft, BookOpen, Clock, CheckCircle2, Clock3 } from 'lucide-react'

// Document metadata
const documents = [
  {
    slug: 'research-brief',
    title: 'Research Brief',
    description: 'Comprehensive research on Bittensor ecosystem, agentic commerce landscape, and Ideathon intelligence.',
    status: 'v1 complete',
    statusColor: 'emerald',
    lastUpdated: 'Feb 12, 2026',
    readTime: '15 min read',
  },
  {
    slug: 'project-plan',
    title: 'Project Plan',
    description: 'Master project plan for the Ideathon submission sprint. Timeline, deliverables, and task tracking.',
    status: 'Active Sprint',
    statusColor: 'amber',
    lastUpdated: 'Feb 12, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'ideathon-submission',
    title: 'Subnet Design Proposal (Draft)',
    description: 'Bittensor Ideathon submission document covering incentive design, mechanism, and business logic.',
    status: 'In progress',
    statusColor: 'amber',
    lastUpdated: 'Feb 12, 2026',
    readTime: '20 min read',
  },
  {
    slug: 'business-analysis',
    title: 'Strategic Business Analysis',
    description: 'Internal decision document covering business case, monetization strategy, and competitive analysis.',
    status: 'Internal reference',
    statusColor: 'blue',
    lastUpdated: 'Feb 12, 2026',
    readTime: '25 min read',
  },
  {
    slug: 'ideathon-requirements',
    title: 'Ideathon Requirements',
    description: 'Official submission requirements and judging criteria for the Bittensor Subnet Ideathon.',
    status: 'Reference',
    statusColor: 'slate',
    lastUpdated: 'Feb 12, 2026',
    readTime: '3 min read',
  },
]

const statusColors: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  slate: 'bg-white/10 text-as-muted border-white/10',
}

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-as-dark to-as-navy text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-as-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-as-accent flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-as-dark" />
                </div>
                <span className="font-bold text-xl tracking-tight">AgentScore</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm text-as-muted hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/dashboard" className="text-sm text-as-muted hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/docs" className="text-sm text-as-accent transition-colors">
                Docs
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-as-muted hover:text-white hover:border-as-accent/30 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-as-accent" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Documentation</h1>
          </div>
          <p className="text-as-muted text-lg max-w-2xl">
            Browse project documents, research briefs, and submissions for the Bittensor Subnet Ideathon.
          </p>
        </section>

        {/* Documents Grid */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-as-accent/30 hover:bg-white/[0.07] transition-all flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-as-accent/10 transition-colors">
                    <FileText className="w-6 h-6 text-as-muted group-hover:text-as-accent transition-colors" />
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[doc.statusColor]}`}>
                    {doc.status}
                  </span>
                </div>

                <h3 className="font-semibold text-lg mb-2 group-hover:text-as-accent transition-colors">
                  {doc.title}
                </h3>

                <p className="text-as-muted text-sm leading-relaxed mb-6 flex-grow">
                  {doc.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-as-muted/70 pt-4 border-t border-white/5">
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="w-3.5 h-3.5" />
                    {doc.readTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {doc.lastUpdated}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-as-accent" />
            Coming Soon
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 opacity-50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-as-muted" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Pitch Deck</h3>
                  <p className="text-sm text-as-muted">10-page slide deck for the Ideathon submission</p>
                  <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-white/10 text-as-muted">
                    Due Feb 23
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 opacity-50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-as-muted" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Video Script</h3>
                  <p className="text-sm text-as-muted">Explanation video script and outline</p>
                  <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-white/10 text-as-muted">
                    Due Feb 24
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-as-accent flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-as-dark" />
              </div>
              <span className="text-sm text-as-muted">AgentScore Documentation</span>
            </div>
            <p className="text-xs text-as-muted/60">
              Last updated: February 12, 2026
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
