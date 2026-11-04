import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, ArrowUpRight, ShieldCheck, Mountain, ChevronRight, Sparkles } from 'lucide-react'
import { destinations } from '../data/destinations.js'
import Footer from '../components/layout/footer.jsx'
import BackgroundImage from '../assets/BackgroundImage.png'
import InteractiveMap from '../components/map.jsx'

const FEATURED_TRIPS = [
  {
    id: 'tea-and-waterfall',
    title: '3-Day Tea Gardens & Misty Waterfalls',
    subtitle: 'Slow travel through Ilam\'s tea hills and Bhedetar\'s natural cascading waterfalls.',
    destIds: [1, 7],
    duration: '3 Days',
    vibe: 'Nature & Serenity',
    estimatedCost: 8500,
    highlights: ['Sunrise over Kanyam Tea Estate', 'Namaste Jharna Canyon Walk', 'Orthodox Tea Tasting']
  },
  {
    id: 'eastern-ridge-trek',
    title: '5-Day Kirat Ridge & Cultural Trail',
    subtitle: 'Explore the high-altitude trails of Mundum Trek and Limbu heritage at Cholung Park.',
    destIds: [5, 6, 8],
    duration: '5 Days',
    vibe: 'Highland Trekking',
    estimatedCost: 16500,
    highlights: ['Mount Everest & Makalu Ridge Views', 'Tongba Tasting at Basantapur', 'Alpine Rhododendron Forests']
  },
  {
    id: 'wetland-sunset-escape',
    title: '2-Day River, Lake & Ridge Sunset Escape',
    subtitle: 'Unwind along the Sapta Koshi riverbank, Rasa Taal lake canoeing, and Boptang Dada viewpoint.',
    destIds: [2, 3, 4],
    duration: '2 Days',
    vibe: 'Slow Travel & Rivers',
    estimatedCost: 5500,
    highlights: ['Koshi Floodplain Sunset Cruise', 'Catch & Release Fishing at Rasa Taal', 'Boptang Ridge Campfire']
  }
]

