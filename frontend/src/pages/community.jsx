import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, PlusCircle, Eye, Heart, ThumbsUp, MapPin, ShieldCheck, AlertTriangle, CheckCircle2, Camera, Upload, Calendar, DollarSign, Mountain, MessageSquare, Sparkles, Share2, X } from 'lucide-react'
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
