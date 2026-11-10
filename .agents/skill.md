Sistema de diseño del sitio web de Grupo Lugo (lotificación y urbanización, Honduras). Úsala siempre que se cree, modifique o revise cualquier página, sección, componente, estilo, imagen o texto de interfaz del sitio — landing de residencial, Inicio, Nosotros, Proyectos, Noticias, Contáctanos, header, footer, botones, tarjetas o galería — aunque la persona no mencione "diseño". Define paleta (verde olivo, verde esmeralda, café terracota, tierra, café almendrado, beis), tipografía, espaciado, componentes, tono de redacción y reglas de accesibilidad.

Diseño — Grupo Lugo

Guía visual para construir el sitio con una identidad coherente. El diseño ya existe como mockup aprobado de la landing de residencial (Residencial Ciudad Victoria). Esta skill lo traduce a reglas y tokens para que cada página nueva se sienta de la misma marca.

Cómo usar esta skill
El mockup manda. Si el mockup resuelve algo, se replica. Esta skill llena los vacíos, no los contradice.
Para páginas sin mockup (Inicio, Nosotros, Noticias, Contáctanos): reutiliza los patrones de §6 y los tokens de references/tokens.css. No inventes un lenguaje visual nuevo.
Antes de escribir código, anota en 5 líneas: qué secciones lleva la página, qué patrón de §6 usa cada una y qué imagen real la sostiene. Si una sección no encaja en ningún patrón, propónlo antes de construirlo.
Al terminar, revisa contra el checklist de §10.

1. Esencia de la marca

Qué es: una desarrolladora que vende terrenos donde las familias construirán su casa. Lo que se vende es tranquilidad, seguridad y futuro, no lujo.

Cómo se siente: natural, sereno, confiable y cercano. Paisaje de Honduras, verde, tierra, cielo abierto. Cálido, no corporativo frío; elegante, no ostentoso.

Lema: "Juntos construyendo mejores comunidades".

Lo más característico del mundo de la marca (y por tanto lo que protagoniza el diseño): la fotografía del terreno y su paisaje, con un titular tranquilo encima. Las fotos reales son el elemento memorable; todo lo demás es silencioso y ordenado.

2. Paleta

Colores corporativos definidos: verde olivo, verde esmeralda, café terracota, tierra, café almendrado y beis. Los valores hexadecimales son propuestos a partir del mockup [CONFIRMAR con el manual de marca del cliente].

Token Nombre Hex Rol
--esmeralda-900 Esmeralda profundo
#0B2B21 Footer, banda CTA, texto principal sobre claro
--esmeralda-700 Verde esmeralda
#0F5F46 Color principal: botones, títulos, íconos, enlaces activos
--olivo-600 Verde olivo
#5F6B30 Secundario natural: detalles, estados, fondos suaves de sección
--olivo-50 Olivo claro
#EEF0E2 Banda de características
--terracota-700 Café terracota (texto)
#9A4E31 Acentos pequeños y texto de énfasis
--terracota-600 Café terracota
#B5603F Acento gráfico: líneas, insignias, hover (no para texto pequeño)
--tierra-900 Tierra oscuro
#3A2A1D Texto de cuerpo
--tierra-700 Tierra
#6E4B31 Texto secundario, pies de foto
--almendra-400 Café almendrado
#B39574 Bordes, divisores, íconos secundarios
--almendra-200 Almendra claro
#DCCBB5 Líneas finas, fondos de tarjeta suaves
--beis-100 Beis
#F2EADB Fondo de secciones alternas
--beis-50 Beis claro
#FAF6EE Fondo base de página
--blanco Blanco
#FFFFFF Header, superficies elevadas, texto sobre oscuro
Distribución de uso (aprox.)
70 % beis claro, blanco y fotografía.
20 % esmeralda (estructura, botones, footer, banda CTA).
10 % olivo, terracota, tierra y almendra como acentos.

La marca es dominantemente verde; los cafés y el beis la calientan. No invertir la proporción.

Reglas de color
Botón principal / WhatsApp: esmeralda 700 con texto blanco. Terracota no es color de botón principal.
Texto pequeño sobre beis o blanco: --tierra-900, --tierra-700 o --esmeralda-900. Para texto de acento usar --terracota-700; --terracota-600 solo en elementos grandes o gráficos (no cumple contraste AA en texto pequeño).
Texto sobre foto: blanco, siempre con degradado oscuro (esmeralda 900 → transparente) detrás.
No agregar azules, grises fríos, negros puros ni degradados decorativos. Los únicos degradados permitidos son los de legibilidad sobre fotos.
Verificar contraste AA (4.5:1 texto normal, 3:1 texto grande y elementos de interfaz) con una herramienta antes de entregar; los hex son propuestos y pueden cambiar. 3. Tipografía

Del mockup: titular serif ligero, cuerpo sans-serif limpio y trazo manuscrito para frases. Familias propuestas [CONFIRMAR contra el mockup]:

