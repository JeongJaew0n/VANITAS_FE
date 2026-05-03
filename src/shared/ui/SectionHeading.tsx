import type { ReactNode } from 'react';
import { Link } from 'react-router';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  linkLabel?: string;
  linkTo?: string;
}

export function SectionHeading({ eyebrow, title, linkLabel, linkTo = '#' }: SectionHeadingProps) {
  return (
    <div className="section-head">
      <div className="section-head-left">
        <span className="section-eyebrow">{eyebrow}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      {linkLabel ? (
        <Link to={linkTo} className="section-link">
          {linkLabel} ▶
        </Link>
      ) : null}
    </div>
  );
}
