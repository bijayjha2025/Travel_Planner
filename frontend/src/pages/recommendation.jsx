import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { destinations } from '../data/destinations'
import Footer from '../components/layout/footer'
import BackgroundImage from '../assets/BackgroundImage.png'
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, ArrowRight, RefreshCw, ShieldCheck } from "lucide-react";

const QUIZ_QUESTIONS = [
 {
  id: 'environment',
  question: 'What kind of scenery do you enjoy the most?',
  options: [ {label: 'Cool tea hills, fresh air & misty views', type: 'Nature'},
             {label: 'Highland ridges, oak woods & mountain sunrise', type: 'Hiking'},
             {label: 'Riverside evening calm & birdwatching', type: 'Sunset'},
             {label: 'Ethnic heritage, temples & local culture', type: 'Culture'},
           ]
        },
 
   {
    id: 'activity',
    question: 'How do you want to spend your afternoon?',
    options: [ { label: 'Strolling tea plantations & sipping local orthodox tea', tag: 'Kanyam' },
               { label: 'Splashing in canyon waterfall pools', tag: 'Namaste Jharna' },
               { label: 'Canoeing along tranquil waters & fishing', tag: 'Rasa Taal' },
               { label: 'Trekking high-altitude scenic ridge trails', tag: 'Mundum Trek' },
             ]
           },

{
    id: 'pace',
    question: 'What is your preferred travel pace?',
    options: [ { label: 'Slow & relaxed 1-day getaway', pace: '1 Day' },
               { label: 'Weekend 2-day exploration', pace: '2 Days' },
               { label: 'Multi-day mountain trail', pace: '4 Days' },
            ]
        }
]

export default function Recommendation(){
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [recommended, setRecommended] = useState(null)

  const handleSelectOption = (opt) => {
    const nextAnswers = { ...answers, [currentStep]: opt }
    setAnswers(nextAnswers)

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      const matched = destinations.find(d => 
        (opt.tag && d.title === opt.tag) ||
        (nextAnswers[0]?.type && d.type === nextAnswers[0].type)
      ) || destinations[0]

      setRecommended(matched)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    setRecommended(null)
  }

 return(
  <div className="min-h-screen bg-[#f8f6f0] text-forest font-sans">
   <section className="page-hero relative flex flex-col justify-center bg-forest text-off-white overflow-hidden pb-16 pt-24 sm:pt-28">
    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${BackgroundImage}')` }} />
    <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/85 to-forest/75" />

    <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12 w-full">
     <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="max-w-xl">
       <div className="flex items-center gap-2 mb-3">
        <span className="font-serif text-sm text-[#d8c39a]">NEPAL</span>
        <span className="font-deva text-xs text-[#d8c39a]/60">नेपाल • गन्तव्य सिफारिश</span>
       </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.2rem] leading-tight text-off-white">Find the place your heart desires.</h1>
        <p className="mt-4 font-sans text-base leading-relaxed text-[#f3e8d0] max-w-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]">Answer 3 simple questions and we'll reveal a spot tailored specifically to your vibe and schedule.</p>
      </div>

      <div className="relative hidden md:block -rotate-2 pb-6 text-sand">
       <p className="font-hand text-[1.6rem] leading-6">3 simple questions.<br />Your ideal spot awaits.</p>
        <svg aria-hidden="true" viewBox="0 0 70 56" className="absolute -bottom-4 left-4 h-12 w-16 text-sand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 4 C 34 6, 52 20, 46 46" />
          <path d="M36 38 L46 48 L54 36" />
        </svg>
       </div>
     </div>
    </div>
   </section>

   <main className='max-w-2xl mx-auto px-6 py-16'>
    <div className="bg-white rounded-[3px] p-8 border border-sand shadow-[0_4px_20px_rgba(0,0,0,0.08)] relative overflow-hidden">
     {!recommended ? (
      <div className="space-y-6">
       <div className="flex items-center justify-between border-b border-sand pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-terracotta font-sans"><Sparkles className="w-4 h-4" /> Spot Finder Quiz</div>
        <span className="text-xs text-slateText font-sans">Step {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
       </div>
       
       <AnimatePresence mode="wait">
        <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
         <h2 className="font-serif text-2xl font-bold text-forest">{QUIZ_QUESTIONS[currentStep].question}</h2>
         
         <div className="space-y-3 pt-2">
          {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
          <button key={idx} onClick={() => handleSelectOption(opt)} className="w-full text-left p-4 rounded-[3px] border border-sand bg-off-white hover:bg-forest hover:text-off-white transition-all text-xs font-medium font-sans flex items-center justify-between group">
           <span>{opt.label}</span>
           <ArrowRight className="w-4 h-4 text-terracotta group-hover:text-sand transition-transform group-hover:translate-x-1" />
          </button>
         ))}
         </div>
        </motion.div>
       </AnimatePresence>
      </div>

      ) : (
      
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center">
       <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-sand/60 text-forest text-xs font-semibold font-sans"><Sparkles className="w-3.5 h-3.5 text-terracotta" /> Matched Destination
       </div>
       
       <div className="relative flex flex-col rounded-[3px] bg-off-white p-3 border border-sand shadow-[0_2px_3px_rgba(0,0,0,0.25),0_24px_40px_-14px_rgba(0,0,0,0.65)] text-left">
        <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-2 bg-sand/90 shadow-xs" />
        
        <div className="relative h-64 w-full overflow-hidden">
         <img src={recommended.image} alt={recommended.title} className="w-full h-full object-cover" />
         <span className="absolute left-2 top-2 rounded-sm bg-forest/80 px-2 py-1 text-xs font-medium text-sand">{recommended.type}</span>
         <span className="absolute right-2 top-2 flex items-center gap-1 rounded-sm bg-off-white/90 px-2 py-1 text-xs font-medium text-forest">
          <ShieldCheck className="h-3.5 w-3.5 text-terracotta" />{recommended.score} Score
         </span>
        </div>
        
        <div className="pt-3 px-1">
         <h3 className="font-serif text-3xl font-bold text-forest">{recommended.title}</h3>
         <p className="text-xs text-slateText flex items-center gap-1 mt-1 font-sans">
          <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0" /> {recommended.location} • {recommended.elevation} m</p>
         <p className="text-xs text-slateText/80 leading-relaxed font-sans mt-2">{recommended.description}</p>
         </div>
        </div>
        
        <div className="flex items-center justify-center gap-3 pt-2">
         <button onClick={handleReset} className="px-4 py-2.5 rounded-md border border-sand text-xs font-semibold text-slateText hover:bg-sand/20 flex items-center gap-1.5 font-sans">
          <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
         </button>
         
         <button onClick={() => navigate(`/planner?destination=${recommended.id}`)} className="rounded-md bg-forest px-5 py-2.5 text-xs font-medium text-off-white hover:bg-forest-light transition-colors flex items-center gap-1.5 shadow-xs" >Plan Trip Now <ArrowRight className="w-4 h-4" /></button>
        </div>
       </motion.div>
       )}
      </div>
      </main>
      <Footer />
    </div>
  )
}
