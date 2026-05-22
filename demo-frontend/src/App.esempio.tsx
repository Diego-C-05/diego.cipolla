// /* ═══════════════════════════════════════════════════
//    APP ESEMPIO — Mostra come usare TUTTI i componenti
   
//    Copia questo file come App.tsx nel tuo progetto.
//    Poi sostituisci i dati con quelli della tua traccia.
//    ═══════════════════════════════════════════════════ */

// import {
//     Header,
//     Hero,
//     Carousel,
//     FeatureCards,
//     StatsCounter,
//     Testimonials,
//     RegistrationForm,
//     ProposalList,
//     ImageGallery,
//     CallToAction,
//     Footer,
// } from './components'

// /* ─────────────────────────────────────────────────
//    DATI — Modifica questi con i dati della tua traccia
//    ───────────────────────────────────────────────── */

// const BACKEND_URL = 'https://api.greentech.it/proposals'

// const NAV_LINKS = ['Home', 'Missione', 'Tecnologie', 'Premi', 'Proposte']

// const CAROUSEL_SLIDES = [
//     { src: '/img/slide1.jpg', title: 'Un futuro sostenibile', caption: 'Inizia dalla tua scuola' },
//     { src: '/img/slide2.jpg', title: 'Tecnologie verdi', caption: 'Innovazione e ambiente' },
//     { src: '/img/slide3.jpg', title: 'Premi e riconoscimenti', caption: 'Le migliori idee saranno premiate' },
// ]

// const FEATURE_CARDS = [
//     {
//         icon: '🌱',
//         title: 'Missione',
//         text: 'Promuoviamo iniziative green concrete per ridurre sprechi, emissioni e consumo di risorse nelle scuole.',
//     },
//     {
//         icon: '⚡',
//         title: 'Tecnologie Verdi',
//         text: 'Utilizziamo strumenti digitali e automazioni per monitorare i consumi e migliorare l\'efficienza energetica.',
//     },
//     {
//         icon: '🏆',
//         title: 'Premi',
//         text: 'Le idee più meritevoli saranno realizzate dall\'azienda. Agli studenti verranno assegnati premi e borse di studio.',
//     },
// ]

// const STATS = [
//     { value: 150, label: 'Scuole partecipanti', suffix: '+' },
//     { value: 3200, label: 'Studenti coinvolti' },
//     { value: 48, label: 'Progetti realizzati' },
//     { value: 12, label: 'Regioni' },
// ]

// const TESTIMONIALS = [
//     {
//         text: 'GreenTech ha cambiato il nostro approccio alla sostenibilità. I ragazzi sono entusiasti e motivati.',
//         name: 'Prof. Anna Verdi',
//         role: 'Dirigente Scolastico, Liceo Volta (MI)',
//         rating: 5,
//     },
//     {
//         text: 'Il progetto dell\'orto scolastico è stato un successo. Abbiamo coinvolto 120 studenti!',
//         name: 'Marco Bianchi',
//         role: 'Docente di Scienze, IC Manzoni (TO)',
//         rating: 5,
//     },
//     {
//         text: 'Grazie a GreenTech abbiamo ridotto il consumo energetico del 30% nel nostro istituto.',
//         name: 'Laura Rossi',
//         role: 'Referente Green, ITIS Galilei (RM)',
//         rating: 4,
//     },
// ]

// const FORM_FIELDS = [
//     { name: 'title', label: 'Nome del progetto', type: 'text' as const, required: true },
//     { name: 'description', label: 'Descrizione del progetto', type: 'textarea' as const, required: true, rows: 4 },
//     { name: 'contactPerson', label: 'Docente di riferimento', type: 'text' as const, required: true, half: true },
//     { name: 'contactEmail', label: 'Email di contatto', type: 'email' as const, required: true, half: true },
//     { name: 'school', label: 'Nome della scuola', type: 'text' as const, required: true },
//     { name: 'province', label: 'Provincia', type: 'text' as const, required: true, half: true },
//     { name: 'className', label: 'Classe partecipante', type: 'text' as const, required: true, half: true },
//     {
//         name: 'level', label: 'Grado della scuola', type: 'select' as const, required: true,
//         options: [
//             { value: '1', label: 'Primo grado' },
//             { value: '2', label: 'Secondo grado' },
//         ],
//     },
// ]

// const GALLERY_IMAGES = [
//     { src: '/img/gallery1.jpg', caption: 'Laboratorio green' },
//     { src: '/img/gallery2.jpg', caption: 'Orto scolastico' },
//     { src: '/img/gallery3.jpg', caption: 'Pannelli solari' },
//     { src: '/img/gallery4.jpg', caption: 'Raccolta differenziata' },
//     { src: '/img/gallery5.jpg', caption: 'Workshop studenti' },
//     { src: '/img/gallery6.jpg', caption: 'Premiazione' },
// ]

