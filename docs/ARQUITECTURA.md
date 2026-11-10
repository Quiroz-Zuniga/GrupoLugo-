# ARQUITECTURA — Sitio web Grupo Lugo

|                 |                                                             |
| --------------- | ----------------------------------------------------------- |
| **Versión**     | 0.1 (borrador)                                              |
| **Fecha**       | 29 de octubre de 2026                                       |
| **Relacionado** | `SPEC.md` (qué y por qué) · `AGENTS.md` (reglas de trabajo) |

Este documento explica **cómo** se construye el sitio. Si algo aquí contradice la spec, manda la spec y se corrige este documento.

> Antes de fijar versiones, comandos o nombres de productos de Astro y Cloudflare, consultar su documentación vigente. Los ejemplos de este documento muestran la forma general, no versiones exactas.

---

## 1. Principios

1. **Estático primero.** Todo se genera en el build. Sin servidor, sin base de datos.
2. **Contenido separado del código.** Los datos viven en `src/content/`; las plantillas solo los pintan.
3. **Una plantilla, muchos proyectos.** Agregar una residencial no crea código nuevo.
4. **JavaScript solo cuando aporta.** React únicamente en islas con interacción real.
5. **Seguridad y rendimiento en el borde.** Cloudflare sirve, protege y cachea.

## 2. Vista general

```
                    ┌──────────────────────────────┐
  Repositorio Git → │  Build (Astro, SSG)          │
  (código + datos)  │  · valida contenido (Zod)    │
                    │  · optimiza imágenes         │
                    │  · genera HTML/CSS estático  │
                    └──────────────┬───────────────┘
                                   │ dist/
                                   ▼
                    ┌──────────────────────────────┐
  Visitante ──────▶ │  Cloudflare                  │
  (celular/PC)      │  DNS · CDN · SSL · WAF       │
                    │  Cabeceras · Redirecciones   │
                    └──────────────┬───────────────┘
                                   │ solo si hay formulario
                                   ▼
                    ┌──────────────────────────────┐
                    │  Función serverless          │──▶ Turnstile (verifica)
                    │  /api/contacto               │──▶ Servicio de correo
                    └──────────────────────────────┘
```

## 3. Stack

| Capa           | Tecnología                                  | Notas                                         |
| -------------- | ------------------------------------------- | --------------------------------------------- |
| Lenguaje       | JavaScript (ESM)                            | JSDoc para tipos donde ayude                  |
| Framework      | Astro, `output: 'static'`                   | Sin adaptador SSR salvo necesidad justificada |
| Interactividad | React (integración `@astrojs/react`)        | Solo islas                                    |
| Contenido      | Content Collections + Zod                   | Validación en build                           |
| Imágenes       | `astro:assets` (Sharp)                      | AVIF/WebP, `srcset` automático                |
| SEO            | `@astrojs/sitemap` + componente `Seo.astro` | JSON-LD incluido                              |
| Estilos        | CSS nativo con variables                    | Sin framework CSS. Ver skill de diseño        |
| Fuentes        | Autoalojadas (Fontsource)                   | Evita peticiones a terceros y mejora CSP      |
| Calidad        | ESLint, Prettier, `astro check`             | Se ejecutan en CI                             |
| Hosting        | Cloudflare                                  | Ver §10                                       |

## 4. Estructura de carpetas

