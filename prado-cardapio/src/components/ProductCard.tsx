import { formatBRL, Product, ProductId } from '../data';
import { Photo, Title, Up } from './ui';

interface Props {
  product: Product;
  onOpen: (id: ProductId) => void;
  className?: string;
  shape?: string;
}

export default function ProductCard({ product: p, onOpen, className = '', shape = '' }: Props) {
  return (
    <Up as="button" className={`prod ${className}`} onClick={() => onOpen(p.id)} aria-label={`Ver detalhes de ${p.name}`}>
      <Photo src={p.image} alt={p.name} className={shape} />
      <div className="cap">
        <h3><Title name={p.name} /></h3>
        {p.serving && <div className="meta">{p.serving}</div>}
        <div className="pr">{formatBRL(p.price)}</div>
        <span className="more">Ver detalhes</span>
      </div>
    </Up>
  );
}
