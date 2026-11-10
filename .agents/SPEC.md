# SPEC — Sitio web Grupo Lugo

|                       |                       |
| --------------------- | --------------------- |
| **Versión**           | 0.1 (borrador)        |
| **Fecha**             | 29 de octubre de 2026 |
| **Estado**            | En definición         |
| **Documento hermano** | `ARQUITECTURA.md`     |

> Convención: los puntos marcados **[CONFIRMAR]** son supuestos que deben validarse con el cliente antes de implementarse. Los marcados **[DECIDIDO]** ya fueron acordados.

---

## 1. Contexto

Grupo Lugo es una empresa de **lotificación y urbanización** con sede en Tegucigalpa, Honduras. Desarrolla varias residenciales (la primera con landing diseñada: **Residencial Ciudad Victoria**, en El Pescadero, Danlí).

Hoy necesita una presencia web propia que presente cada residencial de forma clara y lleve a los interesados a contactar al equipo por WhatsApp.

Como referencia de formato se tomó el sitio de otra desarrolladora hondureña (celaque.net): una landing por proyecto, navegación simple, mucho material visual y contacto directo. Esa referencia aporta estructura, **no** diseño ni contenido; el diseño es el del mockup propio de Grupo Lugo.

## 2. Objetivos

| ID    | Objetivo                                                 | Cómo se mide                                                       |
| ----- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| OBJ-1 | Generar contactos calificados por WhatsApp               | Clics en botones de WhatsApp por proyecto                          |
| OBJ-2 | Posicionar cada residencial en búsquedas locales         | Posición para "lotes en [zona]" y similares; páginas indexadas     |
| OBJ-3 | Transmitir confianza y marca                             | Revisión cualitativa del cliente                                   |
| OBJ-4 | Que el equipo actualice contenido sin programar a diario | Un cambio de precio/foto se hace editando un solo archivo de datos |
| OBJ-5 | Sitio rápido y barato de mantener                        | Core Web Vitals en verde; sin servidor ni base de datos            |

## 3. Alcance

### Dentro del alcance

- Sitio informativo multipágina, en español.
- Una landing por residencial (generadas desde datos con una sola plantilla).
- Páginas: Inicio, Nosotros, Proyectos (listado), Proyecto (detalle), Noticias (listado y detalle), Contáctanos.
- Botón y enlaces de WhatsApp con mensaje prellenado por proyecto.
- SEO técnico y de contenido.
- Despliegue y protección en Cloudflare, dominio propio.

### Fuera del alcance (por ahora)

- Base de datos, panel de administración o CMS visual.
- Cuentas de usuario, pagos o reservas en línea.
- Plano interactivo de lotes y disponibilidad en tiempo real.
- Versión en inglés.
- Blog con comentarios.

> Cualquier elemento de la lista "fuera del alcance" requiere actualizar esta spec antes de implementarse.

## 4. Usuarios

| Perfil                                       | Qué busca                                       | Qué necesita del sitio                                                          |
| -------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------- |
| **Comprador de lote** (familia, 25–55 años)  | Un terreno seguro, bien ubicado y con servicios | Ubicación clara, características, fotos reales, forma fácil de preguntar precio |
| **Inversionista / hondureño en el exterior** | Plusvalía, legalidad, confianza                 | Información de la empresa, proyectos, contacto rápido                           |
| **Equipo de Grupo Lugo**                     | Actualizar contenido y recibir contactos        | Datos en archivos simples; contactos llegando a WhatsApp                        |

El acceso será principalmente **desde celular**. Mobile-first.

## 5. Decisiones tomadas

