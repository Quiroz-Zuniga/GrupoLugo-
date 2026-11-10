/** @param {string | null} numero @param {string} proyecto */
export function enlaceWhatsapp(numero, proyecto) {
  if (!numero) return null;
  if (!/^\d{11,15}$/.test(numero))
    throw new Error(
      'El teléfono de WhatsApp debe incluir código de país y solo dígitos.',
    );
  return `https://wa.me/${numero}?text=${encodeURIComponent(`Hola, me interesa ${proyecto}. ¿Me pueden dar más información?`)}`;
}

/** @param {string | null} numero */
export function enlaceWhatsappInstitucional(numero) {
  if (!numero) return null;
  if (!/^\d{11,15}$/.test(numero))
    throw new Error(
      'El teléfono de WhatsApp debe incluir código de país y solo dígitos.',
    );
  return `https://wa.me/${numero}?text=${encodeURIComponent('Hola, me gustaría recibir más información sobre Grupo Lugo y sus proyectos de lotificación.')}`;
}
