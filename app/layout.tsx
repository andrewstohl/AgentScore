import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgentScore | The Credit Rating Agency for the AI Agent Economy',
  description: 'Decentralized intelligence layer for agentic commerce. Real-time trust scores for every service endpoint.',
  keywords: 'AI agents, credit rating, trust scores, agentic commerce, Bittensor, decentralized intelligence',
  authors: [{ name: 'AgentScore' }],
  openGraph: {
    title: 'AgentScore | The Credit Rating Agency for the AI Agent Economy',
    description: 'Decentralized intelligence layer for agentic commerce. Real-time trust scores for every service endpoint.',
    type: 'website',
    url: 'https://agentscore.io',
    siteName: 'AgentScore',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentScore | The Credit Rating Agency for the AI Agent Economy',
    description: 'Decentralized intelligence layer for agentic commerce. Real-time trust scores for every service endpoint.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
