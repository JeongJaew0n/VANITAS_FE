import { useActionState } from 'react';
import { Link } from 'react-router';

import { selectCartCount, useCartStore } from '@/features/cart/model/store';
import { useWishlistStore } from '@/features/wishlist/model/store';
import { BellIcon, CartIcon, HeartIcon, SearchIcon } from '@/shared/ui/PixelIcons';
import { PixelInput } from '@/shared/ui/PixelInput';
import { SubmitButton } from '@/shared/ui/SubmitButton';

interface SearchState {
  keyword: string;
}

async function searchAction(_prev: SearchState, formData: FormData): Promise<SearchState> {
  const keyword = String(formData.get('keyword') ?? '').trim();
  return { keyword };
}

export function Header() {
  const wishlistCount = useWishlistStore((state) => state.productIds.length);
  const cartCount = useCartStore(selectCartCount);
  const [searchState, formAction] = useActionState(searchAction, { keyword: '' });

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-promo">
            <span className="heart">♥</span>
            <span>PRESS START — 5만원 이상 무료배송 + 자정까지 10% 추가</span>
          </div>
          <nav className="topbar-links" aria-label="빠른 링크">
            <Link to="/help">[ HELP ]</Link>
            <Link to="/sell">[ SELL ]</Link>
            <Link to="/">[ KR ]</Link>
          </nav>
        </div>
      </div>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo" aria-label="MARU.SHOP 홈">
            MARU<span>.SHOP</span>
          </Link>
          <form action={formAction} className="search-form" aria-label="상품 검색">
            <PixelInput
              name="keyword"
              placeholder="ITEM 검색 — 에어팟, 러그, 커피머신 ..."
              defaultValue={searchState.keyword}
            />
            <SubmitButton className="search-btn" pendingLabel={<SearchIcon />}>
              <SearchIcon />
            </SubmitButton>
          </form>
          <div className="header-actions">
            <button className="icon-btn" type="button" aria-label="알림">
              <BellIcon />
            </button>
            <Link className="icon-btn" to="/wishlist" aria-label="찜">
              <HeartIcon />
              {wishlistCount > 0 ? <span className="count-badge">{wishlistCount}</span> : null}
            </Link>
            <Link className="icon-btn" to="/cart" aria-label="장바구니">
              <CartIcon />
              {cartCount > 0 ? <span className="count-badge">{cartCount}</span> : null}
            </Link>
            <Link className="signin-btn" to="/login">
              SIGN IN
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
