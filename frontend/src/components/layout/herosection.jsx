import BackgroundImage from '../../assets/BackgroundImage.png'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Destination from '../../pages/destination'

function HeroSection() {
    
 return(
  <section className="relative min-h-[650px] sm:min-h-[700px] md:min-h-[750px] lg:min-h-[850px] flex items-center justify-center bg-forest text-offwhite overflow-hidden">
   
   <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${BackgroundImage}')` }}>
    
    <div className="absolute inset-0 bg-forest/40" />

    <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 pt-16">

    <div className="text-center max-w-3xl mx-auto">
     <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 bg-sand/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-sand/20 text-shadow-emerald-950 text-xs tracking-wider uppercase font-medium" > <Sparkles className="w-3.5 h-3.5 text-terracotta" /> Journeys Crafted Around You </motion.div>
      
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-serif text-7xl md:text-6xl lg:text-4xl leading-[1.05] font-normal tracking-tight mt-6" > Your next experience,<span className="block text-emerald-950"> shaped by YOU </span> </motion.h1>
      
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="font-sans text-amber-950 text-base md:text-lg max-w-2xl mx-auto mt-5 leading-relaxed" >Tell us what kind of trip you have in mind. Your time, budget, interests, and how much adventure you want. We'll put it together into a journey that actually works for you.
 </motion.p>
      
    </div>

    <motion.div
     initial={{
      opacity: 0, y: 30,
     }}
    
     animate={{
      opacity: 1, y: 0,
     }}
    
     transition={{
      duration: 0.8, delay: 0.35,
     }} className=" mt-4 md:mt-0 ">
     <Destination />
    </motion.div>
   </div>
   </div>
  </section>


 )
}


export default HeroSection