import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlusCircle, Eye, ThumbsUp, MapPin, ShieldCheck, AlertTriangle, CheckCircle2, Camera, Upload } from 'lucide-react'
import Footer from '../components/layout/footer'
import BackgroundImage from '../assets/BackgroundImage.png'

const INITIAL_COMMUNITY_POSTS = [
  {
    id: 'post-101',
    authorName: 'Aayush Pokharel',
    authorTag: 'Local Traveler • Biratnagar',
    datePosted: '3 days ago',
    placeTitle: 'Kanyam Tea Estate Homestay',
    location: 'Ilam, Koshi',
    category: 'Nature & Tea Gardens',
    rating: 9,
    budgetSpent: 2600,
    duration: '2 Days',
    bestMonth: 'October to November',
    elevation: 1520,
    honestReview: 'Stayed at a small family homestay right near the upper tea slopes. The morning fog clears around 7:30 AM exposing a clear view of Kanchenjunga on crisp autumn mornings. Local orthodox green tea is served fresh.',
    pros: 'Peaceful evenings, cheap local food, fresh local cheese (Chhurpi)',
    cons: 'Weekend traffic on the main highway can get crowded with day-trip buses around 1 PM to 4 PM.',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
    helpfulCount: 24,
    verified: true,
  },
  {
    id: 'post-102',
    authorName: 'Sujata Shrestha',
    authorTag: 'Solo Hiker • Dharan',
    datePosted: '1 week ago',
    placeTitle: 'Namaste Jharna Canyon Hike',
    location: 'Bhedetar, Dhankuta',
    category: 'Waterfalls & Nature',
    rating: 8,
    budgetSpent: 1200,
    duration: '1 Day',
    bestMonth: 'September to December',
    elevation: 1400,
    honestReview: 'Walked the stream bed up to the main waterfall. Water flow was crisp and refreshing. Great short day trip if you are staying in Dharan or Bhedetar.',
    pros: 'Stunning cold water canyon, local roadside avocadoes and tea stalls nearby',
    cons: 'Rock steps near the final waterfall pool are mossy and very slippery — wear shoes with proper grip.',
    imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
    helpfulCount: 38,
    verified: true,
  },
  {
    id: 'post-103',
    authorName: 'Bikash Rai',
    authorTag: 'Trekker • Bhojpur',
    datePosted: '2 weeks ago',
    placeTitle: 'Chakhewa Pass to Temke Ridge',
    location: 'Mundum Trek, Bhojpur',
    category: 'Highland Trekking',
    rating: 10,
    budgetSpent: 3800,
    duration: '4 Days',
    bestMonth: 'October to December',
    elevation: 3150,
    honestReview: 'Trekking along the Kirat cultural ridge was hands down one of the quietest trails I have walked in eastern Nepal. Unspoiled by tourist crowds. You lodge with Rai homestead families.',
    pros: 'Breathtaking 360 Himalayan views, genuine local hospitality, sacred alpine lakes',
    cons: 'Limited mobile network on high ridges — bring powerbank and offline maps.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    helpfulCount: 52,
    verified: true,
  }
]

