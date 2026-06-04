import {
    Header,
    Hero,
    Carousel,
    FeatureCards,
    StatsCounter,
    Testimonials,
    RegistrationForm,
    ProposalList,
    ImageGallery,
    CallToAction,
    Footer,
} from './components'
import heroImage from './assets/hero.png'
import carouselImage from './assets/download.png'
import reactImage from './assets/react.svg'
import viteImage from './assets/vite.svg'

/*
    Quick adaptation checklist (examples shown inside comments):
    - Backend URL: switch between local/staging/prod or use env vars
        e.g. `const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/items'`
    - Assets: replace local imports with remote URLs or other images
    - Form fields: align `RegistrationForm.fields` with backend payload names
    - ProposalList mapping: set `titleField`, `textField`, `metaField` to match API
    - Toggle Hero/Carousel: comment/uncomment the desired component render
    - Theme/styles: change inline style or global CSS as needed
    - i18n: extract strings to a translations object or use a lib
    - Testing: mock `BACKEND_URL` responses or run frontend against demo backend
*/

// BACKEND / API
// To switch environments, replace the literal below or prefer an env var.
// Examples:
//  - Local development: 'http://localhost:8080/api/items'
//  - Staging: 'https://staging.api.example.com/proposals'
//  - Production: 'https://api.example.com/proposals'
// Recommended: use Vite env variables: `import.meta.env.VITE_API_URL`
const BACKEND_URL = 'http://localhost:8080/api/items'

// NAVIGATION LINKS
// Update labels or anchor targets to match the sections requested by the commission.
// For multi-page deliverables, replace with route paths: ['/','/mission','/tech']
const NAV_LINKS = ['Home', 'Missione', 'Tecnologie', 'Premi', 'Proposte']

// CAROUSEL
// Replace `src` with either local imports (as done above) or remote URLs.
// To disable the carousel and use a Hero instead, remove or comment the
// Carousel render in the JSX and keep the `Hero` component active.
const CAROUSEL_SLIDES = [
    { src: carouselImage, title: 'Un futuro sostenibile', caption: 'Inizia dalla tua scuola' },
    { src: heroImage, title: 'Tecnologie verdi', caption: 'Innovazione e ambiente' },
    { src: viteImage, title: 'Premi e riconoscimenti', caption: 'Le migliori idee saranno premiate' },
]

// FEATURE CARDS
// Edit `icon`, `title`, `text` to reflect the focus requested (e.g. 'Sostenibilità', 'Innovazione').
const FEATURE_CARDS = [
    {
        icon: '🌱',
        title: 'Missione',
        text: 'Promuoviamo iniziative green concrete per ridurre sprechi, emissioni e consumo di risorse nelle scuole.',
    },
    {
        icon: '⚡',
        title: 'Tecnologie Verdi',
        text: 'Utilizziamo strumenti digitali e automazioni per monitorare i consumi e migliorare l\'efficienza energetica.',
    },
    {
        icon: '🏆',
        title: 'Premi',
        text: 'Le idee più meritevoli saranno realizzate dall\'azienda. Agli studenti verranno assegnati premi e borse di studio.',
    },
]

// STATS COUNTER
// Change `suffix` or `value` to match target KPIs for the deliverable.
const STATS = [
    { value: 150, label: 'Scuole partecipanti', suffix: '+' },
    { value: 3200, label: 'Studenti coinvolti' },
    { value: 48, label: 'Progetti realizzati' },
    { value: 12, label: 'Regioni' },
]

// TESTIMONIALS
// Replace or localize text, add/remove `rating` if the design requires it.
const TESTIMONIALS = [
    {
        text: 'GreenTech ha cambiato il nostro approccio alla sostenibilità. I ragazzi sono entusiasti e motivati.',
        name: 'Prof. Anna Verdi',
        role: 'Dirigente Scolastico, Liceo Volta (MI)',
        rating: 5,
    },
    {
        text: 'Il progetto dell\'orto scolastico è stato un successo. Abbiamo coinvolto 120 studenti!',
        name: 'Marco Bianchi',
        role: 'Docente di Scienze, IC Manzoni (TO)',
        rating: 5,
    },
    {
        text: 'Grazie a GreenTech abbiamo ridotto il consumo energetico del 30% nel nostro istituto.',
        name: 'Laura Rossi',
        role: 'Referente Green, ITIS Galilei (RM)',
        rating: 4,
    },
]

// FORM FIELDS
// The `fields` array drives the `RegistrationForm` UI and the payload names.
// If the commission requires different field names, change `name` to match
// the backend expected property (e.g. 'description' vs 'body').
// Example mappings:
//  - Backend expects `{ description }`  => set a field `{ name: 'description', ... }`
//  - Backend expects `{ contactEmail }`  => set a field `{ name: 'contactEmail', ... }`
// If the backend requires nested objects, add a naming convention or transform
// the form submission in `RegistrationForm` (not shown here).
const FORM_FIELDS = [
    { name: 'title', label: 'Nome del progetto', type: 'text' as const, required: true },
    { name: 'body', label: 'Descrizione del progetto', type: 'textarea' as const, required: true, rows: 4 },
    { name: 'email', label: 'Email di contatto', type: 'email' as const, required: true, half: true },
 
    // Use this commented example to add a select field for school grade.
    // {
    //     name: 'level', label: 'Grado della scuola', type: 'select' as const, required: true,
    //     options: [
    //         { value: '1', label: 'Primo grado' },
    //         { value: '2', label: 'Secondo grado' },
    //     ],
    // },
]