| ID     | Decisión                                                                              | Estado   |
| ------ | ------------------------------------------------------------------------------------- | -------- |
| DEC-01 | JavaScript + React + Astro (metaframework)                                            | DECIDIDO |
| DEC-02 | Dominio propio, **un solo dominio**, proyectos por **rutas** (no subdominios) por SEO | DECIDIDO |
| DEC-03 | Despliegue y seguridad en Cloudflare                                                  | DECIDIDO |
| DEC-04 | Sin base de datos; contenido en archivos (Content Collections)                        | DECIDIDO |
| DEC-05 | Salida estática (SSG); React solo como islas                                          | DECIDIDO |
| DEC-06 | Paleta: verde olivo, verde esmeralda, café terracota, tierra, café almendrado, beis   | DECIDIDO |
| DEC-07 | Diseño basado en el mockup de la landing de residencial                               | DECIDIDO |
| DEC-08 | Canal principal de contacto: WhatsApp                                                 | DECIDIDO |

## 6. Marca y contenido base

| Dato                      | Valor                                     | Estado                                  |
| ------------------------- | ----------------------------------------- | --------------------------------------- |
| Nombre comercial          | Grupo Lugo                                | Mockup                                  |
| Descriptor                | Lotificación y urbanización               | Mockup                                  |
| Lema                      | "Juntos construyendo mejores comunidades" | Mockup                                  |
| Teléfono / WhatsApp       | +504 9861-1270                            | Mockup [CONFIRMAR]                      |
| Correo                    | info@grupolugo.com                        | Mockup [CONFIRMAR]                      |
| Ubicación sede            | Tegucigalpa, Honduras                     | Mockup                                  |
| Redes                     | Instagram, Facebook, TikTok               | Mockup [CONFIRMAR enlaces]              |
| Logo                      | Montañas + "GRUPO LUGO" (verde)           | Mockup [CONFIRMAR archivos vectoriales] |
| Dominio                   | —                                         | [CONFIRMAR]                             |
| Cantidad de residenciales | 7                                         | [CONFIRMAR nombres, zonas, estado]      |

## 7. Mapa del sitio

```
/                              Inicio
/nosotros                      Nosotros
/proyectos                     Listado de residenciales
/proyectos/<slug>              Landing de cada residencial (7)
/noticias                      Listado
/noticias/<slug>               Nota
/contactanos                   Contacto
/politica-de-privacidad        Legal            [CONFIRMAR si aplica]
/404                           Página no encontrada
```

Navegación principal: **Inicio · Nosotros · Proyectos (desplegable) · Noticias · Contáctanos**, redes sociales y botón **Contáctanos** (WhatsApp). El desplegable de Proyectos se genera desde los datos.

## 8. Requisitos funcionales

### Globales

| ID    | Requisito                                                                                       |
| ----- | ----------------------------------------------------------------------------------------------- |
| RF-01 | Encabezado fijo con logo, menú, íconos de redes y botón de WhatsApp. En móvil, menú colapsable. |
| RF-02 | El menú "Proyectos" lista automáticamente todas las residenciales publicadas.                   |
| RF-03 | Pie de página con logo, navegación, contacto (teléfono, correo, ciudad), redes y lema.          |
| RF-04 | Botón flotante o fijo de WhatsApp visible en móvil **[CONFIRMAR]**.                             |

### Landing de residencial (`/proyectos/<slug>`)

Estructura, en este orden (según mockup):

| ID    | Sección               | Contenido                                                                                                                              | Datos requeridos                      |
| ----- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| RF-10 | **Hero**              | Imagen de fondo a ancho completo; ruta "Proyectos / [Zona]"; nombre del proyecto; línea divisora; ubicación con ícono                  | `nombre`, `zona`, `ubicacion`, `hero` |
| RF-11 | **Sobre el proyecto** | Título, párrafo descriptivo y frase destacada en tipografía manuscrita                                                                 | `titulo`, `descripcion`, `frase`      |
| RF-12 | **Características**   | 5 ítems con ícono, título y texto corto (ubicación, seguridad, áreas verdes, calles, comunidad). Cantidad variable por proyecto (3–6). | `caracteristicas[]`                   |
| RF-13 | **Galería**           | 5 imágenes (mín. 3, máx. 12); al hacer clic se amplían (lightbox accesible)                                                            | `galeria[]`                           |
| RF-14 | **CTA WhatsApp**      | Pregunta, texto de apoyo y botón "Enviar mensaje por WhatsApp" con mensaje prellenado que incluye el nombre del proyecto               | `whatsapp`                            |
| RF-15 | **Metadatos SEO**     | `title`, `description`, imagen Open Graph únicos                                                                                       | `seo`                                 |

