import React, {useState, useEffect } from 'react'
import { Menu, X, User } from 'lucide-react'

const Mark = ({ className = '' }) => (
<svg viewBox="0 0 32 28" className={className} fill="none" aria-hidden="true">
 <path d="M2 25 L12 8 L17 16 L21 11 L30 25 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
 <circle cx="25" cy="6" r="2.5" className="fill-terracotta" />
</svg>
)

const navLinks = [
 { name: 'Destinations', href: '#destinations' },
 { name: 'Experiences', href: '#experiences' },
 { name: 'Hidden Gems', href: '#hidden-gems' },
 { name: 'Responsible Travel', href: '#responsible-travel' }
]

export const Navbar = () => {
 const [isOpen, setIsOpen] = useState(false)
 const [scrolled, setScrolled] = useState(false)
 
 useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
 
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  
  return(
    <>
     <nav className={`sticky top-0 z-50 bg-off-white-90 backdrop-blur-md border-b border-sand transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_6px_20px_-12px_rgba(0,0,0,0.35)]': '' }`}>
      <div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between'>

       <a href='/' className='flex items-center gap-2.5 text-forest z-50'>
       <Mark className='h-7 w-8 text-forest' />
      <span className='font-serif text-2xl leading-none'>NEPAL</span></a>

       <div className='hidden md:flex items-center gap-8'>
        {navLinks.map((link) => (
         <a key={link.name} href={link.href} className="group relative py-1 text-sm font-medium text-slateText transition-colors hover:text-forest">{link.name}
         
         <svg aria-hidden="true" viewBox="0 0 100 6" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-[6px] w-full origin-left scale-x-0 text-terracotta transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" >
          <path d="M0 3 Q 12.5 0, 25 3 T 50 3 T 75 3 T 100 3" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
         </svg>
        </a>
        ))}
       </div>

      <div className='hidden md:flex items-center gap-5'>
       <a href='/login' className='text-sm font-serif font-medium text-slateText hover:text-forest transition-colors'>Sign In</a>
       <a href='/planner' className=' font-serif bg-forest text-off-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-forest-light transition-colors'>Plan My Journey</a>
      </div>
     
      <button onClick={() => setIsOpen(!isOpen)} className="z-50 -mr-2 rounded-lg p-2 text-forest transition-colors hover:bg-sand/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest md:hidden" aria-label={isOpen ? 'Close menu' : 'Open menu'}aria-expanded={isOpen} aria-controls="mobile-menu" >
       {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
     </div>
     </nav>
     
     <div className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none' }`} onClick={() => setIsOpen(false)} />
     

     <div id="mobile-menu" aria-hidden={!isOpen} className={`fixed bottom-0 right-0 top-0 z-40 flex w-[85%] max-w-sm flex-col justify-between border-l border-sand bg-off-white px-6 pb-8 pt-24 shadow-2xl transition-[transform,visibility] duration-300 ease-in-out md:hidden ${  isOpen ? 'translate-x-0' : 'invisible translate-x-full' }`} >
      
      <div className='flex flex-col'>
      {navLinks.map((link) => (
      <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="flex items-baseline justify-between gap-4 border-b border-sand/60 px-1 py-4 transition-colors hover:text-forest active:bg-sand/20">
       <span className="font-serif text-xl text-slateText">{link.name}</span>
       <span className="font-deva text-sm text-slateText/55">{link.native}</span>
      </a>
     ))}
     </div>

     <div className='flex flex-col gap-4'>
      <a href='/login' onClick={() => setIsOpen(false)} className='flex items-center gap-3 px-1 py-2 text-slateText hover:text-forest font-serif font-medium text-base'>
       <User className='w-5 h-5 text-terracotta' />
       <span>Sign In</span>
      </a>

      <a href='/planner' onClick={() => setIsOpen(false)} className="rounded-lg bg-forest px-6 py-3.5 text-center text-base font-medium text-off-white shadow-md transition-colors hover:bg-forest-light">Plan My Journey</a>

      <p className="pt-1 text-center font-deva text-sm text-slateText/60">नमस्ते, welcome.</p>
     </div>
    </div>
   </>
  )
}