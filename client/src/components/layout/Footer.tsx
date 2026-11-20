import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { Wordmark } from '@/components/Wordmark';
import { normaliseNumber } from '@/lib/whatsapp';

export function Footer() {
  const { settings } = useSettings();
  const whatsapp = normaliseNumber(settings.whatsappNumber);
  const instagram = settings.instagramUrl || 'https://www.instagram.com/afshan_cosmetics_mumbai/';

  return (
    <footer className="mt-24 border-t border-ink/10 bg-ink text-bone">
      <div className="shell grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:py-16">
        <div>
          <Wordmark size="md" asLink={false} onDark />
          <p className="mt-6 max-w-xs text-sm leading-[1.9] text-bone/60">
            {settings.about.intro ||
              'Premium anti-tarnish, gold-alike jewellery and everyday beauty from Mumbai — pocket friendly, gift ready and shipped across India.'}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-pill border border-bone/20 px-3 py-1 font-mono text-[8px] uppercase tracking-wide2 text-bone/65">
              Anti-tarnish
            </span>
            <span className="rounded-pill border border-bone/20 px-3 py-1 font-mono text-[8px] uppercase tracking-wide2 text-bone/65">
              Ships pan-India
            </span>
          </div>
        </div>

        <div>
          <p className="font-mono text-[9px] uppercase tracking-micro text-bone/40">Shop</p>
          <ul className="mt-4 space-y-2.5 text-sm text-bone/70">
            <li><Link to="/shop" className="hover:text-bone">Everything</Link></li>
            <li><Link to="/category/necklaces" className="hover:text-bone">Necklaces</Link></li>
            <li><Link to="/category/earrings" className="hover:text-bone">Earrings</Link></li>
            <li><Link to="/category/rings-bracelets" className="hover:text-bone">Rings &amp; bracelets</Link></li>
            <li><Link to="/category/beauty" className="hover:text-bone">Beauty &amp; gifting</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[9px] uppercase tracking-micro text-bone/40">The house</p>
          <ul className="mt-4 space-y-2.5 text-sm text-bone/70">
            <li><Link to="/about" className="hover:text-bone">Our story</Link></li>
            <li><Link to="/gallery" className="hover:text-bone">The feed</Link></li>
            <li><Link to="/reviews" className="hover:text-bone">Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-bone">Shipping &amp; contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[9px] uppercase tracking-micro text-bone/40">Enquire</p>
          <ul className="mt-4 space-y-2.5 text-sm text-bone/70">
            {whatsapp ? (
              <li>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                  WhatsApp · {settings.whatsappNumber}
                </a>
              </li>
            ) : null}
            <li>
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                Instagram · @{settings.instagramHandle.replace(/^@/, '')}
              </a>
            </li>
            {settings.email ? (
              <li><a href={`mailto:${settings.email}`} className="hover:text-bone">{settings.email}</a></li>
            ) : null}
            <li>{settings.city}{settings.city ? ', India' : ''}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="shell flex flex-col items-start justify-between gap-3 py-5 font-mono text-[9px] uppercase tracking-wide2 text-bone/35 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link to="/contact" className="hover:text-bone">Policies</Link>
            <Link to="/admin" className="hover:text-bone">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