// IMAGE GALLERY
// Use full URLs if images are hosted externally, or add more assets to `src/assets`.
const GALLERY_IMAGES = [
    { src: heroImage, alt: 'Laboratorio green', caption: 'Laboratorio green' },
    { src: carouselImage, alt: 'Orto scolastico', caption: 'Orto scolastico' },
    { src: reactImage, alt: 'Workshop studenti', caption: 'Workshop studenti' },
    { src: viteImage, alt: 'Premiazione', caption: 'Premiazione' },
]

// FOOTER COLUMNS
// Edit columns, contact details and links to reflect the final deliverable.
const FOOTER_COLUMNS = [
    {
        title: 'Navigazione',
        links: [
            { label: 'Home', href: '#home' },
            { label: 'Missione', href: '#missione' },
            { label: 'Registrati', href: '#registrazione' },
            { label: 'Proposte', href: '#proposte' },
        ],
    },
    {
        title: 'Contatti',
        contacts: [
            { icon: '📧', text: 'info@greentech.it' },
            { icon: '📞', text: '+39 02 1234567' },
            { icon: '📍', text: 'Via dell\'Innovazione 42, Milano' },
        ],
    },
    {
        title: 'Risorse',
        links: [
            { label: 'FAQ', href: '#' },
            { label: 'Regolamento', href: '#' },
            { label: 'Bandi attivi', href: '#' },
        ],
    },
]

function App() {
  return (
        <div style={{ width: '100%', minHeight: '100vh' }}>
            {/* Header: change `brand`, `links`, and CTA in the `NAV_LINKS` and props */}
            <Header
                brand="GREENTECH"
                links={NAV_LINKS}
                activeLink="Home"
                ctaText="Registrati"
                ctaHref="#registrazione"
            />

            <section id="home">
                {/* Hero: swap `imageSrc` or adjust text for alternate messaging */}
                <Hero
                    imageSrc={heroImage}
                    title="Costruiamo un futuro sostenibile"
                    subtitle="Partecipa alla sfida green: proponi il tuo progetto e trasforma la tua scuola."
                    ctaText="Registra la tua scuola"
                    ctaHref="#registrazione"
                    showScrollIndicator
                />
            </section>

            <section id="tecnologie">
                {/* Carousel: enable/disable via props or remove this block if not needed */}
                <Carousel
                    slides={CAROUSEL_SLIDES}
                    autoplay
                    interval={6000}
                />
            </section>

            {/* FeatureCards: edit `FEATURE_CARDS` above for different highlights */}
            <FeatureCards
                heading="La nostra iniziativa"
                subheading="Scopri come GreenTech sta trasformando le scuole italiane"
                cards={FEATURE_CARDS}
                id="missione"
            />

            {/* StatsCounter: change `STATS` values for different KPIs */}
            <StatsCounter stats={STATS} id="premi" />

            {/* Testimonials: replace `TESTIMONIALS` or reduce number of items */}
            <Testimonials
                heading="Cosa dicono di noi"
                items={TESTIMONIALS}
                id="testimonianze"
            />

            {/* CallToAction: adjust copy or hide for a minimal deliverable */}
            <CallToAction
                title="Hai un'idea per rendere la tua scuola più green?"
                text="Compila il modulo di registrazione e invia la tua proposta. Le migliori idee saranno premiate!"
                buttonText="Vai al modulo"
                buttonHref="#registrazione"
            />

            {/* RegistrationForm: ensure `fields` names match backend payload */}
            <RegistrationForm
                title="Registra la tua scuola"
                description="Compila il modulo per partecipare alla sfida GreenTech. Tutti i campi sono obbligatori."
                apiUrl={BACKEND_URL}
                fields={FORM_FIELDS}
                infoItems={[
                    'Tutti i campi sono obbligatori',
                    'Riceverai conferma via email',
                    'Puoi inviare più proposte',
                    'Scadenza: 30 giugno 2026',
                ]}
                submitText="Invia proposta"
                successMessage="Proposta inviata con successo!"
                id="registrazione"
            />

            {/* ProposalList: set `titleField`/`textField`/`metaField` to match API JSON */}
            <ProposalList
                heading="Proposte pervenute"
                subheading="Ecco le idee già inviate"
                apiUrl={BACKEND_URL}
                titleField="title"
                textField="body"
                emptyMessage="Nessuna proposta ancora pervenuta. Sii il primo!"
                id="proposte"
            />

            {/* ImageGallery: update `GALLERY_IMAGES` or hide gallery for simpler designs */}
            <ImageGallery
                heading="Galleria progetti"
                images={GALLERY_IMAGES}
                id="galleria"
            />

            {/* Footer: edit `FOOTER_COLUMNS`, socials and legal links per brief */}
            <Footer
                brand="GREENTECH"
                brandText="Promuoviamo un futuro sostenibile nelle scuole italiane attraverso tecnologie verdi e innovazione."
                columns={FOOTER_COLUMNS}
                socials={[
                    { icon: 'f', href: '#', label: 'Facebook' },
                    { icon: 'in', href: '#', label: 'LinkedIn' },
                    { icon: '𝕏', href: '#', label: 'Twitter' },
                    { icon: '▶', href: '#', label: 'YouTube' },
                ]}
                copyright="© 2026 GreenTech Solutions Srl. Tutti i diritti riservati."
                bottomLinks={[
                    { label: 'Privacy Policy', href: '#' },
                    { label: 'Cookie Policy', href: '#' },
                    { label: 'Termini e Condizioni', href: '#' },
                ]}
            />
        </div>
  )
}

export default App
