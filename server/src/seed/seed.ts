/**
 * Seeds the database.
 *
 *   npm run seed          → bootstrap admin + settings, then add the starter
 *                           collection only when no products exist yet
 *   npm run seed:reset    → wipe catalogue records and re-create them
 *
 * Collection structure comes from the brand's own Instagram bio and highlights:
 * "Afshan Cosmetics & Jewellery", "premium anti-tarnish & gold alike
 * jewellery", "pocket friendly", "ship all India", WhatsApp 9769836346, Mumbai.
 * The feed publishes no prices, so every price is null ("Price on request")
 * rather than invented — set real prices in Admin → Products when she shares
 * them.
 */
import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Category } from '../models/category.model.js';
import { GalleryItem } from '../models/galleryItem.model.js';
import { Product } from '../models/product.model.js';
import { Review } from '../models/review.model.js';
import { bootstrap } from './bootstrap.js';

const reset = process.argv.includes('--reset');
const IG = 'https://www.instagram.com/afshan_cosmetics_mumbai/';

const categories = [
  {
    name: 'Necklaces',
    slug: 'necklaces',
    description: 'Layered chains, pendants and choker sets — anti-tarnish gold-alike, made to sit light.',
    image: '/images/p-noor-chain.jpg',
    displayOrder: 1,
  },
  {
    name: 'Earrings',
    slug: 'earrings',
    description: 'Jhumkas, hoops and pearl studs — from office-quiet to shaadi-loud.',
    image: '/images/p-meher-jhumka.jpg',
    displayOrder: 2,
  },
  {
    name: 'Rings & Bracelets',
    slug: 'rings-bracelets',
    description: 'Stackable rings and bangles that survive washing hands, deadlines and monsoon.',
    image: '/images/p-zoya-rings.jpg',
    displayOrder: 3,
  },
  {
    name: 'Beauty & Gifting',
    slug: 'beauty',
    description: 'Lipsticks, fragrance and ready-to-give sets — boxed, carded and price-free inside.',
    image: '/images/p-velvet-lipstick.jpg',
    displayOrder: 4,
  },
];

const variants = (names: string[]) =>
  names.map((name) => ({ name, price: null as number | null, stockStatus: 'in_stock' as const }));

const products = [
  {
    name: 'Noor Layered Chain Set',
    slug: 'noor-layered-chain-set',
    description:
      'Three fine chains, graduated in length and finished with a single crystal pendant. Worn together they read as one deliberate piece; worn alone, each holds its own. The clasp is adjustable, so the longest chain can sit at the collarbone or below it.',
    price: null,
    compareAtPrice: null,
    fabric: 'Gold-plated brass, anti-tarnish coating, cubic zirconia pendant, adjustable clasp',
    care: 'Nickel-free and anti-tarnish. Wipe with a dry cloth after wear and keep away from perfume and chlorine.',
    colour: 'Gold finish',
    categorySlug: 'necklaces',
    images: ['/images/p-noor-chain.jpg', '/images/hero-noor.jpg'],
    variants: variants(['18 inch', '20 inch', '22 inch']),
    bestseller: true,
    featured: true,
    newArrival: true,
    displayOrder: 1,
  },
  {
    name: 'Gulbahar Choker Set',
    slug: 'gulbahar-choker-set',
    description:
      'A stone-set choker with a matching pair of jhumkas — the wedding-guest answer when there is no time to shop for a set. The choker sits flat against the neck and the earrings are weighted light enough to keep on through the photographs.',
    price: null,
    compareAtPrice: null,
    fabric: 'Gold-plated alloy, anti-tarnish coating, ruby-red and clear stones, pearl drops',
    care: 'Nickel-free. Store in the pouch provided; avoid direct perfume spray on the stones.',
    colour: 'Gold finish',
    categorySlug: 'necklaces',
    images: ['/images/p-gulbahar-choker.jpg', '/images/hero-gift.jpg'],
    variants: variants(['Choker only', 'Choker + jhumka set']),
    bestseller: true,
    featured: false,
    newArrival: false,
    displayOrder: 2,
  },
  {
    name: 'Meher Jhumka',
    slug: 'meher-jhumka',
    description:
      'A classic dome jhumka with a pearl drop, finished by hand so the second earring matches the first. Light enough for a full working day, and loud enough to carry an outfit on its own.',
    price: null,
    compareAtPrice: null,
    fabric: 'Gold-plated alloy, anti-tarnish coating, faux pearl drop, nickel-free posts',
    care: 'Nickel-free and suitable for sensitive ears. Wipe after wear; do not soak.',
    colour: 'Gold finish',
    categorySlug: 'earrings',
    images: ['/images/p-meher-jhumka.jpg', '/images/hero-jhumka.jpg'],
    variants: variants(['Small', 'Medium', 'Large']),
    bestseller: true,
    featured: true,
    newArrival: true,
    displayOrder: 3,
  },
  {
    name: 'Sana Pearl Studs',
    slug: 'sana-pearl-studs',
    description:
      'The pair that never leaves the ear. A single pearl on a low-profile setting, small enough to sleep in and clean enough for a workday. Choose gold or rose-gold tone.',
    price: null,
    compareAtPrice: null,
    fabric: 'Gold-plated brass, anti-tarnish coating, shell pearl, nickel-free posts',
    care: 'Nickel-free. Keep away from hairspray and perfume; wipe with a soft dry cloth.',
    colour: 'Gold or rose gold',
    categorySlug: 'earrings',
    images: ['/images/p-sana-studs.jpg'],
    variants: variants(['Gold', 'Rose gold']),
    bestseller: false,
    featured: false,
    newArrival: true,
    displayOrder: 4,
  },
  {
    name: 'Zoya Stacking Rings',
    slug: 'zoya-stacking-rings',
    description:
      'A set of fine rings meant to be worn together in any order — one plain, one stone-set, one twisted. Buy the set of three for a first stack, or five for a full hand.',
    price: null,
    compareAtPrice: null,
    fabric: 'Gold-plated brass, anti-tarnish coating, cubic zirconia accents',
    care: 'Nickel-free and water-resistant. Remove before swimming or applying lotion.',
    colour: 'Gold finish',
    categorySlug: 'rings-bracelets',
    images: ['/images/p-zoya-rings.jpg'],
    variants: variants(['Set of 3', 'Set of 5']),
    bestseller: false,
    featured: true,
    newArrival: false,
    displayOrder: 5,
  },
  {
    name: 'Afshan Signature Bangle',
    slug: 'afshan-signature-bangle',
    description:
      'A single polished bangle with a fine engraved edge — the piece customers come back for in a second size. Wear one alone or stack three; the finish is tested to keep its colour through daily wear.',
    price: null,
    compareAtPrice: null,
    fabric: 'Gold-plated alloy, anti-tarnish coating, hand-finished engraving',
    care: 'Nickel-free. Wipe after wear and store flat to protect the shape.',
    colour: 'Gold finish',
    categorySlug: 'rings-bracelets',
    images: ['/images/p-signature-bangle.jpg'],
    variants: variants(['2.4', '2.6', '2.8']),
    bestseller: true,
    featured: false,
    newArrival: false,
    displayOrder: 6,
  },
  {
    name: 'Velvet Matte Lipstick',
    slug: 'velvet-matte-lipstick',
    description:
      'A soft matte that does not chalk out by lunch — buildable colour, comfortable on the lip, and chosen to sit beside gold jewellery rather than fight it. Three everyday shades.',
    price: null,
    compareAtPrice: null,
    fabric: 'Cream matte base, vitamin E, rose-nude / brick / mauve pigments',
    care: 'Dermatologically tested and cruelty-free. Check the shade name on the base before gifting.',
    colour: 'Three shades',
    categorySlug: 'beauty',
    images: ['/images/p-velvet-lipstick.jpg'],
    variants: variants(['Rose nude', 'Brick', 'Mauve']),
    bestseller: false,
    featured: true,
    newArrival: true,
    displayOrder: 7,
  },
  {
    name: 'Oud & Rose Eau de Parfum',
    slug: 'oud-rose-eau-de-parfum',
    description:
      'Rose at the top, oud underneath, and enough warmth to last an evening without being loud in a small room. The bottle is boxed and ready to give as it is.',
    price: null,
    compareAtPrice: null,
    fabric: 'Rose, oud, amber and musk in an alcohol-free-look base; 30 ml and 50 ml',
    care: 'For external use only. Keep away from direct sunlight; patch test before first use.',
    colour: 'Oriental floral',
    categorySlug: 'beauty',
    images: ['/images/p-oud-parfum.jpg'],
    variants: variants(['30 ml', '50 ml']),
    bestseller: false,
    featured: false,
    newArrival: false,
    displayOrder: 8,
  },
];

