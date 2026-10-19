import React from 'react';
import {random} from 'remotion';

type Props = {
  size: number;
  uid: string; // id unik untuk defs SVG
  /** 0..1: kekuatan artefak kompresi (mosaik blok + penurunan kontras). */
  compression?: number;
  /** Potong area (satuan 0..200) untuk memperbesar satu blok. */
  crop?: {x: number; y: number; w: number; h: number};
  blur?: number;
  radius?: number;
};

const CELLS = 20;
const CELL = 200 / CELLS;

/** Ilustrasi gambar generik (bukan data penelitian) berbasis SVG vektor. */
export const SampleImage: React.FC<Props> = ({
  size,
  uid,
  compression = 0,
  crop,
  blur = 0,
  radius = 20,
}) => {
  const vb = crop ? `${crop.x} ${crop.y} ${crop.w} ${crop.h}` : '0 0 200 200';
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        overflow: 'hidden',
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
      }}
    >
      <svg width={size} height={size} viewBox={vb} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1E3A5F" />
            <stop offset="0.7" stopColor="#C9825A" />
            <stop offset="1" stopColor="#E9A36B" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill={`url(#${uid}-sky)`} />
        <circle cx="142" cy="60" r="24" fill="#FDE7B0" />
        <path d="M0 150 L50 100 L90 135 L130 90 L200 150 V200 H0Z" fill="#14233D" />
        <path d="M0 175 L60 140 L120 170 L200 135 V200 H0Z" fill="#0D1A30" />
        {compression > 0 &&
          Array.from({length: CELLS * CELLS}, (_, i) => {
            const cx = i % CELLS;
            const cy = Math.floor(i / CELLS);
            const r = random(`${uid}-${i}`);
            return (
              <rect
                key={i}
                x={cx * CELL}
                y={cy * CELL}
                width={CELL}
                height={CELL}
                fill={r > 0.5 ? '#FFFFFF' : '#000000'}
                opacity={(0.04 + r * 0.2) * compression}
              />
            );
          })}
      </svg>
    </div>
  );
};
