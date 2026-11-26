import { formatBRL, PRODUCTS, ProductId } from './data';

export type Cart = Partial<Record<ProductId, number>>;

export const cartItems = (c: Cart) =>
  (Object.keys(c) as ProductId[])
    .filter((k) => (c[k] ?? 0) > 0)
    .map((k) => ({ product: PRODUCTS[k], qty: c[k] as number }));

export const cartCount = (c: Cart) => cartItems(c).reduce((s, i) => s + i.qty, 0);
export const cartTotal = (c: Cart) => cartItems(c).reduce((s, i) => s + i.qty * i.product.price, 0);

export const cartMessage = (c: Cart) =>
  'Olá, Pradô! Quero fazer um pedido de Natal:\n' +
  cartItems(c)
    .map((i) => `• ${i.qty}× ${i.product.name}${i.product.serving ? ` (${i.product.serving})` : ''}`)
    .join('\n') +
  `\nTotal: ${formatBRL(cartTotal(c))}`;
