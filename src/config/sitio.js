export const sitio = {
  nombre: 'Grupo Lugo',
  descriptor: 'Lotificación y urbanización',
  // TODO(contenido): confirmar contacto, dominio y redes con el cliente.
  whatsapp: import.meta.env.PUBLIC_WHATSAPP || null,
  correo: null,
  redes: [],
  dominio: import.meta.env.PUBLIC_SITE_URL || null,
  residenciales: [
    {
      slug: 'residencial-1',
      texto: 'Residencial 1',
      href: '/proyectos/residencial-1',
    },
    {
      slug: 'residencial-2',
      texto: 'Residencial 2',
      href: '/proyectos/residencial-2',
    },
    {
      slug: 'residencial-3',
      texto: 'Residencial 3',
      href: '/proyectos/residencial-3',
    },
    {
      slug: 'residencial-4',
      texto: 'Residencial 4',
      href: '/proyectos/residencial-4',
    },
    {
      slug: 'residencial-5',
      texto: 'Residencial 5',
      href: '/proyectos/residencial-5',
    },
    {
      slug: 'residencial-6',
      texto: 'Residencial 6',
      href: '/proyectos/residencial-6',
    },
    {
      slug: 'residencial-7',
      texto: 'Residencial 7',
      href: '/proyectos/residencial-7',
    },
    {
      slug: 'residencial-8',
      texto: 'Residencial 8',
      href: '/proyectos/residencial-8',
    },
  ],
  menu: [
    { texto: 'Inicio', href: '/#inicio' },
    { texto: 'Nosotros', href: '/#nosotros' },
    { texto: 'Actividades', href: '/#actividades' },
    { texto: 'Valores', href: '/#valores' },
    { texto: 'Contáctanos', href: '/#contacto' },
  ],
  etiquetas: {
    navegacion: 'Navegación',
    residenciales: 'Residenciales',
    contacto: 'Contacto',
    menu: 'Abrir menú',
    saltar: 'Saltar al contenido',
    derechos: 'Todos los derechos reservados.',
    logoAlt: 'Grupo Lugo, logo oficial rojo y dorado',
    empresa: 'Empresa familiar hondureña',
  },
  cta: { botonPendiente: 'Contacto próximamente' },
};