Rol Familia propuesta Uso
Títulos de hero Cormorant Garamond (400/500) h1 del hero, solo sobre fotos o fondos grandes
Títulos y cuerpo Figtree (400/500/600) h2, h3, párrafos, menú, botones
Manuscrita Caveat (400) Solo frases destacadas y el lema del footer
Autoalojar las fuentes (Fontsource). Subconjunto latino con tildes y ñ. font-display: swap.
La manuscrita no se usa para información: nunca para precios, teléfonos, medidas ni botones.
Escala (móvil → escritorio, fluida con clamp()): hero 40→64 px · h2 28→40 px · h3 18→22 px · cuerpo 16→18 px · pequeño 14 px.
Interlínea: cuerpo 1.6–1.7; titulares 1.1–1.2.
Largo de línea: máximo ~65–70 caracteres en párrafos.
Alineación: texto a la izquierda. Centrado solo en títulos de sección aislados y en el CTA si el diseño lo pide.
Sentence case en títulos y botones ("Conoce nuestro residencial", no "CONOCE NUESTRO RESIDENCIAL").
Etiquetas superiores (eyebrows)

El mockup las usa ("SOBRE EL PROYECTO", "CARACTERÍSTICAS", "GALERÍA") en mayúsculas pequeñas con espaciado. Se replican donde el mockup las tiene, como etiqueta de sección. No agregarlas a secciones nuevas por inercia; cada etiqueta debe aportar orientación real.

4. Espaciado, forma y elevación
   Escala de espacio (base 4 px): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.
   Secciones: padding vertical 64 px (móvil) / 96 px (escritorio). Contenedor máx. 1200 px, con 20 px de margen lateral en móvil.
   Radios: botones tipo píldora (999 px); imágenes y tarjetas 8–12 px; nada con 0 px salvo el hero a sangre.
   Líneas finas (1 px, --almendra-200) para separar columnas y bloques, como en características y footer.
   Sombras: una sola, muy suave, solo en imágenes de galería y tarjetas elevadas. No sombras en cada elemento.
   Iconografía: trazo lineal de 1.5–2 px, esquinas redondeadas, color esmeralda 700, tamaño 32–40 px en características, 20 px en UI.
5. Fotografía

La fotografía es el activo principal.

Usar fotos reales del terreno, drone, entrada, calles y áreas verdes. Cero fotos de stock genéricas de "familia feliz".
Hero: horizontal, mínimo 2400 px de ancho, sujeto principal hacia el lado donde no va el texto (en el mockup, texto a la izquierda, entrada a la derecha).
Galería: relación 4:3, mismo tratamiento de color entre fotos.
Formatos: se suben JPG/PNG de calidad y Astro los convierte a AVIF/WebP.
Todo alt describe lo que se ve y, si ayuda, el lugar: "Entrada de Residencial Ciudad Victoria con palmeras y vista a las montañas". Decorativas: alt="".
Hero con degradado de esmeralda 900 a transparente (de izquierda a derecha) para sostener el texto blanco. 6. Patrones de página (de la landing de residencial)

Cada patrón es un componente reutilizable. Las páginas nuevas se arman combinándolos.

Header

Fondo blanco, alto ~72 px. Logo a la izquierda; menú al centro con el enlace activo en esmeralda con subrayado fino; a la derecha íconos de redes (outline) y botón Contáctanos (píldora esmeralda con ícono de WhatsApp). "Proyectos" es un menú desplegable. En móvil: logo, botón de WhatsApp y menú colapsable. Fijo al hacer scroll, con sombra sutil.

Hero de proyecto

Imagen a ancho completo (~400 px de alto en escritorio, 60 vh en móvil) con degradado. Contenido alineado a la izquierda: ruta ("Proyectos / Danlí") pequeña, nombre en serif claro y grande, línea divisora corta y ubicación con ícono de pin.

Bloque "Sobre el proyecto"

Fondo beis claro. Dos columnas en escritorio: a la izquierda etiqueta, h2 en esmeralda 900 y párrafo en tierra 900; a la derecha, frase manuscrita con una línea corta debajo en terracota 600. Motivo de hoja muy tenue de fondo como marca de agua (opcional, 5–8 % de opacidad). En móvil, una columna.

Banda de características

Fondo olivo 50. Entre 3 y 6 columnas separadas por líneas finas verticales; cada una con ícono, título en negrita (esmeralda 900) y texto corto en tierra 700. En móvil: lista vertical o cuadrícula de 2.

Galería

Etiqueta, h2 y una fila de 5 imágenes con radio 8 px y sombra suave. En móvil: carrusel con deslizamiento o cuadrícula de 2. Clic abre lightbox (isla React) con cierre por Esc, flechas, foco atrapado y descripción de la imagen.

Banda CTA de WhatsApp

Foto de paisaje con velo esmeralda 900 (~80 %). A la izquierda ícono de hoja en círculo, pregunta pequeña ("¿Te gustaría conocer más de este proyecto?"), título "Contáctanos por WhatsApp" y texto de apoyo. A la derecha, botón píldora esmeralda con ícono de WhatsApp y flecha, y una nota manuscrita ("¡Será un gusto ayudarte!").

Footer