```
grupo-lugo/
├─ AGENTS.md
├─ astro.config.mjs
├─ package.json
├─ .env.example
├─ public/
│  ├─ favicon.svg
│  ├─ robots.txt
│  ├─ _headers                  # cabeceras de seguridad y caché (Cloudflare)
│  └─ _redirects                # redirecciones 301
├─ docs/
│  ├─ SPEC.md
│  └─ ARQUITECTURA.md
├─ skills/
│  └─ diseno-grupo-lugo/SKILL.md
└─ src/
   ├─ config/
   │  └─ sitio.js               # nombre, lema, contacto, redes, menú base
   ├─ content.config.mjs        # colecciones y esquemas Zod
   ├─ content/
   │  ├─ proyectos/             # ciudad-victoria.json, ...
   │  └─ noticias/              # *.md
   ├─ assets/
   │  ├─ logo/                  # SVG del logo
   │  └─ proyectos/<slug>/      # hero.jpg, galeria-1.jpg, ...
   ├─ layouts/
   │  └─ Layout.astro           # <head>, Header, <slot/>, Footer
   ├─ pages/
   │  ├─ index.astro
   │  ├─ nosotros.astro
   │  ├─ contactanos.astro
   │  ├─ 404.astro
   │  ├─ proyectos/
   │  │  ├─ index.astro         # listado
   │  │  └─ [slug].astro        # landing de residencial
   │  ├─ noticias/
   │  │  ├─ index.astro
   │  │  └─ [slug].astro
   │  └─ api/
   │     └─ contacto.js         # solo si hay formulario (ver §9)
   ├─ components/
   │  ├─ layout/                # Header, Footer, MenuProyectos, BotonWhatsapp
   │  ├─ proyecto/              # Hero, SobreProyecto, Caracteristicas, CtaWhatsapp
   │  ├─ home/                  # secciones de Inicio
   │  ├─ ui/                    # Boton, Icono, Seccion, Tarjeta
   │  ├─ seo/                   # Seo.astro, JsonLd.astro
   │  └─ islas/                 # *.jsx → Galeria.jsx, FormularioContacto.jsx
   ├─ lib/
   │  ├─ whatsapp.js            # genera enlaces wa.me
   │  ├─ proyectos.js           # consultas: publicados, ordenados, destacados
   │  └─ seo.js                 # utilidades de metadatos
   └─ styles/
      ├─ tokens.css             # variables de la paleta, tipografía, espaciado
      └─ global.css             # reset y estilos base
```

## 5. Contenido y datos

### 5.1 Colección de proyectos

`src/content.config.mjs` define el esquema; el build falla si un archivo no lo cumple.

```js
// src/content.config.mjs  (forma general; verificar API vigente de Astro)
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/proyectos' }),
  schema: z.object({
    slug: z.string(),
    nombre: z.string(),
    orden: z.number(),
    publicado: z.boolean(),
    zona: z.string(),
    ubicacion: z.string(),
    estado: z.enum(['disponible', 'ultimos-lotes', 'proximamente', 'vendido']),
    apartado1: z.object({
      etiqueta: z.string(),
      titulo: z.string(),
      subtitulo: z.string(),
      ubicacion: z.string(),
      estadoTexto: z.string(),
      botonCta: z.string(),
    }),
    apartado2: z.object({
      etiqueta: z.string(),
      titulo: z.string(),
      descripcion: z.string(),
      frase: z.string().optional(),
    }),
    apartado3: z.object({
      etiqueta: z.string(),
      titulo: z.string(),
      items: z.array(z.object({
        icono: z.enum(['pin', 'shield', 'tree', 'road', 'people', 'whatsapp', 'leaf', 'arrow']),
        titulo: z.string(),
        texto: z.string(),
      })).min(3).max(6),
    }),
    apartado4: z.object({
      etiqueta: z.string(),
      titulo: z.string(),
      descripcion: z.string(),
      items: z.array(z.object({
        numero: z.string(),
        titulo: z.string(),
        texto: z.string(),
      })).min(3).max(8),
    }),
    apartado5: z.object({
      etiqueta: z.string(),
      pregunta: z.string(),
      titulo: z.string(),
      texto: z.string(),
      boton: z.string(),
    }),
    seo: z.object({
      title: z.string().max(75),
      description: z.string().max(160),
    }),
  }),
});
      whatsapp: z.string().regex(/^\d{11,15}$/),
      mapa: z.string().url().optional(),
      seo: z.object({
        title: z.string().max(60),
        description: z.string().max(160),
        ogImage: image().optional(),
      }),
    }),
});

export const collections = { proyectos /*, noticias */ };
```

