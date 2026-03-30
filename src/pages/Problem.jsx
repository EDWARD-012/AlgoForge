import { useParams } from 'react-router-dom'

export const Problem = () => {
  const { id } = useParams()
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Problem {id}</h1>
      <p className="text-slate-400">Placeholder for problem solving interface.</p>
    </div>
  )
}
