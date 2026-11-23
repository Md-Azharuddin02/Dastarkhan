import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface FoodImageProps {
  src: string;
  alt: string;
  aspectClassName?: string;
  className?: string;
  priority?: boolean;
  zoomOnHover?: boolean;
}

export function FoodImage({
  src,
  alt,
  aspectClassName = 'aspect-[4/3]',
  className = '',
  priority = false,
  zoomOnHover = true,
}: FoodImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-sand ${aspectClassName} ${className}`}
    >
      {!loaded && !failed && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-sand"
        />
      )}

      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-leaf-soft px-4 text-center text-muted">
          <UtensilsCrossed className="h-7 w-7 text-fresh" aria-hidden="true" />
          <span className="text-xs font-medium text-charcoal">{alt}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-all duration-500 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${zoomOnHover ? 'group-hover:scale-[1.04]' : ''}`}
        />
      )}
    </div>
  );
}
