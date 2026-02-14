'use client'

import { useState } from 'react'
import {
  CheckSquare, FileText, ClipboardCheck, Calendar, Users, Clock, LogOut,
  ExternalLink, FolderOpen, Folder, Download, Eye, ChevronRight, Star, ArrowLeft
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// === FILE SYSTEM ===
interface FileItem {
  name: string
  file: string  // path under /docs/ (without .md) or __external__/path
  version: string
  status: string
  date: string
  size: string
  owner: string
}

interface FolderItem {
  name: string
  icon?: string
  files: FileItem[]
}

const FILE_SYSTEM: FolderItem[] = [
  {
    name: 'Submission Deliverables',
    files: [
      { name: 'Subnet Design Proposal', file: 'proposal-v3', version: 'v3', status: 'Needs Review', date: 'Feb 13', size: '21 KB', owner: 'Doug' },
      { name: 'Pitch Deck (Slides)', file: '__external__/deck.html', version: 'v2', status: 'Needs Review', date: 'Feb 13', size: '12 KB', owner: 'Doug' },
      { name: 'Explainer Video Scripts', file: 'video-scripts-v2', version: 'v2', status: 'Needs Review', date: 'Feb 13', size: '19 KB', owner: 'Doug' },
      { name: 'X/Twitter Launch Posts (30)', file: 'x-posts-v2', version: 'v2', status: 'Needs Review', date: 'Feb 13', size: '8 KB', owner: 'Doug' },
      { name: 'Hero Headline Options', file: 'hero-headline-options', version: 'v1', status: 'Needs Drew Pick', date: 'Feb 13', size: '3 KB', owner: 'Doug' },
    ]
  },
  {
    name: 'Strategy & Research',
    files: [
      { name: 'Gap Analysis (How to Win)', file: 'gap-analysis', version: 'v1', status: 'Complete', date: 'Feb 13', size: '24 KB', owner: 'Doug' },
      { name: 'Competitor Analysis', file: 'competitor-analysis', version: 'v1', status: 'Complete', date: 'Feb 13', size: '18 KB', owner: 'Doug' },
      { name: 'Winning Subnets Research', file: 'winning-subnets-research', version: 'v1', status: 'Complete', date: 'Feb 13', size: '24 KB', owner: 'Doug' },
      { name: 'Research Brief', file: 'research-brief', version: 'v1', status: 'Complete', date: 'Feb 12', size: '25 KB', owner: 'Analyst' },
      { name: 'Agentic Commerce Landscape', file: 'research-gaps-filled', version: 'v1', status: 'Complete', date: 'Feb 13', size: '5 KB', owner: 'Doug' },
    ]
  },
  {
    name: 'Reference / Archive',
    files: [
      { name: 'Business Analysis', file: 'business-analysis', version: 'v1', status: 'Reference', date: 'Feb 12', size: '44 KB', owner: 'Doug' },
      { name: 'Previous Proposal (v2)', file: 'proposal-v2', version: 'v2', status: 'Superseded', date: 'Feb 13', size: '31 KB', owner: 'Doug' },
      { name: 'Original Proposal (v1)', file: 'ideathon-submission', version: 'v1', status: 'Superseded', date: 'Feb 12', size: '34 KB', owner: 'Doug' },
      { name: 'Project Plan', file: 'project-plan', version: 'v1', status: 'Reference', date: 'Feb 12', size: '5 KB', owner: 'Doug' },
      { name: 'Ideathon Requirements', file: 'ideathon-requirements', version: 'v1', status: 'Reference', date: 'Feb 12', size: '2 KB', owner: 'Doug' },
    ]
  },
]

// === TASKS ===
const TASKS = {
  backlog: [
    { title: 'Create X/Twitter account', owner: 'Drew', priority: 'high', note: 'Required for submission' },
    { title: 'Register on HackQuest', owner: 'Drew', priority: 'high', note: 'Submission platform' },
    { title: 'Contact dev co-founder candidate', owner: 'Drew', priority: 'high', note: 'For Round 2 testnet' },
    { title: 'Send proposal to domain experts', owner: 'Drew', priority: 'medium', note: 'External feedback' },
    { title: 'Record explainer video', owner: 'Drew', priority: 'medium', note: 'After script approval' },
  ],
  inProgress: [
    { title: 'Drew: review all deliverables', owner: 'Drew', priority: 'high', note: 'Proposal, deck, scripts, X posts, headlines' },
    { title: 'Drew: pick hero headline', owner: 'Drew', priority: 'medium', note: '5 options ready' },
    { title: 'Technical architecture analysis', owner: 'Doug', priority: 'high', note: 'Full build plan for subnet' },
    { title: 'MC file manager rebuild', owner: 'Doug', priority: 'high', note: 'Google Drive style' },
  ],
  done: [
    { title: 'Competitor analysis (25+ companies)', owner: 'Doug' },
    { title: 'Video scripts v2 (Drew\'s voice)', owner: 'Doug' },
    { title: 'X posts v2 (30 posts, verified)', owner: 'Doug' },
    { title: 'Hero headline options (5)', owner: 'Doug' },
    { title: 'Proposal v3 (major rewrite)', owner: 'Doug' },
    { title: 'Pitch deck v2 (Drew\'s voice)', owner: 'Doug' },
    { title: 'Gap analysis', owner: 'Doug' },
    { title: 'Winning subnets research', owner: 'Doug' },
    { title: 'HTML slide deck', owner: 'Dev Agent' },
    { title: 'Research brief v1', owner: 'Analyst' },
    { title: 'Landing page + deploy', owner: 'Dev Agent' },
    { title: 'Mission Control v1-v3', owner: 'Doug' },
  ],
}

const APPROVALS = [
  { title: 'Proposal v3 review', status: 'Needs Drew', desc: 'Read and provide feedback' },
  { title: 'Pitch deck review', status: 'Needs Drew', desc: 'Review slides at /deck.html' },
  { title: 'Video script selection', status: 'Needs Drew', desc: 'Pick Version A or B (or hybrid)' },
  { title: 'X post approval', status: 'Needs Drew', desc: 'Select which posts to queue first' },
  { title: 'Hero headline pick', status: 'Needs Drew', desc: '5 options ready, pick one' },
  { title: 'Brand direction', status: 'Locked', desc: 'Dark fintech, ice blue' },
  { title: 'Manifesto line', status: 'Locked', desc: '"When machines spend money..."' },
  { title: 'Dev co-founder', status: 'Waiting on Drew', desc: 'Drew has candidate in mind' },
]

const CALENDAR = [
  { date: 'Feb 12', day: 'Wed', past: true, items: ['Workspace setup', 'Landing page deployed', 'Research brief v1', 'Project plan'] },
  { date: 'Feb 13', day: 'Thu', past: true, items: ['All first drafts completed', 'Proposal v3 rewrite', 'Competitor analysis', 'MC rebuilt 3x', 'Slide deck built', 'Video scripts + X posts in Drew\'s voice'] },
  { date: 'Feb 14', day: 'Fri', today: true, items: ['Technical architecture analysis', 'MC file manager rebuild', 'Drew reviews deliverables', 'Drew picks hero headline'] },
  { date: 'Feb 15-16', day: 'Weekend', items: ['Incorporate Drew feedback', 'Polish all deliverables', 'Video script locked'] },
  { date: 'Feb 17', day: 'Mon', items: ['Contact dev co-founder', 'Send proposal to experts'] },
  { date: 'Feb 18-19', day: 'Tue-Wed', items: ['Expert feedback integration', 'Final content polish'] },
  { date: 'Feb 20', day: 'Thu', items: ['All written content locked'] },
  { date: 'Feb 21', day: 'Fri', items: ['Record explainer video'], milestone: 'DRAFTS LOCKED' },
  { date: 'Feb 22-23', day: 'Weekend', items: ['Video editing', 'Final polish'] },
  { date: 'Feb 24', day: 'Mon', items: ['Final sign-off', 'Prep submission'] },
  { date: 'Feb 25', day: 'Tue', items: ['SUBMIT TO HACKQUEST'], milestone: 'DEADLINE' },
]

const TEAM = [
  { name: 'Doug', role: 'PM / Chief of Staff', model: 'Claude Opus 4', status: 'active', task: 'Technical architecture analysis' },
  { name: 'Lead Analyst', role: 'Research', model: 'Kimi K2.5', status: 'idle', task: 'On standby' },
  { name: 'Developer', role: 'Frontend', model: 'Kimi K2.5', status: 'idle', task: 'On standby' },
  { name: 'Marketing', role: 'Content', model: 'Kimi K2.5', status: 'pending', task: 'Not yet initialized' },
  { name: 'Drew Stohl', role: 'Founder', model: 'Human', status: 'active', task: 'Reviewing deliverables' },
]

const ACTIVITY = [
  { who: 'Doug', what: 'Technical architecture analysis started', when: 'Feb 14, 9:00 AM' },
  { who: 'Doug', what: 'MC rebuilt as file manager (Google Drive style)', when: 'Feb 14, 9:00 AM' },
  { who: 'Doug', what: 'Competitor analysis completed (25+ companies)', when: 'Feb 13, 6:55 PM' },
  { who: 'Doug', what: 'Video scripts v2 completed (Drew\'s voice)', when: 'Feb 13, 6:52 PM' },
  { who: 'Doug', what: 'X posts v2: 30 posts, verified char counts', when: 'Feb 13, 6:52 PM' },
  { who: 'Doug', what: 'Hero headline options delivered (5 options)', when: 'Feb 13, 6:52 PM' },
  { who: 'Doug', what: 'Pitch deck rewritten in Drew\'s voice', when: 'Feb 13, 4:58 PM' },
  { who: 'Doug', what: 'Proposal v3 completed (major mechanism design rewrite)', when: 'Feb 13, 5:15 PM' },
  { who: 'Doug', what: 'Gap analysis + winning subnets research completed', when: 'Feb 13, 4:45 PM' },
  { who: 'Doug', what: 'MC v3: merged Content+Docs, fixed doc viewer', when: 'Feb 13, 4:20 PM' },
  { who: 'Doug', what: 'All 4 first drafts completed (proposal, deck, scripts, posts)', when: 'Feb 13, 4:03 PM' },
  { who: 'Doug', what: 'Mission Control v2 shipped', when: 'Feb 13, 11:20 AM' },
  { who: 'Dev Agent', what: 'Landing page polish (particles, colors, login)', when: 'Feb 13, 10:15 AM' },
  { who: 'Doug', what: 'First boot. Met Drew.', when: 'Feb 12, 3:00 PM' },
]

// === VIEWS ===
type View = 'files' | 'tasks' | 'approvals' | 'calendar' | 'team' | 'activity'

const NAV: { id: View; label: string; icon: any }[] = [
  { id: 'files', label: 'Files', icon: FolderOpen },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
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
    'Needs Drew Pick': 'bg-amber-500/20 text-amber-400',
    'Complete': 'bg-emerald-500/20 text-emerald-400',
    'Locked': 'bg-purple-500/20 text-purple-400',
    'Superseded': 'bg-white/5 text-[#64748B]',
    'Reference': 'bg-white/5 text-[#64748B]',
    'Waiting on Drew': 'bg-orange-500/20 text-orange-400',
  }
  return <span className={`text-xs px-2 py-0.5 rounded whitespace-nowrap ${m[s] || 'bg-white/10 text-[#64748B]'}`}>{s}</span>
}

