import './CallToAction.css'

/* ═══════════════════════════════════════════════════
   CALL TO ACTION — Banner con testo e bottone

   USO:
     <CallToAction
       title="Unisciti a noi!"
       text="Registra la tua scuola e partecipa alla sfida green."
       buttonText="Registrati ora"
       buttonHref="#registrazione"
     />

   VARIANTI:
     <CallToAction variant="dark" ... />
     <CallToAction variant="bordered" ... />

   PERSONALIZZAZIONE:
     - title: titolo grande
     - text: testo descrittivo
     - buttonText: testo del bottone
     - buttonHref: destinazione del bottone
     - variant: 'default' | 'dark' | 'bordered'
     - onButtonClick: callback opzionale
   ═══════════════════════════════════════════════════ */

type CallToActionProps = {
    title: string
    text?: string
    buttonText: string
    buttonHref?: string
    variant?: 'default' | 'dark' | 'bordered'
    id?: string
    onButtonClick?: () => void
}

export function CallToAction({
    title,
    text,
    buttonText,
    buttonHref = '#',
    variant = 'default',
    id,
    onButtonClick,
}: CallToActionProps) {
    const variantClass = variant !== 'default' ? `tpl-cta--${variant}` : ''

    return (
        <section className={`tpl-cta ${variantClass}`} id={id}>
            <div className="tpl-cta__content">
                <h2 className="tpl-cta__title">{title}</h2>
                {text && <p className="tpl-cta__text">{text}</p>}
                <a
                    href={buttonHref}
                    className="tpl-cta__button"
                    onClick={onButtonClick ? (e) => { e.preventDefault(); onButtonClick() } : undefined}
                >
                    {buttonText}
                </a>
            </div>
        </section>
    )
}
