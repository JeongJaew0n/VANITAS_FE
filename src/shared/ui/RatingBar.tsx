interface RatingBarProps {
  value: number;
  count?: number;
}

export function RatingBar({ value, count }: RatingBarProps) {
  const width = `${Math.min(Math.max((value / 5) * 100, 0), 100)}%`;

  return (
    <div className="product-rating">
      <div className="rating-bar" aria-hidden="true">
        <div className="rating-bar-fill" style={{ width }} />
      </div>
      <span className="rating-num">{value.toFixed(1)}</span>
      {typeof count === 'number' ? <span className="rating-count">({count.toLocaleString('ko-KR')})</span> : null}
    </div>
  );
}