function PBadge({ p }: { p: string }) {
  const c = p === 'high' ? 'bg-red-500/20 text-red-400' : p === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-[#64748B]'
  return <span className={`text-xs px-2 py-0.5 rounded ${c}`}>{p}</span>
}

export default function MissionControl() {
  const [view, setView] = useState<View>('files')
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['Submission Deliverables']))
  const [previewFile, setPreviewFile] = useState<{ name: string; file: string } | null>(null)
  const [previewContent, setPreviewContent] = useState('')
  const [loading, setLoading] = useState(false)

  const toggleFolder = (name: string) => {
    const next = new Set(expandedFolders)
    next.has(name) ? next.delete(name) : next.add(name)
    setExpandedFolders(next)
  }

  const openFile = (f: FileItem) => {
    if (f.file.startsWith('__external__')) {
      window.open(f.file.replace('__external__', ''), '_blank')
      return
    }
    // Open as download/new tab for review (not inline)
    window.open(`/docs/${f.file}.md`, '_blank')
  }

  const previewDoc = async (f: FileItem) => {
    if (f.file.startsWith('__external__')) {
      window.open(f.file.replace('__external__', ''), '_blank')
      return
    }
    setLoading(true)
    try {
      const r = await fetch(`/docs/${f.file}.md`)
      setPreviewContent(await r.text())
      setPreviewFile({ name: f.name, file: f.file })
    } catch { setPreviewContent('Error loading file.') }
    setLoading(false)
  }

  const logout = () => {
    document.cookie = 'as-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    window.location.href = '/login'
  }

  const total = TASKS.backlog.length + TASKS.inProgress.length + TASKS.done.length
  const pct = Math.round((TASKS.done.length / total) * 100)

  // Preview mode
  if (previewFile) {
    return (
      <div className="min-h-screen bg-[#0A0F1A] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setPreviewFile(null)} className="text-[#94A3B8] hover:text-[#38BDF8] text-sm flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Files
            </button>
            <a href={`/docs/${previewFile.file}.md`} target="_blank" className="text-[#38BDF8] hover:text-[#38BDF8]/80 text-sm flex items-center gap-2">
              <Download className="w-4 h-4" /> Open Raw File
            </a>
          </div>
          <h1 className="text-xl font-bold text-[#F1F5F9] mb-4">{previewFile.name}</h1>
          {loading ? (
            <p className="text-[#64748B]">Loading...</p>
          ) : (
            <Card className="p-8">
              <div className="prose prose-invert max-w-none prose-headings:text-[#F1F5F9] prose-p:text-[#94A3B8] prose-strong:text-[#F1F5F9] prose-code:text-[#38BDF8] prose-li:text-[#94A3B8] prose-th:text-[#F1F5F9] prose-td:text-[#94A3B8] prose-hr:border-[#1E2A42]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{previewContent}</ReactMarkdown>
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

          {/* FILES */}
          {view === 'files' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-[#F1F5F9]">Files</h2>
                  <p className="text-sm text-[#94A3B8] mt-0.5">Click any file to open. Use the eye icon to preview.</p>
                </div>
              </div>

              {FILE_SYSTEM.map(folder => (
                <div key={folder.name}>
                  {/* Folder header */}
                  <button
                    onClick={() => toggleFolder(folder.name)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <ChevronRight className={`w-4 h-4 text-[#64748B] transition-transform ${expandedFolders.has(folder.name) ? 'rotate-90' : ''}`} />
                    {expandedFolders.has(folder.name)
                      ? <FolderOpen className="w-4 h-4 text-[#38BDF8]" />
                      : <Folder className="w-4 h-4 text-[#38BDF8]" />
                    }
                    <span className="text-[#F1F5F9] font-medium text-sm">{folder.name}</span>
                    <span className="text-[#64748B] text-xs ml-1">{folder.files.length} files</span>
                  </button>

                  {/* File list */}
                  {expandedFolders.has(folder.name) && (
                    <div className="ml-6 border-l border-[#1E2A42] pl-2 mb-2">
                      {/* Table header */}
                      <div className="grid grid-cols-12 gap-2 px-3 py-1.5 text-xs text-[#64748B] uppercase tracking-wider">
                        <div className="col-span-5">Name</div>
                        <div className="col-span-1">Version</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-1">Date</div>
                        <div className="col-span-1">Size</div>
                        <div className="col-span-1">Owner</div>
                        <div className="col-span-1"></div>
                      </div>

                      {folder.files.map((f, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-12 gap-2 items-center px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group"
                          onClick={() => openFile(f)}
                        >
                          <div className="col-span-5 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
                            <span className="text-sm text-[#F1F5F9] group-hover:text-[#38BDF8] transition-colors truncate">{f.name}</span>
                          </div>
                          <div className="col-span-1 text-xs text-[#94A3B8]">{f.version}</div>
                          <div className="col-span-2"><Badge s={f.status} /></div>
                          <div className="col-span-1 text-xs text-[#64748B]">{f.date}</div>
                          <div className="col-span-1 text-xs text-[#64748B]">{f.size}</div>
                          <div className="col-span-1 text-xs text-[#64748B]">{f.owner}</div>
                          <div className="col-span-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => { e.stopPropagation(); previewDoc(f) }}
                              className="p-1 text-[#64748B] hover:text-[#38BDF8]"
                              title="Preview"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            {!f.file.startsWith('__external__') && (
                              <a
                                href={`/docs/${f.file}.md`}
                                download
                                onClick={(e) => e.stopPropagation()}
                                className="p-1 text-[#64748B] hover:text-[#38BDF8]"
                                title="Download"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                        <PBadge p={t.priority} /><span className="text-xs text-[#64748B]">{t.owner}</span>
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
                        <PBadge p={t.priority} /><span className="text-xs text-[#64748B]">{t.owner}</span>
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
              <h2 className="text-lg font-bold text-[#F1F5F9] mb-4">Approvals and Decisions</h2>
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
              <h2 className="text-lg font-bold text-[#F1F5F9] mb-4">Sprint Timeline</h2>
              {CALENDAR.map((d, i) => (
                <Card key={i} className={`p-4 ${d.today ? 'border-l-2 border-l-[#38BDF8]' : ''} ${d.past ? 'opacity-50' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`font-semibold ${d.today ? 'text-[#38BDF8]' : 'text-[#F1F5F9]'}`}>{d.date}</span>
                    <span className="text-[#64748B] text-sm">{d.day}</span>
                    {d.today && <span className="text-xs px-2 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8]">TODAY</span>}
                    {d.milestone && <span className={`ml-auto text-xs px-2 py-0.5 rounded ${d.milestone === 'DEADLINE' ? 'bg-red-500/20 text-red-400' : 'bg-purple-500/20 text-purple-400'}`}>{d.milestone}</span>}
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
              <h2 className="text-lg font-bold text-[#F1F5F9] mb-4">Activity Log</h2>
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
