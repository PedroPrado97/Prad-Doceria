/** Somente dígitos, com DDI e DDD. */
export const WHATSAPP: string = '5577988619965';
/** Usuário do Instagram, sem @. */
export const INSTAGRAM: string = 'pra_doceria';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM}/`;

export const whatsappLink = (text = '') =>
  `https://api.whatsapp.com/send/?phone=${WHATSAPP}&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
