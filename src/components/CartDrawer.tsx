import { useState } from 'react';
import { orderLink, useCart } from '../cart';
import { formatBRL } from '../data';
import { useAnimatedDialog } from '../hooks';
import { WhatsAppIcon } from './Icons';

type Cart = ReturnType<typeof useCart>;

/** Botão flutuante com o resumo do pedido. */
export function CartBar({ cart, onOpen }: { cart: Cart; onOpen: () => void }) {
  if (cart.count === 0) return null;
  return (
    <button key={cart.count} className="cartbar" onClick={onOpen} aria-label="Abrir meu pedido">
      <span>Meu pedido · {cart.count} {cart.count === 1 ? 'item' : 'itens'}</span>
      <b>{formatBRL(cart.total)}</b>
    </button>
  );
}

export function CartDrawer({ open, onClose, cart }: { open: boolean; onClose: () => void; cart: Cart }) {
  const { ref, shown, close } = useAnimatedDialog(open, onClose);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const empty = cart.lines.length === 0;

  return (
    <dialog ref={ref} className={`m cart${shown ? ' show' : ''}`} aria-labelledby="cart-title"
      onCancel={(e) => { e.preventDefault(); close(); }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <button className="x" onClick={close} aria-label="Fechar">×</button>
      <div className="mb">
        <h2 id="cart-title">Seu pedido</h2>
        {empty ? (
          <p style={{ margin: 0 }}>Seu pedido está vazio. Escolha um doce no cardápio para adicionar.</p>
        ) : (
          <>
            <div>
              {cart.lines.map(({ product: p, qty }) => (
                <div className="ci" key={p.id}>
                  <img src={p.image} alt="" />
                  <div>
                    <h4>{p.name}</h4>
                    <small>{p.serving ? `${p.serving} · ` : ''}{formatBRL(p.price)} cada</small>
                  </div>
                  <div className="lt">{formatBRL(p.price * qty)}</div>
                  <div className="qty">
                    <button onClick={() => cart.setQty(p.id, qty - 1)} aria-label={`Menos ${p.name}`}>−</button>
                    <b>{qty}</b>
                    <button onClick={() => cart.setQty(p.id, qty + 1)} aria-label={`Mais ${p.name}`}>+</button>
                    <button className="rm" onClick={() => cart.setQty(p.id, 0)}>Remover</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="tot"><span>Total</span><b>{formatBRL(cart.total)}</b></div>
            <label className="fld">Seu nome (opcional)
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
            <label className="fld">Observações (opcional)
              <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ex.: data de retirada ou entrega" />
            </label>
            <a className="btn wa" href={orderLink(cart.lines, cart.total, name, notes)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />Finalizar pelo WhatsApp
            </a>
            <p className="hint">O pagamento não é feito aqui: você combina tudo direto na conversa com a Pradô.</p>
            <button className="rm" onClick={cart.clear}>Limpar pedido</button>
          </>
        )}
      </div>
    </dialog>
  );
}
