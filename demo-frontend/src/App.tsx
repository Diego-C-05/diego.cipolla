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


const BACKEND_URL = 'http://localhost:8080/api/items'

const NAV_LINKS = ['Home', 'Missione', 'Tecnologie', 'Premi', 'Proposte']

const CAROUSEL_SLIDES = [
    { src: 'src/assets/download.png', title: 'Un futuro sostenibile', caption: 'Inizia dalla tua scuola' },
    { src: 'src/assets/download.png', title: 'Tecnologie verdi', caption: 'Innovazione e ambiente' },
    { src: 'src/assets/download.png', title: 'Premi e riconoscimenti', caption: 'Le migliori idee saranno premiate' },
]

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

const STATS = [
    { value: 150, label: 'Scuole partecipanti', suffix: '+' },
    { value: 3200, label: 'Studenti coinvolti' },
    { value: 48, label: 'Progetti realizzati' },
    { value: 12, label: 'Regioni' },
]

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

const FORM_FIELDS = [
    { name: 'title', label: 'Nome del progetto', type: 'text' as const, required: true },
    { name: 'body', label: 'Descrizione del progetto', type: 'textarea' as const, required: true, rows: 4 },
    { name: 'email', label: 'Email di contatto', type: 'email' as const, required: true, half: true },
 
    // {
    //     name: 'level', label: 'Grado della scuola', type: 'select' as const, required: true,
    //     options: [
    //         { value: '1', label: 'Primo grado' },
    //         { value: '2', label: 'Secondo grado' },
    //     ],
    // },
]

const GALLERY_IMAGES = [
    { src: '/img/gallery1.jpg', caption: 'Laboratorio green' },
    { src: '/img/gallery2.jpg', caption: 'Orto scolastico' },
    { src: '/img/gallery3.jpg', caption: 'Pannelli solari' },
    { src: '/img/gallery4.jpg', caption: 'Raccolta differenziata' },
    { src: '/img/gallery5.jpg', caption: 'Workshop studenti' },
    { src: '/img/gallery6.jpg', caption: 'Premiazione' },
]

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
    <>
       <Header
                    brand="trdtfugyihuij"
                    links={NAV_LINKS}
                    activeLink="Home"
                    ctaText="Registrati"
                    ctaHref="#registrazione"
        />

        <Carousel
                slides={CAROUSEL_SLIDES}
                autoplay
                interval={4000}
        />

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
      
    </>
  )
}

export default App
