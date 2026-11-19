import { useState } from 'react'
import { CheckCircle2, Mail, MapPin, Send } from 'lucide-react'
import BackgroundImage from '../assets/BackgroundImage.png'
import Footer from '../components/layout/footer'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
  <div className="page-surface min-h-screen text-forest font-sans">
   <section className="page-hero relative overflow-hidden bg-forest pb-20 pt-24 text-off-white sm:pb-28 sm:pt-28">
    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${BackgroundImage}')` }} />
    <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/85" />
    <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 lg:px-12">
     <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand">Keep in touch</p>
     <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">Let’s talk about your next route.</h1>
     <p className="mt-6 max-w-2xl text-base leading-7 text-[#f3e8d0] sm:text-lg">Have a question, a story to share, or an idea for a place we should know about? We would love to hear from you.</p>
    </div>
   </section>

   <main className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 sm:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:px-12">
    <aside className="space-y-8">
    <div>
     <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Say hello</p>
     <h2 className="mt-3 font-serif text-3xl leading-tight text-forest">We’re here for the details.</h2>
    </div>
    
    <div className="space-y-5 text-sm leading-6 text-slateText">
     <p className="flex gap-3"><Mail className="mt-1 h-4 w-4 shrink-0 text-terracotta" />hello@nepaljourneys.com</p>
     <p className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-terracotta" />Eastern Nepal, wherever the road leads</p>
    </div>
   <p className="border-l-2 border-terracotta pl-4 font-serif text-xl leading-7 text-forest">The best travel advice usually starts with a good question.</p>
   </aside>
   
   <section className="content-panel rounded-[3px] border border-sand p-6 sm:p-9">
   {submitted ? (
    <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
     <CheckCircle2 className="h-12 w-12 text-terracotta" />
     <h2 className="mt-5 font-serif text-3xl text-forest">Message received.</h2>
     <p className="mt-3 max-w-sm text-sm leading-6 text-slateText">Thanks for reaching out. We’ll get back to you with care.</p>
    </div>
    ) : (
    
    <form onSubmit={handleSubmit} className="space-y-5">
     <div className="grid gap-5 sm:grid-cols-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-slateText">Your name
       <input required name="name" className="mountain-input mt-2 w-full px-3 py-3 text-sm outline-none" placeholder="How should we call you?" />
      </label>
      <label className="text-xs font-semibold uppercase tracking-wider text-slateText">Email address
       <input required type="email" name="email" className="mountain-input mt-2 w-full px-3 py-3 text-sm outline-none" placeholder="you@example.com" />
      </label>
     </div>
     
     <label className="block text-xs font-semibold uppercase tracking-wider text-slateText">What can we help with?
      <select name="topic" className="mountain-select mt-2 w-full px-3 py-3 text-sm outline-none">
       <option>Planning a journey</option>
       <option>Sharing a destination</option>
       <option>Partnerships</option>
       <option>Something else</option>
      </select>
     </label>
     <label className="block text-xs font-semibold uppercase tracking-wider text-slateText">Your message
      <textarea required name="message" rows="6" className="mountain-input mt-2 w-full resize-y px-3 py-3 text-sm outline-none" placeholder="Tell us what’s on your mind..." />
     </label>
     <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-forest px-5 py-3 text-sm font-semibold text-off-white transition-colors hover:bg-forest-light">Send message <Send className="h-4 w-4 text-terracotta" /></button>
    </form>
   )}
  </section>
 </main>
<Footer />
</div>
)
}
