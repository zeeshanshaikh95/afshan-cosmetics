import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { buildOrderLink, buildSingleProductMessage, normaliseNumber } from '@/lib/whatsapp';

export function ContactPage() {
  const { settings } = useSettings();
  const whatsapp = normaliseNumber(settings.whatsappNumber);

  const orderLink = buildOrderLink(
    settings,
    buildSingleProductMessage(settings, {
      productName: 'a piece from the collection',
      variantName: null,
      quantity: 1,
      price: null,
    })
  );

  const channels = [
    {
      label: 'WhatsApp',
      value: whatsapp ? settings.whatsappNumber : 'Add a number in Admin → Settings',
      href: whatsapp ? `https://wa.me/${whatsapp}` : null,
      note: 'Photographs, prices and stock, answered personally — usually within the hour.',
    },
    {
      label: 'Instagram',
      value: `@${settings.instagramHandle.replace(/^@/, '')}`,
      href: settings.instagramUrl || 'https://www.instagram.com/afshan_cosmetics_mumbai/',
      note: 'New arrivals, restocks and the pieces that sold out first, posted daily.',
    },
    {
      label: 'Shipping',
      value: 'All India',
      href: null as string | null,
      note: 'Tracked courier, 2–6 working days depending on the pin code. Mumbai orders usually next day.',
    },
  ];

  return (
    <>
      <Seo
        title="Contact & shipping — Afshan Cosmetics & Jewellery"
        description="Enquire about Afshan jewellery and beauty on WhatsApp, or order from Instagram. Shipping across India from Mumbai, packed gift ready."
        canonicalPath="/contact"
      />

      <section className="border-b border-ink/10">
        <div className="shell py-14 sm:py-20">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.03] text-balance sm:text-7xl">
            Ask us before you choose.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-[1.9] text-ink-soft">
            Send a budget, an occasion or a screenshot. We will send photographs of what is actually in stock,
            confirm the price, and only then pack it.
          </p>
        </div>
      </section>

      <div className="shell grid gap-4 py-12 sm:py-16 md:grid-cols-3">
        {channels.map((channel) => (
          <div key={channel.label} className="rounded-lg border border-ink/10 bg-ivory p-6 sm:p-8">
            <p className="eyebrow">{channel.label}</p>
            {channel.href ? (
              <a
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="mt-4 block font-display text-2xl leading-tight hover:text-gold-700"
              >
                {channel.value}
              </a>
            ) : (
              <p className="mt-4 font-display text-2xl leading-tight text-ink">{channel.value}</p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{channel.note}</p>
          </div>
        ))}
      </div>

      <section className="shell grid gap-10 pb-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl leading-tight">Shipping & care</h2>
          <div className="prose-editorial mt-4">
            {settings.policies.shipping ? (
              <p className="whitespace-pre-line">{settings.policies.shipping}</p>
            ) : (
              <p>
                We ship across India with tracked courier — 2–6 working days depending on the pin code, and
                usually next day within Mumbai. Shipping is confirmed on WhatsApp before dispatch.
              </p>
            )}
            {settings.policies.returns ? (
              <p className="whitespace-pre-line">{settings.policies.returns}</p>
            ) : (
              <p>
                Unworn pieces can be exchanged within 7 days of delivery, in their box with the tag intact.
                If something arrives damaged, send a photograph the same day and we will replace it.
              </p>
            )}
          </div>

          <div className="mt-8 rounded-lg border border-ink/10 bg-ivory p-6">
            <p className="eyebrow">Keeping it gold</p>
            <p className="mt-3 text-sm leading-[1.9] text-ink-soft">
              Keep perfume, hairspray and chlorine off the piece, wipe it with a dry cloth after wear, and store
              it in the pouch it arrived in. Worn like that, the finish holds for months — not days.
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="rounded-lg border border-gold-500/30 bg-ink p-6 text-bone">
            <p className="font-mono text-[9px] uppercase tracking-micro text-bone/40">The house</p>
            <p className="mt-3 font-display text-2xl leading-none">
              {settings.city || 'Mumbai'}, India
            </p>
            <p className="mt-3 text-sm leading-[1.9] text-bone/65">
              A small counter, a short collection and a WhatsApp number that a person actually answers.
            </p>
            <p className="mt-4 border-t border-bone/15 pt-4 font-mono text-[9px] uppercase tracking-wide2 text-bone/55">
              Shipping pan-India · Gift packed
            </p>
            {orderLink ? (
              <a
                href={orderLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-5 w-full border-gold-500 bg-gold-500 text-ink hover:border-bone hover:bg-bone"
              >
                {orderLink.channel === 'whatsapp' ? 'Enquire on WhatsApp' : 'DM us on Instagram'}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
