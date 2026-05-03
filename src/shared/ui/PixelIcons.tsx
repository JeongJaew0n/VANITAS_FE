import type { CategoryIconName, ProductIconName } from '@/shared/types/api';

interface IconProps {
  className?: string;
}

export function SearchIcon({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export function BellIcon({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

export function HeartIcon({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </svg>
  );
}

export function CartIcon({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export function HeroCharacter() {
  return (
    <svg viewBox="0 0 200 200" shapeRendering="crispEdges" aria-hidden="true">
      <g fill="#1A1A1F">
        <rect x="80" y="40" width="40" height="8" />
        <rect x="72" y="48" width="56" height="8" />
        <rect x="64" y="56" width="72" height="32" />
        <rect x="72" y="88" width="56" height="8" />
        <rect x="72" y="32" width="56" height="8" />
        <rect x="64" y="24" width="72" height="8" />
      </g>
      <g fill="#F5DDE2">
        <rect x="92" y="32" width="16" height="8" />
        <rect x="64" y="56" width="72" height="32" />
      </g>
      <g fill="#1A1A1F">
        <rect x="80" y="64" width="8" height="8" />
        <rect x="112" y="64" width="8" height="8" />
        <rect x="88" y="80" width="24" height="4" />
      </g>
      <g fill="#E8C5CD">
        <rect x="72" y="76" width="8" height="4" />
        <rect x="120" y="76" width="8" height="4" />
      </g>
      <g fill="#1A1A1F">
        <rect x="72" y="96" width="56" height="48" />
      </g>
      <g fill="#D8EAE0">
        <rect x="80" y="104" width="40" height="32" />
      </g>
      <g fill="#1A1A1F">
        <rect x="92" y="112" width="4" height="4" />
        <rect x="96" y="116" width="4" height="4" />
        <rect x="100" y="112" width="4" height="4" />
        <rect x="104" y="112" width="4" height="4" />
        <rect x="92" y="116" width="16" height="4" />
        <rect x="96" y="120" width="8" height="4" />
        <rect x="56" y="104" width="16" height="32" />
        <rect x="128" y="104" width="16" height="32" />
        <rect x="40" y="120" width="24" height="32" />
        <rect x="44" y="116" width="4" height="8" />
        <rect x="56" y="116" width="4" height="8" />
      </g>
      <g fill="#E2DDEE">
        <rect x="44" y="124" width="16" height="24" />
      </g>
      <g fill="#1A1A1F">
        <rect x="80" y="144" width="16" height="32" />
        <rect x="104" y="144" width="16" height="32" />
        <rect x="72" y="168" width="32" height="8" />
        <rect x="96" y="168" width="32" height="8" />
      </g>
      <g fill="#1A1A1F" opacity="0.15">
        <rect x="64" y="180" width="72" height="4" />
      </g>
      <g fill="#1A1A1F">
        <rect x="160" y="48" width="8" height="8" />
        <rect x="168" y="56" width="8" height="8" />
        <rect x="176" y="48" width="8" height="8" />
        <rect x="168" y="40" width="8" height="8" />
        <rect x="20" y="72" width="8" height="8" />
        <rect x="28" y="80" width="8" height="8" />
        <rect x="36" y="72" width="8" height="8" />
        <rect x="28" y="64" width="8" height="8" />
      </g>
    </svg>
  );
}

export function ProductPixelIcon({ name }: { name: ProductIconName }) {
  switch (name) {
    case 'headphones':
      return (
        <svg viewBox="0 0 120 120" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M25 60V35l10-10h50l10 10v25" />
          <rect x="18" y="55" width="14" height="35" />
          <rect x="88" y="55" width="14" height="35" />
          <rect x="22" y="62" width="6" height="2" />
          <rect x="92" y="62" width="6" height="2" />
        </svg>
      );
    case 'shoe':
      return (
        <svg viewBox="0 0 120 120" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M15 80V65l15-5 30-10h15l5 12 20 3 8 5v18H15Z" />
          <rect x="40" y="58" width="2" height="8" />
          <rect x="50" y="55" width="2" height="10" />
          <rect x="60" y="52" width="2" height="12" />
          <rect x="22" y="76" width="80" height="3" />
        </svg>
      );
    case 'watch':
      return (
        <svg viewBox="0 0 120 120" shapeRendering="crispEdges" aria-hidden="true">
          <rect x="40" y="40" width="40" height="44" />
          <rect x="46" y="20" width="28" height="20" />
          <rect x="46" y="84" width="28" height="20" />
          <rect x="48" y="50" width="24" height="2" />
          <rect x="48" y="58" width="20" height="2" />
          <rect x="48" y="66" width="22" height="2" />
        </svg>
      );
    case 'coffee':
      return (
        <svg viewBox="0 0 120 120" shapeRendering="crispEdges" aria-hidden="true">
          <rect x="30" y="30" width="60" height="30" />
          <rect x="40" y="60" width="40" height="35" />
          <rect x="48" y="68" width="24" height="20" />
          <rect x="48" y="76" width="24" height="2" />
          <rect x="56" y="40" width="8" height="8" />
          <rect x="35" y="20" width="2" height="8" />
          <rect x="40" y="14" width="2" height="14" />
        </svg>
      );
    case 'laptop':
      return (
        <svg viewBox="0 0 120 120" shapeRendering="crispEdges" aria-hidden="true">
          <rect x="22" y="28" width="76" height="50" />
          <rect x="14" y="78" width="92" height="10" />
          <rect x="55" y="84" width="10" height="2" />
          <rect x="30" y="36" width="60" height="4" />
          <rect x="30" y="44" width="44" height="4" />
          <rect x="30" y="52" width="50" height="4" />
        </svg>
      );
    case 'perfume':
      return (
        <svg viewBox="0 0 120 120" shapeRendering="crispEdges" aria-hidden="true">
          <rect x="40" y="40" width="40" height="55" />
          <rect x="50" y="22" width="20" height="18" />
          <rect x="55" y="14" width="10" height="8" />
          <rect x="52" y="10" width="16" height="4" />
          <rect x="46" y="64" width="28" height="2" />
          <rect x="48" y="86" width="24" height="2" />
        </svg>
      );
    case 'chair':
      return (
        <svg viewBox="0 0 120 120" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M30 35v30h60V35L80 25H40Z" />
          <rect x="26" y="65" width="68" height="8" />
          <rect x="32" y="73" width="6" height="28" />
          <rect x="82" y="73" width="6" height="28" />
          <rect x="36" y="38" width="48" height="4" />
        </svg>
      );
    case 'camera':
      return (
        <svg viewBox="0 0 120 120" shapeRendering="crispEdges" aria-hidden="true">
          <rect x="20" y="40" width="80" height="50" />
          <rect x="42" y="32" width="20" height="10" />
          <rect x="44" y="55" width="30" height="30" />
          <rect x="50" y="61" width="18" height="18" />
          <rect x="56" y="67" width="6" height="6" />
          <rect x="84" y="48" width="4" height="4" />
        </svg>
      );
  }
}

export function CategoryPixelIcon({ name }: { name: CategoryIconName }) {
  switch (name) {
    case 'digital':
      return (
        <svg viewBox="0 0 48 48" shapeRendering="crispEdges" aria-hidden="true">
          <rect x="14" y="8" width="20" height="32" />
          <rect x="16" y="12" width="16" height="20" fill="#1A1A1F" opacity="0.15" />
          <rect x="22" y="34" width="4" height="2" />
        </svg>
      );
    case 'fashion':
      return (
        <svg viewBox="0 0 48 48" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M16 10l8 4 8-4 6 6-4 6v18H14V22l-4-6Z" />
        </svg>
      );
    case 'beauty':
      return (
        <svg viewBox="0 0 48 48" shapeRendering="crispEdges" aria-hidden="true">
          <rect x="20" y="6" width="8" height="8" />
          <rect x="18" y="14" width="12" height="28" />
          <rect x="20" y="22" width="8" height="2" />
        </svg>
      );
    case 'living':
      return (
        <svg viewBox="0 0 48 48" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M8 24 24 8l16 16v18H28V30h-8v12H8Z" />
        </svg>
      );
    case 'food':
      return (
        <svg viewBox="0 0 48 48" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M12 18h24v18H12Z" />
          <rect x="36" y="22" width="6" height="10" />
          <rect x="18" y="6" width="2" height="8" />
          <rect x="24" y="4" width="2" height="10" />
        </svg>
      );
    case 'kids':
      return (
        <svg viewBox="0 0 48 48" shapeRendering="crispEdges" aria-hidden="true">
          <rect x="14" y="14" width="20" height="20" />
          <rect x="18" y="20" width="2" height="2" />
          <rect x="28" y="20" width="2" height="2" />
          <rect x="20" y="28" width="8" height="2" />
          <rect x="22" y="34" width="4" height="6" />
        </svg>
      );
    case 'sport':
      return (
        <svg viewBox="0 0 48 48" shapeRendering="crispEdges" aria-hidden="true">
          <circle cx="24" cy="24" r="16" />
          <path d="m24 8 4 10h10l-8 8 4 12-10-6-10 6 4-12-8-8h10Z" />
        </svg>
      );
    case 'books':
      return (
        <svg viewBox="0 0 48 48" shapeRendering="crispEdges" aria-hidden="true">
          <rect x="10" y="10" width="14" height="30" />
          <rect x="24" y="10" width="14" height="30" />
          <rect x="14" y="16" width="6" height="2" />
          <rect x="28" y="16" width="6" height="2" />
        </svg>
      );
  }
}
