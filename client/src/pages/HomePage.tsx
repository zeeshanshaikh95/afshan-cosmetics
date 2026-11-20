import { Link } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { useSettings } from '@/context/SettingsContext';
import { HeroSlider } from '@/components/HeroSlider';
import { ProductCard } from '@/components/ProductCard';
import { SectionIntro } from '@/components/SectionIntro';
import { Seo } from '@/components/seo/Seo';
import { EmptyState } from '@/components/EmptyState';
import { Stars } from '@/components/Stars';
import { assetUrl, FOUNDER_IMAGE } from '@/lib/brand';
import { buildOrderLink, buildSingleProductMessage } from '@/lib/whatsapp';

const PROMISES = [
  ['Anti-tarnish', 'Gold-alike finish that keeps its colour through daily wear — no black marks, no green wrists.'],
  ['Pocket friendly', 'Boutique finishing at everyday prices, with combos and gift sets that do not ask for a festival budget.'],
  ['Ships pan-India', 'Packed in a keepsake box and dispatched anywhere in India, tracked and insured.'],
];

const EDITS = [
  {
    name: 'Layered & light',
    text: 'Fine chains, pendants and chokers — the pieces you forget you are wearing.',
  },
  {
    name: 'Earrings that hold the room',
    text: 'Jhumkas, hoops and pearl studs, from office-quiet to shaadi-loud.',
  },
  {
    name: 'Everyday gold',
    text: 'Stackable rings and bangles that survive washing hands, deadlines and monsoon.',
  },
  {
    name: 'Beauty & gifting',
    text: 'Lipsticks, fragrance and ready-to-give sets for the people who say “nothing”.',
  },
];

const NOTES = [
  ['Tarnish-tested', 'Every batch is wear-tested before it reaches the shelf — sweat, water, perfume and all.'],
  ['Finished by hand', 'Stones set and clasps checked one piece at a time, so the second earring matches the first.'],
  ['Sent gift ready', 'Each order leaves in a keepsake box with a card, whether it is for you or for someone else.'],
];

