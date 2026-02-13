'use client'

import { useState } from 'react'
import { CheckSquare, FileText, ClipboardCheck, Calendar, BookOpen, Users, LogOut, ExternalLink, Clock, AlertCircle, Circle, CheckCircle2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// === DATA ===
const TASKS = {
  backlog: [
    { title: 'Create X/Twitter account', owner: 'Drew', priority: 'high' },
    { title: 'Contact dev co-founder', owner: 'Drew', priority: 'high' },
    { title: 'Draft Go-To-Market section', owner: 'Doug', priority: 'high' },
    { title: 'Script explanation video', owner: 'Doug', priority: 'medium' },
    { title: 'Draft pitch deck content', owner: 'Doug', priority: 'medium' },
    { title: 'Publish X introduction post', owner: 'Drew', priority: 'medium' },
    { title: 'Record explanation video', owner: 'Drew', priority: 'medium' },
    { title: 'Submit on HackQuest', owner: 'Drew', priority: 'high' },
    { title: 'Send proposal to experts', owner: 'Drew', priority: 'medium' },
  ],
  inProgress: [
    { title: 'Fill research gaps', owner: 'Doug', priority: 'high' },
    { title: 'Restructure proposal', owner: 'Doug', priority: 'high' },
    { title: 'Landing page polish', owner: 'Dev Agent', priority: 'medium' },
    { title: 'Mission Control v2', owner: 'Dev Agent', priority: 'high' },
    { title: 'Hero headline options', owner: 'Doug', priority: 'medium' },
  ],
  done: [
    { title: 'Read & analyze proposal docs', owner: 'Doug' },
    { title: 'Analyze ideathon requirements', owner: 'Doug' },
    { title: 'Build landing page v1', owner: 'Dev Agent' },
    { title: 'Research brief v1', owner: 'Lead Analyst' },
    { title: 'Master project plan', owner: 'Doug' },
    { title: 'Deploy site on Vercel', owner: 'Dev Agent' },
    { title: 'Build Mission Control v1', owner: 'Dev Agent' },
    { title: 'Landing page redesign', owner: 'Dev Agent' },
    { title: 'Context file cleanup', owner: 'Doug' },
    { title: 'Logo design', owner: 'Drew' },
    { title: 'Expert feedback integration', owner: 'Doug' },
  ],
}

const CONTENT = [
  { title: 'Subnet Design Proposal', version: 'v0', status: 'In Progress', owner: 'Doug', note: 'needs restructure' },
  { title: 'Pitch Deck (10 pages)', version: '--', status: 'Not Started', owner: 'Doug' },
  { title: 'Explainer Video Script', version: '--', status: 'Not Started', owner: 'Doug' },
  { title: 'X/Twitter Launch Post', version: '--', status: 'Blocked', owner: 'Marketing', note: 'no X account yet' },
  { title: 'Landing Page Copy', version: 'v2', status: 'In Review', owner: 'Drew + Doug' },
  { title: 'Research Brief', version: 'v1', status: 'Complete', owner: 'Lead Analyst' },
]

const APPROVALS = [
  { title: 'Brand direction (dark fintech)', status: 'Locked', badge: 'locked' },
  { title: 'Manifesto line', status: 'Approved', badge: 'approved' },
  { title: 'Hero headline', status: 'Needs Revision', badge: 'revision' },
  { title: 'Landing page sign-off', status: 'In Review', badge: 'review' },
  { title: 'Proposal outline', status: 'Pending', badge: 'pending' },
  { title: 'Dev co-founder candidate', status: 'Waiting on Drew', badge: 'waiting' },
]

const CALENDAR = [
  { date: 'Feb 12', day: 'Wed', past: true, items: ['First boot, met Drew', 'Deployed landing page', 'Research brief v1'], milestone: null },
  { date: 'Feb 13', day: 'Thu', today: true, items: ['Mission Control v2', 'Hero headline options', 'Landing page polish'], milestone: null },
  { date: 'Feb 14', day: 'Fri', items: ['Content review', 'Fill research gaps'], milestone: null },
  { date: 'Feb 15-16', day: 'Weekend', items: ['Video script draft', 'Pitch deck draft'], milestone: null },
  { date: 'Feb 17', day: 'Mon', items: ['Contact dev co-founder', 'Draft GTM section'], milestone: null },
  { date: 'Feb 18', day: 'Tue', items: ['Proposal restructure complete'], milestone: null },
  { date: 'Feb 19', day: 'Wed', items: ['Send proposal to domain experts'], milestone: null },
  { date: 'Feb 20', day: 'Thu', items: ['Integrate expert feedback'], milestone: null },
  { date: 'Feb 21', day: 'Fri', items: ['Final proposal polish', 'All drafts complete'], milestone: 'DRAFTS COMPLETE' },
  { date: 'Feb 22-23', day: 'Weekend', items: ['Record explainer video', 'Final asset prep'], milestone: null },
  { date: 'Feb 24', day: 'Mon', items: ['Final review cycle'], milestone: null },
  { date: 'Feb 25', day: 'Tue', items: ['SUBMIT TO HACKQUEST'], milestone: 'DEADLINE' },
]

const DOCS = [
  { id: 'research-brief', title: 'Research Brief', desc: 'Market analysis & Bittensor landscape' },
  { id: 'project-plan', title: 'Project Plan', desc: 'Master roadmap and sprint planning' },
  { id: 'ideathon-submission', title: 'Subnet Design Proposal', desc: 'Ideathon submission document' },
  { id: 'business-analysis', title: 'Business Analysis', desc: 'Strategic assessment' },
  { id: 'ideathon-requirements', title: 'Ideathon Requirements', desc: 'Official submission guidelines' },
  { id: 'punchlist', title: 'Punch List', desc: 'Active task tracking' },
]

const TEAM = [
  { name: 'Doug', role: 'PM / Chief of Staff', model: 'Claude Opus 4', status: 'active', task: 'Coordinating all workstreams' },
  { name: 'Lead Analyst', role: 'Research', model: 'Kimi K2.5', status: 'idle', task: 'Research brief v1 delivered' },
  { name: 'Developer', role: 'Frontend', model: 'Kimi K2.5', status: 'active', task: 'Mission Control v2 build' },
  { name: 'Marketing', role: 'Content & Social', model: 'Kimi K2.5', status: 'pending', task: 'Waiting for initialization' },
  { name: 'Drew Stohl', role: 'Founder', model: 'Human', status: 'active', task: 'Direction, feedback, approvals' },
]

const ACTIVITY = [
  { who: 'Dev Agent', what: 'Particles changed to light grey', when: '30 min ago' },
  { who: 'Dev Agent', what: 'Unified all blues to ice blue', when: '45 min ago' },
  { who: 'Dev Agent', what: 'Fixed login page styling', when: '1 hour ago' },
  { who: 'Drew', what: 'Sent logo design', when: '10 hours ago' },
  { who: 'Doug', what: 'Updated manifesto line', when: '10 hours ago' },
  { who: 'Dev Agent', what: 'Landing page full redesign', when: '11 hours ago' },
  { who: 'Doug', what: 'Created project plan', when: '12 hours ago' },
  { who: 'Lead Analyst', what: 'Delivered research brief', when: '12 hours ago' },
  { who: 'Dev Agent', what: 'Deployed landing page', when: '13 hours ago' },
  { who: 'Doug', what: 'First boot, met Drew', when: '13 hours ago' },
]

// === VIEWS ===
type View = 'tasks' | 'content' | 'approvals' | 'calendar' | 'docs' | 'team'

const NAV: { id: View; label: string; icon: any }[] = [
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'approvals', label: 'Approvals', icon: ClipboardCheck },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'docs', label: 'Docs', icon: BookOpen },
  { id: 'team', label: 'Team', icon: Users },
]

