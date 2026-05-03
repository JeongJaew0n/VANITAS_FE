interface RarityStarsProps {
  count: number;
}

export function RarityStars({ count }: RarityStarsProps) {
  return (
    <span className="rarity-stars" aria-label={`희귀도 ${count}점`}>
      {'★'.repeat(count)}
      {'☆'.repeat(Math.max(5 - count, 0))}
    </span>
  );
}
