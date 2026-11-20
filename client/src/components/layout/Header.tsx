import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';
import { Wordmark } from '@/components/Wordmark';

const NAV_ITEMS = [
  { to: '/shop', label: 'Shop' },
  { to: '/category/necklaces', label: 'Necklaces' },
  { to: '/category/beauty', label: 'Beauty' },
  { to: '/about', label: 'Our story' },
  { to: '/gallery', label: 'The feed' },
  { to: '/contact', label: 'Contact' },
];

const HIGHLIGHT = new Set(['/shop']);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const { settings } = useSettings();
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-bone/95 backdrop-blur-md">
      {settings.announcements.enabled && settings.announcements.text ? (
        <div className="border-b border-ink/10 bg-ink px-4 py-2 text-center font-mono text-[9px] uppercase tracking-wide2 text-bone/85">
          {settings.announcements.text}
        </div>
      ) : null}

      <div className="shell flex h-[78px] items-center justify-between gap-3 border-b border-ink/10 sm:h-[88px]">
        <Wordmark size="sm" />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative py-1 font-mono text-[10px] uppercase tracking-wide2 transition-colors ${
                  isActive || HIGHLIGHT.has(item.to) ? 'text-gold-700' : 'text-ink-soft hover:text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <span className="hidden items-center gap-1.5 rounded-pill border border-gold-500/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wide2 text-gold-700 xl:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-herb-500" aria-hidden="true" />
            Ships across India
          </span>

          <a
            href={settings.instagramUrl || 'https://www.instagram.com/afshan_cosmetics_mumbai/'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hidden p-2 text-ink-soft transition-colors hover:text-gold-700 sm:block"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.3">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </a>

          <button
            type="button"
            onClick={openCart}
            className="relative p-2 text-ink transition-opacity hover:opacity-60"
            aria-label={`Open bag (${count} items)`}
          >
            <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 8h14l-1 12H6L5 8z" />
              <path d="M9 8a3 3 0 016 0" />
            </svg>
            {count > 0 ? (
              <span className="absolute -right-0.5 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-rose-500 px-1 font-mono text-[9px] text-ivory">
                {count}
              </span>
            ) : null}
          </button>

          <Link to="/shop" className="btn-solid hidden !px-5 !py-2.5 sm:inline-flex">
            Shop
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="p-2 text-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 8h16M4 16h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav className="border-b border-ink/10 bg-bone px-5 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block border-b border-ink/5 py-3.5 font-display text-2xl ${
                  isActive ? 'text-gold-700' : 'text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mt-4 flex items-center justify-between">
            <Link to="/reviews" className="font-mono text-[9px] uppercase tracking-wide2 text-ink-soft">
              Reviews
            </Link>
            <span className="font-mono text-[9px] uppercase tracking-wide2 text-gold-700">
              Shipping pan-India
            </span>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
