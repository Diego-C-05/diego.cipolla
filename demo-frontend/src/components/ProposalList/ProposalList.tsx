import { useState, useEffect } from 'react'
import './ProposalList.css'

/* ═══════════════════════════════════════════════════
   PROPOSAL LIST — Lista di elementi dal backend (GET)

   USO:
     <ProposalList
       heading="Proposte pervenute"
       subheading="Ecco le idee degli studenti"
       apiUrl="http://localhost:8080/api/submission"
       titleField="title"
       textField="description"
       metaField="school"
       metaLabel="Scuola"
     />

   PERSONALIZZAZIONE:
     - apiUrl: URL del backend per la GET
     - titleField: nome del campo da usare come titolo card
     - textField: nome del campo da usare come testo card
     - metaField: nome del campo da usare come metadato in basso
     - metaLabel: etichetta del metadato (es: "Scuola:")
     - heading / subheading: titoli della sezione
     - emptyMessage: messaggio se non ci sono elementi
   ═══════════════════════════════════════════════════ */

type ProposalListProps = {
    heading?: string
    subheading?: string
    apiUrl: string
    titleField?: string
    textField?: string
    metaField?: string
    metaLabel?: string
    emptyMessage?: string
    id?: string
}

export function ProposalList({
    heading = 'Lista elementi',
    subheading,
    apiUrl,
    titleField = 'title',
    textField = 'description',
    metaField = 'school',
    metaLabel = '',
    emptyMessage = 'Nessun elemento presente.',
    id,
}: ProposalListProps) {
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => {
                if (!res.ok) throw new Error(`Errore ${res.status}`)
                return res.json()
            })
            .then((data) => setItems(data))
            .catch(() => setError('Errore nel caricamento. Il backend è avviato?'))
            .finally(() => setLoading(false))
    }, [apiUrl])

    return (
        <section className="tpl-list" id={id}>
            <h2 className="tpl-list__heading">{heading}</h2>
            {subheading && <p className="tpl-list__subheading">{subheading}</p>}

            {loading && (
                <div className="tpl-list__loading">
                    <div className="tpl-list__spinner" />
                    <p>Caricamento in corso...</p>
                </div>
            )}

            {error && <p className="tpl-list__error">{error}</p>}

            {!loading && !error && items.length === 0 && (
                <p className="tpl-list__empty">{emptyMessage}</p>
            )}

            {!loading && !error && items.length > 0 && (
                <div className="tpl-list__grid">
                    {items.map((item) => (
                        <div className="tpl-list__card" key={item.id}>
                            <h3 className="tpl-list__card-title">
                                {item[titleField]}
                            </h3>
                            {item[textField] && (
                                <p className="tpl-list__card-text">
                                    {item[textField]}
                                </p>
                            )}
                            {item[metaField] && (
                                <span className="tpl-list__card-meta">
                                    📍 {metaLabel} {item[metaField]}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