export function HomePage() {
  const { settings } = useSettings();
  const newIn = useApi(() => publicApi.listProducts({ sort: 'newest' }).then((r) => r.products), []);
  const bestsellers = useApi(() => publicApi.listProducts({ sort: 'bestseller' }).then((r) => r.products), []);
  const categories = useApi(() => publicApi.listCategories().then((r) => r.categories), []);
  const reviews = useApi(() => publicApi.listReviews().then((r) => r.reviews), []);
  const gallery = useApi(() => publicApi.listGallery().then((r) => r.items), []);

  const orderLink = buildOrderLink(
    settings,
    buildSingleProductMessage(settings, {
      productName: 'a piece from the collection',
      variantName: null,
      quantity: 1,
      price: null,
    })
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: settings.businessName,
    description:
      settings.about.intro ||
      'Premium anti-tarnish, gold-alike jewellery and everyday beauty, shipped across India from Mumbai.',
    address: { '@type': 'PostalAddress', addressLocality: settings.city || 'Mumbai', addressCountry: 'IN' },
    ...(settings.instagramUrl ? { sameAs: [settings.instagramUrl] } : {}),
  };

  return (
    <>
      <Seo
        title="Afshan Cosmetics & Jewellery — Anti-Tarnish Gold, Mumbai"
        description="Premium anti-tarnish, gold-alike jewellery and everyday beauty from Mumbai. Necklaces, jhumkas, rings, bangles and gift sets — pocket friendly and shipped across India. Enquire on WhatsApp."
        canonicalPath="/"
        jsonLd={jsonLd}
      />

      <HeroSlider />

      {/* Promise strip */}
      <section className="border-b border-ink/10 bg-ivory">
        <div className="shell grid divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {PROMISES.map(([title, note], index) => (
            <div key={title} className="flex items-start gap-4 py-6 sm:px-6">
              <span className="mt-1 font-mono text-[9px] text-gold-700">0{index + 1}</span>
              <div>
                <p className="font-display text-xl leading-none text-ink">{title}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New in */}
      <section className="shell py-16 sm:py-20">
        <SectionIntro
          eyebrow="Just arrived"
          title="New in the collection"
          description="Fresh from the Mumbai workshop — the pieces we are quietly keeping one of for ourselves."
          linkTo="/shop?sort=newest"
          linkLabel="Shop all new in"
        />

        {newIn.loading ? (
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton aspect-[4/5]" />
            ))}
          </div>
        ) : newIn.error ? (
          <div className="mt-10">
            <EmptyState
              tone="error"
              title="The collection didn't load"
              description={newIn.error}
              action={
                <button type="button" className="btn-line" onClick={newIn.refetch}>
                  Try again
                </button>
              }
            />
          </div>
        ) : !newIn.data?.length ? (
          <div className="mt-10">
            <EmptyState
              title="The shelves are being dressed"
              description="New pieces appear here as soon as they are photographed. Follow along on Instagram in the meantime."
            />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {newIn.data.slice(0, 4).map((product, index) => (
              <ProductCard key={product._id} product={product} priority={index < 2} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="border-y border-ink/10 bg-ivory py-16 sm:py-20">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">The edits</p>
              <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl">Shop by edit</h2>
            </div>
            <Link to="/shop" className="font-mono text-[9px] uppercase tracking-wide2 text-ink-soft hover:text-ink">
              Everything →
            </Link>
          </div>

          {categories.loading ? (
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="aspect-[4/5] animate-pulse rounded-arch bg-sand" />
              ))}
            </div>
          ) : !categories.data?.length ? (
            <div className="mt-10 rounded-lg border border-ink/15 p-10 text-center">
              <p className="font-display text-2xl">The collection is being prepared</p>
              <p className="mt-2 text-sm text-ink-soft">Sections appear here once published from the admin panel.</p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {categories.data.slice(0, 4).map((category) => (
                <Link key={category._id} to={`/category/${category.slug}`} className="group block">
                  <div className="arch relative aspect-[4/5] border border-gold-500/25 bg-sand">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1100ms] ease-editorial group-hover:scale-[1.04]"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="font-display text-2xl leading-tight text-ivory">{category.name}</h3>
                      <span className="mt-1.5 inline-block font-mono text-[8px] uppercase tracking-wide2 text-ivory/75">
                        Explore the edit →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why it stays gold */}
      <section className="shell grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="relative">
            <div className="arch aspect-[4/5] overflow-hidden border border-gold-500/25">
              <img
                src={settings.about.founderImageUrl || assetUrl(FOUNDER_IMAGE)}
                alt="Inside the Afshan boutique in Mumbai"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="sticker absolute -bottom-3 left-4">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
              From our Mumbai counter
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow">The promise</p>
          <h2 className="mt-3 max-w-lg font-display text-4xl leading-[1.06] text-balance sm:text-5xl">
            Premium gold-alike, priced for every day.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-[1.95] text-ink-soft">
            {settings.about.intro ||
              'Afshan began as a small cosmetics counter in Mumbai and grew into a jewellery house for people who want the look of fine gold without the safe deposit box. Anti-tarnish plating, hand-checked clasps and honest prices — every piece is chosen to be worn, not saved for an occasion.'}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {NOTES.map(([title, text], index) => (
              <div key={title}>
                <p className="font-mono text-[9px] text-gold-700">0{index + 1}</p>
                <p className="mt-2 font-display text-lg leading-tight text-ink">{title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{text}</p>
              </div>
            ))}
          </div>

          <Link to="/about" className="btn-line mt-8">
            Read our story
          </Link>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="shell py-16 sm:py-20">
        <SectionIntro
          eyebrow="Most loved"
          title="What everyone keeps coming back for"
          description="The pieces that get reordered, gifted and posted the most."
          linkTo="/shop?sort=bestseller"
          linkLabel="Shop bestsellers"
        />

        {bestsellers.loading ? (
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton aspect-[4/5]" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {(bestsellers.data ?? []).slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Edits line */}
      <section className="border-y border-ink/10 bg-ivory py-16 sm:py-20">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">How we choose</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.06] text-balance sm:text-5xl">
              Four edits, one counter.
            </h2>
            <p className="mt-4 text-sm leading-[1.9] text-ink-soft">
              The collection stays short on purpose. If a piece will not survive a Mumbai summer, it does not
              make the shelf.
            </p>
          </div>

          <div className="mt-10 grid gap-x-8 gap-y-6 md:grid-cols-2">
            {EDITS.map((edit, index) => (
              <div key={edit.name} className="flex gap-5 border-t border-ink/10 pt-5">
                <span className="font-mono text-[10px] text-gold-700">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-2xl leading-tight text-ink">{edit.name}</h3>
                  <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink-soft">{edit.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feed */}
      {gallery.data?.length ? (
        <section className="shell py-16 sm:py-20">
          <SectionIntro
            eyebrow={`@${settings.instagramHandle.replace(/^@/, '')}`}
            title="From the feed"
            linkTo="/gallery"
            linkLabel="Open the feed"
          />
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {gallery.data.slice(0, 6).map((item) => (
              <a
                key={item._id}
                href={item.externalUrl || settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-md border border-ink/10 bg-sand"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.caption || 'Afshan on Instagram'}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  />
                ) : null}
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20" />
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {/* Reviews */}
      <section className="shell pb-16 sm:pb-20">
        {reviews.data?.length ? (
          <>
            <SectionIntro eyebrow="Word of mouth" title="Worn, then written about" linkTo="/reviews" linkLabel="All reviews" />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {reviews.data.slice(0, 3).map((review) => (
                <figure key={review._id} className="panel flex flex-col p-6">
                  <Stars rating={review.rating} />
                  <blockquote className="mt-4 flex-1 font-display text-xl leading-snug text-ink">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-5 font-mono text-[9px] uppercase tracking-wide2 text-ink-faint">
                    {review.customerName}
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        ) : null}
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-ink py-20 text-bone sm:py-28">
        <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-gold-500/20" />
        <div className="pointer-events-none absolute -right-10 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border border-gold-500/15" />
        <div className="shell relative flex flex-col items-start">
          <p className="font-mono text-[9px] uppercase tracking-micro text-gold-300">
            {settings.city ? `${settings.city} · ` : ''}Shipping across India
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.04] text-balance sm:text-6xl lg:text-7xl">
            Tell us the occasion. We'll find the piece.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-[1.9] text-bone/65">
            Message us with a budget and a vibe — a gift, a wedding, or a Tuesday. We'll send photographs of
            what is in stock and confirm the price before anything is packed.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {orderLink ? (
              <a
                href={orderLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border-gold-500 bg-gold-500 text-ink hover:border-bone hover:bg-bone"
              >
                {orderLink.channel === 'whatsapp' ? 'Enquire on WhatsApp' : 'DM us on Instagram'}
              </a>
            ) : null}
            <Link to="/shop" className="btn border-bone/40 text-bone hover:bg-bone hover:text-ink">
              Browse the collection
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
