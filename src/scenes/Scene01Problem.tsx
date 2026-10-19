import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnimatedText} from '../components/AnimatedText';
import {SampleImage} from '../components/SampleImage';
import {SectionLabel} from '../components/SectionLabel';
import {easeInOut, progress} from '../components/motion';
import {results} from '../data/researchData';
import {fontMono} from '../styles/fonts';
import {colors} from '../styles/theme';

const Chip: React.FC<{label: string; delay: number}> = ({label, delay}) => {
  const frame = useCurrentFrame();
  const enter = progress(frame, delay, 16);
  const fly = progress(frame, 100, 28, easeInOut);
  return (
    <div
      style={{
        padding: '6px 20px',
        borderRadius: 999,
        border: `2px solid ${colors.auth}`,
        color: colors.auth,
        fontSize: 32,
        fontWeight: 600,
        opacity: enter * (1 - fly),
        transform: `translateX(${fly * 360}px) scale(${0.8 + enter * 0.2})`,
      }}
    >
      {label}
    </div>
  );
};

const HashCard: React.FC<{
  caption: string;
  hash: string;
  color: string;
  enter: number;
  tag?: string;
  verdict?: number;
}> = ({caption, hash, color, enter, tag, verdict = 0}) => (
  <div
    style={{
      height: 150,
      borderRadius: 20,
      backgroundColor: colors.panel,
      border: `2px solid ${colors.line}`,
      padding: '18px 28px',
      opacity: enter,
      transform: `translateY(${(1 - enter) * 24}px)`,
      position: 'relative',
    }}
  >
    <div className="flex justify-between" style={{fontSize: 32, color: colors.muted}}>
      <span>{caption}</span>
      {tag && <span style={{fontSize: 28}}>{tag}</span>}
    </div>
    <div className="flex items-center justify-between" style={{marginTop: 14}}>
      <span style={{fontFamily: fontMono, fontSize: 48, fontWeight: 700, color}}>
        {hash}
      </span>
      {verdict > 0 && (
        <span
          style={{
            opacity: verdict,
            padding: '6px 22px',
            borderRadius: 999,
            backgroundColor: colors.bad,
            color: colors.ink,
            fontSize: 32,
            fontWeight: 800,
          }}
        >
          Tidak cocok
        </span>
      )}
    </div>
  </div>
);

