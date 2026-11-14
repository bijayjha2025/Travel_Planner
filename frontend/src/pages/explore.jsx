import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { destinations } from '../data/destinations'
import BackgroundImage from '../assets/BackgroundImage.png'
import { Search, Sparkles, PlusCircle, Grid, ListIcon, Compass, ShieldCheck, Heart, ArrowUpRight, MapPin, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '../components/layout/footer'

export default function Explore(){
 const navigate = useNavigate()
 const [searchQuery, setSearchQuery] = useState('')
 const [selectedType, setSelectedType] = useState('All')
 const [onlyGems, setOnlyGems] = useState(false)
 const [viewMode, setViewMode] = useState('grid')
 const [minScore, setMinScore] = useState(80)
 const [previewDest, setPreviewDest] = useState(null)

 const [wishlist, setWishlist] = useState(() => {
  try{
   const saved = localStorage.getItem('koshi_wishlist')
   return saved ? JSON.parse(saved) : []
  }catch{
    return []
  }
})

useEffect(() => {
 localStorage.setItem('koshi_wishlist', JSON.stringify(wishlist))
}, [wishlist])

const toggleWishlist = (id, e) => {
 if (e) e.stopPropagation()
 setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])}

const filtered = destinations.filter(d => {
 const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.location.toLowerCase().includes(searchQuery.toLowerCase()) || d.category.toLowerCase().includes(searchQuery.toLowerCase())

 const matchesType = selectedType === 'All' || d.category === selectedType
 const matchesGems = !onlyGems || d.isGem
 const matchesScore = d.score >= minScore
 return matchesSearch && matchesType && matchesGems && matchesScore
})

const types = ['All', 'Nature', 'Culture', 'Sightseeing', 'Sunset', 'Fishing', 'Hiking']

