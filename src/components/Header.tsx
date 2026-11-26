import logoH from '../assets/logo-horizontal.png';
import monograma from '../assets/monograma.png';
import { whatsappLink } from '../config';
import { useActiveSection } from '../hooks';
import { WhatsAppIcon } from './Icons';

const IDS = ['pudins', 'bombons', 'guirlanda', 'como-pedir'];

export default function Header({ solid }: { solid: boolean }) {
  const active = useActiveSection(IDS);
  const link = (id: string, label: string) => <a href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>;
  return (
    <>
      <header className={`top${solid ? ' solid' : ''}`}>
        <a href="#topo" aria-label="Pradô doceria, início">
          <img className="lg-h" src={logoH} alt="Pradô doceria" />
          <img className="lg-m" src={monograma} alt="Pradô" />
        </a>
        <nav aria-label="Seções">
          {link('pudins', 'Pudins')}{link('bombons', 'Bombons')}{link('guirlanda', 'Guirlanda')}
          <a className="btn hide-m" href={whatsappLink('Olá, Pradô! Quero fazer meu pedido de Natal.')} target="_blank" rel="noopener noreferrer">Fazer meu pedido</a>
        </nav>
      </header>
      <a className="fab" aria-label="Pedir pelo WhatsApp" href={whatsappLink('Olá, Pradô! Vim pelo cardápio de Natal.')} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /></a>
    </>
  );
}
