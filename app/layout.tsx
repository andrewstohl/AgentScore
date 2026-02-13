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
  description: 'The trust layer for autonomous commerce.',
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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