// Priority badge
function PBadge({ p }: { p: string }) {
  const c = p === 'high' ? 'bg-red-500/20 text-red-400' : p === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-[#64748B]'
  return <span className={`text-xs px-2 py-0.5 rounded ${c}`}>{p}</span>
}

// Status badge
function SBadge({ s }: { s: string }) {
  const m: Record<string, string> = {
    'Complete': 'bg-emerald-500/20 text-emerald-400', 'Approved': 'bg-emerald-500/20 text-emerald-400', 'Locked': 'bg-purple-500/20 text-purple-400',
    'In Progress': 'bg-[#38BDF8]/20 text-[#38BDF8]', 'In Review': 'bg-[#38BDF8]/20 text-[#38BDF8]',
    'Not Started': 'bg-white/10 text-[#64748B]', 'Pending': 'bg-amber-500/20 text-amber-400',
    'Blocked': 'bg-red-500/20 text-red-400', 'Needs Revision': 'bg-amber-500/20 text-amber-400',
    'Waiting on Drew': 'bg-orange-500/20 text-orange-400',
  }
  return <span className={`text-xs px-2 py-0.5 rounded ${m[s] || 'bg-white/10 text-[#64748B]'}`}>{s}</span>
}

// Card wrapper
function Card({ children, className = '', ...rest }: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`bg-[#141D2F] border border-[#1E2A42] rounded-lg ${className}`} {...rest}>{children}</div>
}