return(
 <div className='page-surface min-h-screen text-forest font-sans'>
  <section className='page-hero relative flex flex-col justify-center bg-forest text-off-white overflow-hidden pb-16 pt-24 sm:pt-28'>
   <div className='absolute inset-0 bg-cover bg-center bg-no-repeat' style={{backgroundImage: `url('${BackgroundImage}')`}} />
   <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/85 to-forest/75" />

   <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12 w-full">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
     <div className="max-w-xl">
      <div className="flex items-center gap-2 mb-3">
       <span className="font-serif text-sm text-[#d8c39a]">NEPAL</span>
       <span className="font-deva text-xs text-[#d8c39a]/60">नेपाल • गन्तव्य खोज</span>
      </div>

      <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.2rem] leading-tight text-off-white">Discover Nepal beyond the obvious.</h1>
      <p className="mt-4 font-sans text-base leading-relaxed text-[#f3e8d0] max-w-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]">Find journeys shaped around the way you want to travel — from tea estates and hidden lakes to cascading waterfalls and high mountain ridges.</p>
     </div>

     <div className="relative hidden md:block -rotate-2 pb-6 text-sand">
      <p className="font-hand text-[1.6rem] leading-6">Where the road ends,<br />stories begin.</p>
      <svg aria-hidden="true" viewBox="0 0 70 56" className="absolute -bottom-4 left-4 h-12 w-16 text-sand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <path d="M8 4 C 34 6, 52 20, 46 46" />
       <path d="M36 38 L46 48 L54 36" />
      </svg>
     </div>
    </div>

    <div className="mt-10 bg-off-white/95 backdrop-blur-md p-4 rounded-[3px] border border-sand/30 shadow-lg text-forest max-w-4xl flex flex-col sm:flex-row items-center gap-3">
     <div className="relative w-full flex-1">
     <Search className="w-4 h-4 text-slateText/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
     <input type="text" placeholder="Search by name, district, or style (e.g. Ilam, Waterfall, Sunset)..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full mountain-input pl-10 pr-4 py-2.5 text-sm outline-none placeholder:text-slateText/40" />
     </div>

     <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
      <button onClick={() => setOnlyGems(!onlyGems)} className={`px-3 py-2.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all border ${ onlyGems ? 'bg-terracotta text-off-white border-terracotta' : 'content-panel text-slateText border-sand hover:border-forest/40' }`}>
       <Sparkles className="w-3.5 h-3.5" />
       <span>Hidden Gems</span>
      </button>

      <button onClick={() => {
       const saved = localStorage.getItem('koshi_user')
      
       if (saved) { navigate('/community') }
       else { navigate('/login?redirect=/community') }}} className="px-3 py-2.5 rounded-md text-xs font-semibold bg-forest text-sand hover:bg-forest-light transition-colors flex items-center gap-1.5 shadow-xs">
       
       <PlusCircle className="w-3.5 h-3.5 text-terracotta" />
       <span>+ Add Place Log</span>
      </button>

      <div className="flex items-center content-panel border border-sand rounded-md p-1">
       <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-xs transition-colors ${viewMode === 'grid' ? 'bg-forest text-off-white' : 'text-slateText'}`} aria-label="Grid View">
        <Grid className="w-4 h-4" />
       </button>
       <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-xs transition-colors ${viewMode === 'list' ? 'bg-forest text-off-white' : 'text-slateText'}`} aria-label="List View">
        <ListIcon className="w-4 h-4" />
       </button>
      </div>
     </div>
    </div>
   </div>
  </section>

  <main className="max-w-[1500px] mx-auto px-6 lg:px-12 py-12">
   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-sand pb-4">
    <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
     {types.map(t => (
      <button key={t} onClick={() => setSelectedType(t)} className={`px-4 py-1.5 text-xs rounded-full font-medium transition-all ${selectedType === t ? 'bg-forest text-sand font-semibold shadow-xs' : 'content-panel text-slateText border border-sand hover:border-forest/40'}`}>{t}</button>
      ))}
    </div>
    
    <div className="flex items-center gap-3 text-xs text-slateText font-medium">
     <span>Min Rating Score: <strong className="text-forest font-serif">{minScore}</strong></span>
     <input type="range" min="75" max="95" value={minScore} onChange={(e) => setMinScore(Number(e.target.value))} className="mountain-range w-28 cursor-pointer" />
    </div>
   </div>
   
   <div className="flex items-center justify-between border-l-2 border-terracotta text-xs text-slateText font-sans mb-6">
    <span>Showing <strong>{filtered.length}</strong> of {destinations.length} destinations</span>
    {wishlist.length > 0 && (
     <span className="text-terracotta font-semibold flex items-center gap-1"><Heart className="w-3.5 h-3.5 fill-terracotta" /> {wishlist.length} saved in wishlist</span>
    )}
   </div>

   {filtered.length === 0 ? (
    <div className='content-panel rounded-[3px] p-12 text-center border border-sand my-8'>
     <Compass className="w-10 h-10 text-slateText/30 mx-auto mb-3 animate-pulse" />
     <h3 className="font-serif text-lg font-bold text-forest">No destinations matched your criteria</h3>
     <p className="text-xs text-slateText mt-1 max-w-sm mx-auto">Try adjusting your search keywords, score filter, or category pills.</p>
     <button onClick={() => {
      setSearchQuery('')
      setSelectedType('All')
      setOnlyGems(false)
      setMinScore(80)
      }}className="mt-4 px-5 py-2.5 bg-forest text-off-white text-xs font-medium rounded-md hover:bg-forest-light transition-colors">Reset All Filters</button>
    </div>
    ) : (
     <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' : 'space-y-4'}>
     {filtered.map(dest => {
      const isWishlisted = wishlist.includes(dest.id)

      if(viewMode === 'list'){
       return(
       <motion.div key={dest.id} onClick={() => setPreviewDest(dest)} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: Math.min(filtered.indexOf(dest) * 0.04, 0.3) }} className="bg-off-white rounded-[3px] p-3 border border-sand shadow-[0_2px_3px_rgba(0,0,0,0.15)] hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer group">
        <div className="flex items-center gap-4">
         <img src={dest.image} alt={dest.title} className="w-24 h-24 rounded-xs object-cover" />
         <div>
          <div className="flex items-center gap-2">
           <h3 className="font-serif text-xl font-bold text-forest group-hover:text-terracotta transition-colors">{dest.title}</h3>
           {dest.isGem && (
           <span className="text-[10px] bg-sand/80 text-forest font-semibold px-2 py-0.5 rounded-xs">Hidden Gem</span>
         )}
         </div>
         <p className="text-xs text-slateText flex items-center gap-1 mt-0.5 font-sans"><MapPin className="w-3 h-3 text-terracotta shrink-0" />{dest.location}</p>
         <p className="text-xs text-slateText/70 line-clamp-1 mt-1 font-sans">{dest.description}</p>
         </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-sand/40">
         <span className="text-xs font-bold text-terracotta font-serif">NPR {dest.costPerDay} / day</span>
         <div className="flex items-center gap-2">
          <button onClick={(e) => toggleWishlist(dest.id, e)} className={`p-2 rounded-md border transition-colors ${ isWishlisted ? 'bg-terracotta/10 border-terracotta text-terracotta' : 'border-sand text-slateText hover:bg-sand/20' }`} aria-label="Wishlist">
           <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-terracotta' : ''}`} />
          </button>
          
          <button onClick={(e) => {
            e.stopPropagation()
            navigate(`/planner?destination=${dest.id}`) }} className="px-4 py-2 bg-forest text-off-white text-xs font-medium rounded-md hover:bg-forest-light transition-colors flex items-center gap-1">Plan <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
         </div>
        </div>
       </motion.div>
       )}

       return(
        <motion.div key={dest.id} onClick={() => setPreviewDest(dest)} initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: Math.min(filtered.indexOf(dest) * 0.04, 0.3) }} className="interactive-card flex flex-col rounded-[3px] bg-off-white p-3 border border-sand shadow-[0_2px_3px_rgba(0,0,0,0.15), flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer group">

         {dest.isGem && (
          <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-3 bg-sand/85 shadow-xs"/>
         )}

         <div className='relative h-56 w-full overflow-hidden'>
          <img src={dest.image} alt={dest.title} className="interactive-image h-24 w-24 rounded-xs object-cover"/>
          <span className="absolute left-2 top-2 rounded-sm bg-forest/80 px-2 py-1 text-xs font-medium text-sand backdrop-blur-sm">{dest.type}</span>
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-sm bg-off-white/90 px-2 py-1 text-xs font-medium text-forest"><ShieldCheck className="h-3.5 w-3.5 text-terracotta" />{dest.score}</span>

          <button onClick={(e) => toggleWishlist(dest.id, e)} className={`absolute bottom-2 right-2 p-1.5 rounded-sm backdrop-blur-sm transition-all ${ isWishlisted ? 'bg-terracotta text-off-white' : 'bg-off-white/80 text-slateText hover:bg-off-white'}`}>
           <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-off-white' : ''}`} />
          </button>
         </div>

         <div className='px-1.5 pb-3.5 pt-3'>
         <p className="text-xs italic text-slateText/70">{dest.category}</p>
          <div className="mt-0.5 flex items-start justify-between gap-2">
           <h3 className="font-serif text-2xl leading-tight text-forest group-hover:text-terracotta transition-colors">{dest.title}</h3>
           <ArrowUpRight className="interactive-arrow mt-1 h-5 w-5 shrink-0 text-terracotta" />
          </div>
          
          <div className="mt-2 flex items-center justify-between gap-2 text-xs text-slateText">
           <span className="flex min-w-0 items-center gap-1"><MapPin className="h-3 w-3 shrink-0 text-terracotta" />
            <span className="truncate">{dest.location}</span>
           </span>
           <span className="shrink-0 font-medium">{dest.duration}</span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-sand/60 flex items-center justify-between text-xs font-sans">
           <span className="text-slateText/80">{dest.elevation} m alt</span>
           <button onClick={(e) => { e.stopPropagation();navigate(`/planner?destination=${dest.id}`)}} className="font-semibold text-forest hover:text-terracotta underline decoration-terracotta/40 underline-offset-4">Plan My Journey →</button>
          </div>
         </div>
        </motion.div>
       )
     })}
     </div>
    )
  }
  </main>

  <AnimatePresence>
   {previewDest && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/80 backdrop-blur-xs">
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-off-white rounded-[3px] overflow-hidden max-w-2xl w-full border border-sand shadow-2xl relative p-3">
     <button onClick={() => setPreviewDest(null)} className="absolute top-5 right-5 z-20 bg-forest text-off-white p-2 rounded-full hover:bg-forest-light transition-colors">
      <X className="w-4 h-4" />
     </button>

     <div className="relative h-64 w-full overflow-hidden">
      <img src={previewDest.image} alt={previewDest.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />

      <div className="absolute bottom-4 left-6 right-6 text-off-white">
       <span className="text-xs bg-terracotta px-2 py-0.5 rounded-sm font-semibold uppercase tracking-wider">{previewDest.type}</span>
       <h2 className="font-serif text-3xl font-bold mt-1 text-off-white">{previewDest.title}</h2>
       <p className="text-xs text-sand/80 flex items-center gap-1 mt-0.5">
       <MapPin className="w-3.5 h-3.5 text-sand" /> {previewDest.location}</p>
      </div>
     </div>

     <div className="p-6 space-y-4 max-h-[55vh] overflow-y-auto font-sans text-forest">
      <p className="text-sm leading-relaxed">{previewDest.description}</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 content-panel p-3 rounded-[3px] border border-sand text-xs">
      <div>
       <span className="text-[10px] text-slateText/70 uppercase block">Elevation</span>
       <strong className="text-forest text-sm font-serif">{previewDest.elevation} m</strong>
       </div>
       
       <div>
        <span className="text-[10px] text-slateText/70 uppercase block">Best Season</span>
        <strong className="text-forest text-sm font-serif">{previewDest.bestSeason}</strong>
       </div>
       
       <div>
        <span className="text-[10px] text-slateText/70 uppercase block">Est. Daily Budget</span>
        <strong className="text-terracotta text-sm font-serif">NPR {previewDest.costPerDay}</strong>
       </div>
      
      <div>
       <span className="text-[10px] text-slateText/70 uppercase block">Score</span>
       <strong className="text-forest text-sm font-serif">{previewDest.score} / 100</strong>
      </div>
      </div>

      <div>
       <h4 className="text-xs font-semibold text-slateText uppercase tracking-wider mb-2">Key Experiences</h4>
       <div className="flex flex-wrap gap-1.5">
       {previewDest.activities?.map((act, idx) => (
        <span key={idx} className="text-xs bg-sand/40 text-forest font-medium px-2.5 py-1 rounded-xs">• {act}</span>
        ))}
       </div>
       </div>

       <div className="pt-4 flex items-center justify-end gap-3 border-t border-sand">
       <button onClick={() => setPreviewDest(null)} className="px-4 py-2 text-xs font-semibold text-slateText hover:text-forest"> Close</button>
       <button onClick={() => {
         const id = previewDest.id
         setPreviewDest(null)
         navigate(`/planner?destination=${id}`)
        }} className="rounded-md bg-forest px-5 py-2.5 text-xs font-medium text-off-white hover:bg-forest-light transition-colors flex items-center gap-1.5">Plan Trip To This Place <ArrowUpRight className="w-4 h-4" />
      </button>
     </div>
     </div>
    </motion.div>
    </div>
   )}
  </AnimatePresence>
  <Footer />
 </div>
)
}