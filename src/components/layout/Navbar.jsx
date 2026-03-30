import { useUserStore } from '../../store/useUserStore'
import { Link } from 'react-router-dom'
import { Code2 } from 'lucide-react'

export const Navbar = () => {
  const userLevel = useUserStore((state) => state.userLevel)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 transition-all">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Code2 className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            AlgoForge
          </span>
        </Link>
        <div className="flex-1" />
        <nav className="flex items-center gap-4">
          {userLevel ? (
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-700 shadow-sm transition-all hover:bg-slate-800/70">
              <span className="text-sm font-medium text-slate-400">Level:</span>
              <span className="text-sm font-bold text-white tracking-wide">{userLevel}</span>
            </div>
          ) : (
            <div className="text-sm text-slate-400 font-medium bg-slate-800 px-3 py-1 rounded-full">Guest Mode</div>
          )}
        </nav>
      </div>
    </header>
  )
}
