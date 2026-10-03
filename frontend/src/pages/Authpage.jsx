import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Compass, Eye, EyeOff, Lock, Mail, MapPin, User } from 'lucide-react'
import BackgroundImage from '../assets/BackgroundImage.png'

const Mark = ({ className = '' }) => (
 <svg viewBox="0 0 32 28" className={className} fill="none" aria-hidden="true">
  <path d="M2 25 L12 8 L17 16 L21 11 L30 25 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
  <circle cx="25" cy="6" r="2.5" className="fill-terracotta" />
 </svg>
)

const GoogleIcon = (props) => (
 <svg viewBox="0 0 48 48" {...props} aria-hidden="true">
  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6 29.6 4 24 4 16 4 9.1 8.5 6.3 14.7z" />
  <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.6c-2.1 1.5-4.8 2.4-7.7 2.4-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9 39.4 15.9 44 24 44z" />
  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.6 5.6c-.5.4 6.9-5 6.9-15.6 0-1.3-.1-2.7-.4-3.5z" />
 </svg>
)

const PasswordField = ({ id, label, value, onChange, autoComplete, placeholder }) => {
 const [show, setShow] = useState(false)
 
 return (
  <div className="group">
   <label htmlFor={id} className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slateText/65">{label}</label>

   <div className="relative">
    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slateText/35 transition-colors group-focus-within:text-terracotta" />
    
    <input id={id} type={show ? 'text' : 'password'} required value={value} onChange={onChange} autoComplete={autoComplete} placeholder={placeholder} minLength={8} className="w-full rounded-2xl border border-sand/90 bg-off-white/70 py-3.5 pl-11 pr-12 text-sm text-forest outline-none backdrop-blur-sm transition-all placeholder:text-slateText/30 hover:border-sand focus:border-terracotta focus:bg-off-white focus:shadow-[0_0_0_4px_rgba(184,88,65,0.08)]" />
    <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-4 top-1/2 -translate-y-1/2 text-slateText/35 transition-colors hover:text-forest">{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
   </div>
  </div>
  )
}

function JourneyRoute({ reduce }) {
 return (
  <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-80" viewBox="0 0 700 800" preserveAspectRatio="none" aria-hidden="true">
   <motion.path d="M70 650 C170 560 100 470 235 420 C360 372 305 275 455 245 C535 230 535 145 625 100" fill="none" stroke="rgba(239,226,193,0.55)" strokeWidth="1.5" strokeDasharray="7 10" initial={reduce ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.6 }} transition={{ duration: 2, delay: 0.4, ease: 'easeInOut' }} />

   {[{ cx: 70, cy: 650, delay: 1.5 }, { cx: 235, cy: 420, delay: 1.8 }, { cx: 455, cy: 245, delay: 2.1 }, { cx: 625, cy: 100, delay: 2.4 },].map((point) => (
   
   <motion.g key={`${point.cx}-${point.cy}`} initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: point.delay, duration: 0.4 }} style={{ transformOrigin: `${point.cx}px ${point.cy}px` }}>
    <circle cx={point.cx} cy={point.cy} r="5" fill="#B85841" />
    <circle cx={point.cx} cy={point.cy} r="9" fill="none" stroke="rgba(239,226,193,0.6)" />
   </motion.g>
   ))}
  </svg>
 )
}

