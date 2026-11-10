# AGENTS.md — Sitio web Grupo Lugo

Instrucciones para cualquier agente de código (Claude Code, Codex, Cursor, etc.) que trabaje en este repositorio. Léelo completo antes de tocar código.

## 1. Qué es este proyecto

Sitio web corporativo de **Grupo Lugo** (lotificación y urbanización, Honduras). Presenta varias **residenciales**, cada una con su propia landing, bajo **un solo dominio** y con **rutas** (`/proyectos/<slug>`), no subdominios. El objetivo principal es captar contactos por WhatsApp y posicionar en buscadores (SEO).

Es un sitio **informativo y estático**. No hay base de datos.

## 2. Flujo de trabajo: Spec-Driven Development (SDD)

La especificación manda. El código sigue a la spec, no al revés.

1. Lee `docs/SPEC.md` (qué se construye y por qué) y `docs/ARQUITECTURA.md` (cómo se construye).
2. Si el cambio pedido contradice o no está en la spec, **detente y propón el cambio a la spec primero**. No inventes requisitos.
3. Trabaja por tareas pequeñas, una por vez, siguiendo los hitos de `docs/SPEC.md` §12.
4. Al terminar una tarea, verifica contra los criterios de aceptación (`docs/SPEC.md` §11) y actualiza la spec si algo cambió.
5. Cada requisito tiene un ID (`RF-01`, `RNF-03`). Menciónalos en commits y PRs.

## 3. Stack (decidido, no cambiar sin acuerdo)

| Capa                   | Decisión                                                                  |
| ---------------------- | ------------------------------------------------------------------------- |
| Lenguaje               | JavaScript (ES modules). JSDoc para documentar tipos donde ayude.         |
| Framework              | Astro (salida **estática** por defecto)                                   |
| Interactividad         | React, **solo como islas** (`client:visible` / `client:load` justificado) |
| Contenido              | Astro Content Collections + esquemas Zod                                  |
| Estilos                | CSS con variables (tokens). Ver skill de diseño.                          |
| Despliegue y seguridad | Cloudflare (DNS, CDN, SSL, WAF, Turnstile)                                |
| Gestor de paquetes     | `pnpm`                                                                    |

Antes de configurar el despliegue o actualizar dependencias, **consulta la documentación vigente** de Astro y Cloudflare. Estas herramientas cambian rápido; no confíes en memoria para versiones, comandos o nombres de productos.

## 4. Comandos

```bash
pnpm install          # instalar dependencias
pnpm dev              # servidor local (http://localhost:4321)
pnpm build            # build de producción → dist/
pnpm preview          # previsualizar el build
pnpm check           # astro check (tipos/contenido)
pnpm lint             # eslint
pnpm format           # prettier
```

Antes de dar una tarea por terminada deben pasar: `pnpm check`, `pnpm lint` y `pnpm build`.

## 5. Estructura del repositorio

Resumen. El detalle está en `docs/ARQUITECTURA.md`.

```
src/
  content/            → datos: proyectos, noticias (JSON / Markdown)
  pages/              → rutas
  layouts/            → Layout.astro
  components/         → .astro (estáticos) y .jsx (islas React)
  styles/             → tokens.css, global.css
  assets/             → imágenes optimizables
  lib/                → utilidades (whatsapp, seo, formato)
public/               → robots.txt, favicon, _headers
docs/                 → SPEC.md, ARQUITECTURA.md
skills/               → skill de diseño
```

## 6. Reglas de código

- **Astro primero.** Todo componente es `.astro` salvo que necesite estado o eventos del navegador; solo entonces `.jsx`.
- **Cero JS innecesario.** Una página sin islas no debe enviar JavaScript propio al cliente.
- **Los datos no viven en los componentes.** Textos, teléfonos, precios, rutas de imagen y listas van en `src/content/` o en `src/config/sitio.js`. Un cambio de contenido nunca debe requerir editar un componente.
- **Un proyecto nuevo = un archivo de datos nuevo.** No se duplica ninguna página ni plantilla.
- **Imágenes** con `astro:assets` (`<Image />` / `<Picture />`). Siempre `alt` descriptivo en español, `width`/`height` y `loading="lazy"` salvo la imagen del hero.
- **Enlaces de WhatsApp** se generan con `src/lib/whatsapp.js` (mensaje prellenado con el nombre del proyecto). No escribir URLs `wa.me` a mano.
- **Idioma:** contenido y UI en español de Honduras (`lang="es-HN"`). Código, nombres de variables y commits en inglés o español, pero **consistentes** (ver §8).
- **Sin dependencias nuevas** sin justificarlas en el PR (peso, mantenimiento, alternativa nativa).
- **Sin `localStorage` para datos de negocio.** Sin cookies de seguimiento sin consentimiento.

## 7. Diseño

Antes de crear o modificar cualquier interfaz, **lee `skills/diseno-grupo-lugo/SKILL.md`**. Resumen:

- La fuente de verdad visual es el mockup aprobado (landing de residencial) más los tokens de la skill.
- Paleta corporativa: verde olivo, verde esmeralda, café terracota, tierra, café almendrado y beis. No agregar colores fuera de los tokens.
- Mobile-first, foco de teclado visible, `prefers-reduced-motion` respetado, contraste AA.

## 8. Convenciones

- **Archivos y rutas:** `kebab-case` (`ciudad-victoria.json`, `caracteristicas.astro` → componentes en `PascalCase`: `Caracteristicas.astro`).
- **Slugs de proyecto:** minúsculas, sin tildes, con guiones: `ciudad-victoria`. El slug es la URL pública; **no se cambia** una vez publicado (si es inevitable, agregar redirección 301).
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `content:`, `style:`, `chore:`), con el ID de requisito cuando aplique. Ej.: `feat(proyecto): hero con ubicación (RF-04)`.
- **Ramas:** `main` (producción), `feat/...`, `fix/...`, `content/...`.

## 9. Seguridad

- Nunca subir secretos al repositorio. Variables en Cloudflare (secrets) y `.env` local ignorado por git; mantener `.env.example` actualizado.
- Cabeceras de seguridad en `public/_headers` (CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`). Si agregas un script o dominio externo, actualiza la CSP.
- Formularios: validar en el servidor, protegidos con Cloudflare Turnstile, con límite de envíos.
- Enlaces externos con `rel="noopener noreferrer"`.

## 10. Qué NO hacer

- No agregar base de datos, CMS o backend sin cambiar antes la spec.
- No convertir el sitio a SSR "por comodidad". Si una función lo requiere, justificarlo en la spec.
- No usar subdominios por proyecto. Es decisión tomada: rutas, por SEO.
- No inventar datos de proyectos (precios, medidas, ubicaciones, teléfonos). Si falta, dejar un marcador claro `TODO(contenido):` y avisar.
- No reescribir archivos completos para cambios pequeños; editar lo mínimo.
- No eliminar ni "mejorar" accesibilidad, SEO o cabeceras de seguridad existentes sin pedirlo.

## 11. Definición de "terminado"

- [ ] Cumple los criterios de aceptación del requisito (`docs/SPEC.md` §11)
- [ ] `pnpm check`, `pnpm lint` y `pnpm build` pasan
- [ ] Se ve bien en 360 px, 768 px y 1280 px
- [ ] Navegable con teclado; contraste AA
- [ ] Título, descripción y Open Graph presentes en las páginas nuevas
- [ ] Spec/arquitectura actualizadas si cambió algo
