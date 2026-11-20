import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { assetUrl } from '@/lib/brand';
import type { HeroSlide } from '@/types';

const FALLBACK_SLIDE: HeroSlide = {
  imageUrl: '/images/hero-noor.jpg',
  eyebrow: 'Mumbai · Ships across India',
  headline: 'Gold that stays gold.',
  subheadline:
    'Premium anti-tarnish jewellery and everyday beauty — gold-alike finishes, pocket-friendly prices and gift-ready packing from Mumbai.',
  ctaLabel: 'Shop the collection',
  ctaHref: '/shop',
  active: true,
};

const AUTOPLAY_MS = 7000;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function HeroSlider() {
  const { settings } = useSettings();

  const slides = useMemo(() => {
    const configured = (settings.heroSlides ?? []).filter(
      (slide) => slide.active && (slide.imageUrl || slide.headline)
    );
    return configured.length ? configured : [FALLBACK_SLIDE];
  }, [settings.heroSlides]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const total = slides.length;
  const slide = slides[Math.min(index, total - 1)] ?? FALLBACK_SLIDE;

  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total]
  );

  useEffect(() => {
    if (index > total - 1) setIndex(0);
  }, [index, total]);

  useEffect(() => {
    if (total < 2 || paused || prefersReducedMotion()) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % total), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [total, paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="The collection"
      className="relative overflow-hidden border-b border-ink/10 bg-bone"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') go(index + 1);
        if (event.key === 'ArrowLeft') go(index - 1);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current;
        if (Math.abs(delta) > 45) go(index + (delta < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <div className="shell grid items-center gap-10 py-9 sm:py-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-14">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <div key={`copy-${index}`} className="animate-fade-up">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-gold-500" aria-hidden="true" />
              <p className="font-mono text-[9px] uppercase tracking-micro text-gold-700">
                {slide.eyebrow || 'Mumbai · Ships across India'}
              </p>
            </div>

            <h1 className="mt-5 max-w-xl font-display text-[2.9rem] font-light leading-[1.02] tracking-tight2 text-balance text-ink sm:text-6xl lg:text-[4.4rem]">
              {slide.headline || 'Gold that stays gold.'}
            </h1>

            {slide.subheadline ? (
              <p className="mt-5 max-w-md text-sm leading-[1.95] text-ink-soft">{slide.subheadline}</p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to={slide.ctaHref || '/shop'} className="btn-solid">
                {slide.ctaLabel || 'Shop the collection'}
              </Link>
              <a
                href={settings.instagramUrl || 'https://www.instagram.com/afshan_cosmetics_mumbai/'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line"
              >
                See it on Instagram
              </a>
            </div>
          </div>

          {/* Thumbnail rail */}
          <div className="mt-10 flex items-end justify-between gap-4 border-t border-ink/10 pt-5">
            <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
              {slides.map((item, itemIndex) => {
                const isActive = itemIndex === index;
                return (
                  <button
                    key={`thumb-${itemIndex}`}
                    type="button"
                    onClick={() => go(itemIndex)}
                    aria-label={`Show slide ${itemIndex + 1}`}
                    aria-current={isActive}
                    className="group min-w-[5.5rem] text-left"
                  >
                    <span
                      className={`block h-[2px] w-full overflow-hidden ${
                        isActive ? 'bg-ink/10' : 'bg-ink/10'
                      }`}
                    >
                      {isActive ? (
                        <span
                          className="block h-full origin-left bg-gold-500"
                          style={{
                            animation: prefersReducedMotion()
                              ? undefined
                              : `hero-line ${AUTOPLAY_MS}ms linear both`,
                            animationPlayState: paused ? 'paused' : 'running',
                          }}
                        />
                      ) : null}
                    </span>
                    <span
                      className={`mt-2 block font-mono text-[9px] uppercase tracking-wide2 ${
                        isActive ? 'text-ink' : 'text-ink-faint group-hover:text-ink-soft'
                      }`}
                    >
                      {String(itemIndex + 1).padStart(2, '0')} · {item.eyebrow?.split('·')[0].trim() || 'Collection'}
                    </span>
                  </button>
                );
              })}
            </div>

            {total > 1 ? (
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={() => go(index - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bone"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={() => go(index + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bone"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Arch image */}
        <div className="relative order-1 lg:order-2">
          <div className="relative mx-auto max-w-[30rem] lg:max-w-none">
            <div className="arch relative aspect-[4/5] border border-gold-500/30 bg-sand">
              {slides.map((item, itemIndex) => {
                const src = item.imageUrl?.startsWith('http') ? item.imageUrl : assetUrl(item.imageUrl);
                const isActive = itemIndex === index % total;
                return src ? (
                  <img
                    key={`${item.imageUrl}-${itemIndex}`}
                    src={src}
                    alt={item.headline || 'Afshan Cosmetics & Jewellery'}
                    loading={itemIndex === 0 ? 'eager' : 'lazy'}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1100ms] ease-editorial ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    } ${isActive && !prefersReducedMotion() ? 'animate-ken-burns' : ''}`}
                  />
                ) : null;
              })}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
            </div>

            {/* Slide counter */}
            <div className="absolute left-3 top-3 rounded-pill bg-ivory/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wide2 text-ink/70 backdrop-blur-sm sm:left-4 sm:top-4">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>

            {/* Seal */}
            <div className="absolute -bottom-4 -left-2 rotate-[-4deg] rounded-md border border-gold-500/40 bg-ivory px-4 py-2.5 shadow-lift sm:-left-6">
              <p className="font-display text-lg leading-none text-ink">Anti-tarnish</p>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-micro text-gold-700">
                Gold-alike finish
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes hero-line { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </section>
  );
}
