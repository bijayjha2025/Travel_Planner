import { motion } from "framer-motion";
import { ArrowUpRight, Compass, MapPin, Mountain, Sparkles } from "lucide-react";
import NavbarBackground from '../../assets/NavbarBackground.jpg'

const exploreLinks = [
    'Plan a Journey',
    'Discover Destinations',
    'Find Hidden Gems',
    'Travel Stories',
]

const companyLinks = [
    'About Us',
    'How It Works',
    'Our Vision',
    'Contact Us',
]

const destinations = [
    { name: 'Mustang', x:'17%', y:'30%' },
    { name: 'Pokhara', x:'43%', y:'58%' },
    { name: 'Everest', x:'78%', y:'25%' },
    { name: 'Ilam', x:'88%', y:'70%' },
]

function Footer() {
 return(
  <footer className='relative overflow-hidden bg-[#0e171b] text-[#f5efe2]'>
   <div className='absolute inset-0 pointer-events-none'>
    
    <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full border border-[#d8c39a]/10"/>
    <div className="absolute -top-28 left-1/2 h-[470px] w-[470px] -translate-x-1/2 rounded-full border border-[#d8c39a]/10"/>

    <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#d8c39a]/5 blur-3xl"/>
    
    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.25] mix-blend-overlay" style={{ backgroundImage: `url(${NavbarBackground})` }} />

    <div className="absolute inset-0 bg-gradient-to-b from-[#132227]/40 via-[#0e1c21]/75 to-[#0b1417]/95" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(32,58,67,0.5),transparent_70%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(216,195,154,0.1),transparent_45%)]" />
   
   </div>
    
    <section className="relative min-h-[720px] flex items-center justify-center px-6 py-24">
     <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear', }} className="absolute left-1/2 top-12 hidden h-[460px] w-[460px] -translate-x-1/2 rounded-full border border-dashed border-[#d8c39a]/10 md:block"/>

     <motion.div animate={{ rotate: -360 }} transition={{ duration: 55, repeat: Infinity, ease: 'linear', }} className="absolute left-1/2 top-24 hidden h-[350px] w-[350px] -translate-x-1/2 rounded-full border border-[#d8c39a]/10 md:block"/>

     <div className="absolute inset-0 hidden md:block">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 700" preserveAspectRatio="none">
       <motion.path d="M170 210 C300 340, 350 420, 500 350 C650 280, 720 160, 870 260" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 8" className="text-[#d8c39a]/20" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2.5 }}/>
      </svg>

      {destinations.map((destination, index) => (
       <motion.div key={destination.name} className="absolute" style={{ left: destination.x, top: destination.y, }} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 + index * 0.15, type: 'spring', }} >

        <div className="group relative">
         <motion.div animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5], }} transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4, }} className="absolute -inset-2 rounded-full bg-[#d8c39a]/20"/>

         <div className="relative h-3 w-3 rounded-full bg-[#d8c39a] shadow-[0_0_18px_rgba(216,195,154,0.55)]"/>
         <div className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.25em] text-[#d8c39a]/60 transition-colors group-hover:text-[#d8c39a]"> {destination.name}
         </div>
        </div>
       </motion.div>
      ))}
     </div>

     <div className="relative z-10 mx-auto max-w-3xl text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d8c39a]/20 bg-[#d8c39a]/5 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#d8c39a]" > <Compass className="h-3.5 w-3.5"/> The journey continues</motion.div>

      <motion.h2 initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="font-serif text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl md:text-7xl" > Nepal is not a place <span className="block italic text-[#d8c39a]"> you simply visit.</span></motion.h2>

      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#f5efe2]/55 sm:text-base" > It is the road you take, the people you meet, the stories you collect, and the places you never expected to find.</motion.p>

      <motion.a href="/planner" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="group mx-auto mt-10 inline-flex items-center gap-3 rounded-full bg-[#d8c39a] px-7 py-4 text-sm font-medium text-[#173326] shadow-xl shadow-black/10 transition-all" > <Mountain className="h-4 w-4" /> Start your journey <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#173326]/10 transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight className="h-4 w-4"/></span></motion.a>
     </div>
    </section>

    <section className="relative border-t border-[#f5efe2]/10">
     <div className="mx-auto max-w-[1500px] px-6 py-14 lg:px-10">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
      <div>
        
       <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8c39a]/30">
         <Compass className="h-5 w-5 text-[#d8c39a]"/></div>
          <span className="font-serif text-2xl tracking-tight"> Nepal</span>
         </div>
         
         <p className="mt-5 max-w-sm text-sm leading-6 text-[#f5efe2]/45">Discover Nepal beyond the obvious. Find journeys shaped around the way you want to travel. </p> <div className="mt-7 flex gap-3">
         </div>
        </div>
        
        <FooterColumn title="Explore" links={exploreLinks} />
        <FooterColumn title="Nepal" links={companyLinks} />

        <div>
         <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#d8c39a]">
          <Sparkles className="h-3.5 w-3.5" />Stay curious</div>

          <p className="mt-4 text-sm leading-6 text-[#f5efe2]/45">Get occasional stories, hidden places and travel inspiration from Nepal.</p>

          <div className="mt-5 flex border-b border-[#f5efe2]/20 pb-3">
           <input type="email" placeholder="Your email" className="w-full bg-transparent text-sm text-[#f5efe2] outline-none placeholder:text-[#f5efe2]/25" />
           <button type="button" className="text-[#d8c39a] transition-transform hover:translate-x-1">
            <ArrowUpRight className="h-5 w-5" /> </button>
           </div>
          </div>
          </div>
          
          <div className="mt-14 flex flex-col gap-5 border-t border-[#f5efe2]/10 pt-6 text-[11px] uppercase tracking-[0.15em] text-[#f5efe2]/30 sm:flex-row sm:items-center sm:justify-between">
          <p> © {new Date().getFullYear()} Nepal. Made for curious souls.</p>
          
          <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
           <MapPin className="h-3 w-3" /> Nepal </span> <a href="#" className="transition-colors hover:text-[#d8c39a]"> Privacy</a>
           <a href="#" className="transition-colors hover:text-[#d8c39a]">Terms</a>
          </div>
        

        
        </div>
        </div>
    </section>

  </footer>
 )
}

function FooterColumn({ title, links }) {
return (
<div>
 <h3 className="text-xs uppercase tracking-[0.22em] text-[#d8c39a]"> {title}</h3>
 <ul className="mt-5 space-y-3"> {links.map((link) => ( <li key={link}>
  <a href="#" className="group inline-flex items-center gap-1 text-sm text-[#f5efe2]/45 transition-colors hover:text-[#f5efe2]" >{link} <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-70" /> </a> </li> ))}
  </ul>
 </div>
 );
}
 

function SocialButton({ children }) {
 return (
 <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f5efe2]/10 text-[#f5efe2]/45 transition-all duration-300 hover:border-[#d8c39a]/40 hover:bg-[#d8c39a]/10 hover:text-[#d8c39a]" >{children} </a>
);
}


export default Footer;