import { Link } from 'react-router-dom'
import { ArrowUpRight, Compass, Heart, Leaf, MapPin, Users } from 'lucide-react'
import BackgroundImage from '../assets/BackgroundImage.png'
import NavbarBackground from '../assets/NavbarBackground.jpg'
import Footer from '../components/layout/footer'

const values = [
  {
    icon: Compass,
    title: 'Travel with intention',
    description: 'We help you spend more time experiencing a place and less time piecing together a route.',
  },
  {
    icon: Users,
    title: 'Local knowledge first',
    description: 'Our recommendations are shaped around local stories, honest costs, and places worth slowing down for.',
  },
  {
    icon: Leaf,
    title: 'Leave a lighter footprint',
    description: 'We encourage thoughtful travel that supports local communities and respects the landscapes they call home.',
  },
]

const milestones = [
  { value: '8+', label: 'Eastern Nepal destinations' },
  { value: '3', label: 'ways to find your route' },
  { value: '100%', label: 'built around your pace' },
]

export default function About() {
 return (
  <div className="page-surface min-h-screen text-forest font-sans">
   <section className="page-hero relative overflow-hidden bg-forest pb-20 pt-24 text-off-white sm:pb-28 sm:pt-28">
    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${BackgroundImage}')` }} />
    <div className="absolute inset-0 bg-gradient-to-br from-forest/95 via-forest/80 to-[#102b29]/90" />
    
    <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 lg:px-12">
     <div className="max-w-3xl">
      <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-sand">
       <span className="h-px w-8 bg-terracotta" />About Nepal, your way</div>
       <h1 className="font-serif text-4xl leading-tight sm:text-6xl">The best journeys make room for the unexpected.</h1>
       <p className="mt-6 max-w-2xl text-base leading-7 text-[#f3e8d0] sm:text-lg">Nepal is more than a destination on a map. It is a collection of small roads, generous homes, quiet viewpoints, and stories waiting to be lived. We make it easier to find the version of Nepal that feels like yours.</p>
       <div className="mt-8 flex flex-wrap gap-4">
        <Link to="/planner" className="inline-flex items-center gap-2 rounded-md bg-sand px-5 py-3 text-sm font-semibold text-forest transition-colors hover:bg-off-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sand">Start planning<ArrowUpRight className="h-4 w-4" /></Link>
        <a href="#our-story" className="inline-flex items-center rounded-md border border-sand/45 px-5 py-3 text-sm font-semibold text-sand transition-colors hover:bg-sand/10">Our story</a>
       </div>
      </div>
     </div>
     </section>

     <main>
      <section id="our-story" className="mx-auto grid max-w-[1500px] gap-10 px-6 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:px-12">
       <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Why we exist</p>
        <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight text-forest sm:text-5xl">Less checklist. More connection.</h2>
       <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-slateText sm:text-base">
        <p>Planning a trip should feel exciting, not like a second job. Nepal was created for travelers who want useful guidance without losing the freedom to wander.</p>
        <p>From a tea garden morning in Ilam to a quiet ridge above the clouds, we bring together the details that help a good idea become a meaningful journey: places, pace, budget, and a little room for surprise.</p>
       </div>
       </div>

       <div className="relative overflow-hidden rounded-[3px] border border-sand bg-forest p-7 text-off-white shadow-[0_20px_40px_-24px_rgba(24,58,55,0.8)] sm:p-10">
       <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen" style={{ backgroundImage: `url('${NavbarBackground}')` }} />
        <div className="relative">
         <MapPin className="h-8 w-8 text-terracotta" />
         <p className="mt-8 font-serif text-3xl leading-tight text-sand sm:text-4xl">“Go where the view takes a little effort.”</p>
         <p className="mt-6 text-sm leading-6 text-off-white/65">We believe the places that stay with you are often just beyond the obvious route.</p>
        </div>
       </div>
      </section>

      <section className="border-y border-sand/80 bg-[#f5efe2]/70">
       <div className="mx-auto grid max-w-[1500px] gap-8 px-6 py-12 sm:grid-cols-3 sm:py-16 lg:px-12">
        {milestones.map((milestone) => (
        <div key={milestone.label} className="border-l-2 border-terracotta pl-5">
         <p className="font-serif text-4xl text-forest">{milestone.value}</p>
         <p className="mt-1 text-sm text-slateText">{milestone.label}</p>
        </div>
        ))}
       </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 py-16 sm:py-24 lg:px-12">
       <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Our way of travelling</p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-forest sm:text-5xl">Thoughtful by design.</h2>
       </div>

       <div className="mt-10 grid gap-5 md:grid-cols-3">
        {values.map(({ icon: Icon, title, description }) => (
        <article key={title} className="interactive-card content-panel rounded-[3px] border border-sand p-6 sm:p-7">
         <Icon className="h-7 w-7 text-terracotta" />
         <h3 className="mt-8 font-serif text-2xl text-forest">{title}</h3>
         <p className="mt-3 text-sm leading-6 text-slateText">{description}</p>
        </article>
        ))}
       </div>
      </section>

      <section className="mx-6 mb-16 overflow-hidden rounded-[3px] bg-forest text-off-white sm:mx-12 sm:mb-24">
       <div className="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-8 px-7 py-10 sm:px-12 sm:py-14 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
         <Heart className="h-7 w-7 text-terracotta" />
         <h2 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">Your kind of Nepal is waiting.</h2>
         <p className="mt-3 text-sm leading-6 text-off-white/65">Tell us how you want to travel, and we will help shape the route.</p>
        </div>
       <Link to="/recommendation" className="inline-flex shrink-0 items-center gap-2 rounded-md bg-sand px-5 py-3 text-sm font-semibold text-forest transition-colors hover:bg-off-white">Find your place
        <ArrowUpRight className="h-4 w-4" />
       </Link>
      </div>
     </section>
    </main>
   <Footer />
  </div>
  )
}
