# Logo transparente de Grupo Lugo

Origen: logo oficial rojo y dorado incluido en el documento institucional aportado por el cliente. El original se conserva en `src/assets/logo/grupo-lugo.png`.

Salida usada por la web: `src/assets/logo/grupo-lugo-transparente.png`. PNG RGBA con transparencia real, verificada en el archivo y visualmente sobre beis, blanco y esmeralda. Se usa mediante el procesamiento de imágenes de Astro.

Herramienta: `imagegen` integrada, modo de edición con `transparent_background: true`. Se realizó una segunda pasada para limpiar el fondo. Prompt final:

> Create an absolutely clean transparent cutout of this exact logo. Edit ONLY background removal. Keep original solid clean red and gold bird artwork and solid clean letters GRUPO LUGO unchanged, sharp smooth edges. Remove the white background completely including all letter counters. Do not add any texture, noise, speckles, debris, particles, shadows or red marks in empty space. Empty space MUST be entirely alpha zero. Letter interiors should be solid red and smooth. The output must be professional clean logo on genuine transparent background. Preserve exact original proportions and lettering.
