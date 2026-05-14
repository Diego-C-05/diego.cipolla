import { useState } from 'react'
import './RegistrationForm.css'

/* ═══════════════════════════════════════════════════
   REGISTRATION FORM — Form generico con invio API

   USO:
     <RegistrationForm
       title="Registra la tua scuola"
       description="Compila il modulo per partecipare."
       apiUrl="http://localhost:8080/api/submission"
       fields={[
         { name: 'title', label: 'Nome progetto', type: 'text', required: true },
         { name: 'description', label: 'Descrizione', type: 'textarea', required: true },
         { name: 'contactPerson', label: 'Docente', type: 'text', required: true },
         { name: 'contactEmail', label: 'Email', type: 'email', required: true },
         { name: 'school', label: 'Scuola', type: 'text', required: true },
         { name: 'province', label: 'Provincia', type: 'text', required: true },
         { name: 'className', label: 'Classe', type: 'text', required: true },
         { name: 'level', label: 'Grado', type: 'select', required: true,
           options: [
             { value: '1', label: 'Primo grado' },
             { value: '2', label: 'Secondo grado' },
           ]
         },
       ]}
       infoItems={['Tutti i campi sono obbligatori', 'Email valida richiesta']}
       submitText="Invia proposta"
     />

   PERSONALIZZAZIONE:
     - fields: array di campi del form (type: text|email|textarea|select|number)
     - apiUrl: URL del backend per la POST
     - title / description: testi laterali
     - infoItems: lista di informazioni a sinistra
     - submitText: testo del bottone
     - onSuccess: callback dopo invio riuscito
   ═══════════════════════════════════════════════════ */

type FieldOption = {
    value: string
    label: string
}

type FormField = {
    name: string
    label: string
    type: 'text' | 'email' | 'textarea' | 'select' | 'number'
    required?: boolean
    placeholder?: string
    options?: FieldOption[]   // solo per type: 'select'
    rows?: number             // solo per type: 'textarea'
    half?: boolean            // true = occupa metà riga
}

type RegistrationFormProps = {
    title?: string
    description?: string
    apiUrl: string
    fields: FormField[]
    infoItems?: string[]
    submitText?: string
    successMessage?: string
    id?: string
    onSuccess?: (data: any) => void
}

export function RegistrationForm({
    title = 'Modulo di registrazione',
    description,
    apiUrl,
    fields,
    infoItems,
    submitText = 'Invia',
    successMessage = 'Invio completato con successo!',
    id,
    onSuccess,
}: RegistrationFormProps) {
    // Crea lo state iniziale dai campi
    const initialState: Record<string, string> = {}
    fields.forEach((f) => {
        initialState[f.name] = f.type === 'select' && f.options?.length ? f.options[0].value : ''
    })

    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)
        setError(null)

        try {
            // Converti i campi numerici
            const payload: Record<string, any> = { ...formData }
            fields.forEach((f) => {
                if (f.type === 'number' || (f.type === 'select' && !isNaN(Number(payload[f.name])))) {
                    payload[f.name] = Number(payload[f.name])
                }
            })

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!response.ok) throw new Error(`Errore ${response.status}`)

            const data = await response.json()
            setMessage(successMessage)
            setFormData(initialState)
            alert(successMessage)
            onSuccess?.(data)
        } catch (err: any) {
            setError(
                'Errore durante l\'invio. Verifica che il backend sia avviato. ' +
                (err.message || '')
            )
        } finally {
            setLoading(false)
        }
    }

    // Raggruppa i campi "half" in righe da 2
    const renderFields = () => {
        const elements: React.ReactNode[] = []
        let i = 0

        while (i < fields.length) {
            const field = fields[i]

            // Se questo e il prossimo sono half, mettili nella stessa riga
            if (field.half && i + 1 < fields.length && fields[i + 1].half) {
                elements.push(
                    <div className="tpl-form__row" key={`row-${i}`}>
                        {renderField(field)}
                        {renderField(fields[i + 1])}
                    </div>
                )
                i += 2
            } else {
                elements.push(renderField(field))
                i++
            }
        }
        return elements
    }

    const renderField = (field: FormField) => {
        const key = field.name

        return (
            <div className="tpl-form__field" key={key}>
                <label className={`tpl-form__label ${field.required ? 'tpl-form__label--required' : ''}`}>
                    {field.label}
                </label>

                {field.type === 'textarea' ? (
                    <textarea
                        className="tpl-form__textarea"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                        rows={field.rows || 4}
                    />
                ) : field.type === 'select' ? (
                    <select
                        className="tpl-form__select"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                    >
                        {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        className="tpl-form__input"
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                    />
                )}
            </div>
        )
    }

    return (
        <section className="tpl-form" id={id}>
            <div className="tpl-form__container">
                {/* Colonna info */}
                <div className="tpl-form__info">
                    <h2 className="tpl-form__title">{title}</h2>
                    {description && <p className="tpl-form__description">{description}</p>}
                    {infoItems && (
                        <ul className="tpl-form__info-list">
                            {infoItems.map((item, i) => (
                                <li className="tpl-form__info-item" key={i}>
                                    <span className="tpl-form__info-icon">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Colonna form */}
                <div className="tpl-form__card">
                    {message && (
                        <div className="tpl-form__message tpl-form__message--success">{message}</div>
                    )}
                    {error && (
                        <div className="tpl-form__message tpl-form__message--error">{error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {renderFields()}
                        <button className="tpl-form__submit" type="submit" disabled={loading}>
                            {loading ? 'Invio in corso...' : submitText}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
