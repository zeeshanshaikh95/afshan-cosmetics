import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { assetUrl, FOUNDER_IMAGE } from '@/lib/brand';

export function AboutPage() {
  const { settings } = useSettings();
  const story =
    settings.about.story ||
    'Afshan Cosmetics & Jewellery started as a cosmetics counter in Mumbai — lipsticks, kajal, the things a household runs out of. The jewellery came next, almost by accident: customers kept asking where the gold-alike pieces in the display were from.\n\nToday the counter is a small jewellery house with one rule. Nothing goes on the shelf unless it can be worn every day — washed hands, monsoons, long commutes — and still look like the day it arrived. That is what anti-tarnish means here, and it is why the collection is short, tested and reordered.\n\nEvery order is packed by hand, confirmed personally on WhatsApp, and shipped anywhere in India. If you are unsure which length suits your neckline or which jhumka suits a gift, ask. We would rather send you one right piece than four wrong ones.';
  const paragraphs = story.split('\n').filter((paragraph) => paragraph.trim());

  return (
    <>
      <Seo
        title="Our story — Afshan Cosmetics & Jewellery"
        description="Afshan Cosmetics & Jewellery is a Mumbai jewellery and beauty house built on anti-tarnish, gold-alike pieces that are worn every day and shipped across India."
        canonicalPath="/about"
      />

      <section className="border-b border-ink/10">
        <div className="shell py-14 sm:py-20">
          <p className="eyebrow">Our story</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.03] text-balance sm:text-7xl">
            Gold-alike, worn every day.
          </h1>
          <div className="mt-8 flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-wide2">
            <span className="rounded-pill border border-ink/15 px-3 py-1.5 text-ink-soft">
              {settings.city || 'Mumbai'}, India
            </span>
            <span className="rounded-pill border border-gold-500 bg-gold-500 px-3 py-1.5 text-ink">
              Anti-tarnish house
            </span>
            <span className="rounded-pill border border-ink/15 px-3 py-1.5 text-ink-soft">
              Shipping pan-India
            </span>
          </div>
        </div>
      </section>

      <section className="shell grid gap-12 py-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="arch aspect-[4/5] border border-gold-500/25 bg-sand">
            <img
              src={settings.about.founderImageUrl || assetUrl(FOUNDER_IMAGE)}
              alt="The Afshan counter in Mumbai"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-4 font-mono text-[9px] uppercase tracking-wide2 text-ink-faint">
            The counter — Mumbai
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow">Behind the counter</p>
          <h2 className="mb-6 mt-3 max-w-lg font-display text-4xl leading-[1.1]">
            {settings.about.intro || 'Pocket-friendly jewellery that behaves like the real thing.'}
          </h2>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4 text-sm leading-[1.95] text-ink-soft">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 border-t border-ink/10 pt-6">
            <p className="font-mono text-[9px] uppercase tracking-micro text-gold-700">
              Anti-tarnish · Gold-alike · Gift ready
            </p>
            <Link to="/shop" className="btn-solid mt-4">
              Shop the collection
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-ivory py-14 sm:py-20">
        <div className="shell grid gap-4 sm:grid-cols-3">
          {[
            ['Tested on skin', 'Each plating batch is worn through workouts, washing up and a Mumbai summer before it is approved.'],
            ['Set by hand', 'Stones are pressed and clasps checked one piece at a time — never assembled in haste.'],
            ['Packed as a gift', 'Keepsake box, care card and a note. If it is a present, we will leave the price out.'],
          ].map(([title, text], index) => (
            <div key={title} className="rounded-lg border border-ink/10 bg-bone p-6">
              <p className="font-mono text-[9px] text-gold-700">0{index + 1}</p>
              <h3 className="mt-4 font-display text-2xl leading-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell py-16">
        <div className="rounded-lg border border-gold-500/40 bg-gold-100 p-8 sm:p-12">
          <p className="font-display text-2xl leading-[1.3] text-balance text-ink sm:text-3xl">
            “If it will not survive a Mumbai summer, it does not go on the shelf.”
          </p>
          <p className="mt-4 font-mono text-[9px] uppercase tracking-micro text-gold-700">The house rule</p>
        </div>
      </section>
    </>
  );
}
