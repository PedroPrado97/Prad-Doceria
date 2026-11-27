import { useEffect, useMemo, useState } from 'react';
import { whatsappLink } from './config';
import { formatBRL, PRODUCTS, Product, ProductId } from './data';

export type CartItems = Partial<Record<ProductId, number>>;
export interface CartLine { product: Product; qty: number; }

const KEY = 'prado-cart';
const IDS = Object.keys(PRODUCTS) as ProductId[];

function load(): CartItems {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    const out: CartItems = {};
    IDS.forEach((id) => { const n = Math.floor(Number(raw[id])); if (n > 0) out[id] = Math.min(99, n); });
    return out;
  } catch { return {}; }
}

export function useCart() {
  const [items, setItems] = useState<CartItems>(load);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* sem armazenamento */ } }, [items]);

  const add = (id: ProductId, qty: number) =>
    setItems((c) => ({ ...c, [id]: Math.min(99, (c[id] ?? 0) + qty) }));
  const setQty = (id: ProductId, qty: number) =>
    setItems((c) => { const n = { ...c }; if (qty <= 0) delete n[id]; else n[id] = Math.min(99, qty); return n; });
  const clear = () => setItems({});

  const lines: CartLine[] = useMemo(
    () => IDS.filter((id) => items[id]).map((id) => ({ product: PRODUCTS[id], qty: items[id] as number })),
    [items],
  );
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.product.price, 0);
  return { lines, count, total, add, setQty, clear };
}

/** Monta a mensagem do pedido e o link do WhatsApp. O pagamento é combinado na conversa. */
export function orderLink(lines: CartLine[], total: number, name: string, notes: string) {
  const rows = lines.map(({ product: p, qty }) =>
    `• ${qty}× ${p.name}${p.serving ? ` (${p.serving})` : ''} — ${formatBRL(p.price * qty)}`);
  const msg = [
    'Olá, Pradô! Gostaria de fazer este pedido do cardápio de Natal:', '',
    ...rows, '', `Total: ${formatBRL(total)}`,
    ...(name.trim() ? ['', `Nome: ${name.trim()}`] : []),
    ...(notes.trim() ? [`Observações: ${notes.trim()}`] : []),
    '', 'Podem me confirmar a disponibilidade, a entrega ou retirada e a forma de pagamento?',
  ].join('\n');
  return whatsappLink(msg);
}
