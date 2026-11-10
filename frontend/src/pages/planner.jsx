import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { destinations } from '../data/destinations'
import BackgroundImage from '../assets/BackgroundImage.png'
import { Mountain, Calendar, Users } from 'lucide-react'


const VIBES = [
    { id: 'nature', label: 'Tea Gardens & Lakes', desc: 'Slow, quiet, scenery & cool mountain air'},
    { id: 'trekking', label: 'Highland Ridge Trekking', desc: 'Alpine trails & Himalayan views'},
    { id: 'culture', label: 'Culture & Heritage', desc: 'Temples, monasteries, local traditions & foods'},
    { id: 'sunset', label: 'Riverside & Sunsets', desc: 'Golden hour views & photography'},
]

const STYLES = [
  { id: 'budget', label: 'Homestay & Local Bus', mult: 0.85, desc: 'Local tea estates, authentic eateries, public transport' },
  { id: 'comfort', label: 'Mountain Lodge & Private Jeep', mult: 1.0, desc: 'Cozy lodges, scenic private transfers, guided spots' },
  { id: 'heritage', label: 'Heritage Resort & Dedicated Guide', mult: 1.35, desc: 'Boutique heritage stays & dedicated local expert' },
]

export default function Planner() {
  const [searchParams] = useSearchParams()
  const initialDestId = parseInt(searchParams.get('destination'))

  const [selectedIds, setSelectedIds] = useState(() => {
    return initialDestId && destinations.some(d => d.id === initialDestId) ? [initialDestId] : [1, 7]
  })
  
  const [travelers, setTravelers] = useState(2)
  const [days, setDays] = useState(3)
  const [vibe, setVibe] = useState('nature')
  const [styleTier, setStyleTier] = useState('comfort')
  const [activeSection, setActiveSection] = useState('timeline') // 'timeline', 'map', 'budget', 'packing'
  const [saved, setSaved] = useState(false)
  const [userNotes, setUserNotes] = useState({})
  const [checkedItems, setCheckedItems] = useState({})

  useEffect(() => {
   if (initialDestId && !selectedIds.includes(initialDestId)){
    setSelectedIds(prev => [...prev, initialDestId])
   }
  }, [initialDestId])

const selectedDestinations = destinations.filter(d => selectedIds.includes(d.id))

const selectedStyle = STYLES.find(s => s.id === styleTier) || STYLES[1]
const avgCostPerDay = selectedDestinations.length > 0 ? Math.round(selectedDestinations.reduce((sum, d) => sum + d.costPerDay, 0) /selectedDestinations.length) : 2200

const totalEstBudget = Math.round(avgCostPerDay * days * travelers * selectedStyle.mult)

const altitudeData = selectedDestinations.map(d => ({ name: d.title, elevation: d.elevation, }))

const toggleDestination = (id) => {
  setSelectedIds(prev => prev.includes(id) ? (prev.length > 1 ? prev.filter(i => i !== id): prev) : [...prev, id])
}

const handleSavePlan = () => {
  const plan = { selectedIds, travelers, days, vibe, styleTier, totalEstBudget, savedAt: new Date().toISOString() }
    localStorage.setItem('koshi_journey_plan', JSON.stringify(plan))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + `/planner?destinations=${selectedIds.join(',')}`)
    alert('Journey link copied to clipboard!')
  }

    const allPacking = Array.from(
    new Set([ 'Permits & ID Documents', 'Refillable Water Bottle', 'First Aid Kit', 'Camera & Powerbank', ...selectedDestinations.flatMap(d => d.suggestedItems || [])]))

  return(
   <div className='min-h-screen bg-[#f8f6f0] text-forest font-sans'>
    <section className='page-hero relative flex flex-col justify-center bg-forest text-off-white overflow-hidden pb-16 pt-24 sm:pt-28'>
    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${BackgroundImage}')` }} />
    <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/85 to-forest/75" />

    <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12 w-full">
     <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="max-w-xl">
       <div className="flex items-center gap-2 mb-3">
        <span className="font-serif text-sm text-[#d8c39a]">NEPAL</span>
        <span className="font-deva text-xs text-[#d8c39a]/60">नेपाल • यात्रा योजना</span>
       </div>

       <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.2rem] leading-tight text-off-white">Shape your journey, your way.</h1>
       <p className="mt-4 font-sans text-base leading-relaxed text-[#f3e8d0] max-w-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]">Select places you want to visit, set your time and pace, and we'll organize your route, elevation profile, and local cost estimates.</p>
      </div>

      <div className="relative hidden md:block -rotate-2 pb-6 text-sand">
       <p className="font-hand text-[1.6rem] leading-6">Tell us your days.<br />We'll build the route.</p>
       <svg aria-hidden="true" viewBox="0 0 70 56" className="absolute -bottom-4 left-4 h-12 w-16 text-sand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 4 C 34 6, 52 20, 46 46" />
        <path d="M36 38 L46 48 L54 36" /></svg>
      </div>
     </div>

     <div className="mt-10 flex flex-wrap items-center justify-between gap-4 bg-off-white/10 backdrop-blur-md p-4 rounded-md border border-sand/20 text-off-white">
     <div className="flex flex-wrap items-center gap-4">
      <div className="px-3">
       <span className="text-xs text-sand/70 uppercase tracking-wider block font-sans">Selected Places</span>
       <span className="font-serif text-xl text-sand font-bold">{selectedDestinations.length} Destinations</span>
      </div>
      <div className="h-8 w-px bg-sand/20 hidden sm:block" />
      <div className="px-3">
       <span className="text-xs text-sand/70 uppercase tracking-wider block font-sans">Duration</span>
       <span className="font-serif text-xl text-sand font-bold">{days} Days</span>
      </div>
      <div className="h-8 w-px bg-sand/20 hidden sm:block" />
      <div className="px-3">
       <span className="text-xs text-sand/70 uppercase tracking-wider block font-sans">Est. Total Budget</span>
       <span className="font-serif text-xl text-terracotta font-bold">NPR {totalEstBudget.toLocaleString()}</span>
      </div>
      </div>
      
      <div className="hidden lg:flex items-center gap-3 bg-forest/80 px-4 py-2 rounded border border-sand/30 font-sans text-xs">
       <span className="w-2.5 h-2.5 rounded-full bg-terracotta animate-pulse" />
       <div>
        <span className="text-sand/80 text-[10px] uppercase block font-semibold">Peak Route Alt & Oxygen</span>
        <strong className="text-sand font-serif">{selectedDestinations.length > 0 ? Math.max(...selectedDestinations.map(d => d.elevation)) : 1520}m • 78% O₂ Level</strong>
       </div>
      </div>     
     </div>
    </div>
    </section>

    <main className='max-w-[1500px] mx-auto px-6 lg:px-12 py-12'>
     <div className='grid grid-cols-1 lg:grid-cols-12 gap-10'>
     <div className="lg:col-span-5 space-y-8">
      <div className="bg-off-white rounded-[3px] p-6 border border-sand/80 shadow-[0_2px_4px_rgba(0,0,0,0.06)] space-y-6">
       <div className="border-b border-sand pb-3 flex items-center justify-between">
        <h2 className="font-serif text-xl text-forest font-semibold">1. Travel Preferences</h2>
        <span className="font-deva text-xs text-slateText/60">शैली चयन</span>
       </div>

       <div>
        <label className="text-xs font-semibold text-slateText uppercase tracking-wider block mb-2 font-sans flex items-center gap-1.5"><Mountain className="w-3.5 h-3.5 text-terracotta" /> Trip Experience & Vibe</label>
        <div className="grid grid-cols-2 gap-2.5">
         {VIBES.map(v => (
          <button key={v.id} onClick={() => setVibe(v.id)} className={`p-3 text-left transition-all mountain-option-card ${ vibe === v.id ? 'selected font-medium' : 'hover:border-forest/40'}`}>
            <p className="font-serif text-sm font-semibold text-forest">{v.label}</p>
            <p className="text-[11px] text-slateText/70 mt-0.5 line-clamp-1">{v.desc}</p>
           </button>
          ))}
         </div>
       </div>

       <div className='grid grid-cols-2 gap-4'>
        <div>
         <label className="text-xs font-semibold text-slateText uppercase tracking-wider block mb-1.5 flex items-center gap-1 font-sans">
         <Calendar className="w-3.5 h-3.5 text-terracotta" /> Duration</label>
         <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full mountain-select px-3 py-2 text-sm font-medium outline-none">
          {[1, 2, 3, 4, 5, 7, 10].map(d => (
          <option key={d} value={d}>{d} {d === 1 ? 'Day' : 'Days'}</option>
         ))}
         </select>
        </div>

        <div>
         <label className="text-xs font-semibold text-slateText uppercase tracking-wider block mb-1.5 flex items-center gap-1 font-sans">
         <Users className="w-3.5 h-3.5 text-terracotta" /> Travelers</label>
          <select value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} className="w-full mountain-select px-3 py-2 text-sm font-medium outline-none">
          {[1, 2, 3, 4, 6, 8].map(t => (
          <option key={t} value={t}>{t} {t === 1 ? 'Person' : 'People'}</option>
        ))}
       </select>
       </div>
       </div>

       





      
      </div>



     </div>
     </div>
    </main>




   </div>
  )






}