// const FOOTER_COLUMNS = [
//     {
//         title: 'Navigazione',
//         links: [
//             { label: 'Home', href: '#home' },
//             { label: 'Missione', href: '#missione' },
//             { label: 'Registrati', href: '#registrazione' },
//             { label: 'Proposte', href: '#proposte' },
//         ],
//     },
//     {
//         title: 'Contatti',
//         contacts: [
//             { icon: '📧', text: 'info@greentech.it' },
//             { icon: '📞', text: '+39 02 1234567' },
//             { icon: '📍', text: 'Via dell\'Innovazione 42, Milano' },
//         ],
//     },
//     {
//         title: 'Risorse',
//         links: [
//             { label: 'FAQ', href: '#' },
//             { label: 'Regolamento', href: '#' },
//             { label: 'Bandi attivi', href: '#' },
//         ],
//     },
// ]

// /* ─────────────────────────────────────────────────
//    APP — Assembla i componenti
//    ───────────────────────────────────────────────── */

// function App() {
//     return (
//         <div style={{ width: '100%', minHeight: '100vh', background: '#f5f5f5' }}>

//             {/* ── 1. HEADER ───────────────────────── */}
//             <Header
//                 brand="GREENTECH"
//                 links={NAV_LINKS}
//                 activeLink="Home"
//                 ctaText="Registrati"
//                 ctaHref="#registrazione"
//             />

//             {/* ── 2. HERO ─────────────────────────── */}
//             <Hero
//                 imageSrc="/img/hero-bg.jpg"
//                 title="Costruiamo un futuro sostenibile"
//                 subtitle="Partecipa alla sfida green: proponi il tuo progetto e trasforma la tua scuola."
//                 ctaText="Registra la tua scuola"
//                 ctaHref="#registrazione"
//                 showScrollIndicator
//             />

//             {/* ── 3. CAROUSEL (alternativa alla Hero semplice) ── */}
//             {/* Decommenta per usare il carosello al posto della Hero:
//             <Carousel
//                 slides={CAROUSEL_SLIDES}
//                 autoplay
//                 interval={4000}
//             />
//             */}

//             {/* ── 4. FEATURE CARDS (Missione, Tecnologie, Premi) ── */}
//             <FeatureCards
//                 heading="La nostra iniziativa"
//                 subheading="Scopri come GreenTech sta trasformando le scuole italiane"
//                 cards={FEATURE_CARDS}
//                 id="missione"
//             />

//             {/* ── 5. STATS COUNTER ────────────────── */}
//             <StatsCounter stats={STATS} />

//             {/* ── 6. TESTIMONIALS ─────────────────── */}
//             <Testimonials
//                 heading="Cosa dicono di noi"
//                 items={TESTIMONIALS}
//                 id="testimonianze"
//             />

//             {/* ── 7. CTA (richiamo all'azione) ───── */}
//             <CallToAction
//                 title="Hai un'idea per rendere la tua scuola più green?"
//                 text="Compila il modulo di registrazione e invia la tua proposta. Le migliori idee saranno premiate!"
//                 buttonText="Vai al modulo"
//                 buttonHref="#registrazione"
//             />

//             {/* ── 8. FORM DI REGISTRAZIONE ────────── */}
//             <RegistrationForm
//                 title="Registra la tua scuola"
//                 description="Compila il modulo per partecipare alla sfida GreenTech. Tutti i campi sono obbligatori."
//                 apiUrl={BACKEND_URL}
//                 fields={FORM_FIELDS}
//                 infoItems={[
//                     'Tutti i campi sono obbligatori',
//                     'Riceverai conferma via email',
//                     'Puoi inviare più proposte',
//                     'Scadenza: 30 giugno 2026',
//                 ]}
//                 submitText="Invia proposta"
//                 successMessage="Proposta inviata con successo!"
//                 id="registrazione"
//             />

//             {/* ── 9. LISTA PROPOSTE ───────────────── */}
//             <ProposalList
//                 heading="Proposte pervenute"
//                 subheading="Ecco le idee degli studenti di tutta Italia"
//                 apiUrl={BACKEND_URL}
//                 titleField="title"
//                 textField="description"
//                 metaField="school"
//                 metaLabel="Scuola:"
//                 emptyMessage="Nessuna proposta ancora pervenuta. Sii il primo!"
//                 id="proposte"
//             />

//             {/* ── 10. GALLERIA IMMAGINI ───────────── */}
//             <ImageGallery
//                 heading="Galleria progetti"
//                 images={GALLERY_IMAGES}
//                 id="galleria"
//             />

//             {/* ── 11. FOOTER ──────────────────────── */}
//             <Footer
//                 brand="GREENTECH"
//                 brandText="Promuoviamo un futuro sostenibile nelle scuole italiane attraverso tecnologie verdi e innovazione."
//                 columns={FOOTER_COLUMNS}
//                 socials={[
//                     { icon: 'f', href: '#', label: 'Facebook' },
//                     { icon: 'in', href: '#', label: 'LinkedIn' },
//                     { icon: '𝕏', href: '#', label: 'Twitter' },
//                     { icon: '▶', href: '#', label: 'YouTube' },
//                 ]}
//                 copyright="© 2026 GreenTech Solutions Srl. Tutti i diritti riservati."
//                 bottomLinks={[
//                     { label: 'Privacy Policy', href: '#' },
//                     { label: 'Cookie Policy', href: '#' },
//                     { label: 'Termini e Condizioni', href: '#' },
//                 ]}
//             />
//         </div>
//     )
// }

// export default App
