import { promises as fs } from 'fs'
import { join } from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, BookOpen, ChevronRight, FileText, Clock } from 'lucide-react'

interface DocPageProps {
  params: {
    slug: string
  }
}

// Document metadata mapping
const docMetadata: Record<string, { title: string; description: string }> = {
  'research-brief': {
    title: 'Research Brief',
    description: 'Bittensor ecosystem, agentic commerce landscape, and Ideathon intelligence',
  },
  'project-plan': {
    title: 'Project Plan',
    description: 'Ideathon submission sprint plan and deliverables',
  },
  'ideathon-submission': {
    title: 'Subnet Design Proposal',
    description: 'Bittensor Ideathon submission document',
  },
  'business-analysis': {
    title: 'Strategic Business Analysis',
    description: 'Business case, monetization strategy, and competitive analysis',
  },
  'ideathon-requirements': {
    title: 'Ideathon Requirements',
    description: 'Official submission requirements and judging criteria',
  },
}

async function getDocContent(slug: string): Promise<string | null> {
  try {
    const filePath = join(process.cwd(), 'public', 'docs', `${slug}.md`)
    const content = await fs.readFile(filePath, 'utf-8')
    return content
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  return [
    { slug: 'research-brief' },
    { slug: 'project-plan' },
    { slug: 'ideathon-submission' },
    { slug: 'business-analysis' },
    { slug: 'ideathon-requirements' },
  ]
}

export async function generateMetadata({ params }: DocPageProps) {
  const meta = docMetadata[params.slug]
  if (!meta) {
    return { title: 'Document Not Found' }
  }
  return {
    title: `${meta.title} | AgentScore Docs`,
    description: meta.description,
  }
}

export default async function DocViewerPage({ params }: DocPageProps) {
  const content = await getDocContent(params.slug)
  
  if (!content) {
    notFound()
  }

  const meta = docMetadata[params.slug]
  const docTitle = meta?.title || params.slug

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
                href="/docs"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-as-muted hover:text-white hover:border-as-accent/30 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                All Docs
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="pt-20 pb-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-as-muted">
          <Link href="/docs" className="hover:text-as-accent transition-colors">
            Docs
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{docTitle}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Document Header */}
        <div className="mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-as-accent/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-as-accent" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{docTitle}</h1>
            </div>
          </div>
          {meta?.description && (
            <p className="text-as-muted">{meta.description}</p>
          )}
        </div>

        {/* Markdown Content */}
        <div className="prose prose-invert prose-as max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Headings
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-white mt-12 mb-6 pb-2 border-b border-white/10">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-semibold text-white mt-6 mb-2">
                  {children}
                </h4>
              ),
              // Paragraphs
              p: ({ children }) => (
                <p className="text-as-muted leading-relaxed mb-4">
                  {children}
                </p>
              ),
              // Links
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-as-accent hover:underline"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
              // Lists
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-as-muted space-y-2 mb-4 ml-4">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-as-muted space-y-2 mb-4 ml-4">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">
                  {children}
                </li>
              ),
              // Blockquotes
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-as-accent bg-white/5 pl-4 py-3 pr-4 my-6 italic text-as-muted">
                  {children}
                </blockquote>
              ),
              // Code
              code: ({ children, className }) => {
                const isInline = !className
                return isInline ? (
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-as-accent">
                    {children}
                  </code>
                ) : (
                  <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto my-6">
                    <code className="text-sm font-mono text-as-muted block">
                      {children}
                    </code>
                  </pre>
                )
              },
              // Tables
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse border border-white/10">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-white/5">
                  {children}
                </thead>
              ),
              th: ({ children }) => (
                <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold text-sm">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-white/10 px-4 py-3 text-as-muted text-sm">
                  {children}
                </td>
              ),
              tbody: ({ children }) => (
                <tbody>
                  {children}
                </tbody>
              ),
              // Horizontal rule
              hr: () => (
                <hr className="border-white/10 my-8" />
              ),
              // Strong
              strong: ({ children }) => (
                <strong className="text-white font-semibold">
                  {children}
                </strong>
              ),
              // Emphasis
              em: ({ children }) => (
                <em className="italic">
                  {children}
                </em>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-as-muted hover:text-as-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all documents
          </Link>
        </div>
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
