'use client'

import { useEffect, useState } from 'react'
import { 
  Activity, 
  Clock, 
  CheckCircle2, 
  Circle, 
  CircleDashed, 
  FileText, 
  ArrowLeft,
  Calendar,
  Users,
  FolderOpen,
  LayoutDashboard
} from 'lucide-react'
import Link from 'next/link'

// Calculate days remaining until deadline
const getDaysRemaining = () => {
  const deadline = new Date('2026-02-25')
  const today = new Date()
  const diffTime = deadline.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

// Sprint Status Data
const sprintStatus = [
  {
    name: 'Subnet Design Proposal',
    status: 'In Progress',
    due: 'Feb 22',
    color: 'yellow',
  },
  {
    name: 'Pitch Deck (10 pages)',
    status: 'Not Started',
    due: 'Feb 23',
    color: 'red',
  },
  {
    name: 'Explanation Video',
    status: 'Not Started',
    due: 'Feb 24',
    color: 'red',
  },
  {
    name: 'Public X/Twitter Post',
    status: 'Not Started',
    due: 'Feb 24',
    color: 'red',
  },
]

// Tasks Data
const tasks = {
  todo: [
    'Create X/Twitter account',
    'Register on HackQuest',
    'Contact dev/technical co-founder candidate',
    'Define brand guidelines (colors, logo)',
    'Draft Go-To-Market section',
    'Spin up Marketing agent',
  ],
  inProgress: [
    { name: 'Research brief (Bittensor, agentic commerce, ideathon)', assignee: 'Lead Analyst' },
    { name: 'Landing page v1', assignee: 'Developer', checkmark: true },
    { name: 'Proposal restructure around judging criteria', assignee: 'Doug' },
    { name: 'Fill research gaps (AP2, Stripe ACP, Visa TAP, ERC-8004)', assignee: 'Doug' },
  ],
  done: [
    'Read and analyze existing proposal docs',
    'Analyze ideathon requirements',
    'Establish agent team structure',
    'Master project plan created',
    'Landing page deployed on Vercel',
    'Research brief v1 delivered',
  ],
}

// Documents Data
const documents = [
  { name: 'Subnet Design Proposal (Draft)', status: 'In progress' },
  { name: 'Strategic Business Analysis', status: 'Internal reference' },
  { name: 'Research Brief', status: 'v1 complete' },
  { name: 'Ideathon Requirements', status: 'Reference' },
  { name: 'Project Plan', status: 'Living document' },
  { name: 'Pitch Deck', status: 'Not started' },
  { name: 'Video Script', status: 'Not started' },
]

// Team Data
const team = [
  { name: 'Doug', role: 'Chief of Staff / PM', emoji: '🦬', model: 'Claude Opus 4' },
  { name: 'Lead Analyst', role: 'Research', emoji: '', model: 'Kimi K2.5' },
  { name: 'Developer', role: 'Web', emoji: '', model: 'Kimi K2.5' },
  { name: 'Marketing', role: 'Content & Copy', emoji: '', model: 'Kimi K2.5', pending: true },
]

// Status Badge Component
const StatusBadge = ({ status, color }: { status: string; color: string }) => {
  const colors = {
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    yellow: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  }

  const icons = {
    red: <Circle className="w-3 h-3" />,
    yellow: <CircleDashed className="w-3 h-3" />,
    green: <CheckCircle2 className="w-3 h-3" />,
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colors[color as keyof typeof colors]}`}>
      {icons[color as keyof typeof icons]}
      {status}
    </span>
  )
}

export default function Dashboard() {
  const [daysRemaining, setDaysRemaining] = useState(0)

  useEffect(() => {
    setDaysRemaining(getDaysRemaining())
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-as-dark to-as-navy text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-as-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-as-accent flex items-center justify-center">
                  <Activity className="w-5 h-5 text-as-dark" />
                </div>
                <span className="font-bold text-xl tracking-tight">AgentScore</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm text-as-muted hover:text-white transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-as-accent/10 text-as-accent text-xs font-medium border border-as-accent/20">
                Dashboard
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Project Header */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <LayoutDashboard className="w-6 h-6 text-as-accent" />
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">AgentScore — Mission Control</h1>
              </div>
              <p className="text-as-muted">Project management overview for the Ideathon submission</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-as-muted mb-1">Current Sprint</div>
                <div className="font-semibold text-lg">Ideathon Submission</div>
              </div>
              <div className="h-10 w-px bg-white/10"></div>
              <div className="text-right">
                <div className="text-sm text-as-muted mb-1">Deadline</div>
                <div className="font-semibold text-lg flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-as-accent" />
                  February 25, 2026
                </div>
              </div>
              <div className="h-10 w-px bg-white/10"></div>
              <div className="text-center px-6 py-3 rounded-xl bg-as-accent/10 border border-as-accent/20">
                <div className="text-3xl font-bold text-as-accent">{daysRemaining}</div>
                <div className="text-xs text-as-muted uppercase tracking-wider">Days Left</div>
              </div>
            </div>
          </div>
        </section>

        {/* Sprint Status Cards */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-as-accent" />
            Sprint Status
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sprintStatus.map((item) => (
              <div
                key={item.name}
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.07] group"
              >
                <h3 className="font-medium mb-3 text-sm leading-tight">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <StatusBadge status={item.status} color={item.color} />
                  <span className="text-xs text-as-muted">Due {item.due}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Task Tracker */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-as-accent" />
            Task Tracker
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* To Do */}
            <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
              <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center gap-2">
                <Circle className="w-4 h-4 text-red-400" />
                <span className="font-medium text-sm">To Do</span>
                <span className="ml-auto text-xs text-as-muted bg-white/10 px-2 py-0.5 rounded-full">
                  {tasks.todo.length}
                </span>
              </div>
              <div className="p-3 space-y-2">
                {tasks.todo.map((task, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all text-sm"
                  >
                    {task}
                  </div>
                ))}
              </div>
            </div>

            {/* In Progress */}
            <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
              <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center gap-2">
                <CircleDashed className="w-4 h-4 text-amber-400" />
                <span className="font-medium text-sm">In Progress</span>
                <span className="ml-auto text-xs text-as-muted bg-white/10 px-2 py-0.5 rounded-full">
                  {tasks.inProgress.length}
                </span>
              </div>
              <div className="p-3 space-y-2">
                {tasks.inProgress.map((task, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all text-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span>{task.name}</span>
                      {task.checkmark && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                    </div>
                    <span className="text-xs text-as-muted mt-1 block">— {task.assignee}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Done */}
            <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
              <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-medium text-sm">Done</span>
                <span className="ml-auto text-xs text-as-muted bg-white/10 px-2 py-0.5 rounded-full">
                  {tasks.done.length}
                </span>
              </div>
              <div className="p-3 space-y-2">
                {tasks.done.map((task, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all text-sm text-as-muted line-through decoration-white/30"
                  >
                    {task}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Documents & Team Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Documents */}
          <section className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-as-accent" />
              Documents
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <a
                  key={doc.name}
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert('Document coming soon!'); }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-as-accent/30 hover:bg-white/[0.07] transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-as-accent/10 transition-colors">
                      <FileText className="w-5 h-5 text-as-muted group-hover:text-as-accent transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-1 truncate">{doc.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        doc.status === 'v1 complete' 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : doc.status === 'In progress'
                          ? 'bg-amber-500/10 text-amber-400'
                          : doc.status === 'Not started'
                          ? 'bg-red-500/10 text-red-400'
                          : 'bg-white/10 text-as-muted'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Team */}
          <section>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-as-accent" />
              Team
            </h2>
            <div className="space-y-3">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-as-accent/10 flex items-center justify-center text-lg">
                      {member.emoji || '👤'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{member.name}</span>
                        {member.pending && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-as-muted">
                            Pending
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-as-muted">{member.role}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-as-muted/70">
                    Model: {member.model}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-as-accent flex items-center justify-center">
                <Activity className="w-4 h-4 text-as-dark" />
              </div>
              <span className="text-sm text-as-muted">AgentScore Dashboard</span>
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
