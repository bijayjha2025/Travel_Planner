import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

const SIZES = {
  sm: { w: 262, h: 368, spread: 0.52 },
  md: { w: 304, h: 408, spread: 0.78 },
  lg: { w: 328, h: 430, spread: 1 },
};

const getBreakpoint = () => {
  if (typeof window === "undefined") return "lg";
  if (window.innerWidth >= 1024) return "lg";
  if (window.innerWidth >= 640) return "md";
  return "sm";
};

function useBreakpoint() {
  const [bp, setBp] = useState(getBreakpoint);
  useEffect(() => {
    const onResize = () => setBp(getBreakpoint());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return bp;
}

const SLOTS = {
  '-2': { x: -570, y: 80, rotate: -16, scale: 0.62, opacity: 0.35, zIndex: 1, },
  '-1': { x: -330, y: 20, rotate: -10, scale: 0.78, opacity: 0.7, zIndex: 2, },
  '0': { x: 0, y: -20, rotate: 0, scale: 1, opacity: 1, zIndex: 5, },
  '1': { x: 330, y: 20, rotate: 10, scale: 0.78, opacity: 0.7, zIndex: 2, },
  '2': { x: 570, y: 80, rotate: 16, scale: 0.62, opacity: 0.35, zIndex: 1, },
};


function DestinationCard({ destination, position, size, entered, reduce, onSelect }) {
 const isActive = position === 0;

 const slot= SLOTS[String(position)] || { x: position > 0 ? 760 : -760, y: 120, rotate: position > 0 ? 14 : -14, scale: 0.5, opacity: 0, zIndex: 0 };
 

return (
<motion.a href={`/planner?destination=${destination.id}`} onClick={(e) => {if (!isActive) { e.preventDefault(); onSelect(); } }} aria-label={isActive ? `Plan a trip to ${destination.title}` : `Show ${destination.title}`} draggable={false} className="absolute left-1/2 top-1/2 block focus:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 focus-visible:ring-offset-forest" style={{ width: size.w, height: size.h, marginLeft: -size.w / 2, marginTop: -size.h / 2, zIndex: slot.zIndex, }}

initial={reduce ? false : { x: 0, y: 0, rotate: 0, scale: 0.5, opacity: 0 }} animate={{ x: slot.x * size.spread, y: slot.y, rotate: slot.rotate, scale: slot.scale, opacity: slot.opacity, }}

transition={ reduce ? { duration: 0 } : { type: "spring", stiffness: 110, damping: 18, mass: 0.8, delay: entered ? 0 : 0.15 + Math.abs(position) * 0.12, }} >
 
 <div className="relative flex h-full w-full flex-col rounded-[3px] bg-off-white p-2.5 pb-0 shadow-[0_2px_3px_rgba(0,0,0,0.25),0_24px_40px_-14px_rgba(0,0,0,0.65)]">
  
  {isActive && ( <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-3 bg-sand/85 shadow-sm"/>
 )}
 
 <div className="relative flex-1 overflow-hidden">
  <img src={destination.image} alt={destination.title} draggable={false} className={`absolute inset-0 h-full w-full object-cover ${isActive ? "" : "saturate-[0.65]"}`} />
  <span className="absolute left-2 top-2 rounded-sm bg-forest/80 px-2 py-1 text-xs font-medium text-sand backdrop-blur-sm">
   {destination.type}
  </span>
  
  <span className="absolute right-2 top-2 flex items-center gap-1 rounded-sm bg-off-white/90 px-2 py-1 text-xs font-medium text-forest">
   <ShieldCheck className="h-3.5 w-3.5 text-terracotta" />{destination.score}
  </span>
 </div>
 
 <div className="px-1.5 pb-3.5 pt-3">
  <p className="text-xs italic text-slateText/70">{destination.category}</p>
  <div className="mt-0.5 flex items-start justify-between gap-2">
   <h3 className="font-serif text-2xl leading-tight text-forest">{destination.title}</h3>
   {isActive && <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-terracotta" />}
  </div>
  
  <div className="mt-2 flex items-center justify-between gap-2 text-xs text-slateText">
    <span className="flex min-w-0 items-center gap-1">
     <MapPin className="h-3 w-3 shrink-0 text-terracotta" />
    <span className="truncate">{destination.location}</span>
   </span>
   <span className="shrink-0">{destination.duration}</span>
   </div>
   </div>
   </div>
  </motion.a>
  );
}
 
 
function Destination() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [entered, setEntered] = useState(false);
 
  const reduce = useReducedMotion();
  const bp = useBreakpoint();
  const size = SIZES[bp];
  const total = destinations.length;
 
  const next = useCallback(() => setActiveIndex((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setActiveIndex((c) => (c - 1 + total) % total), [total]);
 
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 1600);
    return () => clearTimeout(t);
  }, []);
 
  useEffect(() => {
    if (paused || reduce || !entered) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, reduce, entered, next, activeIndex]);
 
  return (
   <div className="relative w-full" role="region" aria-roledescription="carousel" aria-label="Featured destinations" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} >
    
    <div className="relative h-[480px] overflow-hidden sm:h-[520px] lg:h-[575px]">
     <div className="absolute inset-0">
      
      {destinations.map((destination, index) => (
       <DestinationCard key={destination.id} destination={destination} position={getRelativePosition(index, activeIndex, total)} size={size} entered={entered} reduce={reduce} onSelect={() => setActiveIndex(index)} />
       ))}
     </div>
     
     <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
     <button type="button" onClick={prev} aria-label="Previous destination" className="flex h-9 w-9 items-center justify-center rounded-full border border-sand/30 bg-forest/70 text-sand backdrop-blur-md transition-colors hover:bg-sand hover:text-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-sand">
      <ChevronLeft className="h-4 w-4" />
     </button>
 
     <div className="flex items-center gap-1.5 px-2">
      {destinations.map((destination, index) => (
        
       <button key={destination.id} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show ${destination.title}`} aria-current={index === activeIndex} className={`h-1.5 rounded-full transition-all duration-300 ${ index === activeIndex ? "w-7 bg-terracotta" : "w-1.5 bg-sand/30 hover:bg-sand/60" }`} />
      ))}
     </div>
      
     <button type="button" onClick={next} aria-label="Next destination" className=" w-9 h-9 rounded-full border border-sand/20 bg-forest/70 backdrop-blur-md text-sand flex items-center justify-center hover:bg-sand hover:text-forest transition-all">
      <ChevronRight className="w-4 h-4" />
     </button>
     </div>
    </div>
   </div>
 );
}
export default Destination;