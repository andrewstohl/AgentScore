import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'AgentScore | Decentralized Trust Infrastructure',
  description: 'Intelligence before every agentic transaction. The quality layer for agentic payments. Neutral. Verified. Real-time.',
  keywords: 'AI agents, trust infrastructure, agentic commerce, Bittensor, decentralized intelligence',
  authors: [{ name: 'AgentScore' }],
  openGraph: {
    title: 'AgentScore | Decentralized Trust Infrastructure',
    description: 'The trust layer for autonomous commerce.',
    type: 'website',
    url: 'https://agentscore.io',
    siteName: 'AgentScore',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentScore | Decentralized Trust Infrastructure',
    description: 'The trust layer for autonomous commerce.',
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
