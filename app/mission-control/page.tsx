'use client'

import { useState, useEffect } from 'react'
import { 
  Activity, 
  LayoutDashboard, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  ArrowLeft,
  Clock,
  Target,
  CheckCircle2,
  Circle,
  AlertCircle,
  Users,
  ExternalLink
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Document definitions
const documents = [
  { id: 'research-brief', filename: 'research-brief.md', title: 'Research Brief', status: 'v1 complete' },
  { id: 'project-plan', filename: 'project-plan.md', title: 'Project Plan', status: 'Living document' },
  { id: 'ideathon-submission', filename: 'ideathon-submission.md', title: 'Subnet Design Proposal', status: 'In progress' },
  { id: 'business-analysis', filename: 'business-analysis.md', title: 'Strategic Business Analysis', status: 'Internal reference' },
  { id: 'ideathon-requirements', filename: 'ideathon-requirements.md', title: 'Ideathon Requirements', status: 'Reference' },
  { id: 'punchlist', filename: 'punchlist.md', title: 'Punch List — Feb 13', status: 'Active' },
]

// Task data
const tasks = {
  todo: [
    { id: 1, title: 'Create X/Twitter account', assignee: 'Drew', priority: 'high' },
    { id: 2, title: 'Register team on HackQuest', assignee: 'Drew', priority: 'high' },
    { id: 3, title: 'Contact technical co-founder candidate', assignee: 'Drew', priority: 'high' },
    { id: 4, title: 'Fill research gaps with analyst sprint', assignee: 'Doug', priority: 'high' },
  ],
  inProgress: [
    { id: 5, title: 'Restructure proposal outline', assignee: 'Doug', priority: 'high' },
    { id: 6, title: 'Landing page Mission Control', assignee: 'Developer', priority: 'high' },
    { id: 7, title: 'Review friend feedback on strategy', assignee: 'Doug', priority: 'medium' },
  ],
  done: [
    { id: 8, title: 'Read all existing docs', assignee: 'Doug', priority: 'done' },
    { id: 9, title: 'Analyze ideathon requirements', assignee: 'Doug', priority: 'done' },
    { id: 10, title: 'Establish agent team structure', assignee: 'Doug', priority: 'done' },
    { id: 11, title: 'Landing page v1 live on Vercel', assignee: 'Developer', priority: 'done' },
  ]
}

// Sprint data
const sprintDays = 13 // Days remaining until Feb 25

// Team members
const team = [
  { name: 'Doug', role: 'PM / Chief of Staff', status: 'Active', avatar: '🦬' },
  { name: 'Drew', role: 'Founder', status: 'Active', avatar: '🎯' },
  { name: 'Lead Analyst', role: 'Research', status: 'Running', avatar: '🔍' },
  { name: 'Developer', role: 'Web / UI', status: 'Running', avatar: '💻' },
  { name: 'Marketing', role: 'Content / Social', status: 'Pending', avatar: '📢' },
]

export default function MissionControl() {
  const [activeView, setActiveView] = useState<'dashboard' | 'document'>('dashboard')
  const [selectedDoc, setSelectedDoc] = useState<typeof documents[0] | null>(null)
  const [docContent, setDocContent] = useState<string>('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [docsExpanded, setDocsExpanded] = useState(true)
  const [loading, setLoading] = useState(false)

  // Calculate days remaining
  const targetDate = new Date('2026-02-25')
  const today = new Date()
  const daysRemaining = Math.max(0, Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))

  // Load document content
  const loadDocument = async (doc: typeof documents[0]) => {
    setLoading(true)
    try {
      const response = await fetch(`/docs/${doc.filename}`)
      const content = await response.text()
      setDocContent(content)
      setSelectedDoc(doc)
      setActiveView('document')
      setSidebarOpen(false) // Close sidebar on mobile after selection
    } catch (error) {
      console.error('Failed to load document:', error)
      setDocContent('# Error\n\nFailed to load document.')
    } finally {
      setLoading(false)
    }
  }

  // Back to dashboard
  const backToDashboard = () => {
    setActiveView('dashboard')
    setSelectedDoc(null)
    setDocContent('')
  }

  // Logout
  const handleLogout = () => {
    document.cookie = 'as-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    window.location.href = '/login'
  }

  // Status badge color
  const getStatusColor = (status: string) => {
    const s = status.toLowerCase()
    if (s.includes('complete') || s.includes('done') || s.includes('active')) return 'bg-green-500/20 text-green-400 border-green-500/30'
    if (s.includes('progress') || s.includes('running')) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    if (s.includes('pending')) return 'bg-red-500/20 text-red-400 border-red-500/30'
    return 'bg-white/10 text-as-muted border-white/10'
  }

  // Priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400'
      case 'done': return 'bg-green-500/20 text-green-400'
      default: return 'bg-white/10 text-as-muted'
    }
  }

  return (
    <div className="min-h-screen bg-as-dark flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-as-navy border-r border-white/10
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-as-accent flex items-center justify-center flex-shrink-0">
              <Activity className="w-6 h-6 text-as-dark" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white">AgentScore</h1>
              <p className="text-xs text-as-muted">Mission Control</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* Dashboard */}
          <button
            onClick={() => {
              backToDashboard()
              setSidebarOpen(false)
            }}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all
              ${activeView === 'dashboard' 
                ? 'bg-white/10 border-l-2 border-as-accent text-white' 
                : 'text-as-muted hover:bg-white/5 hover:text-white border-l-2 border-transparent'}
            `}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          {/* Documents with expand */}
          <div>
            <button
              onClick={() => setDocsExpanded(!docsExpanded)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all
                ${activeView === 'document' 
                  ? 'bg-white/10 border-l-2 border-as-accent text-white' 
                  : 'text-as-muted hover:bg-white/5 hover:text-white border-l-2 border-transparent'}
              `}
            >
              <FileText className="w-5 h-5" />
              <span className="flex-1">Documents</span>
              {docsExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {/* Document list */}
            {docsExpanded && (
              <div className="mt-1 ml-4 space-y-1">
                {documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => loadDocument(doc)}
                    className={`
                      w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left text-sm transition-all
                      ${selectedDoc?.id === doc.id
                        ? 'bg-as-accent/20 text-as-accent border-l-2 border-as-accent' 
                        : 'text-as-muted hover:bg-white/5 hover:text-white border-l-2 border-transparent'}
                    `}
                  >
                    <span className="truncate flex-1">{doc.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-as-muted hover:bg-white/5 hover:text-red-400 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden bg-as-navy border-b border-white/10 p-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-white/5 text-as-muted hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-as-accent" />
            <span className="font-bold text-white">AgentScore</span>
          </div>
        </header>

        {/* Content area */}
        <div className="h-[calc(100vh-64px)] lg:h-screen overflow-y-auto">
          {activeView === 'dashboard' ? (
            <div className="p-6 lg:p-8 space-y-8">
              {/* Page header */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Dashboard</h2>
                <p className="text-as-muted">Bittensor Ideathon Sprint — Feb 25 Deadline</p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Days remaining */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-as-accent/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-as-accent" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">{daysRemaining}</p>
                      <p className="text-sm text-as-muted">Days Remaining</p>
                    </div>
                  </div>
                </div>

                {/* Sprint progress */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">4/6</p>
                      <p className="text-sm text-as-muted">Deliverables in Progress</p>
                    </div>
                  </div>
                </div>

                {/* Tasks status */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">{tasks.done.length}</p>
                      <p className="text-sm text-as-muted">Tasks Completed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task tracker */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-as-accent" />
                    Task Tracker
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                  {/* To Do */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Circle className="w-4 h-4 text-red-400" />
                      <h4 className="font-medium text-white">To Do</h4>
                      <span className="ml-auto text-xs bg-white/10 text-as-muted px-2 py-1 rounded">
                        {tasks.todo.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {tasks.todo.map((task) => (
                        <div 
                          key={task.id}
                          className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-all"
                        >
                          <p className="text-sm text-white mb-2">{task.title}</p>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <span className="text-xs text-as-muted">{task.assignee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* In Progress */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                      <h4 className="font-medium text-white">In Progress</h4>
                      <span className="ml-auto text-xs bg-white/10 text-as-muted px-2 py-1 rounded">
                        {tasks.inProgress.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {tasks.inProgress.map((task) => (
                        <div 
                          key={task.id}
                          className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-all"
                        >
                          <p className="text-sm text-white mb-2">{task.title}</p>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <span className="text-xs text-as-muted">{task.assignee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Done */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <h4 className="font-medium text-white">Done</h4>
                      <span className="ml-auto text-xs bg-white/10 text-as-muted px-2 py-1 rounded">
                        {tasks.done.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {tasks.done.map((task) => (
                        <div 
                          key={task.id}
                          className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-all opacity-60"
                        >
                          <p className="text-sm text-white line-through mb-2">{task.title}</p>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <span className="text-xs text-as-muted">{task.assignee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-as-accent" />
                    Documents
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documents.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => loadDocument(doc)}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-as-accent/50 transition-all text-left group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-as-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-as-accent/20 transition-colors">
                          <FileText className="w-5 h-5 text-as-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white truncate group-hover:text-as-accent transition-colors">
                            {doc.title}
                          </h4>
                          <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded border ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-as-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Team section */}
              <div>
                <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-as-accent" />
                  Team
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {team.map((member) => (
                    <div
                      key={member.name}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 text-2xl">
                        {member.avatar}
                      </div>
                      <h4 className="font-medium text-white">{member.name}</h4>
                      <p className="text-xs text-as-muted mt-1">{member.role}</p>
                      <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded border ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Document view */
            <div className="h-full flex flex-col">
              {/* Document header */}
              <div className="p-4 lg:p-6 border-b border-white/10 flex items-center gap-4 sticky top-0 bg-as-dark/95 backdrop-blur z-10">
                <button
                  onClick={backToDashboard}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-as-muted hover:text-white hover:border-as-accent/50 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-white truncate">
                    {selectedDoc?.title}
                  </h2>
                  <p className="text-sm text-as-muted">{selectedDoc?.filename}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded border ${getStatusColor(selectedDoc?.status || '')}`}>
                  {selectedDoc?.status}
                </span>
              </div>

              {/* Document content */}
              <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin w-8 h-8 border-2 border-as-accent border-t-transparent rounded-full" />
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto prose prose-invert prose-cyan">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => <h1 className="text-3xl font-bold text-white mb-6 pb-4 border-b border-white/10">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-2xl font-bold text-white mt-10 mb-4">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl font-bold text-white mt-8 mb-3">{children}</h3>,
                        h4: ({ children }) => <h4 className="text-lg font-semibold text-white mt-6 mb-2">{children}</h4>,
                        p: ({ children }) => <p className="text-as-muted leading-relaxed mb-4">{children}</p>,
                        a: ({ children, href }) => <a href={href} className="text-as-accent hover:text-as-accent-hover underline">{children}</a>,
                        code: ({ children, className }) => {
                          const isInline = !className
                          return isInline ? (
                            <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-as-accent">{children}</code>
                          ) : (
                            <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4">
                              <code className={`${className} text-sm`}>{children}</code>
                            </pre>
                          )
                        },
                        ul: ({ children }) => <ul className="list-disc list-inside text-as-muted space-y-1 mb-4 ml-4">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside text-as-muted space-y-1 mb-4 ml-4">{children}</ol>,
                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-as-accent pl-4 italic text-as-muted my-4">
                            {children}
                          </blockquote>
                        ),
                        table: ({ children }) => (
                          <div className="overflow-x-auto mb-4">
                            <table className="w-full border border-white/10 rounded-lg overflow-hidden">
                              {children}
                            </table>
                          </div>
                        ),
                        thead: ({ children }) => <thead className="bg-white/5">{children}</thead>,
                        tbody: ({ children }) => <tbody>{children}</tbody>,
                        tr: ({ children }) => <tr className="border-b border-white/10 last:border-0">{children}</tr>,
                        th: ({ children }) => <th className="text-left px-4 py-3 font-semibold text-white">{children}</th>,
                        td: ({ children }) => <td className="px-4 py-3 text-as-muted">{children}</td>,
                        hr: () => <hr className="border-white/10 my-8" />,
                      }}
                    >
                      {docContent}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
