import { Link } from 'react-router-dom'
import { ArrowUpRight, HandHeart, Leaf, MapPin, Users } from 'lucide-react'
import BackgroundImage from '../assets/BackgroundImage.png'
import Footer from '../components/layout/footer'

const practices = [
  {
    icon: Users,
    title: 'Choose local',
    text: 'Stay with local families, eat at independent places, and let your travel spend reach the people who make each destination feel alive.',
  },
  {
    icon: Leaf,
    title: 'Move gently',
    text: 'Carry a reusable bottle, pack out what you carry in, and choose slower routes when they make sense for the landscape.',
  },
  {
    icon: HandHeart,
    title: 'Travel with respect',
    text: 'Ask before photographing people, learn local customs, and treat every community and sacred place as more than a backdrop.',
  },
]

export default function ResponsibleTravel() {
  return (
   <div className="page-surface min-h-screen text-forest font-sans">
    <section className="page-hero relative overflow-hidden bg-forest pb-20 pt-24 text-off-white sm:pb-28 sm:pt-28">
     <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${BackgroundImage}')` }} />
     <div className="absolute inset-0 bg-gradient-to-br from-forest/95 via-forest/80 to-[#102b29]/90" />
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 lg:px-12">
      <div className="max-w-3xl">
       <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand">Travel with care</p>
       <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">Go far. Leave something good behind.</h1>
       <p className="mt-6 max-w-2xl text-base leading-7 text-[#f3e8d0] sm:text-lg">Responsible travel is not about travelling perfectly. It is about paying attention—to the places, people, and choices that shape a journey.</p>
      </div>
     </div>
    </section>

    <main>
     <section className="mx-auto max-w-[1500px] px-6 py-16 sm:py-24 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
       <div>
        <MapPin className="h-8 w-8 text-terracotta" />
        <h2 className="mt-6 font-serif text-3xl leading-tight text-forest sm:text-5xl">The route matters. So does how you take it.</h2>
       </div>
      <p className="max-w-2xl text-sm leading-7 text-slateText sm:text-base">Nepal’s quieter places are often cared for by small communities, family businesses, farmers, guides, and hosts. When we travel with curiosity and respect, the experience becomes richer for everyone.</p>
     </div>

     <div className="mt-12 grid gap-5 md:grid-cols-3">
     {practices.map(({ icon: Icon, title, text }) => (
      <article key={title} className="interactive-card content-panel rounded-[3px] border border-sand p-7">
       <Icon className="h-8 w-8 text-terracotta" />
       <h3 className="mt-8 font-serif text-2xl text-forest">{title}</h3>
       <p className="mt-3 text-sm leading-6 text-slateText">{text}</p>
      </article>
      ))}
     </div>
     </section>

     <section className="bg-[#f5efe2]">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:px-12">
       <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Before you go</p>
        <h2 className="mt-3 font-serif text-3xl text-forest sm:text-4xl">A small checklist with a big impact.</h2>
       </div>
      <ul className="space-y-4 text-sm leading-6 text-slateText">
       <li className="border-b border-sand pb-4">✓ Bring a refillable bottle and reusable bag.</li>
       <li className="border-b border-sand pb-4">✓ Ask local guides about routes, weather, and customs.</li>
       <li className="border-b border-sand pb-4">✓ Keep an open mind—and a flexible itinerary.</li>
       <li>✓ Share the places you loved without turning them into a race.</li>
      </ul>
      </div>
     </section>

     <section className="mx-6 my-16 rounded-[3px] bg-forest text-off-white sm:mx-12 sm:my-24">
      <div className="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-6 px-7 py-10 sm:px-12 sm:py-14 md:flex-row md:items-center">
       <div>
        <h2 className="font-serif text-3xl sm:text-4xl">Plan a more thoughtful trip.</h2>
        <p className="mt-3 text-sm text-off-white/65">Start with a route that fits your pace and values.</p>
       </div>
      <Link to="/planner" className="inline-flex items-center gap-2 rounded-md bg-sand px-5 py-3 text-sm font-semibold text-forest hover:bg-off-white">Build my journey <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
     </section>
     </main>
    <Footer />
    </div>
  )
}
