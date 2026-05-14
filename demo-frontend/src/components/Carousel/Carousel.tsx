import { useState, useEffect, useCallback } from 'react'
import './Carousel.css'

/* ═══════════════════════════════════════════════════
   CAROUSEL — Carosello immagini con autoplay

   USO:
     <Carousel
       slides={[
         { src: '/img/slide1.jpg', title: 'Titolo 1', caption: 'Descrizione' },
         { src: '/img/slide2.jpg', title: 'Titolo 2' },
         { src: '/img/slide3.jpg' },
       ]}
       autoplay
       interval={4000}
       showArrows
       showDots
     />

   PERSONALIZZAZIONE:
     - slides: array di immagini con titolo/caption opzionali
     - autoplay: abilita rotazione automatica (default: true)
     - interval: millisecondi tra le slide (default: 4000)
     - showArrows: mostra frecce laterali (default: true)
     - showDots: mostra pallini navigazione (default: true)
   ═══════════════════════════════════════════════════ */

type Slide = {
    src: string
    alt?: string
    title?: string
    caption?: string
}

type CarouselProps = {
    slides: Slide[]
    autoplay?: boolean
    interval?: number
    showArrows?: boolean
    showDots?: boolean
}

export function Carousel({
    slides,
    autoplay = true,
    interval = 4000,
    showArrows = true,
    showDots = true,
}: CarouselProps) {
    const [current, setCurrent] = useState(0)
    const total = slides.length

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % total)
    }, [total])

    const prev = () => {
        setCurrent((p) => (p - 1 + total) % total)
    }

    // Autoplay
    useEffect(() => {
        if (!autoplay || total <= 1) return
        const timer = setInterval(next, interval)
        return () => clearInterval(timer)
    }, [autoplay, interval, next, total])

    const hasCaptions = slides.some((s) => s.title || s.caption)

    return (
        <div className={`tpl-carousel ${hasCaptions ? 'tpl-carousel--has-captions' : ''}`}>
            <div
                className="tpl-carousel__track"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide, i) => (
                    <div className="tpl-carousel__slide" key={i}>
                        <img src={slide.src} alt={slide.alt || slide.title || `Slide ${i + 1}`} />
                        {(slide.title || slide.caption) && (
                            <div className="tpl-carousel__caption">
                                {slide.title && <h3>{slide.title}</h3>}
                                {slide.caption && <p>{slide.caption}</p>}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {showArrows && total > 1 && (
                <>
                    <button className="tpl-carousel__arrow tpl-carousel__arrow--prev" onClick={prev} aria-label="Precedente">
                        ‹
                    </button>
                    <button className="tpl-carousel__arrow tpl-carousel__arrow--next" onClick={next} aria-label="Successiva">
                        ›
                    </button>
                </>
            )}

            {showDots && total > 1 && (
                <div className="tpl-carousel__dots">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`tpl-carousel__dot ${i === current ? 'tpl-carousel__dot--active' : ''}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`Vai alla slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
