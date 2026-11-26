import { whatsappLink } from '../config';
import { formatBRL } from '../data';
import { Cart, cartCount, cartMessage, cartTotal } from '../order';

interface Props { cart: Cart; onClear: () => void; }

/** Botão flutuante do WhatsApp; vira "seu pedido" quando há itens. */
export default function OrderBar({ cart, onClear }: Props) {
  const n = cartCount(cart);
  if (!n) {
    return (
      <a className="pill fab" href={whatsappLink('Olá, Pradô! Vim pelo cardápio de Natal.')} target="_blank" rel="noopener noreferrer">
        Pedir pelo WhatsApp
      </a>
    );
  }
  return (
    <div className="obar" role="region" aria-label="Seu pedido">
      <div><b>{n} {n === 1 ? 'item' : 'itens'}</b><span>{formatBRL(cartTotal(cart))}</span></div>
      <button className="tlink" onClick={onClear}>Esvaziar</button>
      <a className="pill pink" href={whatsappLink(cartMessage(cart))} target="_blank" rel="noopener noreferrer">Enviar pedido ↗</a>
    </div>
  );
}