export default function Community() {
 const navigate = useNavigate()
 const [activeMode, setActiveMode] = useState('view')
 const [currentUser, setCurrentUser] = useState(() => {
  try{
    const saved= localStorage.getItem('koshi_user')
    return saved ? JSON.parse(saved) : null
  }
  catch{
    return null
  }
 })

 useEffect(() => {
  const checkUser = () => {
    try{
     const saved = localStorage.getItem('koshi_user')
     const parsed = saved ? JSON.parse(saved) : null
     setCurrentUser(parsed)

     if(parsed && !formData.authorName){
      setFormData(prev => ({...prev, authorName: parsed.name }))
     }
    }catch{
      setCurrentUser(null)
    }
  }
  window.addEventListener('koshi_auth_change', checkUser)
  return () => window.removeEventListener('koshi_auth_change', checkUser)
}, [])

const [posts, setPosts] = useState(() => {
  try{
    const saved = localStorage.getItem('koshi_community_posts')
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_POSTS
  }catch{
    return INITIAL_COMMUNITY_POSTS
  }
})

const [upvotedIds, setUpvotedIds] = useState(() => {
  try{
    const saved = localStorage.getItem('koshi_upvoted_posts')
    return saved ? JSON.parse(saved) : []
  }catch{
    return []
  }
})

const [formData, setFormData] = useState({
  authorName: currentUser ? currentUser.name : '',
  placeTitle: '',
  location: '',
  category: 'Nature & Tea Gardens',
  rating: '9',
  budgetSpent: '',
  duration: '1 Day',
  bestMonth: 'October to November',
  elevation: '',
  honestReview: '',
  pros: '',
  cons: '',
  imageUrl: '',
})

const [formSubmitted, setFormSubmitted] = useState(false)

useEffect(() => {
  localStorage.setItem('koshi_community_posts', JSON.stringify(posts))
}, [posts])

useEffect(() => {
  localStorage.setItem('koshi_upvoted_posts', JSON.stringify(upvotedIds))
}, [upvotedIds])

const handleUpvote = (id) => {
 if(upvotedIds.includes(id)){
  setUpvotedIds(prev => prev.filter(i => i !== id))
  setPosts(prev => prev.map(p => p.id === id ? {...p, helpfulCount: p.helpfulCount - 1} : p))
 }else{
  setUpvotedIds(prev => [...prev, id])
  setPosts(prev => prev.map(p => p.id === id ? {...p, helpfulCount: p.helpfulCount + 1} : p))
 }
}

const handleFormSubmit = (e) => {
  e.preventDefault()
  if (!formData.authorName || !formData.placeTitle || !formData.location || !formData.honestReview) {
   alert("Please fill in all required fields.")
   return
  }

 const newPost = {
  id: `post-${Date.now()}`,
  authorName: formData.authorName,
  authorTag: 'Verified Traveler',
  datePosted: 'Just now',
  placeTitle: formData.placeTitle,
  location: formData.location,
  category: formData.category,
  rating: parseInt(formData.rating) || 8,
  budgetSpent: parseInt(formData.budgetSpent) || 2000,
  duration: formData.duration,
  bestMonth: formData.bestMonth,
  elevation: formData.elevation,
  honestReview: formData.honestReview,
  pros: formData.pros,
  cons: formData.cons,
  imageUrl: formData.imageUrl,
  helpfulCount: 1,
  verified: true,
 }

 setPosts([newPost, ...posts])
 setFormSubmitted(true)

 setTimeout(() => {
  setFormSubmitted(false)
  setActiveMode('view')
  setFormData({
   authorName: '',
   placeTitle: '',
   location: '',
   category: 'Nature & Tea Gardens',
   rating: '9',
   budgetSpent: '',
   duration: '1 Day',
   bestMonth: 'October to November',
   elevation: '',
   honestReview: '',
   pros: '',
   cons: '',
   imageUrl: '',
  })
 }, 1500)
}

return (
 <div className="min-h-screen bg-[#f8f6f0] text-forest font-sans">
 <section className="page-hero relative flex flex-col justify-center bg-forest text-off-white overflow-hidden pb-16 pt-24 sm:pt-28">
 <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${BackgroundImage}')` }} />
  <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/85 to-forest/75" />
  
  <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12 w-full">
   <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
    <div className="max-w-xl">
    <div className="flex items-center gap-2 mb-3">
     <span className="font-serif text-sm text-[#d8c39a]">NEPAL</span>
     <span className="font-deva text-xs text-[#d8c39a]/60">नेपाल • वास्तविक अनुभव</span>
    </div>
    
    <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.2rem] leading-tight text-off-white">Real Experiences. Zero Exaggeration.</h1>
    <p className="mt-4 font-sans text-base leading-relaxed text-[#f3e8d0] max-w-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]">Shared by real travelers with honest pros, cons, actual budgets spent, and verified ground-level travel tips.</p>
   </div>

   <div className="relative hidden md:block -rotate-2 pb-6 text-sand">
    <p className="font-hand text-[1.6rem] leading-6">Real data, honest tips.<br />From traveler to traveler.</p>
    <svg aria-hidden="true" viewBox="0 0 70 56" className="absolute -bottom-4 left-4 h-12 w-16 text-sand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
     <path d="M8 4 C 34 6, 52 20, 46 46" />
     <path d="M36 38 L46 48 L54 36" />
    </svg>
   </div>
  </div>
  
  <div className="mt-10 flex items-center justify-between bg-off-white/95 backdrop-blur-md p-2 rounded-[3px] border border-sand/30 shadow-lg max-w-md">
  
   <button onClick={() => setActiveMode('view')} className={`flex-1 py-3 px-4 rounded-xs text-xs font-semibold flex items-center justify-center gap-2 transition-all font-sans ${ activeMode === 'view' ? 'bg-forest text-sand shadow-xs font-bold': 'text-slateText hover:bg-sand/20' }`}>
    <Eye className="w-4 h-4 text-terracotta" />
    <span>Explore Real Experiences ({posts.length})</span>
   </button>

   <button onClick={() => setActiveMode('share')} className={`flex-1 py-3 px-4 rounded-xs text-xs font-semibold flex items-center justify-center gap-2 transition-all font-sans ${ activeMode === 'share' ? 'bg-terracotta text-off-white shadow-xs font-bold' : 'text-slateText hover:bg-sand/20'}`}>
    <PlusCircle className="w-4 h-4" />
    <span>Share My Experience</span>
   </button>
  </div>
  </div>
  </section>
  
  <main className="max-w-[1500px] mx-auto px-6 lg:px-12 py-12">
   {activeMode === 'view' && (
    <div className="space-y-8">
    <div className="flex items-center justify-between border-b border-sand pb-4">
    <div>
     <h2 className="font-serif text-2xl text-forest font-bold">Community Travel Logs</h2>
     <p className="text-xs text-slateText mt-0.5 font-sans">Honest reviews with actual costs, pros, and cautions.</p>
     </div>
    <span className="font-hand text-lg text-terracotta">Unfiltered ground truth</span>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     {posts.map(post => {
      
      const isUpvoted = upvotedIds.includes(post.id)
      
      return (
      <div key={post.id} className="relative flex flex-col rounded-[3px] bg-off-white p-3 border border-sand shadow-[0_2px_3px_rgba(0,0,0,0.18)] hover:shadow-md transition-all space-y-4">
       <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-5 w-20 -translate-x-1/2 -rotate-2 bg-sand/85 shadow-xs" />
       
       <div className="flex items-center justify-between border-b border-sand/50 pb-3 font-sans">
        <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-forest text-sand font-serif font-bold flex items-center justify-center text-sm shadow-xs">{post.authorName.charAt(0)}</div>
         <div>
          <h4 className="font-serif text-sm font-bold text-forest leading-tight">{post.authorName}</h4>
          <p className="text-[11px] text-slateText/70">{post.authorTag} • {post.datePosted}</p>
         </div>
        </div>

        {post.verified && (
         <span className="text-[10px] bg-forest/10 text-forest font-semibold px-2 py-0.5 rounded-xs flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-terracotta" /> Verified Stay</span>
        )}
       </div>

       <div className="relative h-52 w-full overflow-hidden rounded-xs">
        <img src={post.imageUrl} alt={post.placeTitle} className="w-full h-full object-cover" />
        <span className="absolute left-2 top-2 rounded-sm bg-forest/80 px-2 py-1 text-xs font-medium text-sand font-sans">{post.category}</span>
        <span className="absolute right-2 top-2 rounded-sm bg-off-white/90 px-2 py-1 text-xs font-serif font-bold text-forest">★ {post.rating} / 10</span>
       </div>

       <div className="space-y-2">
        <h3 className="font-serif text-xl font-bold text-forest">{post.placeTitle}</h3>
        <p className="text-xs text-slateText flex items-center gap-1 font-sans">
        <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0" />{post.location} • {post.elevation} m elevation</p>

        <div className="grid grid-cols-2 gap-2 bg-white p-2.5 rounded-[3px] border border-sand text-xs font-sans mt-2">
         <div>
          <span className="text-[10px] text-slateText/70 uppercase block">Actual Spent</span>
          <strong className="text-terracotta font-serif font-bold">NPR {post.budgetSpent}</strong>
         </div>
         <div>
          <span className="text-[10px] text-slateText/70 uppercase block">Best Month</span>
          <strong className="text-forest font-serif font-bold">{post.bestMonth}</strong>
         </div>
        </div>
       </div>

      <p className="text-xs text-slateText leading-relaxed font-sans italic border-l-2 border-terracotta pl-3 py-1">"{post.honestReview}"</p>

     <div className="space-y-2 text-xs font-sans pt-1">
      <div className="bg-sand/30 p-2.5 rounded-[3px] border border-sand/60">
      <span className="font-semibold text-forest block mb-0.5 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-forest" /> Honest Highlight (Pro):</span>
      <p className="text-slateText/90 text-[11px]">{post.pros}</p>
      </div>

      <div className="bg-terracotta/10 p-2.5 rounded-[3px] border border-terracotta/20">
       <span className="font-semibold text-terracotta block mb-0.5 flex items-center gap-1">
        <AlertTriangle className="w-3.5 h-3.5 text-terracotta" /> What to Watch Out For (Caution):
       </span>
       <p className="text-slateText/90 text-[11px]">{post.cons}</p>
      </div>
     </div>

    <div className="pt-3 border-t border-sand/60 flex items-center justify-between text-xs font-sans">
     <button onClick={() => handleUpvote(post.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-all ${ isUpvoted ? 'bg-terracotta text-off-white border-terracotta font-semibold' : 'bg-white text-slateText border-sand hover:bg-sand/20' }`} >
     <ThumbsUp className="w-3.5 h-3.5" />
     <span>{isUpvoted ? 'Helpful Logged' : 'Found Helpful'} ({post.helpfulCount})</span>
    </button>

     <button onClick={() => navigate(`/planner?destination=1`)} className="font-semibold text-forest hover:text-terracotta underline decoration-terracotta/40 underline-offset-4" >Plan Similar Trip → </button>
    </div>
    </div>
    )
    })}
   </div>
   </div>
  )}

  {activeMode === 'share' && (
   <div className="max-w-3xl mx-auto">
    <div className="bg-white rounded-[3px] p-8 border border-sand shadow-[0_4px_20px_rgba(0,0,0,0.08)] space-y-6 relative">
              
    <div className="border-b border-sand pb-4 flex items-center justify-between">
     <div>
      <h2 className="font-serif text-2xl text-forest font-bold">Share Your Real Experience</h2>
      <p className="text-xs text-slateText mt-1 font-sans">Help fellow travelers with verified facts, ground reality, and honest costs.</p>
     </div>
    <span className="font-hand text-lg text-terracotta">No exaggeration required</span>
   </div>

   {!currentUser ? (
    <div className="py-12 text-center space-y-4 max-w-md mx-auto">
    <div className="w-14 h-14 rounded-full bg-sand/60 text-terracotta flex items-center justify-center mx-auto shadow-xs">
     <ShieldCheck className="w-7 h-7" />
    </div>
    <h3 className="font-serif text-2xl font-bold text-forest">Sign In to Maintain Community Integrity</h3>
    <p className="text-xs text-slateText leading-relaxed font-sans">To ensure all travel logs remain authentic, un-exaggerated, and spam-free, adding a new place or sharing an experience requires a signed-in profile.</p>
    <div className="pt-3">
     <Link to="/login?redirect=/community" className="inline-flex items-center gap-2 rounded-md bg-forest px-6 py-3 text-xs font-semibold text-off-white hover:bg-forest-light transition-colors shadow-xs">Sign In / Create Travel Space →</Link>
    </div>
    </div>
    ) : formSubmitted ? (
    
    <div className="py-12 text-center space-y-3">
     <CheckCircle2 className="w-12 h-12 text-terracotta mx-auto animate-bounce" />
     <h3 className="font-serif text-2xl font-bold text-forest">Experience Successfully Shared!</h3>
     <p className="text-xs text-slateText max-w-sm mx-auto font-sans">Thank you for contributing real, un-exaggerated travel data to the Koshi community feed.</p>
    </div>
    ) : (
    
    <form onSubmit={handleFormSubmit} className="space-y-6 font-sans">
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
     <div>
      <label className="text-xs font-semibold text-slateText uppercase tracking-wider block mb-1.5">Your Name / Handle *</label>
      <input type="text" required placeholder="e.g. Ramesh Karki" value={formData.authorName} onChange={(e) => setFormData({ ...formData, authorName: e.target.value })} className="w-full mountain-input px-3 py-2 text-sm outline-none" />
     </div>

     <div>
     <label className="text-xs font-semibold text-slateText uppercase tracking-wider block mb-1.5">Place / Destination Name *</label>
     <input type="text" required placeholder="e.g. Kanyam Tea Slope or Namaste Jharna" value={formData.placeTitle} onChange={(e) => setFormData({ ...formData, placeTitle: e.target.value })} className="w-full mountain-input px-3 py-2 text-sm outline-none" />
    </div>
   </div>
   
   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div>
    <label className="text-xs font-semibold text-slateText uppercase tracking-wider block mb-1.5">District / Location *</label>
    <input type="text" required placeholder="e.g. Ilam, Koshi" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full mountain-input px-3 py-2 text-sm outline-none"/>
   </div>
   
   <div>
    <label className="text-xs font-semibold text-slateText uppercase tracking-wider block mb-1.5">Category *</label>
    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}className="w-full mountain-select px-3 py-2 text-sm outline-none">
     <option value="Nature & Tea Gardens">Nature & Tea Gardens</option>
     <option value="Waterfalls & Rivers">Waterfalls & Rivers</option>
     <option value="Highland Trekking">Highland Trekking</option>
     <option value="Culture & Shrines">Culture & Shrines</option>
     <option value="Sunset & Boating">Sunset & Boating</option>
    </select>
   </div>

   <div>
    <label className="text-xs font-semibold text-slateText uppercase tracking-wider block mb-1.5">Rating Score (1-10) *</label>
    <select value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} className="w-full mountain-select px-3 py-2 text-sm outline-none">
     {[10, 9, 8, 7, 6, 5].map(r => (
    <option key={r} value={r}>{r} / 10</option>
    ))}
    </select>
   </div>
   </div>

   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div>
     <label className="text-xs font-semibold text-slateText uppercase tracking-wider block mb-1.5">Actual Budget Spent (NPR) *</label>
     <input type="number" required placeholder="e.g. 2500" value={formData.budgetSpent} onChange={(e) => setFormData({ ...formData, budgetSpent: e.target.value })} className="w-full mountain-input px-3 py-2 text-sm outline-none" />
    </div>

    <div>
     <label className="text-xs font-semibold text-slateText uppercase tracking-wider block mb-1.5">Best Month / Season *</label>
     <input type="text" placeholder="e.g. October to December" value={formData.bestMonth} onChange={(e) => setFormData({ ...formData, bestMonth: e.target.value })} className="w-full mountain-input px-3 py-2 text-sm outline-none" />
    </div>

    <div>
     <label className="text-xs font-semibold text-slateText uppercase tracking-wider block mb-1.5">Elevation (Meters)</label>
     <input type="number" placeholder="e.g. 1500" value={formData.elevation} onChange={(e) => setFormData({ ...formData, elevation: e.target.value })} className="w-full mountain-input px-3 py-2 text-sm outline-none" />
    </div>
    </div>
    
    <div>
     <label className="text-xs font-semibold text-slateText uppercase tracking-wider block mb-1.5">Honest Review & Experience Notes *</label>
     <textarea required rows={3} placeholder="Share your authentic ground experience (what you saw, where you stayed, how you traveled)..." value={formData.honestReview} onChange={(e) => setFormData({ ...formData, honestReview: e.target.value })} className="w-full mountain-input p-3 text-sm outline-none resize-none" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
     <div>
      <label className="text-xs font-semibold text-forest uppercase tracking-wider block mb-1.5 flex items-center gap-1">
      <CheckCircle2 className="w-3.5 h-3.5 text-forest" /> Honest Highlight (Pro)</label>
      <input type="text" placeholder="e.g. Unmatched morning views, cheap homestay food" value={formData.pros} onChange={(e) => setFormData({ ...formData, pros: e.target.value })} className="w-full mountain-input px-3 py-2 text-sm outline-none"/>
     </div>

     <div>
      <label className="text-xs font-semibold text-terracotta uppercase tracking-wider block mb-1.5 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5 text-terracotta" /> What to Watch Out For (Caution)</label>
      <input type="text" placeholder="e.g. Slippery steps, limited mobile network" value={formData.cons} onChange={(e) => setFormData({ ...formData, cons: e.target.value })} className="w-full mountain-input px-3 py-2 text-sm outline-none" />
     </div>
     </div>

     <div>
      <label className="text-xs font-semibold text-slateText uppercase tracking-wider block mb-1.5 flex items-center gap-1">
      <Camera className="w-3.5 h-3.5 text-terracotta" /> Photo URL (Optional)</label>
      <input type="url" placeholder="https://images.unsplash.com/..." value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full mountain-input px-3 py-2 text-sm outline-none" />
     </div>

     <div className="pt-4 flex items-center justify-end gap-3 border-t border-sand">
      <button type="button" onClick={() => setActiveMode('view')} className="px-5 py-2.5 text-xs font-semibold text-slateText hover:text-forest">Cancel</button>
      <button type="submit" className="rounded-md bg-terracotta px-6 py-3 text-xs font-semibold text-off-white hover:bg-terracotta/90 transition-colors flex items-center gap-2 shadow-xs"><Upload className="w-4 h-4" /> Publish Real Experience Log</button>
     </div>
    </form>
   )}
   </div>
  </div>
  )}
  </main>
  <Footer />
  </div>
  )
}
