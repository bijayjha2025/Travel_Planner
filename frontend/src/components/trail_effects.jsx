import { useState, useEffect } from 'react'

export default function TrailEffects() {
 const [particles, setParticles] = useState([])
 
 useEffect(() => {
  const handleClick = (e) => {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
  
   const newParticle = {
    id: Date.now() + Math.random(), x: e.clientX, y: e.clientY, size: Math.floor(Math.random() * 8) + 12, }
     setParticles((prev) => [...prev.slice(-12), newParticle])
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  const removeParticle = (id) => {
    setParticles((prev) => prev.filter((p) => p.id !== id))
  }

  return (
   <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
    {particles.map((p) => (
     <span key={p.id} onAnimationEnd={() => removeParticle(p.id)} className="absolute animate-particle-fade rounded-full border border-terracotta/70 select-none" style={{ left: `${p.x - 10}px`, top: `${p.y - 10}px`, width: `${p.size}px`, height: `${p.size}px`, }} />
     ))}
   </div>
  )
}
