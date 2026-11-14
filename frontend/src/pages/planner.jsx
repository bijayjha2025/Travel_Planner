import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { destinations } from '../data/destinations'
import BackgroundImage from '../assets/BackgroundImage.png'
import { Mountain, Calendar, Users, Compass, Check, ShieldCheck, CheckCircle2, MapPin, Bookmark, Share2 } from 'lucide-react'
import InteractiveMap from '../components/map'
import Footer from '../components/layout/footer'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'


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
   <div className='page-surface min-h-screen bg-[#f8f6f0] text-forest font-sans'>
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
     <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-terracotta/40 pt-8'>
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

       <div>
        <label className="text-xs font-semibold text-slateText uppercase tracking-wider block mb-2 font-sans flex items-center gap-1.5">
         <Compass className="w-3.5 h-3.5 text-terracotta" /> Lodging & Trail Style</label>
         <div className="space-y-2">
          {STYLES.map(s => (
          <div key={s.id} onClick={() => setStyleTier(s.id)} className={`p-3 cursor-pointer text-xs transition-all flex items-center justify-between mountain-option-card ${ styleTier === s.id ? 'selected' : 'hover:border-sand/80'}`} >
          <div>
           <p className="font-serif text-sm text-forest font-semibold">{s.label}</p>
           <p className="text-[11px] text-slateText/70 mt-0.5">{s.desc}</p>
          </div>
         {styleTier === s.id && <Check className="w-4 h-4 text-terracotta shrink-0" />}
         </div>
        ))}
       </div>
       </div>      
      </div>

      <div className="space-y-4">
       <div className="flex items-center justify-between border-b border-sand pb-2">
        <h2 className="font-serif text-xl text-forest font-semibold">2. Choose Destinations</h2>
        <span className="font-hand text-lg text-terracotta">Click to add/remove</span>
       </div>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[560px] overflow-y-auto pr-1">
        {destinations.map(dest => {
         const isSel = selectedIds.includes(dest.id)
        
          return (
           <div key={dest.id} onClick={() => toggleDestination(dest.id)} className={`relative flex flex-col rounded-[3px] bg-off-white p-2.5 pb-2 cursor-pointer transition-all duration-300 ${ isSel ? 'ring-2 ring-terracotta shadow-[0_4px_16px_rgba(0,0,0,0.18)] scale-[1.02]' : 'border border-sand/80 opacity-80 hover:opacity-100 hover:shadow-md'}`}>
            {isSel && (
             <span aria-hidden="true" className="absolute -top-2.5 left-1/2 -translate-x-1/2 -rotate-2 z-10 h-4 w-16 bg-sand/90 shadow-2xs" />
            )}

            <div className="relative h-28 w-full overflow-hidden rounded-xs">
             <img src={dest.image} alt={dest.title} className="w-full h-full object-cover" />
             <span className="absolute left-1.5 top-1.5 rounded-sm bg-forest/80 px-1.5 py-0.5 text-[10px] text-sand font-sans">{dest.type}</span>
             <span className="absolute right-1.5 top-1.5 flex items-center gap-0.5 rounded-sm bg-off-white/90 px-1.5 py-0.5 text-[10px] font-medium text-forest">
             <ShieldCheck className="h-3 w-3 text-terracotta" />{dest.score}</span>
            </div>

            <div className="pt-2 px-1">
             <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-forest">{dest.title}</h3>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${ isSel ? 'bg-terracotta text-off-white' : 'border border-sand text-transparent'}`}>✓</span>
             </div>
             <p className="text-[11px] text-slateText/70 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3 text-terracotta shrink-0" />{dest.location}</p>
            </div>
            </div>
            )})}
           </div>
          </div>

         <div className="bg-forest text-off-white rounded-[3px] p-5 border border-sand/30 shadow-md space-y-3">
          <div className="flex items-center justify-between">
           <span className="font-serif text-base text-sand">Save or Share Itinerary</span>
           {saved && (
            <span className="text-xs text-sand bg-terracotta px-2 py-0.5 rounded font-semibold flex items-center gap-1 font-sans">
             <CheckCircle2 className="w-3.5 h-3.5" /> Saved!</span>
            )}
           </div>

           <div className="grid grid-cols-2 gap-3">
            <button onClick={handleSavePlan} className="rounded-md wax-seal-btn px-4 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5" /> Save Itinerary</button>

            <button onClick={handleCopyLink} className="rounded-md border border-sand/40 bg-transparent px-4 py-2.5 text-xs font-semibold text-sand hover:bg-sand/10 transition-colors flex items-center justify-center gap-1.5">
             <Share2 className="w-3.5 h-3.5" /> Share Link
            </button>
           </div>
         </div>
     </div>

     <div className="lg:col-span-7 space-y-8">
      <div className="flex items-center gap-2 border-b border-sand pb-3 overflow-x-auto">
       {[
        { id: 'timeline', label: 'Field Note Timeline', deva: 'कार्यतालिका' },
        { id: 'map', label: 'Route Map', deva: 'मानचित्र' },
        { id: 'budget', label: 'Elevation & Cost', deva: 'ऊंचाई र लागत' },
        { id: 'packing', label: 'Packing Checklist', deva: 'सामान सूची' },
        ].map(sec => { const isAct = activeSection === sec.id
            
          return (
           <button key={sec.id} onClick={() => setActiveSection(sec.id)} className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${ isAct ? 'bg-forest text-sand shadow-xs font-semibold' : 'content-panel text-slateText border border-sand hover:border-forest/40'}`}>
            <span>{sec.label}</span>
            <span className="ml-1.5 text-[10px] text-terracotta font-deva opacity-80">{sec.deva}</span>
           </button>
          )
         })}
       </div>
       
       {activeSection === 'timeline' && (
       <div className="bg-[#f5efe2] rounded-[3px] p-6 border border-[#d8c39a] shadow-xs space-y-6">
        <div className="border-b border-[#d8c39a]/60 pb-3 flex items-center justify-between">
        <div>
         <h3 className="font-serif text-2xl text-forest font-bold">Your Itinerary Notebook</h3>
         <p className="text-xs text-slateText/70 mt-0.5 font-sans">Structured timeline across {days} days covering {selectedDestinations.length} stops.</p>
        </div>
        <span className="font-hand text-lg text-terracotta">Hand-crafted route</span>
        </div>

        <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#d8c39a]">
         {Array.from({ length: days }).map((_, dayIdx) => {
          const dest = selectedDestinations[dayIdx % selectedDestinations.length]
          const sampleStep = dest?.itinerarySample?.[dayIdx % (dest.itinerarySample?.length || 1)]

          return (
           <div key={dayIdx} className="relative pl-9">
            <div className="absolute left-0 top-0.5 w-7 h-7 rounded-full bg-forest text-sand flex items-center justify-center font-serif text-xs font-bold shadow-xs">{dayIdx + 1}</div>
            
            <div className="bg-off-white rounded-[3px] p-4 border border-sand shadow-xs space-y-2.5">
             <div className="flex items-center justify-between border-b border-sand/60 pb-2">
             <h4 className="font-serif text-xl font-bold text-forest">{dest.title}</h4>
             <span className="text-xs text-terracotta font-sans font-medium">{dest.type} • {dest.elevation} m</span>
             </div>
             
             <p className="text-xs text-slateText leading-relaxed font-sans">{sampleStep?.details || dest.description}</p>
             <div className="pt-1">
              <span className="text-[11px] font-semibold text-slateText uppercase tracking-wider block mb-1">Recommended Highlights:</span>
              
              <div className="flex flex-wrap gap-1.5">
              {dest.activities?.map((act, i) => (
              <span key={i} className="text-[11px] bg-sand/40 text-forest px-2.5 py-0.5 rounded-xs font-medium">• {act}</span>))}
             </div>
            </div>
            
            <div className="pt-2">
             <input type="text" placeholder="Write a field note for this day (e.g. lunch at Bhedetar)..." value={userNotes[dayIdx] || ''} onChange={(e) => setUserNotes({ ...userNotes, [dayIdx]: e.target.value })} className="w-full bg-transparent border-b border-sand text-xs font-hand text-lg text-forest outline-none placeholder:text-slateText/40 placeholder:font-sans placeholder:text-xs py-1" />
            </div>
           </div>
          </div>
        )})}
       </div>
      </div>
     )}

     {activeSection === 'map' && (
       <div className="content-panel rounded-[3px] p-4 border border-sand shadow-xs space-y-3">
        <div className="px-2">
         <h3 className="font-serif text-xl text-forest font-bold">Interactive Route Explorer</h3>
         <p className="text-xs text-slateText mt-0.5 font-sans">View location pins and connecting travel paths in Koshi province.</p>
        </div>
        
       <InteractiveMap destinations={destinations} selectedIds={selectedIds} onSelectDestination={(d) => toggleDestination(d.id)} height="500px" />
       </div>
       )}
       
       {activeSection === 'budget' && (
        <div className="space-y-6">
         
         <div className="bg-white rounded-[3px] p-6 border border-sand shadow-xs">
         <h3 className="font-serif text-lg text-forest font-bold mb-1">Route Elevation Profile (Meters)</h3>
         <p className="text-xs text-slateText mb-4 font-sans">Terrain altitude changes across chosen stops.</p>
         
         <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={altitudeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
           <defs>
            <linearGradient id="colorElev" x1="0" y1="0" x2="0" y2="1">
             <stop offset="5%" stopColor="#183a37" stopOpacity={0.85}/>
             <stop offset="95%" stopColor="#e8dcc8" stopOpacity={0.2}/>
            </linearGradient>
           </defs>
           
           <XAxis dataKey="name" stroke="#46535c" fontSize={11} />
           <YAxis stroke="#46535c" fontSize={11} unit=" m" />
           <Tooltip contentStyle={{ backgroundColor: '#f8f6f0', borderColor: '#e8dcc8' }} />
           <Area type="monotone" dataKey="elevation" stroke="#183a37" fillOpacity={1} fill="url(#colorElev)" />
          </AreaChart>
         </ResponsiveContainer>
        </div>
        </div>
        
        <div className="content-panel rounded-[3px] p-6 border border-sand shadow-xs">
         <h3 className="font-serif text-lg text-forest font-bold mb-1">Estimated Budget Breakdown</h3>
         <p className="text-xs text-slateText mb-4 font-sans">Based on {days} days for {travelers} traveler(s). Total: <strong className="text-terracotta">NPR {totalEstBudget.toLocaleString()}</strong></p>

         <div className="space-y-3 font-sans text-xs">
          {[
            { name: 'Lodging & Homestays', amount: Math.round(totalEstBudget * 0.40) },
            { name: 'Private Jeep / Local Transport', amount: Math.round(totalEstBudget * 0.25) },
            { name: 'Food & Orthodox Tea Tastings', amount: Math.round(totalEstBudget * 0.23) },
            { name: 'Local Permits & Activity Fees', amount: Math.round(totalEstBudget * 0.12) },].map(item => (
            <div key={item.name} className="flex items-center justify-between border-b border-sand/50 pb-2">
             <span className="text-slateText">{item.name}</span>
             <span className="font-serif font-bold text-forest">NPR {item.amount.toLocaleString()}</span>
            </div>
            ))}
           </div>
          </div>
         </div>
        )}
        
        {activeSection === 'packing' && (
        <div className="content-panel rounded-[3px] p-6 border border-sand shadow-xs space-y-4">
         <div className="border-b border-sand pb-3">
          <h3 className="font-serif text-xl text-forest font-bold">Curated Packing Checklist</h3>
          <p className="text-xs text-slateText mt-0.5 font-sans">Recommended items for your selected Koshi destinations.</p>
         </div>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
         {allPacking.map(item => {
          
          const isChecked = !!checkedItems[item]
          
          return (
          <div key={item} onClick={() => setCheckedItems({ ...checkedItems, [item]: !isChecked })} className={`p-3 rounded-[3px] border cursor-pointer transition-all flex items-center gap-3 ${ isChecked ? 'bg-sand/30 border-forest/40 text-forest' : 'bg-off-white border-sand text-slateText'}`}>
           <div className={`w-4 h-4 rounded-xs flex items-center justify-center text-xs ${ isChecked ? 'bg-forest text-off-white' : 'border border-sand bg-[#f5efe2]'}`}>
            {isChecked && '✓'}
           </div>
           
           <span className={`text-xs font-medium font-sans ${isChecked ? 'line-through opacity-70' : ''}`}>{item}</span>
          </div>
         )})}
        </div>
        </div>
       )}
       </div>
       </div>
      </main>
     <Footer />
    </div>
  )
}
