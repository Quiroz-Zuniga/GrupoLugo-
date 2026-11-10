# Verificación de la landing institucional

Revisión local del 29 de octubre de 2026 sobre la portada corporativa en `/`.

| Revisión                                | Resultado                                                                                       |
| --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `pnpm check`, `pnpm lint`, `pnpm build` | Correctos                                                                                       |
| Contenido                               | Historia, misión, visión, actividades y diez valores del documento institucional                |
| Datos de la referencia                  | Sin Ciudad Victoria, El Pescadero, lema ni imágenes del mockup                                  |
| 360, 768 y 1280 px                      | Capturas revisadas; sin desbordamiento horizontal                                               |
| Logo                                    | PNG RGBA con transparencia real; header y footer sin placas blancas                             |
| Recursos                                | Imágenes cargadas; sin errores JavaScript ni violaciones CSP                                    |
| JavaScript de aplicación                | Cero scripts externos en la portada; sin islas                                                  |
| Navegación                              | Enlaces internos a secciones de la portada; menú móvil HTML nativo                              |
| SEO                                     | Un h1 “Grupo Lugo”, idioma es-HN, título, descripción, Open Graph, Twitter Cards y Organization |
| Contacto                                | Pendiente hasta recibir teléfono oficial; ningún número de la referencia                        |

Contrastes de la paleta: tierra sobre beis 12.74:1; tierra secundaria sobre olivo claro 6.71:1; blanco sobre esmeralda 7.65:1; beis sobre esmeralda profundo 12.71:1. El logo mantiene sus colores corporativos.

Capturas de trabajo en `.qa/`, ignorado por git. Cabeceras HTTP en hosting, Lighthouse y dispositivos físicos quedan para H7/H8. Canonical, sitemap e indexación pública requieren dominio confirmado.
