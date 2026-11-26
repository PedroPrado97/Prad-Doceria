import pudimP from './assets/pudim-p.jpg';
import pudimG from './assets/pudim-g.jpg';
import bombomUva from './assets/bombom-uva.jpg';
import bombomMorango from './assets/bombom-morango.jpg';
import guirlanda from './assets/guirlanda.jpg';

export type ProductId = 'pp' | 'pg' | 'bu' | 'bm' | 'gu';

export interface Product {
  id: ProductId;
  name: string;
  image: string;
  price: number;
  /** Quantidade/tamanho, quando houver */
  serving?: string;
  description: string;
  details: string[];
  /** Produtos do mesmo grupo permitem trocar de tamanho no modal */
  group?: 'pudim';
}

export const PRODUCTS: Record<ProductId, Product> = {
  pp: { id: 'pp', name: 'Pudim P', group: 'pudim', image: pudimP, price: 40, serving: '10 porções',
    description: 'Pudim com calda de caramelo dourada, feito para dividir à mesa.',
    details: ['10 porções', 'Calda de caramelo'] },
  pg: { id: 'pg', name: 'Pudim G', group: 'pudim', image: pudimG, price: 70, serving: '20 porções',
    description: 'Pudim com calda de caramelo dourada, no tamanho ideal para uma mesa cheia.',
    details: ['20 porções', 'Calda de caramelo'] },
  bu: { id: 'bu', name: 'Bombom de Uva', image: bombomUva, price: 70,
    description: 'Camadas de creme branco com cobertura de chocolate granulado, contornada por uvas verdes.',
    details: ['Creme branco', 'Chocolate granulado', 'Uvas verdes'] },
  bm: { id: 'bm', name: 'Bombom de Morango', image: bombomMorango, price: 90,
    description: 'Camadas de creme branco e morangos, com cobertura de chocolate e raspas de chocolate.',
    details: ['Creme branco', 'Morangos', 'Cobertura de chocolate com raspas'] },
  gu: { id: 'gu', name: 'Guirlanda de Brownie', image: guirlanda, price: 70,
    description: 'Um brownie em formato de guirlanda, decorado com rosetas de creme, morangos, uvas, cerejas, brigadeiros e detalhes dourados.',
    details: ['Brownie', 'Rosetas de creme', 'Morangos, uvas e cerejas', 'Brigadeiros e detalhes dourados'] },
};

export const formatBRL = (v: number) => 'R$ ' + v.toFixed(2).replace('.', ',');
