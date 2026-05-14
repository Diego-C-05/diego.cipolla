import { useState } from 'react'
import './Header.css'

/* ═══════════════════════════════════════════════════
   HEADER — Componente generico
   
   USO:
     <Header
       brand="GreenTech"
       links={['Home', 'Missione', 'Tecnologie', 'Premi']}
       ctaText="Registrati"
       ctaHref="#registrazione"
       activeLink="Home"
     />

   PERSONALIZZAZIONE:
     - brand: testo o logo del sito
     - links: array di stringhe per le voci di menu
     - ctaText / ctaHref: bottone CTA (opzionale)
     - activeLink: quale link è attivo
     - onLinkClick: callback quando clicchi un link
   ═══════════════════════════════════════════════════ */

type HeaderProps = {
    brand: string
    links: string[]
    activeLink?: string
    ctaText?: string
    ctaHref?: string
    onLinkClick?: (link: string) => void
}

export function Header({
    brand,
    links,
    activeLink = '',
    ctaText,
    ctaHref = '#',
    onLinkClick,
}: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleClick = (link: string) => {
        setMenuOpen(false)
        onLinkClick?.(link)
    }

    return (
        <header className="tpl-header">
            <p className="tpl-header__brand">{brand}</p>

            <button
                className={`tpl-header__hamburger ${menuOpen ? 'tpl-header__hamburger--open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
            >
                <span />
                <span />
                <span />
            </button>

            <nav>
                <ul className={`tpl-header__nav ${menuOpen ? 'tpl-header__nav--open' : ''}`}>
                    {links.map((link) => (
                        <li key={link}>
                            <a
                                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                                className={`tpl-header__link ${link === activeLink ? 'tpl-header__link--active' : ''}`}
                                onClick={() => handleClick(link)}
                            >
                                {link}
                            </a>
                        </li>
                    ))}
                    {ctaText && (
                        <li>
                            <a href={ctaHref} className="tpl-header__cta" onClick={() => setMenuOpen(false)}>
                                {ctaText}
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}
