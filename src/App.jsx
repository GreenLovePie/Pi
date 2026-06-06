import { useState, useEffect, useRef, useMemo } from 'react'
import './App.css'

/* ─────────────────────────────────────────────
   STARS
───────────────────────────────────────────── */
function Stars() {
  const stars = useMemo(() =>
    Array.from({ length: 220 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.4 + Math.random() * 2.2,
      delay: Math.random() * 7,
      duration: 2 + Math.random() * 4.5,
    }))
    , [])

  return (
    <div className="stars" aria-hidden="true">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   FIREFLIES
───────────────────────────────────────────── */
function Fireflies({ active }) {
  const flies = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: 12 + Math.random() * 76,
      y: 8 + Math.random() * 78,
      size: 2 + Math.random() * 3.5,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 6,
    }))
    , [])

  return (
    <div className={`fireflies${active ? ' active' : ''}`} aria-hidden="true">
      {flies.map(f => (
        <div
          key={f.id}
          className="firefly"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   SVG DEFS (filters + gradients)
───────────────────────────────────────────── */
function Defs() {
  return (
    <defs>
      <filter id="glow-sm" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="2.5" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="glow-md" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="5" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="glow-lg" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="10" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>

      <linearGradient id="gStem" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#004d40" />
        <stop offset="50%" stopColor="#00ffcc" />
        <stop offset="100%" stopColor="#004d40" />
      </linearGradient>
      <linearGradient id="gLeaf1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#004d40" />
      </linearGradient>
      <linearGradient id="gLeaf2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#00bcd4" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#004d40" />
      </linearGradient>
      <linearGradient id="gPetal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
        <stop offset="45%" stopColor="#b2ebf2" />
        <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.5" />
      </linearGradient>
      <radialGradient id="gCenter" cx="50%" cy="38%" r="62%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="18%" stopColor="#fffde7" />
        <stop offset="45%" stopColor="#ffd54f" />
        <stop offset="80%" stopColor="#ffb300" />
        <stop offset="100%" stopColor="#e65100" stopOpacity="0.6" />
      </radialGradient>
      <radialGradient id="gHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.28" />
        <stop offset="50%" stopColor="#00bcd4" stopOpacity="0.10" />
        <stop offset="100%" stopColor="#00ffcc" stopOpacity="0" />
      </radialGradient>
    </defs>
  )
}

/* ─────────────────────────────────────────────
   GRASS
───────────────────────────────────────────── */
const GRASS = [
  { d: 'M 38 520 Q 46 490 34 458', c: '#00ffcc', w: 2 },
  { d: 'M 60 520 Q 70 482 56 450', c: '#00897b', w: 2.4 },
  { d: 'M 82 520 Q 76 494 88 462', c: '#00bcd4', w: 2 },
  { d: 'M 104 520 Q 112 486 98 456', c: '#00ffcc', w: 1.8 },
  { d: 'M 126 520 Q 120 494 130 464', c: '#00897b', w: 2.4 },
  { d: 'M 148 520 Q 156 480 142 452', c: '#00bcd4', w: 2 },
  { d: 'M 252 520 Q 260 490 246 458', c: '#00ffcc', w: 2 },
  { d: 'M 274 520 Q 282 480 268 450', c: '#00bcd4', w: 1.8 },
  { d: 'M 296 520 Q 290 492 300 462', c: '#00897b', w: 2.4 },
  { d: 'M 318 520 Q 324 484 310 454', c: '#00ffcc', w: 2 },
  { d: 'M 340 520 Q 334 494 344 464', c: '#00bcd4', w: 2.4 },
  { d: 'M 362 520 Q 370 480 356 450', c: '#00897b', w: 2 },
]

/* ─────────────────────────────────────────────
   PETAL ANGLES
───────────────────────────────────────────── */
const OUTER_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]
const INNER_ANGLES = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5]

/* flower center in SVG coordinate space */
const CX = 200
const CY = 168

/* ─────────────────────────────────────────────
   BLOOMING FLOWER
───────────────────────────────────────────── */
function BloomingFlower({ blooming }) {
  return (
    <div className={`flower-scene${blooming ? ' blooming' : ''}`}>
      <svg viewBox="0 0 400 520" className="flower-svg" overflow="visible">
        <Defs />

        {/* Ground ambient */}
        <ellipse className="ground-glow" cx={CX} cy="513" rx="135" ry="18"
          fill="rgba(0,255,204,0.09)" />

        {/* Grass */}
        {GRASS.map((g, i) => (
          <path key={i} d={g.d}
            stroke={g.c} strokeWidth={g.w} fill="none" strokeLinecap="round"
            className="grass-blade"
            style={{ animationDelay: `${i * 0.055}s` }}
          />
        ))}

        {/* Stem (two overlapping paths: glow layer + bright core) */}
        <g filter="url(#glow-sm)">
          <path className="stem"
            d={`M ${CX} 520 C 197 478 203 436 ${CX} 394
                C 197 358 203 322 ${CX} 290
                C 197 262 203 238 ${CX} 215`}
            stroke="url(#gStem)" strokeWidth="5.5"
            fill="none" strokeLinecap="round"
          />
          <path className="stem stem-core"
            d={`M ${CX} 520 C 197 478 203 436 ${CX} 394
                C 197 358 203 322 ${CX} 290
                C 197 262 203 238 ${CX} 215`}
            stroke="rgba(200,255,245,0.3)" strokeWidth="2"
            fill="none" strokeLinecap="round"
          />
        </g>

        {/* Left leaf */}
        <g className="leaf leaf-left" filter="url(#glow-sm)">
          <path d={`M ${CX} 390 C 166 372 136 346 146 312
                    C 157 280 188 298 ${CX} 328 Z`}
            fill="url(#gLeaf1)" />
          <path d={`M ${CX} 390 C 174 370 162 344 168 318`}
            stroke="#00ffcc" strokeWidth="1" fill="none" opacity="0.45" />
        </g>

        {/* Right leaf */}
        <g className="leaf leaf-right" filter="url(#glow-sm)">
          <path d={`M ${CX} 330 C 234 310 266 278 257 248
                    C 248 220 216 236 ${CX} 264 Z`}
            fill="url(#gLeaf2)" />
          <path d={`M ${CX} 330 C 228 312 242 284 237 258`}
            stroke="#00bcd4" strokeWidth="1" fill="none" opacity="0.45" />
        </g>

        {/* Halo */}
        <circle className="glow-halo" cx={CX} cy={CY} r="96" fill="url(#gHalo)" />

        {/* Outer petals */}
        <g className="petals outer-petals" filter="url(#glow-sm)">
          {OUTER_ANGLES.map(a => (
            <ellipse key={a}
              cx={CX} cy={CY - 57}
              rx="17" ry="54"
              fill="url(#gPetal)" opacity="0.93"
              transform={`rotate(${a}, ${CX}, ${CY})`}
            />
          ))}
        </g>

        {/* Inner petals */}
        <g className="petals inner-petals" filter="url(#glow-sm)">
          {INNER_ANGLES.map(a => (
            <ellipse key={a}
              cx={CX} cy={CY - 42}
              rx="11" ry="38"
              fill="white" opacity="0.48"
              transform={`rotate(${a}, ${CX}, ${CY})`}
            />
          ))}
        </g>

        {/* Flower center */}
        <g className="flower-center" filter="url(#glow-lg)">
          <circle cx={CX} cy={CY} r="32" fill="url(#gCenter)" />
          <circle cx={CX} cy={CY} r="22" fill="#ffe082" opacity="0.5" />
          <circle cx={CX} cy={CY} r="13" fill="#fff9c4" opacity="0.85" />
          <circle cx={CX} cy={CY} r="6" fill="white" />
          {/* Pollen ring */}
          {[0, 51.4, 102.9, 154.3, 205.7, 257.1, 308.6].map(a => {
            const rad = (a * Math.PI) / 180
            return (
              <circle key={a}
                cx={CX + Math.cos(rad) * 19}
                cy={CY + Math.sin(rad) * 19}
                r="2.5" fill="#ffe082"
              />
            )
          })}
        </g>

        {/* Sparkle cross-stars */}
        {[
          [143, 100, 4], [257, 107, 3.5],
          [260, 200, 3], [142, 202, 3.5],
          [200, 66, 4.5], [274, 160, 3],
          [126, 160, 3], [220, 87, 2.5],
          [178, 80, 2.5], [225, 240, 2],
        ].map(([x, y, r], i) => (
          <g key={i} className="sparkle" style={{ '--sd': `${i * 0.11}s` }}>
            <circle cx={x} cy={y} r={r} fill="#00ffcc" />
            <line x1={x} y1={y - r * 3.5} x2={x} y2={y + r * 3.5}
              stroke="#00ffcc" strokeWidth="0.9" opacity="0.65" />
            <line x1={x - r * 3.5} y1={y} x2={x + r * 3.5} y2={y}
              stroke="#00ffcc" strokeWidth="0.9" opacity="0.65" />
          </g>
        ))}
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MESSAGE SECTION
───────────────────────────────────────────── */
function MessageSection() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.18 }
    )
    if (el) obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="message-section" ref={ref}>
      <div className={`message-card${vis ? ' visible' : ''}`}>
        <span className="corner tl" /><span className="corner tr" />
        <span className="corner bl" /><span className="corner br" />

        <p className="ornament">✦ &thinsp; ✦ &thinsp; ✦</p>

        <p className="msg-primary">
          Some things take time to bloom,<br />
          <em>just like the most beautiful flowers.</em>
        </p>

        <div className="msg-rule" />

        <p className="msg-secondary">
          Semangat danisha mendekati graduation!!<br />
          semoga acaranya lancar yaa!!<br />
          and i hope semua latihan nya worth it

        </p>

        <p className="ornament" style={{ marginTop: '2.8rem', marginBottom: 0 }}>
          ✦ &thinsp; ✦ &thinsp; ✦
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function App() {
  // phase: 'idle' | 'fading' | 'blooming' | 'done'
  const [phase, setPhase] = useState('idle')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    setPhase('fading')
    setTimeout(() => setPhase('blooming'), 650)
    setTimeout(() => setPhase('done'), 4900)
  }

  const showButton = phase === 'idle' || phase === 'fading'
  const showFlower = phase !== 'idle'
  const isBlooming = phase === 'blooming' || phase === 'done'
  const showScroll = phase === 'done'
  const showMessage = phase === 'blooming' || phase === 'done'

  return (
    <div className="app">
      <Stars />

      {/* ── HERO ─────────────────────────────── */}
      <section className="hero">
        <Fireflies active={phase !== 'idle'} />

        {showButton && (
          <button
            className={`cta${phase === 'fading' ? ' fading' : ''}`}
            onClick={handleClick}
            disabled={phase === 'fading'}
          >
            Click Here
          </button>
        )}

        {showFlower && <BloomingFlower blooming={isBlooming} />}

        {showScroll && !scrolled && (
          <div className="scroll-hint">
            <span>scroll down</span>
            <div className="scroll-arrow">↓</div>
          </div>
        )}
      </section>

      {/* ── MESSAGE ──────────────────────────── */}
      {showMessage && <MessageSection />}
    </div>
  )
}
