import { useEffect, useRef, useState } from 'react';
import '../styles/galeria.css';

/**
 * Galería interactiva con lightbox accesible para las maquetas ilustrativas de cada residencial.
 * @param {{ items: Array<{ numero: string; titulo: string; texto: string; alt: string; thumbSrc: string; fullSrc: string; width: number; height: number }>; proyectoNombre: string }} props
 */
export default function GaleriaLightbox({ items, proyectoNombre }) {
  const [activo, setActivo] = useState(/** @type {number | null} */ (null));
  const dialogRef = useRef(/** @type {HTMLDialogElement | null} */ (null));
  const triggerRefs = useRef(
    /** @type {Array<HTMLButtonElement | null>} */ ([]),
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activo !== null) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [activo]);

  useEffect(() => {
    if (activo === null) return undefined;

    function onKeyDown(event) {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActivo((prev) => (prev === null ? 0 : (prev + 1) % items.length));
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActivo((prev) =>
          prev === null ? 0 : (prev - 1 + items.length) % items.length,
        );
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activo, items.length]);

  function cerrar() {
    const idx = activo;
    setActivo(null);
    if (idx !== null) {
      requestAnimationFrame(() => {
        triggerRefs.current[idx]?.focus();
      });
    }
  }

  function anterior() {
    setActivo((prev) =>
      prev === null ? 0 : (prev - 1 + items.length) % items.length,
    );
  }

  function siguiente() {
    setActivo((prev) => (prev === null ? 0 : (prev + 1) % items.length));
  }

  const actual = activo !== null ? items[activo] : null;

  return (
    <>
      <div className="gallery-grid">
        {items.map((item, idx) => (
          <button
            key={item.numero + item.titulo}
            ref={(el) => {
              triggerRefs.current[idx] = el;
            }}
            type="button"
            className="gallery-card"
            onClick={() => setActivo(idx)}
            aria-label={`Ampliar ${item.titulo} de ${proyectoNombre}`}
          >
            <div className="gallery-media">
              <img
                src={item.thumbSrc}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
              />
              <div className="gallery-scrim" aria-hidden="true" />
              <span className="gallery-zoom-tag" aria-hidden="true">
                Ampliar ↗
              </span>
              <div className="gallery-info">
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox-dialog"
        aria-labelledby="lightbox-titulo"
        onCancel={(event) => {
          event.preventDefault();
          cerrar();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) cerrar();
        }}
      >
        {actual && (
          <div className="lightbox-frame">
            <div className="lightbox-header">
              <span className="lightbox-badge">
                {actual.numero} · Maqueta ilustrativa de referencia —{' '}
                {proyectoNombre}
              </span>
              <button
                type="button"
                className="lightbox-close"
                onClick={cerrar}
                aria-label="Cerrar galería"
              >
                ×
              </button>
            </div>
            <div className="lightbox-stage">
              <img src={actual.fullSrc} alt={actual.alt} />
            </div>
            <div className="lightbox-footer">
              <div className="lightbox-caption">
                <h3 id="lightbox-titulo">{actual.titulo}</h3>
                <p>{actual.texto}</p>
              </div>
              <div className="lightbox-controls">
                <button
                  type="button"
                  className="lightbox-nav"
                  onClick={anterior}
                  aria-label="Imagen anterior"
                >
                  ←
                </button>
                <span className="lightbox-counter" aria-live="polite">
                  {(activo ?? 0) + 1} / {items.length}
                </span>
                <button
                  type="button"
                  className="lightbox-nav"
                  onClick={siguiente}
                  aria-label="Imagen siguiente"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
