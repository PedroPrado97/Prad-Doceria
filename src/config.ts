/** Somente dígitos, com DDI e DDD. Ex.: 5577999999999 */
export const WHATSAPP: string = '5577900000000';
/** Usuário do Instagram, sem @. Deixe vazio para ocultar o botão. */
export const INSTAGRAM: string = '';

export const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
