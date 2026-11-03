import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, ArrowUpRight, ShieldCheck, Mountain, ChevronRight, Sparkles } from 'lucide-react'
import { destinations } from '../data/destinations.js'
import Footer from '../components/layout/footer.jsx'
import BackgroundImage from '../assets/BackgroundImage.png'

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




  </div>
 )
}