Secciones opcionales (activables por datos, no incluidas en el mockup) **[CONFIRMAR con el cliente]**:

- RF-16 Mapa de ubicación (enlace a Google Maps o imagen estática).
- RF-17 Plano general / tamaños de lote y rangos de precio.
- RF-18 Video del proyecto.
- RF-19 Preguntas frecuentes (financiamiento, escrituras, servicios).

### Inicio

| ID    | Sección                                                                                     |
| ----- | ------------------------------------------------------------------------------------------- |
| RF-20 | Hero con lema y botón hacia Proyectos                                                       |
| RF-21 | Quiénes somos (resumen) con cifras reales: años, proyectos, familias **[CONFIRMAR cifras]** |
| RF-22 | Proyectos destacados en tarjetas (imagen, nombre, zona, "Ver proyecto")                     |
| RF-23 | Por qué elegirnos (mismo estilo visual de características)                                  |
| RF-24 | Últimas 3 noticias                                                                          |
| RF-25 | CTA WhatsApp                                                                                |

_(El diseño de Inicio está pendiente; se define en el siguiente ciclo.)_

### Otras páginas

| ID    | Requisito                                                                                                                                                         |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RF-30 | **Nosotros:** historia, misión/visión/valores, equipo (opcional), cifras.                                                                                         |
| RF-31 | **Proyectos:** cuadrícula de tarjetas de las residenciales; filtro por zona si hay más de 8 **[CONFIRMAR]**.                                                      |
| RF-32 | **Noticias:** listado paginado; nota individual desde Markdown con fecha, imagen y resumen.                                                                       |
| RF-33 | **Contáctanos:** datos de contacto, botón WhatsApp y formulario (nombre, teléfono, correo, proyecto de interés, mensaje) **[CONFIRMAR si se quiere formulario]**. |
| RF-34 | Formulario (si aplica): validación cliente y servidor, Cloudflare Turnstile, límite de envíos, mensaje de éxito/error claro, entrega por correo.                  |
| RF-35 | Página 404 con enlaces a Inicio y Proyectos.                                                                                                                      |

## 9. Requisitos no funcionales

| ID     | Categoría      | Requisito                                                                                                                                                                                       |
| ------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF-01 | Rendimiento    | LCP < 2.5 s, INP < 200 ms, CLS < 0.1 en móvil (conexión 4G).                                                                                                                                    |
| RNF-02 | Rendimiento    | Páginas sin islas = **0 KB** de JavaScript propio. Imágenes en AVIF/WebP, responsivas.                                                                                                          |
| RNF-03 | SEO            | Título y descripción únicos por página; URLs limpias; `sitemap.xml` y `robots.txt`; canonical; Open Graph y Twitter Cards; datos estructurados (Organization, Place/Residence, BreadcrumbList). |
| RNF-04 | SEO            | `lang="es-HN"`; contenido con zona y ciudad ("lotes en Danlí"); `h1` único por página.                                                                                                          |
| RNF-05 | Accesibilidad  | WCAG 2.2 AA: contraste, foco visible, navegación por teclado, `alt` en imágenes, `prefers-reduced-motion`.                                                                                      |
| RNF-06 | Responsivo     | Mobile-first; probado en 360, 768 y 1280 px.                                                                                                                                                    |
| RNF-07 | Seguridad      | HTTPS forzado, cabeceras de seguridad (CSP, etc.), WAF de Cloudflare, sin secretos en el repositorio.                                                                                           |
| RNF-08 | Privacidad     | Analítica sin cookies o con consentimiento. Política de privacidad si hay formulario **[CONFIRMAR]**.                                                                                           |
| RNF-09 | Mantenibilidad | Agregar una residencial = agregar un archivo de datos + sus imágenes.                                                                                                                           |
| RNF-10 | Disponibilidad | Servido desde la red de Cloudflare; sin servidor propio que mantener.                                                                                                                           |
| RNF-11 | Navegadores    | Últimas 2 versiones de Chrome, Safari, Firefox y Edge; Safari iOS y Chrome Android.                                                                                                             |

