import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const institucional = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/institucional' }),
  schema: z.object({
    nombre: z.string(),
    hero: z.object({
      etiqueta: z.string(),
      titulo: z.string(),
      descripcion: z.string(),
      boton: z.string(),
      dato: z.string(),
      datoPrefijo: z.string(),
      datoDescripcion: z.string(),
    }),
    historia: z.object({
      etiqueta: z.string(),
      titulo: z.string(),
      introduccion: z.string(),
      etapas: z
        .array(z.object({ titulo: z.string(), texto: z.string() }))
        .min(1),
    }),
    actividades: z.object({
      etiqueta: z.string(),
      titulo: z.string(),
      items: z.array(
        z.object({
          titulo: z.string(),
          texto: z.string(),
          icono: z.enum(['road', 'leaf', 'tree', 'people']),
        }),
      ),
    }),
    proposito: z.object({
      etiqueta: z.string(),
      titulo: z.string(),
      misionTitulo: z.string(),
      mision: z.string(),
      visionTitulo: z.string(),
      vision: z.string(),
    }),
    valores: z.object({
      etiqueta: z.string(),
      titulo: z.string(),
      items: z.array(z.string()).length(10),
    }),
    contacto: z.object({
      etiqueta: z.string(),
      titulo: z.string(),
      descripcion: z.string(),
      pendiente: z.string(),
      boton: z.string(),
    }),
    seo: z.object({
      title: z.string().max(60),
      description: z.string().max(160),
    }),
    fuente: z.string(),
    pendientes: z.array(z.string()),
  }),
});

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
      items: z
        .array(
          z.object({
            icono: z.enum([
              'pin',
              'shield',
              'tree',
              'road',
              'people',
              'whatsapp',
              'leaf',
              'arrow',
            ]),
            titulo: z.string(),
            texto: z.string(),
          }),
        )
        .min(3)
        .max(6),
    }),
    apartado4: z.object({
      etiqueta: z.string(),
      titulo: z.string(),
      descripcion: z.string(),
      items: z
        .array(
          z.object({
            numero: z.string(),
            titulo: z.string(),
            texto: z.string(),
          }),
        )
        .min(3)
        .max(8),
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

export const collections = { institucional, proyectos };
