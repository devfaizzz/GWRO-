'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Image from 'next/image'
import { usePreloader } from '@/contexts/PreloaderContext'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Founder() {
  const containerRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLParagraphElement>(null)
  const { isLoaded } = usePreloader()

  useGSAP(() => {
    if (!isLoaded) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      }
    })

    // Label animation
    tl.fromTo('.founder-label',
      { y: 30, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power4.out' }
    )

    // Photo reveal with scale
    .fromTo('.founder-image-wrapper',
      { scale: 0.9, opacity: 0, filter: 'blur(15px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power4.out' },
      '-=0.7'
    )

    // Glow pulse in
    .fromTo('.founder-glow',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' },
      '-=1.2'
    )

    // Quote text — line-by-line reveal
    if (quoteRef.current) {
      const split = new SplitText(quoteRef.current, { type: 'lines' })
      split.lines.forEach((line) => {
        const wrapper = document.createElement('div')
        wrapper.style.overflow = 'hidden'
        wrapper.style.display = 'block'
        line.parentNode?.insertBefore(wrapper, line)
        wrapper.appendChild(line)
      })

      tl.fromTo(split.lines,
        { yPercent: 120, opacity: 0, filter: 'blur(8px)' },
        { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.12, ease: 'power4.out' },
        '-=1'
      )
    }

    // Name + role
    tl.fromTo('.founder-name',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo('.founder-role',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )

    // Decorative line
    .fromTo('.founder-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'power4.inOut' },
      '-=0.8'
    )

  }, { dependencies: [isLoaded], scope: containerRef })

  return (
    <section 
      ref={containerRef} 
      id="founder" 
      style={{ 
        padding: '12rem 0', 
        backgroundColor: 'var(--black)', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      {/* Subtle breathing gradient */}
      <div 
        className="gradient-bg-breath" 
        style={{ 
          top: '50%', 
          bottom: 'auto', 
          transform: 'translate(-50%, -50%)', 
          opacity: 0.25,
          height: '100vh'
        }} 
      />

      <div style={{ 
        padding: '0 clamp(1.25rem, 5vw, 4rem)', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        position: 'relative', 
        zIndex: 1 
      }}>
        
        {/* Section label */}
        <div className="founder-label" style={{ marginBottom: '6rem' }}>
          <span 
            className="label" 
            style={{ 
              color: 'var(--muted)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem' 
            }}
          >
            <span style={{ 
              display: 'inline-block', 
              width: '40px', 
              height: '1px', 
              backgroundColor: 'var(--muted)' 
            }} />
            Meet Our Founder
          </span>
        </div>

        {/* Main content grid */}
        <div className="founder-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          gap: '5rem', 
          alignItems: 'center' 
        }}>
          
          {/* Photo column */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div 
              className="founder-image-wrapper" 
              style={{ 
                position: 'relative', 
                width: 'clamp(260px, 35vw, 380px)', 
                aspectRatio: '3 / 4',
              }}
            >
              {/* Glow behind the photo */}
              <div 
                className="founder-glow" 
                style={{
                  position: 'absolute',
                  inset: '-20%',
                  background: 'radial-gradient(ellipse at center, rgba(255, 90, 0, 0.2) 0%, rgba(180, 50, 0, 0.08) 50%, transparent 75%)',
                  filter: 'blur(40px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />
              
              {/* Image container with subtle border */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                zIndex: 1,
              }}>
                <Image
                  src="/founder-faiz.png"
                  alt="Faiz — Founder of GWRO"
                  fill
                  style={{ 
                    objectFit: 'cover', 
                    objectPosition: 'top center',
                    filter: 'grayscale(20%)',
                  }}
                  sizes="(max-width: 768px) 280px, 380px"
                  priority={false}
                />
              </div>

              {/* Thin decorative border overlay */}
              <div style={{
                position: 'absolute',
                inset: '12px',
                border: '1px solid rgba(240, 237, 232, 0.08)',
                pointerEvents: 'none',
                zIndex: 2,
              }} />
            </div>
          </div>

          {/* Quote column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            {/* Quote mark */}
            <span 
              className="font-display" 
              style={{ 
                fontSize: 'clamp(60px, 8vw, 100px)', 
                lineHeight: 0.6, 
                color: 'rgba(255, 90, 0, 0.3)', 
                fontWeight: 300,
                userSelect: 'none',
              }}
            >
              &ldquo;
            </span>

            {/* Quote text */}
            <p 
              ref={quoteRef}
              className="font-display" 
              style={{ 
                fontSize: 'clamp(26px, 4vw, 48px)', 
                fontWeight: 300, 
                lineHeight: 1.15, 
                color: 'var(--white)',
                letterSpacing: '-0.02em',
              }}
            >
              We don&apos;t just build digital products — we craft experiences that make people stop, feel, and remember.
            </p>

            {/* Decorative line */}
            <div 
              className="founder-line" 
              style={{ 
                width: '80px', 
                height: '1px', 
                backgroundColor: 'var(--muted)', 
                transformOrigin: 'left center',
                marginTop: '0.5rem',
              }}
            />

            {/* Name + role */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span 
                className="font-display founder-name" 
                style={{ 
                  fontSize: 'clamp(24px, 3vw, 36px)', 
                  fontWeight: 400, 
                  color: 'var(--white)',
                  letterSpacing: '0.02em',
                }}
              >
                Faiz
              </span>
              <span 
                className="label founder-role" 
                style={{ 
                  color: 'var(--muted)', 
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                }}
              >
                Founder &amp; Creative Director
              </span>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .founder-grid {
            grid-template-columns: 1fr 1.2fr !important;
            gap: 6rem !important;
          }
        }
        @media (min-width: 1024px) {
          .founder-grid {
            gap: 8rem !important;
          }
        }
      `}</style>
    </section>
  )
}