El `slug` es el nombre del archivo (`ciudad-victoria.json` → `/proyectos/ciudad-victoria`).

### 5.2 Generación de rutas

`src/pages/proyectos/[slug].astro` usa `getStaticPaths()` para generar una página por cada proyecto con `publicado: true`. Es **la única plantilla** de landing de residencial.

### 5.3 Flujo para agregar una residencial

1. Crear `src/content/proyectos/<slug>.json` con los datos.
2. Copiar las imágenes a `src/assets/proyectos/<slug>/`.
3. `pnpm build` (valida y genera).
4. Publicar. Menú, listado, sitemap y SEO se actualizan solos.

## 6. Componentes

### 6.1 Reglas

- `.astro` por defecto. `.jsx` solo si requiere estado o eventos del navegador.
- Los componentes reciben **datos por props**; no importan contenido directamente (excepto `sitio.js` en layout).
- Un componente = una responsabilidad. Si pasa de ~120 líneas, dividir.

### 6.2 Landing de residencial

| Sección (SPEC)          | Componente                              | Tipo                                                  |
| ----------------------- | --------------------------------------- | ----------------------------------------------------- |
| RF-01                   | `Header.astro` + `MenuProyectos.astro`  | Astro (menú móvil con `<details>` o un script mínimo) |
| RF-10 Hero              | `ProyectoHero.astro`                    | Astro                                                 |
| RF-11 Sobre el proyecto | `SobreProyecto.astro`                   | Astro                                                 |
| RF-12 Características   | `Caracteristicas.astro` + `Icono.astro` | Astro                                                 |
| RF-13 Galería           | `Galeria.jsx`                           | **Isla React** (`client:visible`)                     |
| RF-14 CTA WhatsApp      | `CtaWhatsapp.astro`                     | Astro                                                 |
| RF-03 Footer            | `Footer.astro`                          | Astro                                                 |

### 6.3 Islas React

| Isla                     | Directiva        | Motivo                                                     |
| ------------------------ | ---------------- | ---------------------------------------------------------- |
| `Galeria.jsx`            | `client:visible` | Lightbox con teclado, foco atrapado y gestos               |
| `FormularioContacto.jsx` | `client:visible` | Validación, envío y estados (si se confirma el formulario) |

Cualquier isla nueva se justifica en el PR: qué interacción resuelve y cuánto pesa.

### 6.4 Íconos

Conjunto de SVG en línea (`Icono.astro`) con trazo uniforme, como en el mockup. Evitar librerías completas de íconos.

## 7. Estilos

- Variables CSS en `tokens.css`; ningún valor de color, espaciado o fuente "suelto" en componentes.
- Estilos de componente con `<style>` de Astro (con alcance). Estilos globales solo en `global.css`.
- Mobile-first; puntos de quiebre definidos como variables en los tokens y usados con consistencia.
- Cuidar la especificidad de selectores para que reglas de sección y de componente no se anulen entre sí.
- Detalle de paleta, tipografía y reglas visuales: `skills/diseno-grupo-lugo/SKILL.md`.

## 8. SEO

| Elemento            | Implementación                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| Metadatos           | `Seo.astro` recibe `title`, `description`, `canonical`, `ogImage` y los coloca en `<head>`                 |
| Sitemap             | `@astrojs/sitemap` (requiere `site` en `astro.config.mjs`)                                                 |
| `robots.txt`        | En `public/`, referencia al sitemap                                                                        |
| Canonical           | Una URL canónica por página; con o sin `www` definido en un solo lugar (redirección en Cloudflare)         |
| Datos estructurados | JSON-LD: `Organization` (global), `Place`/`Residence` + `BreadcrumbList` (proyectos), `Article` (noticias) |
| Idioma              | `<html lang="es-HN">`                                                                                      |
| URLs                | `/proyectos/<slug>`, minúsculas, sin tildes, estables                                                      |
| Imágenes            | `alt` descriptivo, dimensiones explícitas, AVIF/WebP                                                       |
| Contenido           | Cada landing incluye zona y ciudad de forma natural en `h1`, `title` y texto                               |
| Social              | Open Graph y Twitter Cards con imagen 1200×630                                                             |

