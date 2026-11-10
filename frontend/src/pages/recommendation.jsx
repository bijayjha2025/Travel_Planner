import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { destinations } from '../data/destinations'
import Footer from '../components/layout/footer'
import BackgroundImage from '../assets/BackgroundImage.png'

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





     </div>
    </div>

   </section>
  </div>
 )
}