const gallery = [
  { image: '/images/hero-noor.jpg', caption: 'Layered gold, every day', externalUrl: IG, displayOrder: 1 },
  { image: '/images/p-meher-jhumka.jpg', caption: 'The Meher jhumka', externalUrl: IG, displayOrder: 2 },
  { image: '/images/hero-gift.jpg', caption: 'Boxed and ready to give', externalUrl: IG, displayOrder: 3 },
  { image: '/images/p-gulbahar-choker.jpg', caption: 'Choker sets for the season', externalUrl: IG, displayOrder: 4 },
  { image: '/images/p-velvet-lipstick.jpg', caption: 'Shades that sit beside gold', externalUrl: IG, displayOrder: 5 },
  { image: '/images/boutique.jpg', caption: 'The counter in Mumbai', externalUrl: IG, displayOrder: 6 },
];

async function main(): Promise<void> {
  await connectDatabase();
  await bootstrap();

  const existingProducts = await Product.countDocuments();
  if (existingProducts > 0 && !reset) {
    console.log(`[seed] ${existingProducts} products already present — collection seed skipped`);
  } else {
    if (reset) {
      await Promise.all([
        Product.deleteMany({}),
        Category.deleteMany({}),
        Review.deleteMany({}),
        GalleryItem.deleteMany({}),
      ]);
      console.log('[seed] catalogue cleared');
    }

    const categoryIds = new Map<string, mongoose.Types.ObjectId>();
    for (const category of categories) {
      const created = await Category.create(category);
      categoryIds.set(category.slug, created._id as mongoose.Types.ObjectId);
    }
    console.log(`[seed] ${categories.length} sections created`);

    for (const product of products) {
      const { categorySlug, ...rest } = product;
      await Product.create({
        ...rest,
        category: categoryIds.get(categorySlug) ?? null,
      });
    }
    console.log(`[seed] ${products.length} pieces created`);

    await GalleryItem.create(gallery);
    console.log(`[seed] ${gallery.length} gallery images created`);

    console.log('[seed] reviews are left empty — add real customer words in Admin → Reviews');
  }

  await disconnectDatabase();
  console.log('[seed] done');
}

main().catch(async (err) => {
  console.error('[seed] failed', err);
  await disconnectDatabase().catch(() => undefined);
  process.exit(1);
});
