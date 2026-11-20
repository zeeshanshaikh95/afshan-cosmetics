import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { formatPrice, truncate } from '@/lib/format';
import type { Product } from '@/types';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addItem } = useCart();
  const outOfStock = product.stockStatus === 'out_of_stock';
  const secondary = product.images[1];

  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-lg border border-ink/10 bg-sand">
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden">
            {product.images[0] ? (
              <>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading={priority ? 'eager' : 'lazy'}
                  className={`h-full w-full object-cover transition-all duration-[1000ms] ease-editorial group-hover:scale-[1.03] ${
                    secondary ? 'group-hover:opacity-0' : ''
                  }`}
                />
                {secondary ? (
                  <img
                    src={secondary}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                ) : null}
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="font-display text-4xl text-ink/20">{product.name.slice(0, 2)}</span>
              </div>
            )}
          </div>
        </Link>

        <div className="absolute left-0 top-0 flex flex-col gap-1 p-2.5">
          {product.newArrival ? <span className="badge-dark">New in</span> : null}
          {product.bestseller ? <span className="badge-fry">Loved</span> : null}
          {outOfStock ? <span className="badge-line">Sold out</span> : null}
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-full p-2.5 transition-transform duration-500 ease-editorial group-hover:translate-y-0">
          <button
            type="button"
            disabled={outOfStock}
            onClick={() => addItem(product)}
            className="w-full rounded-pill bg-ivory/95 py-2.5 font-mono text-[9px] uppercase tracking-wide2 text-ink backdrop-blur-sm transition-colors hover:bg-ink hover:text-bone disabled:opacity-50"
          >
            {outOfStock ? 'Sold out' : 'Add to bag'}
          </button>
        </div>
      </div>

      <div className="pt-3.5">
        <Link to={`/product/${product.slug}`} className="block">
          <h3 className="font-display text-[1.35rem] font-normal leading-tight text-ink transition-colors hover:text-gold-700">
            {truncate(product.name, 52)}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <p className="font-mono text-[8px] uppercase tracking-wide2 text-ink-faint">
            {product.category?.name ?? 'Afshan'}
          </p>
          <p className="text-xs text-ink-soft">{formatPrice(product.price)}</p>
        </div>
      </div>
    </article>
  );
}
