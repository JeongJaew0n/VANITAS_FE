import { startTransition, useActionState, useOptimistic } from 'react';
import { Link } from 'react-router';

import { useAddToCartMutation } from '@/features/cart/api/mutations';
import { useCartStore } from '@/features/cart/model/store';
import { useToggleWishlistMutation } from '@/features/wishlist/api/mutations';
import { useWishlistStore } from '@/features/wishlist/model/store';
import { formatPrice } from '@/shared/lib/format';
import { HeartIcon, ProductPixelIcon } from '@/shared/ui/PixelIcons';
import { RarityStars } from '@/shared/ui/RarityStars';
import { RatingBar } from '@/shared/ui/RatingBar';
import { SubmitButton } from '@/shared/ui/SubmitButton';
import type { Product } from '@/shared/types/api';

interface ProductCardProps {
  product: Product;
}

interface AddState {
  added: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
  const wishlistIds = useWishlistStore((state) => state.productIds);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const addLocalCart = useCartStore((state) => state.add);
  const wishlistMutation = useToggleWishlistMutation();
  const addToCartMutation = useAddToCartMutation();
  const [optimisticWishlistIds, setOptimisticWishlistIds] = useOptimistic(
    wishlistIds,
    (currentIds, productId: number) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
  );
  const [optimisticAdds, addOptimisticAdd] = useOptimistic(0, (count) => count + 1);
  const [state, formAction] = useActionState(
    async (): Promise<AddState> => {
      addOptimisticAdd(undefined);
      addLocalCart(product);
      await addToCartMutation.mutateAsync({ productId: product.id });
      return { added: true };
    },
    { added: false },
  );
  const isWished = optimisticWishlistIds.includes(product.id);

  const handleWishlistClick = () => {
    startTransition(() => {
      setOptimisticWishlistIds(product.id);
    });
    toggleWishlist(product.id);
    wishlistMutation.mutate(product.id);
  };

  return (
    <article className="product">
      <div className="product-image-wrap">
        <Link to={`/products/${product.id}`} className="product-image-link" aria-label={product.name}>
          <RarityStars count={product.rarity} />
          <span className="product-tag">{product.tag}</span>
          <div className="prod-illust">
            <ProductPixelIcon name={product.icon} />
          </div>
        </Link>
        <button
          className={`product-fav ${isWished ? 'active' : ''}`}
          type="button"
          aria-label={isWished ? '찜 해제' : '찜하기'}
          onClick={handleWishlistClick}
        >
          <HeartIcon className="icon product-heart-icon" />
        </button>
      </div>
      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <div className="product-name">{product.name}</div>
        <RatingBar value={product.rating} count={product.reviewCount} />
        <div className="product-price">
          <span className="price-discount">-{product.discountRate}%</span>
          <span className="price-now">{formatPrice(product.price)}</span>
          <span className="price-was">{formatPrice(product.originalPrice)}</span>
        </div>
        <div className="product-meta">
          <span className="shipping-tag">▶ {product.shippingLabel}</span>
          <form action={formAction}>
            <SubmitButton
              className={`add-cart ${state.added || optimisticAdds > 0 ? 'added' : ''}`}
              pendingLabel="..."
            >
              {state.added || optimisticAdds > 0 ? '✓ GOT IT' : '+ ADD'}
            </SubmitButton>
          </form>
        </div>
      </div>
    </article>
  );
}
