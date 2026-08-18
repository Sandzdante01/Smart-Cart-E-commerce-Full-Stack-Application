import React, { useState } from 'react';
import { classNames } from '../../utils/format';

export function ProductGallery({ images, name }: {images: string[];name: string;}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');

  return (
    <div>
      <div
        className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-white"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width * 100;
          const y = (e.clientY - rect.top) / rect.height * 100;
          setOrigin(`${x}% ${y}%`);
        }}>
        
        <img
          src={images[active]}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 ease-smooth"
          style={{ transformOrigin: origin, transform: zoom ? 'scale(1.7)' : 'scale(1)' }} />
        
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-ink/70 px-2 py-1 text-[11px] font-semibold text-white">
          Hover to zoom
        </span>
      </div>

      <div className="mt-3 flex gap-3 overflow-x-auto pb-1 sc-hide-scrollbar">
        {images.map((image, index) =>
        <button
          key={`${image}-${index}`}
          type="button"
          onClick={() => setActive(index)}
          aria-label={`Show image ${index + 1} of ${name}`}
          aria-current={index === active}
          className={classNames(
            'h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-colors duration-150 ease-smooth',
            index === active ? 'border-primary-600' : 'border-line hover:border-primary-300'
          )}>
          
            <img src={image} alt="" className="h-full w-full object-cover" />
          </button>
        )}
      </div>
    </div>);

}