import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { destinations } from '../data/destinations';
import { MapPin, ShieldCheck, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const getRelativePosition = (index, activeIndex, total) => {
 let position = index - activeIndex;
 
 if (position > total / 2)
  position -= total;

 if (position < -total / 2)
  position += total;

 return position;
}

function DestinationCard({ destination, position }) {
 const isActive = position === 0;
 
 const desktopPositions = {
  '-2': { x: -570, y: 80, rotate: -16, scale: 0.62, opacity: 0.35, zIndex: 1, },
  '-1': { x: -330, y: 20, rotate: -10, scale: 0.78, opacity: 0.7, zIndex: 2, },
  '0': { x: 0, y: -20, rotate: 0, scale: 1, opacity: 1, zIndex: 5, },
  '1': { x: 330, y: 20, rotate: 10, scale: 0.78, opacity: 0.7, zIndex: 2, },
  '2': { x: 570, y: 80, rotate: 16, scale: 0.62, opacity: 0.35, zIndex: 1, },
};

const target = desktopPositions[String(position)] || { x: position > 0 ? 700: -700, y: 120, rotate: position > 0 ? 20 : -20, scale: 0.5, opacity: 0, zIndex: 0 };

return (
<motion.div className= "absolute left-1/2 top-1/2"
 animate={{ x: `calc(-50% + ${target.x}px)`, y: `calc(-50% + ${target.y}px)`, rotate: target.rotate, scale: target.scale,opacity: target.opacity, zIndex: target.zIndex }}
 transition= {{ type: "spring", stiffness: 110, damping: 18, mass: 0.8 }}
 style= {{ width: isActive? 340 : 290, height: isActive? 440 : 380 }} >
    
 <div className={` relative w-full h-full overflow-hidden rounded-[28px] border transition-shadow duration-500
 ${isActive ? 'border-sand/50 shadow-2xl' : 'border-sand/20 shadow-xl' } `}>
  
  <img src={destination.image} alt={destination.title} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-100'}`}/>
  
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"/>
  <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
   <span className="bg-forest/75 backdrop-blur-md text-sand text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full"> {destination.type}</span>
   <span className="bg-black/20 backdrop-blur-md border border-white/20 text-white text-xs px-2.5 py-1.5 rounded-lg
   flex items-center gap-1">
    <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />{destination.score}
   </span>
  </div>
  
  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
   <p className="text-[10px] uppercase tracking-[0.2em] text-sand/80 font-semibold mb-2">{destination.category}</p>
   <div className="flex items-center justify-between gap-3">
    <h3 className="font-serif text-3xl leading-none">{destination.title}</h3>{isActive && (
      <ArrowUpRight className="w-5 h-5 text-sand shrink-0" /> )}
   </div>
   
   <p className="text-sm text-white/75 flex items-center gap-1.5 mt-2">
   <MapPin className="w-3.5 h-3.5 text-terracotta"/>{destination.location}</p>
   
   <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/15">
    <span className="text-xs text-white/70"> {destination.duration} </span>
    {isActive && ( <span className="text-xs text-sand"> Explore destination </span> )}
    </div>
   </div>
  </div>
  </motion.div>
  );
 }
    
 function Destination() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextDestination = () => {
   setActiveIndex( (current) => (current + 1) % destinations.length );
   };
        
  const previousDestination = () => {
   setActiveIndex( (current) => (current - 1 + destinations.length) % destinations.length );
  };
        
  useEffect(() => {
   const interval = setInterval(() => {
    nextDestination(); }, 4500);
    
   return () => clearInterval(interval);
   }, []);
   
   return (
   <div className="relative w-full">
    <div className=" relative h-[480px] sm:h-[500px] md:h-[540px] lg:h-[570px] overflow-hidden">
     <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[430px] h-[430px] md:w-[540px] md:h-[540px] lg:w-[680px] lg:h-[680px] rounded-full border border-sand/10 "/>
     <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[390px] md:h-[390px] rounded-full border border-sand/5"/>
     
     <div className="absolute inset-0">
      {destinations.map((destination, index) => {
       const position = getRelativePosition( index, activeIndex, destinations.length );
       
       return (<DestinationCard key={destination.id} destination={destination} position={position} /> );
       }
      )}
     </div>
     
     <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[8] pointer-events-none">
     
     <motion.div animate={{ scale: [1, 1.025, 1], }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', }} className=" w-[175px] h-[175px] md:w-[195px] md:h-[195px] rounded-full bg-forest/85 backdrop-blur-md border border-sand/15 shadow-2xl flex flex-col items-center justify-center text-center">
      <p className="font-serif text-xl md:text-2xl text-sand">Discover</p>
      <p className="font-serif text-xl md:text-2xl text-offwhite">Nepal</p>
      <span className="text-[9px] uppercase tracking-[0.2em] text-sand/50 mt-2"> Your way </span>
     </motion.div>
     </div>
    
    <div className=" absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
    
    <button type="button" onClick={previousDestination} aria-label="Previous destination" className=" w-9 h-9 rounded-full border border-sand/20 bg-forest/70 backdrop-blur-md text-sand flex items-center justify-center hover:bg-sand hover:text-forest transition-all">
     <ChevronLeft className="w-4 h-4"/></button>
     
     <div className="flex items-center gap-1.5 px-2"> {destinations.map((destination, index) => (
      <button key={destination.id} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show ${destination.title}`} className={` h-1.5 rounded-full transition-all duration-300 ${ index === activeIndex ? 'w-7 bg-terracotta' : 'w-1.5 bg-sand/30 hover:bg-sand/60' } `} />
      ))}
     </div>
      
     <button type="button" onClick={nextDestination} aria-label="Next destination" className=" w-9 h-9 rounded-full border border-sand/20 bg-forest/70 backdrop-blur-md text-sand flex items-center justify-center hover:bg-sand hover:text-forest transition-all">
      <ChevronRight className="w-4 h-4" />
     </button>
     </div>
    </div>
   </div>
 );
}
export default Destination;