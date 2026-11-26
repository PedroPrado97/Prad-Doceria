import monograma from '../assets/monograma.png';
import { whatsappLink } from '../config';

export default function Header() {
  return (
    <>
      <header className="top">
        <a href="#topo" aria-label="Pradô doceria, início"><img src={monograma} alt="" /></a>
        <nav aria-label="Seções">
          <a href="#pudins">Pudins</a>
          <a href="#bombons">Bombons</a>
          <a href="#guirlanda">Guirlanda</a>
          <a className="nx" href="#como-pedir">Como pedir</a>
        </nav>
      </header>
      <a className="btn wa fab" href={whatsappLink('Olá, Pradô! Vim pelo cardápio de Natal.')} target="_blank" rel="noopener noreferrer">
        Pedir pelo WhatsApp
      </a>
    </>
  );
}
