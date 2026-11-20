import { Link } from 'react-router-dom';
import { assetUrl } from '@/lib/brand';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  withTagline?: boolean;
  onDark?: boolean;
  asLink?: boolean;
  className?: string;
}

const WORD: Record<NonNullable<Props['size']>, string> = {
  sm: 'text-2xl sm:text-[1.7rem]',
  md: 'text-4xl',
  lg: 'text-6xl sm:text-7xl',
};

const MARK: Record<NonNullable<Props['size']>, string> = {
  sm: 'h-10 w-10 sm:h-11 sm:w-11',
  md: 'h-14 w-14',
  lg: 'h-20 w-20',
};

/**
 * The brand lockup: her own Instagram emblem, unretouched, beside the wordmark.
 * The emblem is a square illustration, so it is shown as a soft-cornered tile
 * rather than cropped to a circle.
 */
export function Wordmark({
  size = 'md',
  withTagline = true,
  onDark = false,
  asLink = true,
  className = '',
}: Props) {
  const content = (
    <span className={`flex items-center gap-3 leading-none ${className}`}>
      <img
        src={assetUrl('/brand/logo.jpg')}
        alt=""
        aria-hidden="true"
        className={`${MARK[size]} shrink-0 rounded-md border border-gold-500/30 object-cover`}
        loading="eager"
      />
      <span className="flex flex-col items-start">
        <span
          className={`font-display font-medium leading-[0.95] ${WORD[size]} ${
            onDark ? 'text-bone' : 'text-ink'
          }`}
        >
          Afshan
        </span>
        {withTagline ? (
          <span
            className={`mt-1.5 font-mono text-[7px] uppercase tracking-micro sm:text-[8px] ${
              onDark ? 'text-bone/55' : 'text-gold-700'
            }`}
          >
            Cosmetics &amp; Jewellery · Mumbai
          </span>
        ) : null}
      </span>
    </span>
  );

  if (!asLink) return content;

  return (
    <Link to="/" aria-label="Afshan Cosmetics & Jewellery — home" className="shrink-0">
      {content}
    </Link>
  );
}
