'use client'

import { useState } from 'react'
import { CheckSquare, FileText, ClipboardCheck, Calendar, Users, Clock, LogOut, ExternalLink, BookOpen, ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// === REAL DATA ===
const TASKS = {
  backlog: [
    { title: 'Create X/Twitter account', owner: 'Drew', priority: 'high', note: 'Required for submission' },
    { title: 'Register on HackQuest', owner: 'Drew', priority: 'high', note: 'Submission platform' },
    { title: 'Contact dev co-founder candidate', owner: 'Drew', priority: 'high', note: 'For Round 2 testnet' },
    { title: 'Send proposal to domain experts', owner: 'Drew', priority: 'medium', note: 'External feedback' },
    { title: 'Record explainer video', owner: 'Drew', priority: 'medium', note: 'After script approval' },
    { title: 'Spin up Marketing agent', owner: 'Doug', priority: 'medium', note: 'For content polish' },
    { title: 'Fill research gaps', owner: 'Doug', priority: 'high', note: 'x402 endpoints, AP2, competitor scan' },
  ],
  inProgress: [
    { title: 'Hero headline options for Drew', owner: 'Doug', priority: 'medium', note: 'Drew unhappy with current' },
    { title: 'Landing page polish', owner: 'Doug', priority: 'medium', note: 'Dark hero bg, particle visibility' },
    { title: 'Drew: review all deliverables in MC', owner: 'Drew', priority: 'high', note: 'Proposal v3, deck, scripts, X posts' },
  ],
  done: [
    { title: 'Proposal v3 (major rewrite)', owner: 'Doug' },
    { title: 'Gap analysis (what it takes to win)', owner: 'Doug' },
    { title: 'Winning subnets research', owner: 'Doug' },
    { title: 'HTML slide deck (/deck.html)', owner: 'Dev Agent' },
    { title: 'Proposal v2 first draft', owner: 'Doug' },
    { title: 'Pitch deck v1 first draft', owner: 'Doug' },
    { title: 'Video scripts v1 (2 versions)', owner: 'Doug' },
    { title: 'X/Twitter posts (25 ideas)', owner: 'Doug' },
    { title: 'Mission Control v2+v3', owner: 'Doug' },
    { title: 'Landing page redesign', owner: 'Dev Agent' },
    { title: 'Research brief v1', owner: 'Lead Analyst' },
    { title: 'Project plan', owner: 'Doug' },
    { title: 'Ideathon requirements analysis', owner: 'Doug' },
    { title: 'Expert feedback integration', owner: 'Doug' },
    { title: 'Site deploy on Vercel', owner: 'Dev Agent' },
    { title: 'Logo design', owner: 'Drew' },
    { title: 'Context file cleanup', owner: 'Doug' },
  ],
}

const DELIVERABLES = [
  { title: '⭐ Subnet Design Proposal', file: 'proposal-v3', version: 'v3 Draft', status: 'Needs Review', owner: 'Doug', desc: 'Major rewrite. 70% mechanism design, 30% business. Mathematical specs, anti-gaming proofs, YC3 parameters, dTAO strategy. Based on gap analysis.' },
  { title: '⭐ Pitch Deck (SLIDES)', file: '__external__/deck.html', version: 'v1 Draft', status: 'Needs Review', owner: 'Doug', desc: 'Real slide deck. Arrow keys to navigate. Ctrl+P to save as PDF.' },
  { title: 'Explainer Video Scripts', file: 'video-scripts-v1', version: 'v1 Draft', status: 'Needs Review', owner: 'Doug', desc: 'Two versions: "The Problem" narrative and "The Future" narrative. 6-7 min each.' },
  { title: 'X/Twitter Launch Posts (25)', file: 'x-posts-v1', version: 'v1 Draft', status: 'Needs Review', owner: 'Doug', desc: '25 posts across 6 categories. Posting cadence and voice guide included.' },
  { title: 'Gap Analysis', file: 'gap-analysis', version: 'v1', status: 'Complete', owner: 'Doug', desc: 'Brutally honest assessment of what it takes to WIN. Identifies weaknesses, required improvements, what to cut.' },
  { title: 'Winning Subnets Research', file: 'winning-subnets-research', version: 'v1', status: 'Complete', owner: 'Doug', desc: 'Analysis of SN8, SN1, SN9 mechanisms. What winning looks like. Bittensor terminology guide.' },
  { title: 'Research Brief', file: 'research-brief', version: 'v1', status: 'Complete', owner: 'Lead Analyst', desc: 'Bittensor ecosystem, agentic commerce landscape, ideathon intel.' },
  { title: 'Previous Proposal (v2)', file: 'proposal-v2', version: 'v2', status: 'Superseded', owner: 'Doug', desc: 'Superseded by v3. Kept for reference.' },
  { title: 'Original Proposal (v1)', file: 'ideathon-submission', version: 'v1', status: 'Superseded', owner: 'Doug', desc: 'Original submission doc. Kept for reference.' },
  { title: 'Business Analysis', file: 'business-analysis', version: 'v1', status: 'Reference', owner: 'Doug', desc: 'Internal strategic analysis. Not a submission deliverable.' },
]

const APPROVALS = [
  { title: 'Proposal v2 draft review', status: 'Needs Drew', desc: 'Read and provide feedback on restructured proposal' },
  { title: 'Pitch deck content review', status: 'Needs Drew', desc: 'Review 10 slides, flag any messaging issues' },
  { title: 'Video script selection', status: 'Needs Drew', desc: 'Pick Version A or B (or hybrid)' },
  { title: 'X post approval (top 10)', status: 'Needs Drew', desc: 'Select which posts to queue first' },
  { title: 'Hero headline selection', status: 'Waiting on Doug', desc: '5 options coming, Drew picks' },
  { title: 'Brand direction', status: 'Locked', desc: 'Dark fintech, ice blue, Crypture-inspired' },
  { title: 'Manifesto line', status: 'Locked', desc: '"When machines spend money, trust can\'t be a feature..."' },
  { title: 'Dev co-founder', status: 'Waiting on Drew', desc: 'Drew has a candidate, needs to reach out' },
]

const CALENDAR = [
  { date: 'Feb 12', day: 'Wed', past: true, items: ['First boot, workspace setup', 'Landing page built + deployed', 'Research brief v1 delivered', 'Project plan created'] },
  { date: 'Feb 13', day: 'Thu', today: true, items: ['Mission Control v2 shipped', 'Proposal v2 drafted', 'Pitch deck v1 drafted', 'Video scripts v1 drafted', 'X posts (25) drafted', 'Landing page polish (particles, colors)'] },
  { date: 'Feb 14', day: 'Fri', items: ['Doug: review + clean all drafts', 'Drew: review deliverables in MC', 'Hero headline options presented', 'Fill research gaps'] },
  { date: 'Feb 15-16', day: 'Weekend', items: ['Incorporate Drew feedback on all drafts', 'Polish proposal and deck', 'Marketing agent: content refinement'] },
  { date: 'Feb 17', day: 'Mon', items: ['Contact dev co-founder', 'Send proposal to domain experts', 'Video script locked'] },
  { date: 'Feb 18-19', day: 'Tue-Wed', items: ['Expert feedback integration', 'Pitch deck design (visual)'] },
  { date: 'Feb 20', day: 'Thu', items: ['All written content locked'] },
  { date: 'Feb 21', day: 'Fri', items: ['Record explainer video', 'Final review cycle begins'], milestone: 'DRAFTS LOCKED' },
  { date: 'Feb 22-23', day: 'Weekend', items: ['Video editing', 'Final polish on all assets'] },
  { date: 'Feb 24', day: 'Mon', items: ['Final sign-off from Drew', 'Prep HackQuest submission'] },
  { date: 'Feb 25', day: 'Tue', items: ['SUBMIT EVERYTHING TO HACKQUEST', 'Publish X launch post'], milestone: 'DEADLINE' },
]

const TEAM = [
  { name: 'Doug', role: 'PM / Chief of Staff', model: 'Claude Opus 4', status: 'active', task: 'Reviewing all deliverable drafts' },
  { name: 'Lead Analyst', role: 'Research', model: 'Kimi K2.5', status: 'idle', task: 'Research brief delivered. On standby for gap-filling.' },
  { name: 'Developer', role: 'Frontend', model: 'Kimi K2.5', status: 'idle', task: 'MC v2 and site polish complete. On standby.' },
  { name: 'Marketing', role: 'Content', model: 'Kimi K2.5', status: 'pending', task: 'Not yet initialized. Queued for content polish.' },
  { name: 'Drew Stohl', role: 'Founder', model: 'Human', status: 'active', task: 'Reviewing deliverables, providing direction' },
]

const ACTIVITY = [
  { who: 'Doug', what: 'Proposal v3 completed (major rewrite: 70% mechanism, math specs, anti-gaming proofs)', when: 'Feb 13, 5:15 PM' },
  { who: 'Doug', what: 'Gap analysis completed (brutal honest assessment of what it takes to win)', when: 'Feb 13, 4:45 PM' },
  { who: 'Doug', what: 'Winning subnets research completed (SN8, SN1, SN9 analysis)', when: 'Feb 13, 4:46 PM' },
  { who: 'Dev Agent', what: 'HTML slide deck built at /deck.html (arrow key nav, 16:9, print-to-PDF)', when: 'Feb 13, 4:44 PM' },
  { who: 'Doug', what: 'MC v3: merged Content+Docs into Deliverables, fixed doc viewer, real data', when: 'Feb 13, 4:20 PM' },
  { who: 'Doug', what: 'Proposal v2 draft completed (restructured around judging criteria)', when: 'Feb 13, 4:03 PM' },
  { who: 'Doug', what: 'Video scripts v1 completed (2 versions)', when: 'Feb 13, 4:02 PM' },
  { who: 'Doug', what: 'X/Twitter posts completed (25 posts across 6 categories)', when: 'Feb 13, 4:01 PM' },
  { who: 'Doug', what: 'Pitch deck v1 completed (10 slides with speaker notes)', when: 'Feb 13, 4:01 PM' },
  { who: 'Doug', what: 'Mission Control v2 shipped (6 views + activity)', when: 'Feb 13, 11:20 AM' },
  { who: 'Dev Agent', what: 'Particles changed to light grey', when: 'Feb 13, 10:30 AM' },
  { who: 'Dev Agent', what: 'All blues unified to ice blue (#38BDF8)', when: 'Feb 13, 10:20 AM' },
  { who: 'Dev Agent', what: 'Login page fixed (dark inputs, logo, contrast)', when: 'Feb 13, 10:15 AM' },
  { who: 'Drew', what: 'Sent logo design', when: 'Feb 12, 11:30 PM' },
  { who: 'Doug', what: 'Manifesto line locked', when: 'Feb 12, 11:00 PM' },
  { who: 'Dev Agent', what: 'Landing page full Crypture-inspired redesign', when: 'Feb 12, 10:00 PM' },
  { who: 'Dev Agent', what: 'Mission Control v1 built', when: 'Feb 12, 9:00 PM' },
  { who: 'Doug', what: 'Project plan created', when: 'Feb 12, 7:00 PM' },
  { who: 'Lead Analyst', what: 'Research brief v1 delivered', when: 'Feb 12, 6:30 PM' },
  { who: 'Dev Agent', what: 'Landing page v1 deployed to Vercel', when: 'Feb 12, 5:00 PM' },
  { who: 'Doug', what: 'First boot. Met Drew. Set up workspace.', when: 'Feb 12, 3:00 PM' },
]

// === COMPONENT ===
type View = 'tasks' | 'deliverables' | 'approvals' | 'calendar' | 'team' | 'activity'

const NAV: { id: View; label: string; icon: any }[] = [
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'deliverables', label: 'Deliverables', icon: FileText },
  { id: 'approvals', label: 'Approvals', icon: ClipboardCheck },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'activity', label: 'Activity', icon: Clock },
]