export default function Trip(){
 const navigate = useNavigate()
 const [selectedTrip, setSelectedTrip] = useState(FEATURED_TRIPS[0])

 const tripDestinations = destinations.filter(dest => selectedTrip.destIds.includes(dest.id))
 
 return(
  <div className='min-h-screen bg-[#f8f6f0] text-forest font-sans'>
  <section className="page-hero relative flex flex-col justify-center bg-forest text-off-white overflow-hidden pb-16 sm:pt-28 pt-24">
    
   <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${BackgroundImage}')` }} />
   <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/85 to-forest/75" />
   
   <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12 w-full">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
     <div className="max-w-xl">
     <div className="flex items-center gap-2 mb-3">
      <span className="font-serif text-sm text-[#d8c39a]">NEPAL</span>
      <span className="font-deva text-xs text-[#d8c39a]/60">नेपाल</span>
     </div>
     
     <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.2rem] leading-tight text-off-white">Soulful Journeys.</h1>
     <p className="mt-4 font-sans text-base leading-relaxed text-[#f3e8d0] max-w-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]">Curated routes combining true beauty of Nepal's diverse landscapes.</p>
    </div>

    <div className="relative hidden md:block -rotate-2 pb-6 text-sand">
     <p className="font-hand text-[1.6rem] leading-6">Curated for every character.<br />Pick a route & begin.</p>
     <svg aria-hidden="true" viewBox="0 0 70 56" className="absolute -bottom-4 left-4 h-12 w-16 text-sand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4 C 34 6, 52 20, 46 46" />
      <path d="M36 38 L46 48 L54 36" />
     </svg>
    </div>
   </div>
  </div>
 </section>

 <main className="max-w-[1500px] mx-auto px-6 lg:px-12 py-12">

  <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
   {FEATURED_TRIPS.map(trip => {
    const isSel = selectedTrip.id === trip.id
    return(
      <div key={trip.id} onClick={() => setSelectedTrip(trip)} className={`rounded-[3px] p-6 cursor-pointer transition-all flex flex-col justify-between space-y-4 border ${
        isSel ? 'bg-off-white border-terracotta shadow-[0_4px_16px_rgba(0,0,0,0.15)] ring-2 ring-terracotta/40' : 'bg-white border-sand hover:border-forest/90'}`}>

       <div>
        <div className='flex items-center justify-between text-xs text-slateText font-sans mb-2'>
         <span className='bg-sand/60 text-forest px-2.5 py-0.5 rounded-xs font-semibold'>{trip.duration}</span>
         <span className='text-terracotta font-medium'>{trip.vibe}</span>
        </div>

        <h3 className="font-serif text-xl font-bold text-forest leading-snug">{trip.title}</h3>
        <p className="text-xs text-slateText mt-2 leading-relaxed font-sans">{trip.description}</p>
      </div>

      <div className="pt-3 border-t border-sand/60 flex items-center justify-between">
       <span className="text-xs font-serif font-bold text-forest">Est. NPR {trip.estimatedCost.toLocaleString()}</span>
       <span className={`text-xs font-semibold flex items-center gap-1 ${isSel ? 'text-terracotta' : 'text-slateText'}`}>
        {isSel ? 'Active Route' : 'Select'} <ChevronRight className="w-3.5 h-3.5" /></span>
      </div>
     </div>
    )
    })}
   </div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
 <div className="lg:col-span-7 space-y-6">
 <div className="bg-white rounded-[3px] p-6 border border-sand shadow-xs space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand pb-4">
  <div>
   <h2 className="font-serif text-2xl font-bold text-forest">{selectedTrip.title}</h2>
   <p className="text-xs text-slateText mt-1 font-sans">{selectedTrip.subtitle}</p>
  </div>

   <button onClick={() => { const query = selectedTrip.destIds.join(',')
   navigate(`/planner?destinations=${query}`) }} className="rounded-md bg-forest px-5 py-2.5 text-xs font-medium text-off-white hover:bg-forest-light transition-colors flex items-center gap-1.5 shrink-0">Customize in Planner <ArrowUpRight className="w-4 h-4" /></button>
  </div>

  <div>
   <h4 className="text-xs font-semibold text-slateText uppercase tracking-wider mb-2 font-sans">Route Highlights</h4>
   <div className="flex flex-wrap gap-2">
    {selectedTrip.highlights.map((h, i) => (
    <span key={i} className="text-xs bg-sand/40 text-forest font-medium px-3 py-1 rounded-xs flex items-center gap-1.5">
     <Sparkles className="w-3.5 h-3.5 text-terracotta" /> {h}
    </span>
   ))}
   </div>
  </div>
  
  <div className="space-y-4 pt-2">
   <h4 className="text-xs font-semibold text-slateText uppercase tracking-wider font-sans">Included Locations ({tripDestinations.length} Stops)</h4>
    
   <div className="space-y-4">
   {tripDestinations.map((dest, idx) => (
    <div key={dest.id} className="bg-off-white rounded-[3px] p-4 border border-sand shadow-xs flex gap-4 items-start">
     <img src={dest.image} alt={dest.title} className="w-24 h-24 rounded-xs object-cover shrink-0" />
                      
    <div className="space-y-1 flex-1 font-sans">
     <div className="flex items-center justify-between">
      <h5 className="font-serif text-lg font-bold text-forest">{dest.title}</h5>
      <span className="text-[11px] bg-sand/80 text-forest px-2 py-0.5 rounded-xs">Stop {idx + 1}</span>
     </div>

     <p className="text-xs text-slateText flex items-center gap-1"><MapPin className="w-3 h-3 text-terracotta shrink-0" />{dest.location} • {dest.elevation} m</p>

     <p className="text-xs text-slateText/80 leading-relaxed line-clamp-2 pt-1">{dest.description}</p>
    </div>
   </div>
  ))}
  </div>
  </div>
  </div>
  </div>

  <div className="lg:col-span-5 space-y-6">
   <div className="bg-white rounded-[3px] p-4 border border-sand shadow-xs space-y-3">
    <h3 className="font-serif text-lg text-forest font-bold px-2">Itinerary Route Map</h3>
    <InteractiveMap destinations={destinations} selectedIds={selectedTrip.destIds} height="460px" />
   </div>
  </div>
  
  </div>
 </main>

 <Footer />
 </div>
)
}
