import './Testimonials.css'

/* ═══════════════════════════════════════════════════
   TESTIMONIALS — Sezione testimonianze

   USO:
     <Testimonials
       heading="Cosa dicono di noi"
       items={[
         {
           text: 'GreenTech ha cambiato il nostro modo di vedere la sostenibilità.',
           name: 'Mario Rossi',
           role: 'Dirigente scolastico',
           avatarSrc: '/img/avatar1.jpg',
           rating: 5,
         },
         {
           text: 'Un progetto fantastico per i ragazzi.',
           name: 'Laura Bianchi',
           role: 'Docente di Scienze',
           rating: 4,
         },
       ]}
     />

   PERSONALIZZAZIONE:
     - heading: titolo della sezione
     - items: array di testimonianze
       - text: il testo della testimonianza
       - name: nome dell'autore
       - role: ruolo/posizione (opzionale)
       - avatarSrc: immagine profilo (opzionale, se assente mostra iniziali)
       - rating: stelle da 1 a 5 (opzionale)
   ═══════════════════════════════════════════════════ */

type Testimonial = {
    text: string
    name: string
    role?: string
    avatarSrc?: string
    rating?: number
}

type TestimonialsProps = {
    heading?: string
    items: Testimonial[]
    id?: string
}

export function Testimonials({
    heading = 'Testimonianze',
    items,
    id,
}: TestimonialsProps) {
    const getInitials = (name: string) =>
        name
            .split(' ')
            .map((w) => w[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)

    const renderStars = (rating: number) =>
        '★'.repeat(rating) + '☆'.repeat(5 - rating)

    return (
        <section className="tpl-testimonials" id={id}>
            <h2 className="tpl-testimonials__heading">{heading}</h2>

            <div className="tpl-testimonials__grid">
                {items.map((item, i) => (
                    <div className="tpl-testimonials__card" key={i}>
                        {item.rating && (
                            <div className="tpl-testimonials__stars">
                                {renderStars(item.rating)}
                            </div>
                        )}

                        <p className="tpl-testimonials__text">{item.text}</p>

                        <div className="tpl-testimonials__author">
                            {item.avatarSrc ? (
                                <img
                                    className="tpl-testimonials__avatar"
                                    src={item.avatarSrc}
                                    alt={item.name}
                                />
                            ) : (
                                <div className="tpl-testimonials__avatar-placeholder">
                                    {getInitials(item.name)}
                                </div>
                            )}
                            <div>
                                <p className="tpl-testimonials__name">{item.name}</p>
                                {item.role && (
                                    <p className="tpl-testimonials__role">{item.role}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
