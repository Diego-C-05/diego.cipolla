import './Hero.css'

/* ═══════════════════════════════════════════════════
   HERO — Sezione principale con immagine e CTA

   USO:
     <Hero
       imageSrc="/img/hero-bg.jpg"
       title="GreenTech"
       subtitle="Costruiamo un futuro sostenibile insieme"
       ctaText="Registra la tua scuola"
       ctaHref="#registrazione"
       showScrollIndicator
     />

   PERSONALIZZAZIONE:
     - imageSrc: immagine di sfondo
     - title / subtitle: testi principali
     - ctaText / ctaHref: bottone CTA
     - overlayColor: colore dell'overlay (default verde)
     - showScrollIndicator: mostra la freccetta in basso
   ═══════════════════════════════════════════════════ */

type HeroProps = {
    imageSrc: string
    title: string
    subtitle?: string
    ctaText?: string
    ctaHref?: string
    overlayColor?: string
    showScrollIndicator?: boolean
}

export function Hero({
    imageSrc,
    title,
    subtitle,
    ctaText,
    ctaHref = '#',
    overlayColor,
    showScrollIndicator = false,
}: HeroProps) {
    const overlayStyle = overlayColor
        ? ({ '--hero-overlay': overlayColor } as React.CSSProperties)
        : undefined

    return (
        <section className="tpl-hero" style={overlayStyle}>
            <div
                className="tpl-hero__image"
                style={{ backgroundImage: `url(${imageSrc})` }}
            >
                <div className="tpl-hero__content">
                    <h1 className="tpl-hero__title">{title}</h1>
                    {subtitle && <p className="tpl-hero__subtitle">{subtitle}</p>}
                    {ctaText && (
                        <a href={ctaHref} className="tpl-hero__cta">
                            {ctaText}
                        </a>
                    )}
                </div>
            </div>

            {showScrollIndicator && (
                <div className="tpl-hero__scroll">
                    <div className="tpl-hero__scroll-dot" />
                </div>
            )}
        </section>
    )
}
