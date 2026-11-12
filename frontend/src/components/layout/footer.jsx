import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SocialIcon } from 'react-social-icons';
import NavbarBackground from '../../assets/NavbarBackground.jpg'

const exploreLinks = [
  { label: 'Plan a Journey', href: '/planner' },
  { label: 'Discover Destinations', href: '/destination' },
  { label: 'Find Hidden Gems', href: '/community' },
  { label: 'Travel Stories', href: '/trip' },
]

const companyLinks = [
  { label: 'About Us', href: '/#our-story' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Responsible Travel', href: '/#responsible-travel' },
  { label: 'Contact Us', href: '/#contact' },
]

const socials = [
  { network: 'instagram', url: 'https://instagram.com/', label: 'Instagram' },
  { network: 'facebook', url: 'https://facebook.com/', label: 'Facebook' },
  { network: 'youtube', url: 'https://youtube.com/', label: 'YouTube' },
]
 
const ROUTE =
  'M477 192 C476 235 478 275 480 311 C520 352 570 373 624 373 C700 373 750 360 798 340 C850 385 895 420 906 472'

const places = [
 
  { name: 'Mustang', alt: '3,840 m', x: 477, y: 192, side: 'right' },
  { name: 'Pokhara', alt: '822 m', x: 480, y: 311, side: 'left' },
  { name: 'Kathmandu', alt: '1,400 m', x: 624, y: 373, side: 'below', minor: true },
  { name: 'Everest', alt: '8,848.86 m', x: 798, y: 340, side: 'above' },
  { name: 'Ilam', alt: '1,200 m', x: 906, y: 472, side: 'left' },
]

const labelPos = ({ x, y, side }) => {
  switch (side) {
    case 'right':
      return { tx: x + 16, ty: y - 2, anchor: 'start' }
    case 'left':
      return { tx: x - 16, ty: y - 2, anchor: 'end' }
    case 'above':
      return { tx: x, ty: y - 40, anchor: 'middle' }
    default:
      return { tx: x, ty: y + 32, anchor: 'middle' }
  }
}
 
function RouteMap({ reduce }) {
  const draw = (delay, duration) => ({
    initial: reduce ? false : { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: 'easeInOut' },
  })

  return (
   <div className="relative">
    <svg viewBox="0 0 1000 540" role="img" aria-label="Sketch map of Nepal with a route from Mustang to Pokhara, Kathmandu, Everest and Ilam" className="h-auto w-full">
     <motion.path d={ROUTE} fill="none" stroke="#d8c39a" strokeWidth="2" strokeLinecap="round"{...draw(1, 2.4)} />
     
     {places.map((p, i) => {
      const { tx, ty, anchor } = labelPos(p)
      return (
      <motion.g key={p.name} initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-80px' }}transition={{ duration: 0.4, delay: reduce ? 0 : 1.2 + i * 0.45 }}>
        
       <circle cx={p.x} cy={p.y} r={p.minor ? 5 : 7} fill="#d8c39a" fillOpacity={p.minor ? 0.6 : 1} />
       <text x={tx} y={ty} textAnchor={anchor} className={`font-serif ${p.minor ? 'fill-[#f5efe2]/55' : 'fill-[#f5efe2]'}`} fontSize={p.minor ? 24 : 30}>{p.name}</text>
       
       <text x={tx} y={ty + 26} textAnchor={anchor} className="hidden fill-[#d8c39a]/70 font-sans sm:block" fontSize="20">{p.alt}</text>
      </motion.g>
      )
      })}
     </svg>
     
     <div className="pointer-events-none absolute left-[60%] top-[6%] w-[34%] -rotate-3 text-sand">
      <p className="font-hand text-lg leading-5 sm:text-2xl sm:leading-6">Clearest skies<br />are Oct to Nov</p>
      <svg aria-hidden="true" viewBox="0 0 60 60" className="ml-8 h-8 w-8 sm:h-12 sm:w-12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <path d="M10 6 C 12 30, 30 42, 46 50" />
       <path d="M34 50 L47 51 L42 39" />
      </svg>
     </div>
    </div>
  )
}

function Footer() {
  const reduce = useReducedMotion()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
 
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
  }

 return(
 <footer className="relative overflow-hidden bg-forest text-off-white">
  <div className="pointer-events-none absolute inset-0">
   <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: `url(${NavbarBackground})` }} />
   <div className="absolute inset-0 bg-gradient-to-b from-forest-light/40 via-forest/90 to-[-[#102b29]" />
  </div>
  
  <section id="responsible-travel" className="relative mx-auto grid max-w-[1500px] items-center gap-10 border-b border-off-white/10 px-6 py-16 sm:py-20 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20 lg:px-12 lg:py-24">
   <div className="interactive-card rounded-md border border-off-white/10 bg-forest/20 p-5">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand">Plan with intention</p>
    <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">Tell us how many days you have.</h2>
    <p className="mt-5 max-w-md text-sm leading-7 text-off-white/65">We'll suggest a route, and tell you where it's worth slowing down.</p>
    <Link to="/planner" className="mt-8 inline-flex items-center gap-2 rounded-md bg-sand px-5 py-3 text-sm font-semibold text-forest transition-colors hover:bg-[#f5efe2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c39a] focus-visible:ring-offset-2 focus-visible:ring-offset-forest"><ArrowUpRight className="h-4 w-4" />Start planning</Link>
   </div>
   <RouteMap reduce={reduce} />
   </section>
 
   <section id="hidden-gems" className="relative">
   <div className="mx-auto max-w-[1500px] px-6 py-14 lg:px-12 lg:py-16">
    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
    <div>
     <div className="flex items-baseline gap-3">
      <span className="font-serif text-2xl">NEPAL</span>
      <span className="font-deva text-lg text-sand/80">नेपाल</span>
     </div>
     <p className="mt-4 max-w-sm text-sm leading-6 text-off-white/55">Discover Nepal beyond the obvious. Find journeys shaped around the way you want to travel.</p>
     
     <div className="mt-6 flex gap-3">
     {socials.map((s) => (
      <SocialIcon key={s.network} network={s.network} url={s.url} label={s.label} target="_blank" rel="noopener noreferrer" bgColor="#1b2a2f" fgColor="#d8c39a" style={{ height: 36, width: 36 }} />
      ))}
     </div>
    </div>
    
    <FooterColumn title="Explore" links={exploreLinks} />
    <FooterColumn title="Company" links={companyLinks} />
    
    <div id="contact">
     <h3 className="font-serif text-lg text-sand">Occasional letters</h3>
     <p className="mt-4 text-sm leading-6 text-off-white/55">One story and one place off the usual route, every so often.</p>
     
     {sent ? (
      <p className="mt-5 text-sm text-sand" role="status">Thanks. We'll write when we have something worth reading.</p>
     ) : (
    
     <form onSubmit={handleSubmit} className="mt-5 flex border-b border-off-white/25 pb-3 focus-within:border-sand focus-within:outline-none">
      <label htmlFor="footer-email" className="sr-only">Email address</label>
      <input id="footer-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-transparent text-sm text-off-white !outline-none placeholder:text-sand/60 focus:border-transparent focus-visible:!outline-none focus-visible:ring-2 focus-visible:ring-sand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-forest" />
      <button type="submit" aria-label="Subscribe" className="text-sand transition-transform hover:translate-x-1 focus:outline-none focus-visible:translate-x-1">
       <ArrowUpRight className="h-5 w-5" />
      </button>
     </form>
    )}
   </div>
   </div>
   
   <div className="mt-14 flex flex-col gap-4 border-t border-off-white/10 pt-6 text-xs text-off-white/45 sm:flex-row sm:items-center sm:justify-between">
   <p>© {new Date().getFullYear()} Nepal. Travel wise.</p>
   <div className="flex items-center gap-6">
    <Link to="/privacy" className="transition-colors hover:text-sand">Privacy</Link>
    <Link to="/terms" className="transition-colors hover:text-sand">Terms</Link>
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
  <h3 className="font-serif text-lg text-sand">{title}</h3>
  <ul className="mt-5 space-y-3">
   {links.map((link) => (
    <li key={link.label}>
     <Link to={link.href} className="text-sm text-off-white/55 underline decoration-transparent decoration-1 underline-offset-4 transition-colors hover:text-off-white hover:decoration-sand">{link.label}</Link>
    </li>
    ))}
   </ul>
  </div>
  )
}
 
export default Footer