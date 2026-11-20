import mongoose, { Schema, model, type Model } from 'mongoose';

export interface IHeroSlide {
  imageUrl: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  active: boolean;
}

export const HERO_SLIDES_DEFAULT: IHeroSlide[] = [
  {
    imageUrl: '/images/hero-noor.jpg',
    eyebrow: 'Mumbai · Ships across India',
    headline: 'Gold that stays gold.',
    subheadline:
      'Premium anti-tarnish jewellery and everyday beauty — gold-alike finishes, pocket-friendly prices and gift-ready packing from Mumbai.',
    ctaLabel: 'Shop the collection',
    ctaHref: '/shop',
    active: true,
  },
  {
    imageUrl: '/images/hero-jhumka.jpg',
    eyebrow: 'The earring edit',
    headline: 'Made for the entrance.',
    subheadline:
      'Jhumkas and pearl studs in anti-tarnish gold — light enough for a full day, loud enough for the photograph.',
    ctaLabel: 'Shop earrings',
    ctaHref: '/category/earrings',
    active: true,
  },
  {
    imageUrl: '/images/hero-gift.jpg',
    eyebrow: 'Gifting · Boxed and ready',
    headline: 'Send gold, not a gift card.',
    subheadline:
      'Keepsake boxes, handwritten cards and no price tag inside — tell us the occasion and we will pack it.',
    ctaLabel: 'Shop gift sets',
    ctaHref: '/category/beauty',
    active: true,
  },
];

export const WHATSAPP_TEMPLATE_DEFAULT =
  'Hi Afshan! ✨\n' +
  'I would like to enquire about:\n' +
  '{{ITEMS}}\n' +
  'Estimated total: {{TOTAL}}\n\n' +
  'Please confirm availability, price and shipping.';

export const WHATSAPP_TEMPLATE_SINGLE_DEFAULT =
  'Hi Afshan! ✨\n' +
  'I would like to ask about:\n' +
  '• {{PRODUCT}}\n' +
  '{{VARIANT_LINE}}{{QTY_LINE}}Price: {{PRICE}}\n\n' +
  'Please send photographs and confirm shipping.';

export interface ISiteSettings {
  businessName: string;
  tagline: string;
  whatsappNumber: string;
  instagramUrl: string;
  instagramHandle: string;
  email: string;
  city: string;
  mapsUrl: string;
  whatsappTemplate: string;
  whatsappSingleProductTemplate: string;
  heroSlides: IHeroSlide[];
  about: {
    intro: string;
    story: string;
    founderImageUrl: string;
  };
  announcements: {
    enabled: boolean;
    text: string;
  };
  policies: {
    shipping: string;
    returns: string;
  };
  updatedAt: Date;
}

const slideSchema = new Schema<IHeroSlide>(
  {
    imageUrl: { type: String, default: '' },
    eyebrow: { type: String, default: '' },
    headline: { type: String, default: '' },
    subheadline: { type: String, default: '' },
    ctaLabel: { type: String, default: 'Shop the collection' },
    ctaHref: { type: String, default: '/shop' },
    active: { type: Boolean, default: true },
  },
  { _id: false }
);

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: { type: String, default: 'AFSHAN COSMETICS & JEWELLERY' },
    tagline: { type: String, default: 'Anti-Tarnish Gold-Alike Jewellery · Mumbai' },
    whatsappNumber: { type: String, default: '+91 97698 36346' },
    instagramUrl: { type: String, default: 'https://www.instagram.com/afshan_cosmetics_mumbai/' },
    instagramHandle: { type: String, default: 'afshan_cosmetics_mumbai' },
    email: { type: String, default: '' },
    city: { type: String, default: 'Mumbai' },
    mapsUrl: { type: String, default: '' },
    whatsappTemplate: { type: String, default: WHATSAPP_TEMPLATE_DEFAULT },
    whatsappSingleProductTemplate: { type: String, default: WHATSAPP_TEMPLATE_SINGLE_DEFAULT },
    heroSlides: { type: [slideSchema], default: () => HERO_SLIDES_DEFAULT },
    about: {
      intro: {
        type: String,
        default:
          'Premium anti-tarnish, gold-alike jewellery and everyday beauty from Mumbai — pocket friendly and shipped across India.',
      },
      story: { type: String, default: '' },
      founderImageUrl: { type: String, default: '/images/boutique.jpg' },
    },
    announcements: {
      enabled: { type: Boolean, default: true },
      text: {
        type: String,
        default: 'Anti-tarnish gold-alike jewellery · Ships across India · 97698 36346',
      },
    },
    policies: {
      shipping: {
        type: String,
        default:
          'We ship across India with tracked courier — 2–6 working days depending on the pin code, and usually next day within Mumbai. Shipping is confirmed on WhatsApp before dispatch.',
      },
      returns: {
        type: String,
        default:
          'Unworn pieces can be exchanged within 7 days of delivery, in their box with the tag intact. If something arrives damaged, send a photograph the same day and we will replace it.',
      },
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ?? model<ISiteSettings>('SiteSettings', siteSettingsSchema);