function Card({ children, className = '', ...rest }: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`bg-[#141D2F] border border-[#1E2A42] rounded-lg ${className}`} {...rest}>{children}</div>
}

function Badge({ s }: { s: string }) {
  const m: Record<string, string> = {
    'Needs Review': 'bg-amber-500/20 text-amber-400',
    'Needs Drew': 'bg-amber-500/20 text-amber-400',
    'Complete': 'bg-emerald-500/20 text-emerald-400',
    'Locked': 'bg-purple-500/20 text-purple-400',
    'Superseded': 'bg-white/10 text-[#64748B]',
    'Reference': 'bg-white/10 text-[#64748B]',
    'Living Doc': 'bg-[#38BDF8]/20 text-[#38BDF8]',
    'Waiting on Doug': 'bg-[#38BDF8]/20 text-[#38BDF8]',
    'Waiting on Drew': 'bg-orange-500/20 text-orange-400',
  }
  return <span className={`text-xs px-2 py-0.5 rounded whitespace-nowrap ${m[s] || 'bg-white/10 text-[#64748B]'}`}>{s}</span>
}

function PBadge({ p }: { p: string }) {
  const c = p === 'high' ? 'bg-red-500/20 text-red-400' : p === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-[#64748B]'
  return <span className={`text-xs px-2 py-0.5 rounded ${c}`}>{p}</span>
}

export default function MissionControl() {
  const [view, setView] = useState<View>('deliverables')
  const [readingDoc, setReadingDoc] = useState<string | null>(null)
  const [docContent, setDocContent] = useState('')
  const [loading, setLoading] = useState(false)

  const openDoc = async (file: string) => {
    // External links open in new tab
    if (file.startsWith('__external__')) {
      window.open(file.replace('__external__', ''), '_blank')
      return
    }
    setLoading(true)
    try {
      const r = await fetch(`/docs/${file}.md`)
      setDocContent(await r.text())
      setReadingDoc(file)
    } catch { setDocContent('# Error loading document') }
    setLoading(false)
  }

  const logout = () => {
    document.cookie = 'as-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    window.location.href = '/login'
  }

  const total = TASKS.backlog.length + TASKS.inProgress.length + TASKS.done.length
  const pct = Math.round((TASKS.done.length / total) * 100)

  // If reading a doc, show full-screen reader
  if (readingDoc) {
    const d = DELIVERABLES.find(x => x.file === readingDoc)
    return (
      <div className="min-h-screen bg-[#0A0F1A] p-6">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setReadingDoc(null)} className="text-[#94A3B8] hover:text-[#38BDF8] text-sm mb-6 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Deliverables
          </button>
          {d && (
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-xl font-bold text-[#F1F5F9]">{d.title}</h1>
              <Badge s={d.status} />
              <span className="text-sm text-[#64748B]">{d.version}</span>
            </div>
          )}
          {loading ? (
            <p className="text-[#64748B]">Loading...</p>
          ) : (
            <Card className="p-8">
              <div className="prose prose-invert max-w-none prose-headings:text-[#F1F5F9] prose-p:text-[#94A3B8] prose-strong:text-[#F1F5F9] prose-code:text-[#38BDF8] prose-li:text-[#94A3B8] prose-table:text-[#94A3B8] prose-th:text-[#F1F5F9] prose-td:text-[#94A3B8] prose-hr:border-[#1E2A42]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{docContent}</ReactMarkdown>
              </div>
            </Card>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0F1A] flex">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-52 bg-[#0A0F1A] border-r border-[#1E2A42] flex flex-col z-20">
        <div className="h-14 flex items-center px-5 border-b border-[#1E2A42]">
          <span className="font-bold text-[#F1F5F9] text-lg">AgentScore</span>
        </div>
        <nav className="flex-1 py-3">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setView(n.id)}
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-all ${
                view === n.id ? 'border-l-2 border-[#38BDF8] bg-white/5 text-[#F1F5F9]' : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5'
              }`}>
              <n.icon className="w-4 h-4" />{n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#1E2A42]">
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 text-[#94A3B8] hover:text-[#F1F5F9] text-sm">
            <LogOut className="w-4 h-4" />Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-52">
        <header className="h-14 flex items-center justify-between border-b border-[#1E2A42] px-6 bg-[#0A0F1A]/95 backdrop-blur sticky top-0 z-10">
          <span className="text-[#F1F5F9] font-semibold">Mission Control</span>
          <a href="/" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />Back to Site
          </a>
        </header>

        <div className="p-6 max-w-5xl">

          {/* DELIVERABLES */}
          {view === 'deliverables' && (
            <div className="space-y-4">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#F1F5F9]">Deliverables</h2>
                <p className="text-sm text-[#94A3B8] mt-1">Click any deliverable to read the full document.</p>
              </div>
              {DELIVERABLES.map((d, i) => (
                <Card key={i} className="p-4 cursor-pointer hover:border-[#38BDF8]/50 transition-colors" onClick={() => openDoc(d.file)}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#38BDF8] flex-shrink-0" />
                      <div>
                        <h3 className="text-[#F1F5F9] font-medium">{d.title}</h3>
                        <p className="text-sm text-[#94A3B8] mt-0.5">{d.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      <span className="text-xs text-[#64748B]">{d.version}</span>
                      <Badge s={d.status} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-8 text-xs text-[#64748B]">
                    <span>Owner: {d.owner}</span>
                  </div>
                </Card>
              ))}
            </div>
          )}

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
                <div>
                  <h3 className="text-[#F1F5F9] font-medium mb-3">Backlog <span className="text-[#64748B] text-sm ml-1">{TASKS.backlog.length}</span></h3>
                  <div className="space-y-2">{TASKS.backlog.map((t, i) => (
                    <Card key={i} className="p-3">
                      <h4 className="text-sm font-medium text-[#F1F5F9] mb-1">{t.title}</h4>
                      {t.note && <p className="text-xs text-[#94A3B8] mb-2">{t.note}</p>}
                      <div className="flex items-center justify-between">
                        <PBadge p={t.priority} />
                        <span className="text-xs text-[#64748B]">{t.owner}</span>
                      </div>
                    </Card>
                  ))}</div>
                </div>
                <div>
                  <h3 className="text-[#F1F5F9] font-medium mb-3">In Progress <span className="text-[#64748B] text-sm ml-1">{TASKS.inProgress.length}</span></h3>
                  <div className="space-y-2">{TASKS.inProgress.map((t, i) => (
                    <Card key={i} className="p-3">
                      <h4 className="text-sm font-medium text-[#F1F5F9] mb-1">{t.title}</h4>
                      {t.note && <p className="text-xs text-[#94A3B8] mb-2">{t.note}</p>}
                      <div className="flex items-center justify-between">
                        <PBadge p={t.priority} />
                        <span className="text-xs text-[#64748B]">{t.owner}</span>
                      </div>
                    </Card>
                  ))}</div>
                </div>
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

          {/* APPROVALS */}
          {view === 'approvals' && (
            <div className="space-y-4">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#F1F5F9]">Approvals and Decisions</h2>
                <p className="text-sm text-[#94A3B8] mt-1">Items waiting on Drew or Doug to move forward.</p>
              </div>
              {APPROVALS.map((a, i) => (
                <Card key={i} className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-[#F1F5F9] font-medium">{a.title}</h3>
                    <p className="text-sm text-[#94A3B8] mt-0.5">{a.desc}</p>
                  </div>
                  <Badge s={a.status} />
                </Card>
              ))}
            </div>
          )}

          {/* CALENDAR */}
          {view === 'calendar' && (
            <div className="space-y-4">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#F1F5F9]">Sprint Timeline</h2>
                <p className="text-sm text-[#94A3B8] mt-1">Feb 12 to Feb 25. Deadline is immovable.</p>
              </div>
              {CALENDAR.map((d, i) => (
                <Card key={i} className={`p-4 ${d.today ? 'border-l-2 border-l-[#38BDF8]' : ''} ${d.past ? 'opacity-50' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`font-semibold ${d.today ? 'text-[#38BDF8]' : 'text-[#F1F5F9]'}`}>{d.date}</span>
                    <span className="text-[#64748B] text-sm">{d.day}</span>
                    {d.today && <span className="text-xs px-2 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8]">TODAY</span>}
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
          )}

          {/* TEAM */}
          {view === 'team' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#F1F5F9] mb-4">Team</h2>
              {TEAM.map((m, i) => (
                <Card key={i} className="p-4 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    m.status === 'active' ? 'bg-[#38BDF8]/20 text-[#38BDF8]' : m.status === 'idle' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-[#64748B]'
                  }`}>{m.name[0]}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[#F1F5F9] font-medium">{m.name}</h3>
                      <span className="text-xs text-[#64748B]">{m.model}</span>
                    </div>
                    <p className="text-sm text-[#94A3B8]">{m.role}</p>
                  </div>
                  <p className="text-xs text-[#64748B] max-w-xs text-right">{m.task}</p>
                </Card>
              ))}
            </div>
          )}

          {/* ACTIVITY */}
          {view === 'activity' && (
            <div className="space-y-4">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#F1F5F9]">Activity Log</h2>
                <p className="text-sm text-[#94A3B8] mt-1">Everything that has happened on this project.</p>
              </div>
              {ACTIVITY.map((a, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[#38BDF8]">{a.who}</span>
                    <span className="text-xs text-[#64748B]">{a.when}</span>
                  </div>
                  <p className="text-sm text-[#94A3B8]">{a.what}</p>
                </Card>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
