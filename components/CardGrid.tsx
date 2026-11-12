import Card from './Card';
import type { SectionId, SectionTarget } from '@/lib/sections';

interface CardItem {
  id: SectionId;
  title: string;
  description: string;
  icon: string;
  target: SectionTarget;
  placeholderNote?: string;
}

interface CardGridProps {
  cards: CardItem[];
  headingId: string;
}

export default function CardGrid({ cards, headingId }: CardGridProps) {
  return (
    <ul
      aria-labelledby={headingId}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '24px',
        listStyle: 'none',
        margin: '0',
        padding: '0',
      }}
      className="card-grid"
    >
      {cards.map((card) => (
        <li key={card.id}>
          <Card {...card} />
        </li>
      ))}
    </ul>
  );
}
