import { Link } from 'react-router';

import { useCategoriesQuery } from '@/features/category/api/queries';
import { useFlashDealQuery } from '@/features/deal/api/queries';
import { useBestProductsQuery } from '@/features/product/api/queries';
import { ProductCard } from '@/features/product/ui/ProductCard';
import { formatCount } from '@/shared/lib/format';
import { useCountdown } from '@/shared/lib/useCountdown';
import {
  CartIcon,
  CategoryPixelIcon,
  HeroCharacter,
  ProductPixelIcon,
} from '@/shared/ui/PixelIcons';
import { SectionHeading } from '@/shared/ui/SectionHeading';

const editorialCards = [
  { className: 'ed-1', tag: 'QUEST 01', reward: 'REWARD ★★★', title: '봄, 새로운', em: '주방 풍경' },
  { className: 'ed-2', tag: 'QUEST 02', reward: 'REWARD ★★', title: '집순이를 위한', em: '홈카페' },
  { className: 'ed-3', tag: 'QUEST 03', reward: 'REWARD ★★', title: '출근길', em: '업그레이드' },
] as const;

export function HomePage() {
  return (
    <main>
      <title>VANITAS.SHOP — 오늘의 발견</title>
      <meta
        name="description"
        content="게임 감성 흑백 파스텔톤 종합 쇼핑몰 VANITAS.SHOP의 오늘의 상품과 카테고리."
      />
      <HudBar />
      <HeroSection />
      <CategoriesSection />
      <DealBanner />
      <BestProductsSection />
      <EditorialSection />
      <TrustBar />
    </main>
  );
}

