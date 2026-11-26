import { useEffect, useRef, useState } from 'react';
import { formatBRL, PRODUCTS, ProductId } from '../data';
import { whatsappLink } from '../config';
import { prefersReducedMotion } from '../hooks';

interface Props { productId: ProductId | null; onClose: () => void; onAdd: (id: ProductId, qty: number) => void; }

export default function ProductModal({ productId, onClose, onAdd }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [id, setId] = useState<ProductId | null>(productId);
  const [qty, setQty] = useState(1);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const dlg = ref.current;
    if (!productId || !dlg) return;
    setId(productId);
    setQty(1);
    if (!dlg.open) dlg.showModal();
    document.documentElement.style.overflow = 'hidden';
    const raf = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(raf);
  }, [productId]);

  const close = () => {
    setShown(false);
    window.setTimeout(() => {
      ref.current?.close();
      document.documentElement.style.overflow = '';
      onClose();
    }, prefersReducedMotion() ? 0 : 320);
  };

  const p = id ? PRODUCTS[id] : null;
  const sizes = p?.group ? [PRODUCTS.pp, PRODUCTS.pg] : [];
  const total = p ? p.price * qty : 0;
  const message = p ? `Olá, Pradô! Quero pedir ${qty}× ${p.name}${p.serving ? ` (${p.serving})` : ''} — total ${formatBRL(total)}.` : '';

  return (
    <dialog
      ref={ref}
      className={`m${shown ? ' show' : ''}`}
      aria-labelledby="modal-title"
      onCancel={(e) => { e.preventDefault(); close(); }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <button className="x" onClick={close} aria-label="Fechar">×</button>
      {p && (
        <div className="mg">
          <div className="ph in"><img src={p.image} alt={p.name} /></div>
          <div className="mb">
            <h2 id="modal-title">{p.name}</h2>
            {sizes.length > 0 && (
              <div className="seg" role="group" aria-label="Tamanho">
                {sizes.map((s) => (
                  <button key={s.id} aria-pressed={s.id === p.id} onClick={() => setId(s.id)}>
                    Tamanho {s.name.slice(-1)}<small>{s.serving} · {formatBRL(s.price)}</small>
                  </button>
                ))}
              </div>
            )}
            <p style={{ margin: 0 }}>{p.description}</p>
            <ul>{p.details.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="qty">
              <span>Quantidade</span>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Menos">−</button>
              <b>{qty}</b>
              <button onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Mais">+</button>
            </div>
            <div className="tot"><span>Total</span><b>{formatBRL(total)}</b></div>
            <button className="pill red" onClick={() => { onAdd(p.id, qty); close(); }}>Adicionar ao pedido</button>
            <a className="pill ghost" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">Pedir só este pelo WhatsApp ↗</a>
          </div>
        </div>
      )}
    </dialog>
  );
}
