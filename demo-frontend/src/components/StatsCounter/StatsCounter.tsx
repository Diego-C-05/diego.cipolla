import { useState, useEffect, useRef } from 'react'
import './StatsCounter.css'

/* ═══════════════════════════════════════════════════
   STATS COUNTER — Contatori animati

   USO:
     <StatsCounter
       stats={[
         { value: 150, label: 'Scuole partecipanti', suffix: '+' },
         { value: 3200, label: 'Studenti coinvolti' },
         { value: 48, label: 'Progetti realizzati' },
         { value: 12, label: 'Regioni italiane', icon: '🇮🇹' },
       ]}
     />

   PERSONALIZZAZIONE:
     - stats: array di contatori
       - value: numero finale (i numeri salgono da 0 al valore)
       - label: etichetta sotto il numero
       - suffix: testo dopo il numero (es: '+', '%', 'k')
       - prefix: testo prima del numero (es: '€', '$')
       - icon: emoji o testo sopra il numero (opzionale)
     - animationDuration: durata animazione in ms (default: 2000)
   ═══════════════════════════════════════════════════ */

type Stat = {
    value: number
    label: string
    suffix?: string
    prefix?: string
    icon?: string
}

type StatsCounterProps = {
    stats: Stat[]
    animationDuration?: number
    id?: string
}

// Hook per animare il numero da 0 al valore target
function useCountUp(target: number, duration: number, shouldStart: boolean) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!shouldStart) return

        let startTime: number | null = null
        let frame: number

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)

            // Easing: decelera verso la fine
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))

            if (progress < 1) {
                frame = requestAnimationFrame(animate)
            }
        }

        frame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frame)
    }, [target, duration, shouldStart])

    return count
}

function StatItem({
    stat,
    duration,
    shouldStart,
}: {
    stat: Stat
    duration: number
    shouldStart: boolean
}) {
    const count = useCountUp(stat.value, duration, shouldStart)

    return (
        <div className="tpl-stats__item">
            {stat.icon && <span className="tpl-stats__icon">{stat.icon}</span>}
            <span className="tpl-stats__number">
                {stat.prefix}
                {count.toLocaleString('it-IT')}
                {stat.suffix && <span className="tpl-stats__suffix">{stat.suffix}</span>}
            </span>
            <span className="tpl-stats__label">{stat.label}</span>
        </div>
    )
}

export function StatsCounter({
    stats,
    animationDuration = 2000,
    id,
}: StatsCounterProps) {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    // Intersection Observer: inizia l'animazione quando la sezione è visibile
    useEffect(() => {
        const el = sectionRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect() // Anima solo una volta
                }
            },
            { threshold: 0.3 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <section className="tpl-stats" id={id} ref={sectionRef}>
            <div className="tpl-stats__grid">
                {stats.map((stat, i) => (
                    <StatItem
                        key={i}
                        stat={stat}
                        duration={animationDuration}
                        shouldStart={isVisible}
                    />
                ))}
            </div>
        </section>
    )
}