Fondo esmeralda 900. Logo en blanco; tres columnas (Navegación, Contacto, Síguenos) separadas por líneas finas; lema manuscrito con el logotipo de montañas; línea inferior con © y año. Enlaces en blanco con 80 % de opacidad; hover a 100 % con subrayado.

Tarjeta de proyecto (listados e Inicio)

Imagen 4:3 con radio 12 px, nombre en h3, zona con ícono de pin, insignia de estado (disponible, últimos lotes, próximamente) y enlace "Ver proyecto". Una sola tarjeta por proyecto, mismo formato siempre.

Insignias de estado

Píldoras pequeñas: disponible → olivo 600 con texto blanco; últimos lotes → terracota 700 con texto blanco; próximamente → almendra 200 con texto tierra 900; vendido → almendra 400 con texto tierra 900.

7. Páginas pendientes de mockup

Guía para que se mantengan en familia visual:

Inicio: hero a pantalla casi completa con la mejor foto aérea, lema en serif, un solo botón principal "Ver proyectos". Luego quiénes somos (con cifras reales), tarjetas de proyectos destacados, banda de características ("Por qué elegirnos"), últimas noticias y banda CTA. Usar beis claro y blanco alternados; esmeralda solo en estructura.
Nosotros: texto de historia en columna legible, misión/visión/valores como banda de características, cifras con números grandes en serif y etiqueta pequeña (solo si son reales).
Noticias: tarjetas con imagen, fecha, título y resumen. Nota individual en una sola columna de ~70 caracteres.
Contáctanos: datos de contacto, botón WhatsApp destacado y formulario simple sobre fondo beis; etiquetas visibles, errores claros. 8. Movimiento
Sin animación decorativa por defecto.
Permitidos: transiciones de 150–200 ms en hover/foco de botones y enlaces; apertura/cierre del menú y del lightbox; despliegue del menú de Proyectos.
Un solo momento de entrada si se desea (por ejemplo, el hero al cargar), sutil y breve.
Respetar prefers-reduced-motion: sin transformaciones ni desplazamientos animados cuando está activo.
Nada de parallax, rebotes ni contadores animados. 9. Redacción de interfaz

Escribir desde la persona que compra un lote: claro, cálido y concreto. Español de Honduras, trato de tú (como el mockup: "Contáctanos", "Conoce nuestro residencial").

Botones con verbo y resultado: "Enviar mensaje por WhatsApp", "Ver proyecto", "Ver galería". No "Enviar" ni "Click aquí".
Misma acción, mismo nombre en todo el sitio.
Frases cortas. Un título dice una cosa. Evitar adjetivos vacíos ("exclusivo", "único", "soñado") sin respaldo.
No inventar datos. Ningún precio, medida, plazo, servicio o cifra sin dato del cliente. Si falta: TODO(contenido) en el código y texto neutro visible ("Consulta disponibilidad").
Errores: dicen qué pasó y cómo resolverlo, sin disculpas ni culpar. "Escribe un número de teléfono de 8 dígitos."
Mensaje prellenado de WhatsApp: "Hola, me interesa [nombre del proyecto]. ¿Me pueden dar más información?"
Frases manuscritas: breves, positivas, una por sección como máximo. 10. Accesibilidad y calidad mínima (obligatorio)
Contraste AA. Texto blanco sobre foto siempre con degradado.
Foco visible en todo elemento interactivo (anillo de 2–3 px en esmeralda 700 con separación, o blanco sobre fondos oscuros).
Áreas táctiles de al menos 44×44 px.
Estructura de encabezados lógica: un h1 por página, sin saltar niveles.
Menú y lightbox operables con teclado, con roles y aria-label donde corresponda.
prefers-reduced-motion respetado.
Responsive probado en 360, 768 y 1280 px; sin desbordes horizontales.
Nada de información transmitida solo por color (las insignias llevan texto).
Checklist antes de entregar
Usa solo tokens de references/tokens.css; ningún color o tamaño suelto
Replica el mockup donde existe; reutiliza patrones de §6 donde no
Una cosa memorable (la foto/hero); el resto sobrio
Tipografías autoalojadas; manuscrita solo en frases
Contraste, foco, teclado y movimiento reducido verificados
Textos reales o TODO(contenido), sin datos inventados
Imágenes con alt y dimensiones; hero sin lazy
Se ve bien en móvil primero 11. Qué evitar
Cambiar la proporción de la paleta (que el café o el terracota dominen sobre el verde).
Tarjetas idénticas para todo el contenido; usar tarjetas solo para proyectos y noticias.
Degradados decorativos, sombras en todo, bordes de distintos radios sin criterio.
Íconos de estilos mezclados (rellenos y lineales).
Etiquetas en mayúsculas o numeraciones ("01 / 02 / 03") donde el contenido no es una secuencia.
Resaltar una sola palabra de cada titular en otro color o cursiva.
Fotos de stock, renders irreales o editados en exceso que no representen el terreno.
Animaciones de entrada en cada sección.
Recursos
references/tokens.css — variables CSS listas para copiar a src/styles/tokens.css.
