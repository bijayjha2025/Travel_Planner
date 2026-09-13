import React, {useState, useEffect } from 'react'
import { Menu, X, Compass, ChevronRight, Globe, User } from 'lucide-react'

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
     if(isOpen) {
     document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'unset'
    }
    return () => {
        document.body.style.overflow = 'unset'}
    }, [isOpen])

    const navLinks = [
        { name: 'Destinations', href: '#destinations' },
        { name: 'Experiences', href: '#experiences' },
        { name: 'Hidden Gems', href: '#hidden-gems' },
        { name: 'Responsible Travel', href: '#responsible-travel' }
    ]

    return(
    <>
     <nav className='sticky top-0 z-50 bg-off-white-90 backdrop-blur-md border-b border-sand'>
      <div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between'>

        {/* will change the logo and use a brand name later on */}
       <a href='/' className='flex items-center gap-2 text-2xl font-bold text-forest tracking-tight z-50'>
       <Compass className='w-7 text-terracotta'/><span className='font-serif'>NEPAL</span></a>
       
       {/*will add sections later on*/}
       <div className='hidden md:flex items-center gap-8 text-sm font-serif font-medium text-slateText'>
        {navLinks.map((link) => (
         <a key={link.name} href={link.href} className='hover:text-forest transition-colors'>{link.name}</a>
        ))}
       </div>

      <div className='hidden md:flex items-center gap-4'>
       <a href='/login' className='text-sm font-serif font-medium text-slateText hover:text-forest'>Sign In</a>
       <a href='/planner' className=' font-serif bg-forest text-off-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-forest-light transition-all shadow-sm'>Plan My Journey</a>
      </div>
     
      {/* mobile menu button and will enhance it after deciding a better way to implement it */}
      <button onClick={() => setIsOpen(!isOpen)} className='md:hidden text-forest p-2 -mr-2 rounded-lg focus:outline-none hover:bg-sand/20 transition-colors z-50' aria-label='Toggle menu'>
       { isOpen ? <X className='w-6 h-6'/> : <Menu className='w-6 h-6'/>}
      </button>
     </div>
     </nav>
     
     <div className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none' }`} onClick={() => setIsOpen(false)} />
     
     <div className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-off-white z-40 flex flex-col justify-between pt-24 pb-8 px-6 transition-transform duration-300 ease-in-out md:hidden shadow-2xl border-l border-sand ${ isOpen ? 'translate-x-0' : 'translate-x-full' }`} >

     <div className='flex flex-col gap-1'>
      <p className='text-xs font-semibold tracking-wider text-slateText/60 uppercase mb-2 px-3'>Explore</p>
      
      {navLinks.map((link) => (
      <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className='flex items-center justify-between py-3.5 px-3 rounded-xl font-serif text-lg text-slateText hover:text-forest hover:bg-sand/30 transition-all active:scale-[0.98]'>
       <span>{link.name}</span>
       <ChevronRight className='w-4 h-4 text-slateText/40' />
      </a>
     ))}
     </div>

     <div className='flex flex-col gap-4 pt-6 border-t border-sand'>
      <a href='/login' onClick={() => setIsOpen(false)} className='flex items-center gap-3 px-3 py-2 text-slateText hover:text-forest font-serif font-medium text-base'>
       <User className='w-5 h-5 text-terracotta' />
       <span>Sign In</span>
      </a>

      <a href='/planner' onClick={() => setIsOpen(false)} className='bg-forest text-off-white text-center py-3.5 px-6 rounded-xl font-serif font-medium text-base shadow-md hover:bg-forest-light active:scale-[0.98] transition-all'>Plan My Journey</a>
      
      <div className='flex items-center justify-center gap-2 pt-2 text-xs text-slateText/60'>
       <Globe className='w-3.5 h-3.5' />
       <span>Discover Nepal</span>
      </div>
     </div>
    </div>
   </>
  )
}