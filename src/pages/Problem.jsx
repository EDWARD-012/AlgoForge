import { useState, useRef } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Editor } from '@monaco-editor/react'
import { mockProblems } from '../utils/dummyData'
import { Play, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Clock, Database, Tag } from 'lucide-react'

const DIFFICULTY_STYLES = {
  Easy:   { badge: 'text-emerald-400 bg-emerald-400/10', dot: 'bg-emerald-400' },
  Medium: { badge: 'text-amber-400   bg-amber-400/10',   dot: 'bg-amber-400'   },
  Hard:   { badge: 'text-rose-400    bg-rose-400/10',     dot: 'bg-rose-400'     },
}

const LANG_OPTIONS = [
  { value: 'cpp',        label: 'C++',        monacoLang: 'cpp'        },
  { value: 'python',     label: 'Python 3',   monacoLang: 'python'     },
  { value: 'java',       label: 'Java',       monacoLang: 'java'       },
  { value: 'javascript', label: 'JavaScript', monacoLang: 'javascript' },
]

// ── Left panel tabs ──────────────────────────────────────────────────────────
const DescriptionTab = ({ problem }) => {
  const diff = DIFFICULTY_STYLES[problem.difficulty] || DIFFICULTY_STYLES.Easy

  return (
    <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
      {/* Title row */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-xl font-bold text-white leading-tight">{problem.title}</h1>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${diff.badge}`}>
            {problem.difficulty}
          </span>
        </div>

        {/* Meta tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {problem.tags?.map(tag => (
            <span key={tag} className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
              <Tag className="w-3 h-3" />{tag}
            </span>
          ))}
          <span className="text-xs text-slate-500 ml-auto">Acceptance: {problem.acceptance}</span>
        </div>

        {/* Description */}
        <div className="text-sm text-slate-300 leading-relaxed space-y-2">
          {problem.description.split('\n\n').map((para, i) => (
            <p key={i} dangerouslySetInnerHTML={{
              __html: para
                .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-slate-700 rounded text-amber-300 font-mono text-xs">$1</code>')
                .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
                .replace(/\*([^*]+)\*/g, '<em class="text-slate-200">$1</em>')
                .replace(/\n/g, '<br/>')
            }} />
          ))}
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-4">
        {problem.examples?.map((ex, i) => (
          <div key={i} className="rounded-lg bg-slate-800/50 border border-slate-700/50 overflow-hidden">
            <div className="px-4 py-2 bg-slate-800 border-b border-slate-700/50">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Example {i + 1}</span>
            </div>
            <div className="p-4 font-mono text-sm space-y-2">
              <div><span className="text-slate-500">Input:&nbsp;&nbsp;</span><span className="text-slate-200">{ex.input}</span></div>
              <div><span className="text-slate-500">Output:&nbsp;</span><span className="text-slate-200">{ex.output}</span></div>
              {ex.explanation && (
                <div className="pt-1 text-xs text-slate-400 font-sans">
                  <span className="text-slate-500">Explanation: </span>{ex.explanation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Constraints */}
      {problem.constraints?.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Constraints:</h3>
          <ul className="space-y-1.5">
            {problem.constraints.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-400 font-mono">
                <span className="text-slate-600 mt-0.5">•</span>
                <code className="text-slate-300 text-xs bg-slate-800 px-1.5 py-0.5 rounded">{c}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ── Output status ────────────────────────────────────────────────────────────
const OutputPanel = ({ output, isSubmitting, status }) => {
  const isErr = status === 'error'
  const isOk  = status === 'success'

  return (
    <div className="h-52 bg-[#0d1117] border-t border-slate-700/60 flex flex-col flex-shrink-0">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700/40 bg-slate-900/60">
        <div className="flex items-center gap-2">
          {isOk  && <CheckCircle  className="w-3.5 h-3.5 text-emerald-400" />}
          {isErr && <AlertCircle  className="w-3.5 h-3.5 text-rose-400"    />}
          {!isOk && !isErr && <span className="w-3.5 h-3.5 rounded-full bg-slate-600 inline-block" />}
          <span className={`text-xs font-bold uppercase tracking-widest ${
            isOk ? 'text-emerald-400' : isErr ? 'text-rose-400' : 'text-slate-500'
          }`}>
            {isOk ? 'Accepted' : isErr ? 'Runtime Error' : 'Console Output'}
          </span>
        </div>
        {isSubmitting && (
          <span className="text-xs text-amber-400 animate-pulse font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" /> Executing…
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        {output ? (
          <>
            {/* Status overview bar */}
            {(isOk || isErr) && (
              <div className={`mb-3 flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold ${
                isOk
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                  : 'bg-rose-500/10    text-rose-300    border border-rose-500/20'
              }`}>
                {isOk ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                {isOk ? 'Your output matched expected output.' : 'Compilation / Runtime failed.'}
              </div>
            )}
            <pre className={`whitespace-pre-wrap font-mono text-sm leading-relaxed ${
              isErr ? 'text-rose-300' : 'text-emerald-200'
            }`}>
              {output}
            </pre>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2">
            <Database className="w-5 h-5" />
            <p className="text-xs font-sans italic">Run your code to see output here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export const Problem = () => {
  const { id } = useParams()
  const [language, setLanguage]       = useState('cpp')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [output, setOutput]           = useState('')
  const [status, setStatus]           = useState('idle')   // idle | success | error
  const [activeTab, setActiveTab]     = useState('description')
  const editorRef = useRef(null)

  const problem = mockProblems.find((p) => p.id === parseInt(id))
  if (!problem) return <Navigate to="/dashboard" replace />

  const currentLang = LANG_OPTIONS.find(l => l.value === language) || LANG_OPTIONS[0]

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor
  }

  const handleRunCode = async () => {
    if (language === 'javascript') {
      setStatus('error')
      setOutput('JavaScript execution is not yet supported.\nPlease switch to C++, Python 3, or Java.')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')
    setOutput('⏳ Compiling… please wait (Docker may pull image on first run)')

    const code = editorRef.current
      ? editorRef.current.getValue()
      : (problem.starterCode[language] || '')

    try {
      const res  = await fetch('http://localhost:5000/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code, problemId: problem.id }),
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        setStatus('error')
        setOutput(data.error || 'Execution failed.')
      } else {
        setStatus('success')
        setOutput(data.output || 'Program executed with no output.')
      }
    } catch {
      setStatus('error')
      setOutput('Server Error: Could not connect to compiler.\nMake sure the backend is running on port 5000.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const problemIdx = mockProblems.findIndex(p => p.id === parseInt(id))
  const prevProblem = mockProblems[problemIdx - 1]
  const nextProblem = mockProblems[problemIdx + 1]

  const diff = DIFFICULTY_STYLES[problem.difficulty] || DIFFICULTY_STYLES.Easy

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-[#0d1117] text-white">

      {/* ── LEFT PANEL ──────────────────────────────────────── */}
      <div className="w-[42%] min-w-[340px] flex flex-col border-r border-slate-700/50">

        {/* Tab bar */}
        <div className="flex items-center border-b border-slate-700/50 bg-[#161b22] px-2 flex-shrink-0">
          {['description'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-xs font-semibold capitalize transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
          {/* Nav arrows */}
          <div className="ml-auto flex items-center gap-1 pr-2">
            {prevProblem && (
              <a href={`/problem/${prevProblem.id}`} className="p-1 rounded hover:bg-slate-700 text-slate-500 hover:text-white transition-colors" title="Previous">
                <ChevronLeft className="w-4 h-4" />
              </a>
            )}
            {nextProblem && (
              <a href={`/problem/${nextProblem.id}`} className="p-1 rounded hover:bg-slate-700 text-slate-500 hover:text-white transition-colors" title="Next">
                <ChevronRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeTab === 'description' && <DescriptionTab problem={problem} />}
        </div>
      </div>

      {/* ── RIGHT PANEL: EDITOR + OUTPUT ────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Editor toolbar */}
        <div className="h-12 flex items-center justify-between px-4 border-b border-slate-700/50 bg-[#161b22] flex-shrink-0">
          {/* Language picker */}
          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-1.5 outline-none cursor-pointer hover:bg-slate-700 transition-colors"
            >
              {LANG_OPTIONS.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
            {/* Difficulty dot */}
            <span className={`w-2 h-2 rounded-full ${diff.dot}`} />
            <span className="text-xs text-slate-500">{problem.difficulty}</span>
          </div>

          {/* Run button */}
          <button
            id="run-code-btn"
            onClick={handleRunCode}
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-all active:scale-95 shadow-lg shadow-emerald-500/10"
          >
            <Play className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-pulse' : ''}`} fill="currentColor" />
            {isSubmitting ? 'Running…' : 'Run Code'}
          </button>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 overflow-hidden">
          <Editor
            height="100%"
            theme="vs-dark"
            language={currentLang.monacoLang}
            value={problem.starterCode[language] || ''}
            onMount={handleEditorDidMount}
            loading={
              <div className="flex items-center justify-center h-full text-slate-500 text-sm gap-2">
                <div className="w-4 h-4 border-2 border-slate-600 border-t-slate-300 rounded-full animate-spin" />
                Loading editor…
              </div>
            }
            options={{
              minimap:              { enabled: false },
              fontSize:             14,
              fontFamily:           "'JetBrains Mono', 'Fira Code', Consolas, monospace",
              fontLigatures:        true,
              tabSize:              4,
              insertSpaces:         true,
              wordWrap:             'on',
              padding:              { top: 16, bottom: 16 },
              scrollBeyondLastLine: false,
              smoothScrolling:      true,
              cursorBlinking:       'smooth',
              renderLineHighlight:  'gutter',
              lineNumbers:          'on',
              glyphMargin:          false,
              folding:              true,
              bracketPairColorization: { enabled: true },
            }}
          />
        </div>

        {/* Output panel */}
        <OutputPanel output={output} isSubmitting={isSubmitting} status={status} />
      </div>
    </div>
  )
}