// Task card
function TaskCard({ t }: { t: { title: string; owner: string; priority?: string } }) {
  return (
    <Card className="p-3">
      <h4 className="text-sm font-medium text-[#F1F5F9] mb-2">{t.title}</h4>
      <div className="flex items-center justify-between">
        {t.priority ? <PBadge p={t.priority} /> : <span />}
        <span className="text-xs text-[#64748B]">{t.owner}</span>
      </div>
    </Card>
  )
}

export default function MissionControl() {
  const [view, setView] = useState<View>('tasks')
  const [docId, setDocId] = useState<string | null>(null)
  const [docContent, setDocContent] = useState('')
  const [loading, setLoading] = useState(false)

  const loadDoc = async (id: string) => {
    setLoading(true)
    try {
      const r = await fetch(`/docs/${id}.md`)
      setDocContent(await r.text())
      setDocId(id)
    } catch { setDocContent('# Error loading document') }
    setLoading(false)
  }

  const logout = () => {
    document.cookie = 'as-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    window.location.href = '/login'
  }

  const total = TASKS.backlog.length + TASKS.inProgress.length + TASKS.done.length
  const pct = Math.round((TASKS.done.length / total) * 100)

  return (
    <div className="min-h-screen bg-[#0A0F1A] flex">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-52 bg-[#0A0F1A] border-r border-[#1E2A42] flex flex-col z-20">
        <div className="h-14 flex items-center px-5 border-b border-[#1E2A42]">
          <span className="font-bold text-[#F1F5F9] text-lg">AgentScore</span>
        </div>
        <nav className="flex-1 py-3">
          {NAV.map(n => (
            <button key={n.id} onClick={() => { setView(n.id); setDocId(null) }}
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-all ${
                view === n.id ? 'border-l-2 border-[#38BDF8] bg-white/5 text-[#F1F5F9]' : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5'
              }`}>
              <n.icon className="w-4 h-4" />{n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#1E2A42]">
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 text-[#94A3B8] hover:text-[#F1F5F9] text-sm transition-all">
            <LogOut className="w-4 h-4" />Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-52 mr-64">
        <header className="h-14 flex items-center justify-between border-b border-[#1E2A42] px-6 bg-[#0A0F1A]/95 backdrop-blur sticky top-0 z-10">
          <span className="text-[#F1F5F9] font-semibold">Mission Control</span>
          <a href="/" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />Back to Site
          </a>
        </header>

        <div className="p-6">
          {/* TASKS */}
          {view === 'tasks' && (
            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-3">
                {[
                  ['Backlog', TASKS.backlog.length, '#F1F5F9'],
                  ['In Progress', TASKS.inProgress.length, '#38BDF8'],
                  ['Done', TASKS.done.length, '#10B981'],
                  ['Completion', pct + '%', '#10B981'],
                ].map(([l, v, c]) => (
                  <Card key={l as string} className="p-4">
                    <p className="text-[#64748B] text-xs mb-1">{l as string}</p>
                    <p className="text-xl font-bold" style={{ color: c as string }}>{v as string}</p>
                  </Card>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {/* Backlog */}
                <div>
                  <h3 className="text-[#F1F5F9] font-medium mb-3">Backlog <span className="text-[#64748B] text-sm ml-1">{TASKS.backlog.length}</span></h3>
                  <div className="space-y-2">{TASKS.backlog.map((t, i) => <TaskCard key={i} t={t} />)}</div>
                </div>
                {/* In Progress */}
                <div>
                  <h3 className="text-[#F1F5F9] font-medium mb-3">In Progress <span className="text-[#64748B] text-sm ml-1">{TASKS.inProgress.length}</span></h3>
                  <div className="space-y-2">{TASKS.inProgress.map((t, i) => <TaskCard key={i} t={t} />)}</div>
                </div>
                {/* Done */}
                <div>
                  <h3 className="text-[#F1F5F9] font-medium mb-3">Done <span className="text-[#64748B] text-sm ml-1">{TASKS.done.length}</span></h3>
                  <div className="space-y-2">{TASKS.done.map((t, i) => (
                    <Card key={i} className="p-3 opacity-60">
                      <h4 className="text-sm text-[#F1F5F9] line-through mb-1">{t.title}</h4>
                      <span className="text-xs text-[#64748B]">{t.owner}</span>
                    </Card>
                  ))}</div>
                </div>
              </div>
            </div>
          )}

          {/* CONTENT */}
          {view === 'content' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#F1F5F9]">Content Library</h2>
              <div className="space-y-3">
                {CONTENT.map((c, i) => (
                  <Card key={i} className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-[#F1F5F9] font-medium">{c.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm">
                        <span className="text-[#38BDF8]">{c.version}</span>
                        {c.note && <span className="text-[#94A3B8]">({c.note})</span>}
                        <span className="text-[#64748B]">{c.owner}</span>
                      </div>
                    </div>
                    <SBadge s={c.status} />
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* APPROVALS */}
          {view === 'approvals' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#F1F5F9]">Approvals & Decisions</h2>
              <div className="space-y-3">
                {APPROVALS.map((a, i) => (
                  <Card key={i} className="p-4 flex items-center justify-between">
                    <h3 className="text-[#F1F5F9] font-medium">{a.title}</h3>
                    <SBadge s={a.status} />
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CALENDAR */}
          {view === 'calendar' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#F1F5F9]">Sprint Timeline</h2>
              <div className="space-y-2">
                {CALENDAR.map((d, i) => (
                  <Card key={i} className={`p-4 ${d.today ? 'border-l-2 border-l-[#38BDF8]' : ''} ${d.past ? 'opacity-50' : ''}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`font-semibold ${d.today ? 'text-[#38BDF8]' : 'text-[#F1F5F9]'}`}>{d.date}</span>
                      <span className="text-[#64748B] text-sm">{d.day}</span>
                      {d.milestone && (
                        <span className={`ml-auto text-xs px-2 py-0.5 rounded ${d.milestone === 'DEADLINE' ? 'bg-red-500/20 text-red-400' : 'bg-purple-500/20 text-purple-400'}`}>
                          {d.milestone}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-0.5">
                      {d.items.map((item, j) => <li key={j} className="text-sm text-[#94A3B8]">• {item}</li>)}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* DOCS */}
          {view === 'docs' && !docId && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#F1F5F9]">Documents</h2>
              <div className="grid grid-cols-2 gap-3">
                {DOCS.map(d => (
                  <Card key={d.id} className="p-4 cursor-pointer hover:border-[#38BDF8]/50 transition-colors" onClick={() => loadDoc(d.id)}>
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-5 h-5 text-[#38BDF8]" />
                      <h3 className="text-[#F1F5F9] font-medium">{d.title}</h3>
                    </div>
                    <p className="text-sm text-[#94A3B8]">{d.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {view === 'docs' && docId && (
            <div>
              <button onClick={() => setDocId(null)} className="text-[#94A3B8] hover:text-[#38BDF8] text-sm mb-4 flex items-center gap-1">
                ← Back to Documents
              </button>
              {loading ? (
                <p className="text-[#64748B]">Loading...</p>
              ) : (
                <Card className="p-6">
                  <div className="prose prose-invert max-w-none prose-headings:text-[#F1F5F9] prose-p:text-[#94A3B8] prose-strong:text-[#F1F5F9] prose-code:text-[#38BDF8]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{docContent}</ReactMarkdown>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* TEAM */}
          {view === 'team' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#F1F5F9]">Team Roster</h2>
              <div className="space-y-3">
                {TEAM.map((m, i) => (
                  <Card key={i} className="p-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      m.status === 'active' ? 'bg-[#38BDF8]/20 text-[#38BDF8]' : m.status === 'idle' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-[#64748B]'
                    }`}>
                      {m.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[#F1F5F9] font-medium">{m.name}</h3>
                        <span className="text-xs text-[#64748B]">{m.model}</span>
                      </div>
                      <p className="text-sm text-[#94A3B8]">{m.role}</p>
                    </div>
                    <div className="text-right">
                      <SBadge s={m.status === 'active' ? 'In Progress' : m.status === 'idle' ? 'Complete' : 'Pending'} />
                      <p className="text-xs text-[#64748B] mt-1">{m.task}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar - Activity Feed */}
      <aside className="fixed inset-y-0 right-0 w-64 bg-[#0A0F1A] border-l border-[#1E2A42] z-20">
        <div className="h-14 flex items-center px-5 border-b border-[#1E2A42]">
          <span className="text-[#F1F5F9] font-semibold text-sm">Activity</span>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-3.5rem)]">
          {ACTIVITY.map((a, i) => (
            <div key={i} className="border-l-2 border-[#1E2A42] pl-3">
              <p className="text-sm text-[#F1F5F9]"><span className="text-[#38BDF8]">{a.who}</span></p>
              <p className="text-xs text-[#94A3B8]">{a.what}</p>
              <p className="text-xs text-[#64748B] mt-0.5">{a.when}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
