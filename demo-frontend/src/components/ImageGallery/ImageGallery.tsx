import { useState } from 'react'
import './ImageGallery.css'

/* ═══════════════════════════════════════════════════
   IMAGE GALLERY — Galleria immagini con lightbox

   USO:
     <ImageGallery
       heading="La nostra galleria"
       images={[
         { src: '/img/foto1.jpg', alt: 'Descrizione', caption: 'Progetto Orto' },
         { src: '/img/foto2.jpg', alt: 'Descrizione' },
         { src: '/img/foto3.jpg' },
       ]}
     />

   PERSONALIZZAZIONE:
     - heading: titolo della sezione (opzionale)
     - images: array di immagini con src, alt, caption
     - columns: numero minimo colonne griglia (default auto-fill)
   ═══════════════════════════════════════════════════ */

type GalleryImage = {
    src: string
    alt?: string
    caption?: string
}

type ImageGalleryProps = {
    heading?: string
    images: GalleryImage[]
    id?: string
}

export function ImageGallery({ heading, images, id }: ImageGalleryProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    const openLightbox = (i: number) => setLightboxIndex(i)
    const closeLightbox = () => setLightboxIndex(null)

    const goNext = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % images.length)
        }
    }

    const goPrev = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
        }
    }

    // Chiudi con Escape
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') closeLightbox()
        if (e.key === 'ArrowRight') goNext()
        if (e.key === 'ArrowLeft') goPrev()
    }

    return (
        <section className="tpl-gallery" id={id}>
            {heading && <h2 className="tpl-gallery__heading">{heading}</h2>}

            <div className="tpl-gallery__grid">
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="tpl-gallery__item"
                        onClick={() => openLightbox(i)}
                    >
                        <img src={img.src} alt={img.alt || `Immagine ${i + 1}`} loading="lazy" />
                        {img.caption && (
                            <div className="tpl-gallery__item-caption">{img.caption}</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div
                    className="tpl-gallery__lightbox"
                    onClick={closeLightbox}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    ref={(el) => el?.focus()}
                >
                    <img
                        src={images[lightboxIndex].src}
                        alt={images[lightboxIndex].alt || ''}
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button className="tpl-gallery__lightbox-close" onClick={closeLightbox}>
                        ✕
                    </button>

                    {images.length > 1 && (
                        <>
                            <button
                                className="tpl-gallery__lightbox-nav tpl-gallery__lightbox-nav--prev"
                                onClick={(e) => { e.stopPropagation(); goPrev() }}
                            >
                                ‹
                            </button>
                            <button
                                className="tpl-gallery__lightbox-nav tpl-gallery__lightbox-nav--next"
                                onClick={(e) => { e.stopPropagation(); goNext() }}
                            >
                                ›
                            </button>
                        </>
                    )}

                    {images[lightboxIndex].caption && (
                        <div className="tpl-gallery__lightbox-caption">
                            {images[lightboxIndex].caption}
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}
