# Grupo Lugo

Landing institucional de Grupo Lugo en `/`, con Astro estático, contenido corporativo validado y CSS nativo.

```sh
pnpm install
pnpm dev
```

Abrir `http://localhost:4321/`.

```sh
pnpm check
pnpm lint
pnpm build
pnpm preview
```

## Fuente del contenido

La historia, las actividades, la misión, la visión y los diez valores proceden del documento institucional facilitado por el cliente. Solo se ajusta la redacción y la ortografía para la web. La imagen de referencia aporta orientación visual; no aporta información ni fotografías publicables.

- `src/content/institucional/grupo-lugo.json`: contenido y SEO de la landing.
- `src/config/sitio.js`: identidad, etiquetas, navegación y contacto.
- `src/assets/logo/grupo-lugo-transparente.png`: logo rojo y dorado sin fondo, usado en portada, header y footer.
- `docs/SPEC.md` §17: alcance corregido de esta entrega.
- `docs/LOGO.md`: origen y proceso de transparencia del logo.

La interfaz conserva la paleta corporativa verde olivo, esmeralda, terracota, tierra, almendra y beis. Se conserva el rojo y dorado del logo oficial. No se publican residenciales ni noticias sin datos reales.

## Datos pendientes

Copiar `.env.example` a `.env` y completar el dominio oficial (`PUBLIC_SITE_URL`) y teléfono confirmado con código de país, solo dígitos (`PUBLIC_WHATSAPP`). Sin dominio, se bloquea la indexación del borrador. Sin teléfono, se muestra el contacto pendiente. Reiniciar el servidor o reconstruir después de cambiar variables.

No se incorporan fotografías mientras no se facilite material corporativo real. El despliegue en Cloudflare corresponde a un ciclo posterior.
