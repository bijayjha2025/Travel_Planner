import BackgroundImage from '../../assets/BackgroundImage.png'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Destination from '../../pages/destination'

function HeroSection() {
 const reduce = useReducedMotion()
    
 return(
  <section id='experiences' className="relative min-h-[650px] sm:min-h-[700px] md:min-h-[750px] lg:min-h-[850px] flex flex-col justify-center bg-forest text-off-white overflow-hidden">
   
   <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${BackgroundImage}')` }} />
    
    <div className="absolute inset-0 bg-gradient-to-b from-forest/90 via-forest/70 to-forest/95" />

    <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 pt-32 lg:px-12 pb-8">

    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

      <div className="max-w-2xl">
       <div className='mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-sand/90'>
       <span className="h-px w-8 bg-terracotta" />Nepal, your way</div>
       <h1 className="font-serif text-4xl leading-[1.08] text-off-white sm:text-5xl lg:text-[4.25rem]">Your next experience, shaped by you</h1>
       <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-[#f3e8d0] drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] md:text-lg">Tell us what kind of trip you have in mind. Your time, budget, interests, and how much adventure you want. We'll put it together into a journey that actually works for you.</p>

       <div className="mt-7 flex flex-wrap items-center gap-4">
        <Link to="/planner" className="inline-flex items-center rounded-md bg-sand px-5 py-3 text-sm font-semibold text-forest transition-colors hover:bg-off-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 focus-visible:ring-offset-forest" >Plan my journey</Link>
        <Link to="/recommendation" className="text-sm font-semibold text-off-white underline decoration-sand/50 underline-offset-8 transition-colors hover:text-sand">Not sure where to start?</Link>

       </div>
       
    </div>

    <div className="relative hidden -rotate-2 pb-10 pr-6 text-sand md:block lg:mr-16">
     <p className="font-hand text-[1.7rem] leading-7">Start with a place you<br/>can't stop thinking about.<br />We'll build the rest.</p>
     
     <svg aria-hidden="true" viewBox="0 0 70 56" className="absolute -bottom-2 left-2 h-14 w-[4.5rem] text-sand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
      
      <motion.path d="M8 4 C 34 6, 52 20, 46 46" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }} />
      
      <motion.path d="M36 38 L46 48 L54 36" initial={reduce ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.3, delay: 2.2 }} />
     </svg>
     </div>
    </div>

    <div id="destinations" className="mt-2 md:mt-0">
     <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

    <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand/75">Start exploring</p></div>
    <p className="hidden max-w-xs text-right text-sm leading-6 text-off-white/65 sm:block">Tap a card to explore a destination, or use the arrows to browse.</p>
    </div>

   <Destination />
   </div>
   </div>
  </section>


 )
}


export default HeroSection