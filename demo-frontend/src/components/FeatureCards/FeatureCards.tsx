import './FeatureCards.css'

/* ═══════════════════════════════════════════════════
   FEATURE CARDS — Griglia di card con icone o immagini

   USO con icone (emoji o testo):
     <FeatureCards
       heading="I nostri punti di forza"
       subheading="Scopri cosa ci rende unici"
       cards={[
         { icon: '🌱', title: 'Missione', text: 'Descrizione della missione...' },
         { icon: '⚡', title: 'Tecnologie', text: 'Tecnologie sostenibili...' },
         { icon: '🏆', title: 'Premi', text: 'Riconoscimenti ottenuti...' },
       ]}
     />

   USO con immagini:
     <FeatureCards
       cards={[
         { imageSrc: '/img/foto1.jpg', title: 'Titolo', text: 'Descrizione' },
       ]}
     />

   PERSONALIZZAZIONE:
     - heading / subheading: titoli della sezione (opzionali)
     - cards: array di card con icon O imageSrc, title, text
     - layout: 'grid' (card affiancate) o 'list' (card impilate con divider)
     - id: id HTML per anchor link (es: id="missione")
   ═══════════════════════════════════════════════════ */

type Card = {
    icon?: string
    imageSrc?: string
    title: string
    text: string
}

type FeatureCardsProps = {
    heading?: string
    subheading?: string
    cards: Card[]
    layout?: 'grid' | 'list'
    id?: string
}

export function FeatureCards({
    heading,
    subheading,
    cards,
    layout = 'grid',
    id,
}: FeatureCardsProps) {
    return (
        <section className="tpl-features" id={id}>
            {heading && <h2 className="tpl-features__heading">{heading}</h2>}
            {subheading && <p className="tpl-features__subheading">{subheading}</p>}

            <div className="tpl-features__grid">
                {cards.map((card, i) => (
                    <div key={i}>
                        <div className="tpl-features__card">
                            {card.icon && (
                                <div className="tpl-features__icon">{card.icon}</div>
                            )}
                            {card.imageSrc && (
                                <img
                                    className="tpl-features__card-image"
                                    src={card.imageSrc}
                                    alt={card.title}
                                />
                            )}
                            <h3 className="tpl-features__card-title">{card.title}</h3>
                            <p className="tpl-features__card-text">{card.text}</p>
                        </div>
                        {layout === 'list' && i < cards.length - 1 && (
                            <div className="tpl-features__divider" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
