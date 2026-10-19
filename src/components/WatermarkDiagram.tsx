import React from 'react';
import {random, useCurrentFrame} from 'remotion';
import {fontMono} from '../styles/fonts';
import {colors} from '../styles/theme';
import {easeInOut, progress} from './motion';

type Props = {
  /** Frame lokal (pada Sequence induk) saat diagram mulai muncul. */
  start: number;
};

const CertificateIcon: React.FC<{pop: number}> = ({pop}) => (
  <svg
    width={110}
    height={140}
    viewBox="0 0 110 140"
    style={{opacity: pop, transform: `scale(${0.7 + pop * 0.3})`}}
  >
    <path
      d="M10 6 H70 L100 36 V130 H10 Z"
      fill={colors.panelHi}
      stroke={colors.auth}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <path d="M70 6 V36 H100" fill="none" stroke={colors.auth} strokeWidth={4} strokeLinejoin="round" />
    <g stroke={colors.muted} strokeWidth={5} strokeLinecap="round">
      <line x1={26} y1={58} x2={80} y2={58} />
      <line x1={26} y1={74} x2={68} y2={74} />
    </g>
    <circle cx={55} cy={104} r={16} fill={colors.valid} />
    <path
      d="M47 104 L53 110 L64 97"
      fill="none"
      stroke={colors.ink}
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FLAGGED = new Set([10, 11, 19]); // posisi blok yang ditandai (ilustrasi)

/** Dua lapis watermark yang bergeser terpisah: Robust ID dan Semi-fragile fingerprint. */
export const WatermarkDiagram: React.FC<Props> = ({start}) => {
  const frame = useCurrentFrame();
  const l1 = progress(frame, start, 26);
  const l2In = progress(frame, start + 20, 16);
  const sep = progress(frame, start + 30, 34, easeInOut);
  const arrow = progress(frame, start + 80, 20);
  const cert = progress(frame, start + 92, 18);
  const flag = progress(frame, start + 100, 20);

  const cardBase: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    width: 920,
    borderRadius: 28,
    backgroundColor: colors.panel,
    padding: '34px 36px',
  };

  return (
    <div style={{position: 'relative', width: 920, height: 880}}>
      {/* Lapis 2 (di belakang, bergeser turun) */}
      <div
        style={{
          ...cardBase,
          top: sep * 420,
          height: 440,
          border: `3px solid ${colors.warn}`,
          opacity: l2In,
          zIndex: 1,
        }}
      >
        <div style={{fontSize: 46, fontWeight: 800, lineHeight: 1.15, color: colors.warn}}>
          2. Semi-fragile fingerprint — 256-bit
        </div>
        <div style={{marginTop: 10, fontSize: 40, color: colors.fg}}>
          Membantu melokalisasi manipulasi
        </div>
        <div className="flex" style={{marginTop: 30, gap: 30}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(8, 56px)', gap: 8}}>
            {Array.from({length: 24}, (_, i) => {
              const on = FLAGGED.has(i);
              return (
                <div
                  key={i}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 8,
                    backgroundColor: on
                      ? `rgba(245,158,11,${0.15 + flag * 0.85})`
                      : colors.panelHi,
                    border: `2px solid ${on && flag > 0.5 ? colors.warn : colors.line}`,
                  }}
                />
              );
            })}
          </div>
          <div style={{flex: 1, opacity: flag}}>
            <div style={{fontFamily: fontMono, fontSize: 38, fontWeight: 700, color: colors.warn}}>
              BER per blok
            </div>
            <div style={{marginTop: 8, fontSize: 32, lineHeight: 1.25, color: colors.muted}}>
              blok di atas ambang ditandai
            </div>
          </div>
        </div>
      </div>

      {/* Lapis 1 (di depan) */}
      <div
        style={{
          ...cardBase,
          top: 0,
          height: 380,
          border: `3px solid ${colors.auth}`,
          opacity: l1,
          transform: `translateY(${(1 - l1) * 30}px)`,
          zIndex: 2,
        }}
      >
        <div style={{fontSize: 50, fontWeight: 800, color: colors.auth}}>
          1. Robust ID — 32-bit
        </div>
        <div style={{marginTop: 10, fontSize: 40, color: colors.fg}}>
          Menelusuri sertifikat penerbit
        </div>
        <div className="flex items-center" style={{marginTop: 34, gap: 24}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(16, 28px)', gap: 6}}>
            {Array.from({length: 32}, (_, i) => {
              const fill = progress(frame, start + 36 + i * 1.2, 10);
              const bit = random(`id-${i}`) > 0.5;
              return (
                <div
                  key={i}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    backgroundColor: bit
                      ? `rgba(34,211,238,${0.2 + fill * 0.8})`
                      : colors.panelHi,
                    border: `2px solid ${colors.line}`,
                  }}
                />
              );
            })}
          </div>
          <svg width={70} height={40} viewBox="0 0 70 40">
            <line
              x1={4}
              y1={20}
              x2={4 + 52 * arrow}
              y2={20}
              stroke={colors.auth}
              strokeWidth={5}
              strokeLinecap="round"
            />
            <path
              d="M48 8 L64 20 L48 32"
              fill="none"
              stroke={colors.auth}
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={arrow > 0.95 ? 1 : 0}
            />
          </svg>
          <CertificateIcon pop={cert} />
        </div>
      </div>
    </div>
  );
};
