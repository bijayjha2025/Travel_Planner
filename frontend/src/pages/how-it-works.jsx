import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Compass, Heart, MapPinned, Sparkles } from 'lucide-react'
import BackgroundImage from '../assets/BackgroundImage.png'
import Footer from '../components/layout/footer'

const steps = [
  {
    number: '01',
    icon: Sparkles,
    title: 'Tell us your travel mood',
    description: 'Choose the scenery, pace, and kind of experience you want. There is no wrong answer—your trip starts with what feels right.',
  },
  {
    number: '02',
    icon: Compass,
    title: 'Explore your possibilities',
    description: 'Browse destinations, honest community notes, and curated routes that fit your interests, time, and budget.',
  },
  {
    number: '03',
    icon: CalendarDays,
    title: 'Shape the details',
    description: 'Select your stops, number of days, travelers, and travel style. Your plan updates as your ideas become clearer.',
  },
  {
    number: '04',
    icon: MapPinned,
    title: 'Take the route with you',
    description: 'Save your itinerary, check your packing list, and leave with a route that gives you direction without taking away discovery.',
  },
]

export default function HowItWorks() {
  return (
   <div className="page-surface min-h-screen text-forest font-sans">
    <section className="page-hero relative overflow-hidden bg-forest pb-20 pt-24 text-off-white sm:pb-28 sm:pt-28">
     <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${BackgroundImage}')` }} />
     <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/85" />
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 lg:px-12">
       <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand">A simpler way to go</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">From a feeling to a journey.</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-[#f3e8d0] sm:text-lg">Nepal helps you move from “I want to go somewhere” to a route you can actually look forward to—one thoughtful choice at a time.</p>
       </div>
      </div>
    </section>

    <main className="mx-auto max-w-[1500px] px-6 py-16 sm:py-24 lg:px-12">
     <div className="grid gap-6 md:grid-cols-2">
      {steps.map(({ number, icon: Icon, title, description }) => (
       <article key={number} className="interactive-card content-panel rounded-[3px] border border-sand p-7 sm:p-9">
       <div className="flex items-start justify-between">
        <Icon className="h-8 w-8 text-terracotta" />
        <span className="font-serif text-4xl text-sand">{number}</span>
       </div>
       <h2 className="mt-12 font-serif text-2xl text-forest">{title}</h2>
       <p className="mt-3 max-w-lg text-sm leading-6 text-slateText">{description}</p>
       </article>
       ))}
      </div>
      
      <section className="mt-16 rounded-[3px] bg-[#f5efe2] p-7 sm:mt-24 sm:p-12">
       <Heart className="h-7 w-7 text-terracotta" />
       <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-tight text-forest sm:text-4xl">Good planning leaves space for a little wandering.</h2>
       <Link to="/recommendation" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-terracotta underline-offset-8">Find a place to begin <ArrowRight className="h-4 w-4" /></Link>
      </section>
     </main>
    <Footer />
    </div>
  )
}