## 10. Modelo de datos

Contenido en `src/content/`. Esquemas validados con Zod; si falta un campo obligatorio, el build falla.

### `proyectos/<slug>.json`

| Campo             | Tipo              | Obligatorio | Ejemplo / nota                                              |
| ----------------- | ----------------- | ----------- | ----------------------------------------------------------- |
| `slug`            | string            | Sí          | `ciudad-victoria` (URL; no cambiar)                         |
| `nombre`          | string            | Sí          | `Residencial Ciudad Victoria`                               |
| `zona`            | string            | Sí          | `Danlí`                                                     |
| `ubicacion`       | string            | Sí          | `El Pescadero, Danlí`                                       |
| `estado`          | enum              | Sí          | `disponible` · `ultimos-lotes` · `proximamente` · `vendido` |
| `publicado`       | boolean           | Sí          | Si es `false`, no se genera la página                       |
| `orden`           | number            | Sí          | Orden en menú y listados                                    |
| `destacado`       | boolean           | No          | Aparece en Inicio                                           |
| `hero`            | imagen            | Sí          | Imagen de portada                                           |
| `titulo`          | string            | Sí          | `Tu espacio, tu futuro`                                     |
| `descripcion`     | string            | Sí          | 40–80 palabras                                              |
| `frase`           | string            | No          | Frase manuscrita                                            |
| `caracteristicas` | lista             | Sí          | `{ icono, titulo, texto }`, 3–6 ítems                       |
| `galeria`         | lista de imágenes | Sí          | `{ imagen, alt }`, 3–12 ítems                               |
| `whatsapp`        | string            | Sí          | Número con código de país: `50498611270`                    |
| `mapa`            | url               | No          | Enlace a Google Maps                                        |
| `seo`             | objeto            | Sí          | `{ title, description, ogImage }`                           |

### `noticias/<slug>.md` (Markdown con frontmatter)

`titulo`, `fecha`, `resumen`, `imagen`, `proyecto` (opcional), `publicado`.

### `src/config/sitio.js`

Datos globales: nombre, lema, teléfono, correo, dirección, redes, dominio, menú.

## 11. Criterios de aceptación

| Requisito     | Criterio                                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| RF-10 a RF-15 | Dado un archivo `proyectos/x.json` válido, existe la página `/proyectos/x` con las 5 secciones en el orden del mockup. |
| RF-02         | Al agregar un proyecto con `publicado: true`, aparece en el menú y en `/proyectos` sin editar componentes.             |
| RF-14         | El botón abre WhatsApp con el mensaje: "Hola, me interesa [nombre del proyecto]. ¿Me pueden dar más información?"      |
| RF-13         | La galería se opera con teclado (Tab, Enter, Esc, flechas) y los lectores de pantalla anuncian cada imagen.            |
| RNF-01        | Lighthouse móvil ≥ 90 en Rendimiento, Accesibilidad, Buenas prácticas y SEO en landing de residencial e Inicio.        |
| RNF-03        | `sitemap.xml` lista todas las páginas publicadas; cada una tiene canonical y Open Graph.                               |
| RNF-07        | Las cabeceras de seguridad aparecen en la respuesta de producción; sin errores de CSP en consola.                      |
| RNF-09        | Un colaborador sin conocimientos de Astro agrega una residencial siguiendo una guía de una página.                     |
| DEC-04        | El repositorio no contiene dependencias de base de datos.                                                              |