export const Scene01Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const tileA = progress(frame, 25, 25);
  const arrow = progress(frame, 70, 22);
  const pill = progress(frame, 72, 18);
  const tileB = progress(frame, 90, 24);
  const compression = progress(frame, 100, 30);
  const capB = progress(frame, 125, 18);
  const hashA = progress(frame, 135, 20);
  const hashB = progress(frame, 150, 20);
  const verdict = progress(frame, 170, 14);
  const neq = spring({frame: Math.max(0, frame - 160), fps, config: {damping: 14, stiffness: 140}});
  const message = progress(frame, 190, 22);

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 80, top: 140}}>
        <SectionLabel index="01" label="Masalah" color={colors.warn} />
      </div>

      <div style={{position: 'absolute', left: 80, top: 220, width: 920}}>
        <AnimatedText
          text={'Bisa dipercaya,\nmeski sudah dikompresi?'}
          fontSize={92}
          delay={6}
          color={colors.fg}
        />
      </div>

      {/* Stage */}
      <div style={{position: 'absolute', left: 80, top: 620, width: 920, height: 860}}>
        {/* Tile asli */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            opacity: tileA,
            transform: `scale(${0.9 + tileA * 0.1})`,
          }}
        >
          <SampleImage size={300} uid="s1-a" />
        </div>
        <div
          style={{position: 'absolute', left: 0, top: 316, fontSize: 34, color: colors.muted, opacity: tileA}}
        >
          Asli · PNG
        </div>
        <div style={{position: 'absolute', left: 0, top: 372, display: 'flex', gap: 14}}>
          <Chip label="EXIF" delay={50} />
          <Chip label="metadata" delay={56} />
        </div>

        {/* Panah + WhatsApp */}
        <svg
          width={320}
          height={300}
          style={{position: 'absolute', left: 300, top: 0}}
          viewBox="0 0 320 300"
        >
          <line
            x1={20}
            y1={150}
            x2={20 + 260 * arrow}
            y2={150}
            stroke={colors.muted}
            strokeWidth={4}
            strokeLinecap="round"
          />
          <path
            d="M268 134 L298 150 L268 166"
            fill="none"
            stroke={colors.muted}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={arrow > 0.95 ? 1 : 0}
          />
        </svg>
        <div
          className="flex items-center justify-center"
          style={{
            position: 'absolute',
            left: 340,
            top: 112,
            width: 240,
            height: 76,
            borderRadius: 999,
            backgroundColor: colors.panelHi,
            border: `2px solid ${colors.line}`,
            fontSize: 34,
            fontWeight: 600,
            color: colors.fg,
            opacity: pill,
            transform: `scale(${0.85 + pill * 0.15})`,
          }}
        >
          WhatsApp
        </div>

        {/* Tile terkompresi */}
        <div
          style={{
            position: 'absolute',
            left: 620,
            top: 0,
            opacity: tileB,
            transform: `scale(${0.9 + tileB * 0.1})`,
          }}
        >
          <SampleImage size={300} uid="s1-b" compression={compression * 0.9} />
        </div>
        <div
          style={{position: 'absolute', left: 620, top: 316, fontSize: 32, whiteSpace: 'nowrap', color: colors.muted, opacity: capB}}
        >
          Rekompresi JPEG
        </div>
        <div
          style={{position: 'absolute', left: 620, top: 372, fontSize: 32, fontWeight: 600, whiteSpace: 'nowrap', color: colors.bad, opacity: capB}}
        >
          EXIF dibuang
        </div>

        {/* Hash */}
        <div style={{position: 'absolute', left: 0, top: 470, width: 920}}>
          <HashCard
            caption="SHA-256 · berkas asli"
            hash="9F2C 41A7 D03B 77E1"
            color={colors.auth}
            enter={hashA}
            tag="ilustrasi"
          />
        </div>
        <svg
          width={56}
          height={56}
          viewBox="0 0 56 56"
          style={{
            position: 'absolute',
            left: 432,
            top: 626,
            opacity: neq,
            transform: `scale(${neq})`,
          }}
        >
          <g stroke={colors.bad} strokeWidth={6} strokeLinecap="round">
            <line x1={8} y1={20} x2={48} y2={20} />
            <line x1={8} y1={38} x2={48} y2={38} />
            <line x1={38} y1={6} x2={18} y2={52} />
          </g>
        </svg>
        <div style={{position: 'absolute', left: 0, top: 690, width: 920}}>
          <HashCard
            caption="SHA-256 · setelah WhatsApp"
            hash="3B7D C9E0 18F4 A52A"
            color={colors.bad}
            enter={hashB}
            verdict={verdict}
          />
        </div>
      </div>

      {/* Pesan */}
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 1520,
          width: 920,
          opacity: message,
          transform: `translateY(${(1 - message) * 20}px)`,
        }}
      >
        <div style={{fontFamily: fontMono, fontSize: 84, fontWeight: 700, color: colors.bad, lineHeight: 1}}>
          {results.web.hashMatch.value}/{results.web.hashMatch.total}
          <span style={{fontSize: 44, color: colors.fg, fontFamily: 'inherit', fontWeight: 600}}>
            {' '}hash cocok
          </span>
        </div>
        <div style={{marginTop: 18, fontSize: 44, lineHeight: 1.25, color: colors.fg}}>
          Hash tidak cukup untuk membuktikan asal gambar lewat kanal ini.
        </div>
      </div>
    </AbsoluteFill>
  );
};
