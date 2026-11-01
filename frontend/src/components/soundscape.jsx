import { useState } from 'react'
import { Volume2, VolumeX, Wind} from 'lucide-react'

class AmbientAudioSynthesizer {
 constructor() {
    this.ctx = null
    this.windNode = null
    this.gainNode = null
    this.isPlaying = false
  }

  init() {
    if (this.ctx) return
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    this.ctx = new AudioCtx()
  }

  startWind() {
    this.init()
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }

    const bufferSize = this.ctx.sampleRate * 2
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
      output[i] *= 0.04
      b6 = white * 0.115926
    }

    const whiteNoise = this.ctx.createBufferSource()
    whiteNoise.buffer = noiseBuffer
    whiteNoise.loop = true

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(320, this.ctx.currentTime)

    const lfo = this.ctx.createOscillator()
    lfo.frequency.value = 0.15
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.value = 180
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)
    lfo.start()

    this.gainNode = this.ctx.createGain()
    this.gainNode.gain.setValueAtTime(0.3, this.ctx.currentTime)

    whiteNoise.connect(filter)
    filter.connect(this.gainNode)
    this.gainNode.connect(this.ctx.destination)

    whiteNoise.start()
    this.windNode = whiteNoise
    this.isPlaying = true
  }

  stop() {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5)
      setTimeout(() => {
        if (this.windNode) {
          try { this.windNode.stop() } catch {}
          this.windNode = null
        }
        this.isPlaying = false
      }, 500)
    }
  }
}

const synth = new AmbientAudioSynthesizer()

export default function SoundscapeControl() {
  const [muted, setMuted] = useState(true)

  const toggleSound = () => {
    if (muted) {
      synth.startWind()
      setMuted(false)
    } else {
      synth.stop()
      setMuted(true)
    }
  }

  return (
   <div className="fixed bottom-5 right-5 z-[500]">
    <div className="bg-[#183a37] text-[#f8f6f0] border border-[#d8c39a]/40 p-2.5 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md flex items-center gap-3 font-sans">
     <button onClick={toggleSound} className={`p-2.5 rounded-full transition-all flex items-center gap-2 text-xs font-semibold ${ !muted ? 'bg-[#c96b4b] text-[#f8f6f0] shadow-md animate-pulse' : 'bg-[#e8dcc8]/20 text-[#e8dcc8] hover:bg-[#e8dcc8]/30' }`} title={muted ? 'Play Trail Ambient Wind' : 'Mute Soundscape'}>
       {!muted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      <span className="hidden sm:inline font-serif">{!muted ? 'Mountain Wind Active' : 'Trail Soundscape'}</span>
     </button>

     {!muted && (
      <div className="flex items-center gap-1 pr-2 text-[11px] text-[#e8dcc8]/90 font-serif border-l border-[#d8c39a]/30 pl-2">
        <Wind className="w-3.5 h-3.5 text-[#c96b4b] animate-bounce" />
        <span>Koshi Ridge Gust (3,150m)</span>
      </div>
      )}
     </div>
    </div>
  )
}