## 12. Hitos

| Hito   | Entregable                                                                                     | Requisitos          |
| ------ | ---------------------------------------------------------------------------------------------- | ------------------- |
| **H0** | Repositorio, Astro + React, ESLint/Prettier, tokens de diseño, layout base (header/footer)     | RF-01, RF-03        |
| **H1** | Content Collections + esquemas; proyecto de ejemplo (Ciudad Victoria)                          | §10                 |
| **H2** | Landing de residencial completa (RF-10 a RF-15) con SEO                                        | RF-10–15, RNF-03    |
| **H3** | Menú dinámico, listado de Proyectos, página 404                                                | RF-02, RF-31, RF-35 |
| **H4** | Diseño y construcción de Inicio                                                                | RF-20–25            |
| **H5** | Nosotros, Noticias, Contáctanos (+ formulario si se confirma)                                  | RF-30–34            |
| **H6** | Carga de las 7 residenciales con contenido real                                                | RNF-09              |
| **H7** | Cloudflare: dominio, DNS, despliegue, cabeceras, Turnstile, redirecciones                      | RNF-07, RNF-10      |
| **H8** | Auditoría: Lighthouse, accesibilidad, SEO, pruebas en dispositivos; Search Console y analítica | RNF-01–06           |

## 13. Riesgos

| Riesgo                                               | Mitigación                                                                                                                 |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Fotos y renders pesados o de baja calidad            | Pipeline de imágenes de Astro; guía de formatos y tamaños mínimos para el cliente                                          |
| Contenido (textos, fotos, medidas) no llega a tiempo | Marcadores `TODO(contenido)`; publicar solo proyectos con `publicado: true`                                                |
| El cliente luego quiere editar sin tocar archivos    | Se puede agregar un CMS headless (Sanity, Decap, etc.) sin cambiar las plantillas, porque el contenido ya está desacoplado |
| Cambio de slug después de indexar                    | Regla: no cambiar slugs; si es inevitable, redirección 301                                                                 |
| Marca sin colores/logo formales                      | Paleta propuesta en la skill de diseño, a validar con el cliente                                                           |

## 14. Preguntas abiertas

1. ¿Cuál es el dominio y quién administra el DNS actual?
2. ¿Cuáles son los nombres, zonas y estado de las 7 residenciales? (Hoy solo Ciudad Victoria tiene diseño.)
3. ¿Hay logo en vector (SVG) y manual de marca? ¿Los colores propuestos coinciden con los corporativos?
4. ¿Se quiere formulario de contacto o basta con WhatsApp y correo?
5. ¿Habrá precios, tamaños de lote o financiamiento visibles en el sitio, o se consultan solo por WhatsApp?
6. ¿Quién redactará y publicará las noticias, y con qué frecuencia?
7. ¿Hay fotos y videos profesionales de cada residencial? ¿Drone?
8. ¿Se necesita analítica (Google Analytics, Cloudflare Web Analytics, Meta Pixel)?
9. ¿Hay textos legales (privacidad, términos) que deban incluirse?
10. ¿Quién actualizará el contenido: el equipo de Grupo Lugo o quien desarrolla el sitio?

## 15. Glosario

- **Lotificación:** división de un terreno en lotes para venta.
- **Residencial:** proyecto de lotificación/urbanización con nombre propio.
- **Landing:** página dedicada a presentar un producto o proyecto y llevar a una acción.
- **SSG:** generación estática; las páginas se construyen una vez en el despliegue.
- **Isla (Astro):** componente interactivo que carga JavaScript solo donde se usa.
- **SDD:** Spec-Driven Development; la especificación guía y valida el desarrollo.