function AuthPage() {
  const reduce = useReducedMotion()
  const [mode, setMode] = useState('signin')
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', agree: false, })

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value, }))

  const switchMode = (next) => { setMode(next)
    setStatus('idle')
  }

  const mismatch = mode === 'signup' && form.confirm.length > 0 && form.confirm !== form.password

  const handleSubmit = (e) => { e.preventDefault()
    if (mode === 'signup' && form.password !== form.confirm) return

    setStatus('loading')
    
    setTimeout(() => setStatus('idle'), 1200)
  }

  return (
   <main className="relative min-h-screen overflow-hidden bg-forest font-sans text-slateText lg:grid lg:grid-cols-[1.08fr_0.92fr]">
     <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${BackgroundImage}')` }} />
     <div className="absolute inset-0 bg-forest/40" />
     <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-transparent to-forest/45" />

     <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[760px] w-[760px] -translate-y-1/2 translate-x-1/4 rounded-full bg-sand/20 blur-[130px] lg:block" />
      <section className="relative z-10 flex min-h-[620px] overflow-hidden lg:min-h-screen">
      <JourneyRoute reduce={reduce} />

      <motion.div initial={reduce ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}className="absolute right-5 top-28 z-10 hidden rounded-2xl border border-sand/25 bg-forest/30 px-4 py-3 text-sand/85 shadow-2xl backdrop-blur-md sm:block lg:right-10 lg:top-32">
       <div className="flex items-center gap-2">
        <MapPin className="h-3.5 w-3.5 text-terracotta" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">Somewhere in Nepal</span>
       </div>
      <p className="mt-1 font-serif text-sm text-off-white">The next story is unwritten.</p>
      </motion.div>

      <div className="relative z-10 flex w-full flex-col justify-between px-6 py-6 sm:px-8 lg:px-12 lg:py-8">
       <div className="flex items-center justify-between">
       

        <a href="/" className="hidden items-center gap-1.5 rounded-full border border-off-white/15 bg-forest/20 px-3 py-1.5 text-xs text-off-white/80 backdrop-blur-sm transition hover:border-sand/40 hover:text-off-white sm:flex">
         <ArrowLeft className="h-3.5 w-3.5" />Back home</a>
       </div>
       
       <div className="relative max-w-xl pb-4 pt-24 lg:pb-10 lg:pt-0">
        <motion.div initial={reduce ? false : { opacity: 0, letterSpacing: '0.05em' }} animate={{ opacity: 1, letterSpacing: '0.22em' }} transition={{ duration: 0.8, delay: 0.15 }} className="mb-5 text-[9px] font-semibold uppercase text-sand/75">Your personal travel archive</motion.div>

        <motion.h1 initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="max-w-lg font-serif text-5xl leading-[0.98] tracking-[-0.025em] text-off-white sm:text-6xl xl:text-7xl">Keep the places<span className="block text-sand">that keep you moving.</span></motion.h1>

        <motion.p initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }} className="mt-5 max-w-md text-sm leading-6 text-off-white/70 sm:text-base">Your saved escapes, unfinished itineraries, hidden gems and future journeys — all waiting where you left them.</motion.p>
        
        <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="mt-7 flex items-center gap-4 text-sand/75">
        <div className="flex items-center gap-2">
         <Compass className="h-4 w-4" />
         <span className="text-xs">wander / save / return</span>
        </div>
         <span className="h-1 w-1 rounded-full bg-terracotta" />
         <span className="font-hand text-xl">see you on the trail</span>
        </motion.div>
       </div>

       <motion.div initial={reduce ? false : { opacity: 0, scale: 0.75, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: -9 }} transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }} className="absolute bottom-7 right-7 z-10 hidden h-28 w-28 items-center justify-center rounded-full border border-dashed border-sand/55 text-center text-sand/75 lg:flex">
        <div className="absolute inset-2 rounded-full border border-sand/20" />
        <div className="leading-tight">
         <p className="text-[8px] uppercase tracking-[0.25em]">Kathmandu</p>
         <p className="mt-1 font-serif text-lg">Nepal</p>
         <p className="mt-1 text-[8px] uppercase tracking-[0.18em]">your route awaits</p>
        </div>
       </motion.div>
      </div>
     </section>
     
     <section className="relative z-10 flex items-center justify-center px-5 py-12 sm:px-8 lg:min-h-screen lg:px-12">
      
      <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}className="relative w-full max-w-md overflow-hidden rounded-[2.25rem] border border-white/50 bg-[#8d9aa8] p-6 shadow-[0_40px_120px_rgba(8,24,18,0.45)] backdrop-blur-2xl sm:p-8 lg:max-w-[430px] lg:p-9">
        
       <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-off-white/25 via-transparent to-sand/10" />
       <div className="relative w-full">
       <div className="mb-8 flex items-end justify-between">
       <div>
        <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-terracotta">Field note 01</p>
        <p className="text-xs text-slateText/45">Your journey starts here</p>
       </div>
       
       <div className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-slateText/40 sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />Private space
       </div>
      </div>
      
      <div className="relative mb-8 grid grid-cols-2 border-b border-slateText/15">
       {[ { key: 'signin', label: 'Return' }, { key: 'signup', label: 'Begin' },].map((tab) => (
       <button key={tab.key} type="button" onClick={() => switchMode(tab.key)} className={`relative pb-3 text-left text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${ mode === tab.key ? 'text-forest' : 'text-slateText/40 hover:text-slateText/70'}`}>
        {tab.label}
        
        {mode === tab.key && (
        <motion.span layoutId="auth-line" transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 350, damping: 30 }}className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-terracotta" /> )}
       </button>
      ))}
     </div>

     <AnimatePresence mode="wait">
      <motion.div key={mode} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>
      <div className="mb-7">
       <h2 className="font-serif text-4xl tracking-[-0.02em] text-forest">{mode === 'signin' ? 'Welcome back.' : 'Begin your journey.'}</h2>
       <p className="mt-2 max-w-sm text-sm leading-6 text-slateText/60">{mode === 'signin' ? 'Pick up your saved places, unfinished plans and next escape.' : 'Create your space. You can decide where to go once you are inside.'}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
       {mode === 'signup' && (
       <div className="group">
        <label htmlFor="name" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slateText/65">Full name</label>
        <div className="relative">
        <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slateText/35 transition-colors group-focus-within:text-terracotta" />
        <input id="name" type="text" required value={form.name} onChange={update('name')} autoComplete="name" placeholder="Rajesh Hamal" className="w-full rounded-2xl border border-slateText/10 bg-off-white/45 py-3.5 pl-11 pr-4 text-sm text-forest outline-none transition-all placeholder:text-slateText/30 hover:border-sand focus:border-terracotta focus:bg-off-white/70 focus:shadow-[0_0_0_4px_rgba(184,88,65,0.08)]" />
       </div>
      </div>
     )}

    <div className="group">
     <label htmlFor="email" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slateText/65">Email</label>
     <div className="relative">
      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slateText/35 transition-colors group-focus-within:text-terracotta" />
      <input id="email" type="email" required value={form.email} onChange={update('email')} autoComplete="email" placeholder="hamalrajesh@gmail.com" className="w-full rounded-2xl border border-slateText/10 bg-off-white/45 py-3.5 pl-11 pr-4 text-sm text-forest outline-none transition-all placeholder:text-slateText/30 hover:border-sand focus:border-terracotta focus:bg-off-white/70 focus:shadow-[0_0_0_4px_rgba(184,88,65,0.08)]"/>
      </div>
     </div>

     <PasswordField id="password" label="Password" value={form.password} onChange={update('password')} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} placeholder="Password" />

     {mode === 'signup' && (
      <PasswordField id="confirm" label="Confirm password" value={form.confirm} onChange={update('confirm')} autoComplete="new-password" placeholder="Confirm your password"/> )}

     {mode === 'signup' && form.confirm.length > 0 && form.confirm !== form.password && (
      <p className="-mt-3 text-xs text-terracotta">Passwords don't match yet.</p> )}

     {mode === 'signin' ? (
      <div className="flex items-center justify-between text-xs">
       <label className="flex items-center gap-2 text-slateText/65">
       <input type="checkbox" className="h-4 w-4 rounded border-sand accent-forest" />Remember me</label>
       <a href="/forgot-password" className="font-semibold text-forest transition-colors hover:text-terracotta">Forgot password?</a>
      </div>
      ) : (
       <label className="flex items-start gap-2.5 text-xs leading-5 text-slateText/65">
       <input type="checkbox" required checked={form.agree} onChange={update('agree')} className="mt-0.5 h-4 w-4 shrink-0 rounded border-sand accent-forest" />
        <span>I agree to the{' '}<a href="/terms" className="font-semibold text-forest hover:text-terracotta">Terms</a>{' '}and{' '}<a href="/privacy" className="font-semibold text-forest hover:text-terracotta">Privacy Policy</a>.</span>
       </label>
      )}

      <motion.button type="submit" disabled={status === 'loading'} whileHover={reduce ? {} : { y: -2 }} whileTap={reduce ? {} : { scale: 0.985 }} className="group relative mt-1 flex items-center justify-between overflow-hidden rounded-2xl bg-forest px-5 py-4 text-sm font-semibold text-off-white shadow-[0_12px_30px_rgba(31,61,50,0.16)] transition-shadow hover:shadow-[0_16px_36px_rgba(31,61,50,0.22)] disabled:opacity-60">
       <span className="absolute inset-y-0 left-0 w-0 bg-terracotta/20 transition-all duration-500 group-hover:w-full" />
       <span className="relative">{status === 'loading' ? 'Opening your journey…' : mode === 'signin' ? 'Continue the journey' : 'Create my travel space'}</span>
       <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-off-white/10">
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
       </span>
      </motion.button>
      </form>

      <div className="my-7 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-slateText/35">
       <span className="h-px flex-1 bg-slateText/10" />or continue with<span className="h-px flex-1 bg-slateText/10" />
      </div>

      <button type="button" className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-slateText/10 bg-off-white/35 py-3.5 text-sm font-medium text-slateText transition-all hover:border-forest/20 hover:bg-off-white/60">
        <GoogleIcon className="h-4 w-4" />
        <span>Google</span>
        <ArrowUpRight className="h-3.5 w-3.5 text-slateText/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>

      <p className="mt-7 text-center text-xs text-slateText/55">
       {mode === 'signin' ?
       (
        <>New here?{' '}<button type="button" onClick={() => switchMode('signup')} className="font-semibold text-forest hover:text-terracotta">Create your travel space</button></>

       ) : (
        <>Already have an account?{' '}<button type="button" onClick={() => switchMode('signin')} className="font-semibold text-forest hover:text-terracotta">Return to your journey</button></>
       )}
      </p>

      <div className="mt-9 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.18em] text-slateText/40">
       <span className="h-1 w-1 rounded-full bg-terracotta/70" />Your saved journeys stay yours<span className="h-1 w-1 rounded-full bg-terracotta/70" />
      </div>
      </motion.div>
      </AnimatePresence>
      </div>
     </motion.div>
    </section>
   </main>
  )
}

export default AuthPage
