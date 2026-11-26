import { formatBRL, Product, ProductId } from '../data';
import { whatsappLink } from '../config';
import { Photo, Title, Up } from './ui';

interface Props { product: Product; tag: string; onOpen: (id: ProductId) => void; delay?: number; }

export default function ProductCard({ product: p, tag, onOpen, delay = 0 }: Props) {
  const [cur, num] = formatBRL(p.price).split(' ');
  const msg = `Olá, Pradô! Quero pedir 1× ${p.name}${p.serving ? ` (${p.serving})` : ''}.`;
  return (
    <Up className="pcard" delay={delay}>
      <div className="pwrap">
        <Photo src={p.image} alt={p.name} />
        <button className="cover" onClick={() => onOpen(p.id)} aria-label={`Ver detalhes de ${p.name}`} />
      </div>
      <div className="info">
        <span className="ptag">{tag}</span>
        <h3><Title name={p.name} /></h3>
        <p className="desc">{p.description}</p>
        {p.serving && <div className="serv">{p.serving}</div>}
        <div className="price"><small>{cur}</small>{num}</div>
        <div className="acts">
          <a className="pill dark" href={whatsappLink(msg)} target="_blank" rel="noopener noreferrer">Pedir pelo WhatsApp ↗</a>
          <button className="tlink" onClick={() => onOpen(p.id)}>Detalhes +</button>
        </div>
      </div>
    </Up>
  );
}