## 9. Formulario de contacto (opcional, según SPEC RF-33/34)

Si se confirma, el flujo es:

1. `FormularioContacto.jsx` valida en el cliente y muestra el widget **Cloudflare Turnstile**.
2. Envía `POST /api/contacto` con los datos y el token de Turnstile.
3. La función serverless (Cloudflare) **verifica el token** con la API de Turnstile, valida y sanea los campos, aplica límite de envíos y envía el correo con un proveedor (por ejemplo Resend).
4. Responde con éxito o error claros; no expone detalles internos.

Notas:

- Esta es la única parte que necesita código de servidor. Si el sitio queda 100% estático, se elimina `/api`.
- Secretos (clave de Turnstile, clave del proveedor de correo) como **secrets de Cloudflare**, nunca en el repositorio.
- Alternativa sin código propio: enviar el formulario a un servicio externo y mantener el sitio totalmente estático.

## 10. Cloudflare: despliegue y seguridad

> Cloudflare ha ido unificando sus productos de despliegue (Pages y Workers). Consultar la documentación vigente para elegir y configurar el producto actual antes de H7.

### 10.1 Despliegue

- Conectar el repositorio; cada push a `main` genera un build y publica `dist/`.
- Cada rama/PR genera una **vista previa** con URL propia, para que el cliente revise antes de publicar.
- Variables de entorno y secrets en el panel de Cloudflare.
- Dominio propio con DNS en Cloudflare; HTTPS "Full (strict)".

### 10.2 Seguridad