function HudBar() {
  return (
    <div className="hud" aria-label="사용자 HUD">
      <div className="hud-item lv">
        <span className="label">LV</span>
        <span className="val">12</span>
      </div>
      <div className="hud-item coin">
        <span className="label">COIN</span>
        <span className="val">4,820</span>
      </div>
      <div className="hud-item heart">
        <span className="label">HEART</span>
        <span className="val">♥♥♥</span>
      </div>
      <div className="hud-bar-wrap">
        <div className="hud-bar-fill" />
        <span className="hud-bar-text">▶ NEXT REWARD: 1,180 EXP</span>
      </div>
      <div className="hud-item">
        <span className="label">DAY</span>
        <span className="val">003</span>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero" aria-label="오늘의 메인 프로모션">
      <div className="hero-main">
        <span className="corner-pixel tl" />
        <span className="corner-pixel tr" />
        <span className="corner-pixel bl" />
        <span className="corner-pixel br" />
        <span className="hero-tag">
          <span className="star">★</span> SPRING QUEST · CHAPTER 04
        </span>
        <h1 className="hero-title">
          집 안에 봄을
          <br />
          <em>들이는 일</em>
          <span className="glitch">+38%</span>
        </h1>
        <div className="hero-illust">
          <HeroCharacter />
        </div>
        <div className="hero-bottom">
          <p className="hero-desc">
            ▶ 새 시즌 한정 컬렉션 등장!
            <br />
            리빙·패션·뷰티 최대 70% OFF
            <br />
            이번 주에만 만나는 SPECIAL ITEM.
          </p>
          <Link to="/products" className="hero-cta">
            START QUEST <span className="arrow">▶</span>
          </Link>
        </div>
      </div>
      <div className="hero-side">
        <Link to="/products/1" className="hero-card hero-card-1">
          <div>
            <span className="card-rarity">★ RARE ITEM</span>
            <h3>
              무선 이어폰
              <br />
              베스트셀러
            </h3>
          </div>
          <div className="price-tag">
            FROM <b>₩89,000</b>
          </div>
          <div className="item-illust">
            <ProductPixelIcon name="headphones" />
          </div>
        </Link>
        <Link to="/category/beauty" className="hero-card hero-card-2">
          <div>
            <span className="card-rarity">♥ EVENT 1+1</span>
            <h3>
              K-뷰티
              <br />
              스킨케어 세트
            </h3>
          </div>
          <div className="price-tag">
            SET PRICE <b>₩49,000</b>
          </div>
          <div className="item-illust">
            <ProductPixelIcon name="perfume" />
          </div>
        </Link>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const { data: categories, isPending, isError } = useCategoriesQuery();

  return (
    <section className="section">
      <SectionHeading
        eyebrow="CHAPTER 01 · CATEGORIES"
        title={
          <>
            아이템 <em>인벤토리</em>
          </>
        }
        linkLabel="VIEW ALL"
        linkTo="/category/all"
      />
      {isPending ? <div className="state-box">LOADING INVENTORY...</div> : null}
      {isError ? <div className="state-box">INVENTORY LOAD FAILED</div> : null}
      {categories ? (
        <div className="cat-grid">
          {categories.map((category, index) => (
            <Link to={`/category/${category.slug}`} className="cat" key={category.id}>
              <span className="cat-slot-num">{String(index + 1).padStart(2, '0')}</span>
              <div className="cat-icon">
                <CategoryPixelIcon name={category.icon} />
              </div>
              <div className="cat-name">{category.name}</div>
              <div className="cat-count">{formatCount(category.count)}</div>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function DealBanner() {
  const { hours, minutes, seconds } = useCountdown();
  const { data } = useFlashDealQuery();

  return (
    <section className="section">
      <div className="deal-banner">
        <div className="deal-left">
          <span className="deal-tag">
            <span className="blink" />
            BOSS RAID — LIVE NOW
          </span>
          <h2>
            {data?.title ?? '오늘만 이 가격'}
            <br />
            <em>FLASH BATTLE</em>
          </h2>
          <p>▶ {data?.subtitle ?? '매일 자정 갱신 · 한정수량 LIMITED'}</p>
        </div>
        <div className="timer" aria-label="자정까지 남은 시간">
          <TimerUnit value={hours} label="HOURS" />
          <TimerUnit value={minutes} label="MIN" />
          <TimerUnit value={seconds} label="SEC" />
        </div>
        <Link to="/products" className="deal-cta">
          ATTACK ▶
        </Link>
      </div>
    </section>
  );
}

function TimerUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="timer-unit">
      <span className="timer-num">{value}</span>
      <span className="timer-label">{label}</span>
    </div>
  );
}

function BestProductsSection() {
  const { data: products, isPending, isError } = useBestProductsQuery(8);

  return (
    <section className="section">
      <SectionHeading
        eyebrow="CHAPTER 02 · TOP DROPS"
        title={
          <>
            이번 주 <em>레어 드롭</em>
          </>
        }
        linkLabel="VIEW ALL"
        linkTo="/products"
      />
      {isPending ? <div className="state-box">LOADING DROPS...</div> : null}
      {isError ? <div className="state-box">DROP TABLE LOAD FAILED</div> : null}
      {products ? (
        <div className="products">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function EditorialSection() {
  return (
    <section className="section">
      <SectionHeading
        eyebrow="CHAPTER 03 · DAILY QUEST"
        title={
          <>
            에디터의 <em>퀘스트</em>
          </>
        }
      />
      <div className="editorial">
        {editorialCards.map((card) => (
          <Link to="/products" className={`ed-card ${card.className}`} key={card.tag}>
            <span className="ed-quest-tag">▶ {card.tag}</span>
            <div>
              <span className="ed-num">{card.reward}</span>
              <h3 className="ed-title">
                {card.title}
                <br />
                <em>{card.em}</em>
              </h3>
            </div>
            <span className="ed-link">START ▶</span>
            <div className="ed-illust">
              <CartIcon />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    ['FAST DELIVERY', '오늘 자정까지 주문 → 내일 도착'],
    ['FREE RETURN', '30일 이내 사유 불문 환불'],
    ['SAFE CHECKOUT', 'SSL 암호화 안심 결제'],
    ['24/7 SUPPORT', '언제나 빠른 응답 챗'],
  ] as const;

  return (
    <section className="trust-bar" aria-label="서비스 신뢰 정보">
      {items.map(([title, body]) => (
        <div className="trust-item" key={title}>
          <div className="trust-icon">
            <CartIcon />
          </div>
          <div className="trust-text">
            <strong>{title}</strong>
            <span>{body}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
