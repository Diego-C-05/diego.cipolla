import './Footer.css'

/* ═══════════════════════════════════════════════════
   FOOTER — Footer multi-colonna

   USO:
     <Footer
       brand="GreenTech"
       brandText="Promuoviamo un futuro sostenibile nelle scuole italiane."
       columns={[
         {
           title: 'Navigazione',
           links: [
             { label: 'Home', href: '#home' },
             { label: 'Missione', href: '#missione' },
             { label: 'Registrati', href: '#registrazione' },
           ],
         },
         {
           title: 'Contatti',
           contacts: [
             { icon: '📧', text: 'info@greentech.it' },
             { icon: '📞', text: '+39 02 1234567' },
             { icon: '📍', text: 'Via Innovazione 42, Milano' },
           ],
         },
       ]}
       socials={[
         { icon: 'f', href: 'https://facebook.com', label: 'Facebook' },
         { icon: 'in', href: 'https://linkedin.com', label: 'LinkedIn' },
         { icon: '𝕏', href: 'https://twitter.com', label: 'Twitter' },
       ]}
       copyright="© 2026 GreenTech. Tutti i diritti riservati."
       bottomLinks={[
         { label: 'Privacy Policy', href: '#' },
         { label: 'Cookie Policy', href: '#' },
       ]}
     />

   VARIANTI:
     <Footer variant="light" ... />

   PERSONALIZZAZIONE:
     - brand / brandText: logo e descrizione
     - columns: array di colonne (con links O contacts)
     - socials: icone social (opzionale)
     - copyright: testo copyright
     - bottomLinks: link in basso (privacy, cookie, ecc.)
     - variant: 'dark' (default) | 'light'
   ═══════════════════════════════════════════════════ */

type FooterLink = {
    label: string
    href: string
}

type FooterContact = {
    icon: string
    text: string
}

type FooterColumn = {
    title: string
    links?: FooterLink[]
    contacts?: FooterContact[]
}

type Social = {
    icon: string
    href: string
    label: string
}

type FooterProps = {
    brand: string
    brandText?: string
    columns: FooterColumn[]
    socials?: Social[]
    copyright?: string
    bottomLinks?: FooterLink[]
    variant?: 'dark' | 'light'
}

export function Footer({
    brand,
    brandText,
    columns,
    socials,
    copyright,
    bottomLinks,
    variant = 'dark',
}: FooterProps) {
    const variantClass = variant === 'light' ? 'tpl-footer--light' : ''

    return (
        <footer className={`tpl-footer ${variantClass}`}>
            <div className="tpl-footer__main">
                {/* Colonna brand */}
                <div className="tpl-footer__brand-col">
                    <p className="tpl-footer__brand">{brand}</p>
                    {brandText && <p className="tpl-footer__brand-text">{brandText}</p>}
                    {socials && (
                        <div className="tpl-footer__social">
                            {socials.map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    className="tpl-footer__social-link"
                                    aria-label={s.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* Colonne dinamiche */}
                {columns.map((col, i) => (
                    <div className="tpl-footer__column" key={i}>
                        <h4>{col.title}</h4>

                        {col.links && (
                            <ul className="tpl-footer__list">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <a href={link.href}>{link.label}</a>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {col.contacts && (
                            <div className="tpl-footer__list">
                                {col.contacts.map((c, j) => (
                                    <div className="tpl-footer__contact-item" key={j}>
                                        <span className="tpl-footer__contact-icon">{c.icon}</span>
                                        {c.text}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Bottom bar */}
            {(copyright || bottomLinks) && (
                <div className="tpl-footer__bottom">
                    {copyright && <p className="tpl-footer__copyright">{copyright}</p>}
                    {bottomLinks && (
                        <div className="tpl-footer__bottom-links">
                            {bottomLinks.map((link, i) => (
                                <a key={i} href={link.href}>{link.label}</a>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </footer>
    )
}