| Control       | Detalle                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| SSL/TLS       | Modo Full (strict); HSTS; redirigir HTTP → HTTPS                                                                                                                   |
| WAF y reglas  | Reglas administradas activas; limitar tasa en `/api/contacto`                                                                                                      |
| Bots          | Bot Fight Mode / Turnstile en formularios                                                                                                                          |
| Cabeceras     | En `public/_headers`: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options` o `frame-ancestors` |
| Redirecciones | `www` ↔ raíz (una sola canónica), y 301 en `_redirects` si cambia algún slug                                                                                       |
| Caché         | Recursos con hash de Astro (`/_astro/*`): caché larga e inmutable. HTML: revalidación corta.                                                                       |

Ejemplo orientativo de `public/_headers` (ajustar la CSP a los dominios realmente usados):

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; connect-src 'self'

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```

### 10.3 Rendimiento

- CDN global y compresión Brotli activadas.
- Imágenes ya optimizadas en el build; considerar la optimización de imágenes de Cloudflare solo si hace falta.
- Sin scripts de terceros en la carga inicial; la analítica se carga diferida.

## 11. Analítica

Opciones, de menos a más intrusiva: **Cloudflare Web Analytics** (sin cookies) → Plausible/Umami → Google Analytics. Medir como mínimo: visitas por página, clics en WhatsApp por proyecto y origen del tráfico. Los eventos de clic se registran con un atributo `data-evento` en los botones, sin JavaScript pesado. **[CONFIRMAR herramienta]**

## 12. Calidad y CI

Pipeline en cada PR:

1. `pnpm install --frozen-lockfile`
2. `pnpm check` (tipos y contenido)
3. `pnpm lint`
4. `pnpm build`
5. Lighthouse CI sobre la vista previa (umbral ≥ 90, ver RNF-01)

Se bloquea la fusión a `main` si algún paso falla.

Pruebas manuales por hito: 360 / 768 / 1280 px, teclado, lector de pantalla básico, Safari iOS y Chrome Android.

## 13. Decisiones de arquitectura (ADR resumido)

| ID     | Decisión                    | Alternativas descartadas     | Razón                                                                                    |
| ------ | --------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| ADR-01 | Rutas bajo un dominio       | Subdominios por proyecto     | La autoridad SEO se concentra en un dominio; un solo despliegue y mantenimiento          |
| ADR-02 | SSG sin base de datos       | CMS con BD, SSR              | El contenido cambia poco; menor costo, mayor velocidad y seguridad                       |
| ADR-03 | Content Collections con Zod | Datos sueltos en componentes | Validación temprana; actualizar contenido no toca código                                 |
| ADR-04 | React solo en islas         | SPA completa en React        | Menos JavaScript, mejor rendimiento y SEO                                                |
| ADR-05 | CSS nativo con tokens       | Tailwind / librería de UI    | Paleta cerrada y diseño propio; menos dependencias. Reevaluable si el equipo lo prefiere |
| ADR-06 | Fuentes autoalojadas        | Google Fonts por CDN         | Rendimiento, privacidad y CSP más estricta                                               |
| ADR-07 | WhatsApp como CTA principal | Solo formulario              | Es el canal que ya usan los compradores en el mercado local                              |

## 14. Evolución prevista

- **CMS headless** (Sanity, Decap CMS u otro) si el equipo quiere editar sin tocar archivos. Se conecta a las mismas colecciones, sin cambiar plantillas.
- **Plano interactivo de lotes** como isla React cuando haya datos de disponibilidad.
- **Versión en inglés** con el enrutado i18n de Astro, si hay público extranjero relevante.

## 15. Implementación del primer ciclo

- Astro 7, React 19, JavaScript ESM, pnpm. Interfaces `Props` solo en frontmatter Astro para validar el contrato de componentes; lógica y colecciones en JS.
- TypeScript 6 fijado por compatibilidad con `astro check`; ESLint usa el parser TypeScript únicamente para el frontmatter Astro.
- Galería con `getImage()` para optimizar recursos antes de pasarlos a React. Diálogo HTML nativo para foco modal, Escape y restauración al disparador; flechas para cambiar de imagen.
- Fuentes Figtree, Cormorant Garamond y Caveat autoalojadas con Fontsource. Sin paquetes de iconos, CSS, lightbox ni datos.
- `security.csp` genera hashes por página; JSON-LD registra su hash. `public/_headers` complementa con `frame-ancestors`, `nosniff`, política de referencia y permisos. Cabeceras efectivas en hosting pendientes de H7.
- Variables públicas opcionales documentadas en `.env.example`: dominio y teléfono. No son secretos. Sin dominio no se genera sitemap y se bloquea indexación del borrador.
- Se restauran `docs/` y `skills/diseno-grupo-lugo/` desde los documentos iniciales de `.agents/`, conservando los originales. Tokens derivados de la tabla de la guía, que no traía el archivo referenciado.
- Dependencias de producción: Astro (SSG y assets), integración React + React/DOM (solo galería), sitemap (SEO con dominio confirmado), tres fuentes (autoalojamiento). Dependencias de desarrollo: comprobador Astro/TypeScript, ESLint y parsers, Prettier y plugin Astro, tipos React. No se añade backend, CMS, formularios ni servicios de terceros.

## 16. Corrección a landing institucional

Esta actualización sustituye la implementación de proyecto descrita en §15. La ruta `/` usa `getEntry('institucional', 'grupo-lugo')`; una colección Zod valida hero, historia, actividades, propósito, diez valores, contacto y SEO. Las secciones corporativas viven en `src/components/home/` y reciben el contenido por props. Se retiran los componentes, datos y recortes que se habían creado a partir de la referencia residencial.

El layout genera metadatos de la empresa, imagen social del logo y JSON-LD `Organization`; no atribuye a la empresa una dirección, residencial o sede que el documento no confirme. La landing no tiene islas y no entrega JavaScript de aplicación. El menú móvil usa HTML nativo. React permanece instalado para futuros hitos, sin hidratar componentes en esta página.

El logo transparente se comparte en todas las ubicaciones mediante `astro:assets`. No se simula transparencia con mezcla CSS ni con una placa blanca. La antigua URL de vista previa redirige temporalmente a `/`, para que la revisión previa lleve a la portada corregida.
