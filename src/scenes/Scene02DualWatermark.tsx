import React from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {AnimatedText} from '../components/AnimatedText';
import {SampleImage} from '../components/SampleImage';
import {SectionLabel} from '../components/SectionLabel';
import {WatermarkDiagram} from '../components/WatermarkDiagram';
import {easeInOut, progress, visibleBetween} from '../components/motion';
import {fontMono} from '../styles/fonts';
import {colors} from '../styles/theme';

const TILE = 760; // gambar utama
const CELL = TILE / 8; // grid 8x8 (skematis; satu sel = blok 32 x 32 piksel)
const BAND = 300; // ukuran satu sub-pita DWT
const BLOCK_FINAL = BAND * 2;
const BLOCK_CROP = {x: 125, y: 75, w: 25, h: 25}; // sel kolom 5, baris 3 pada grid 8x8 (satuan 0..200)
const BLOCK_COL = 5;
const BLOCK_ROW = 3;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const DetailBand: React.FC<{kind: 'HL' | 'LH' | 'HH'; size: number}> = ({kind, size}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    style={{borderRadius: 14, backgroundColor: '#0E1630', display: 'block'}}
  >
    {Array.from({length: 14}, (_, i) => {
      const p = random(`${kind}-p-${i}`) * 78 + 10; // posisi utama 10..88
      const q = random(`${kind}-q-${i}`) * 52 + 14; // awal garis 14..66
      const l = random(`${kind}-l-${i}`) * 18 + 8; // panjang 8..26
      const common = {
        key: i,
        stroke: colors.auth,
        strokeWidth: 2.2,
        strokeLinecap: 'round' as const,
        opacity: 0.35 + random(`${kind}-o-${i}`) * 0.5,
      };
      if (kind === 'HL') return <line {...common} x1={p} y1={q} x2={p} y2={q + l} />;
      if (kind === 'LH') return <line {...common} x1={q} y1={p} x2={q + l} y2={p} />;
      const y0 = random(`${kind}-y-${i}`) * 60 + 10; // awal diagonal 10..70
      return <line {...common} x1={q} y1={y0} x2={q + l * 0.7} y2={y0 + l * 0.7} />;
    })}
  </svg>
);

const BandLabel: React.FC<{text: string; tag?: string; tagColor?: string; tagIn?: number}> = ({
  text,
  tag,
  tagColor,
  tagIn = 0,
}) => (
  <>
    <div
      style={{
        position: 'absolute',
        left: 12,
        top: 12,
        padding: '2px 14px',
        borderRadius: 10,
        backgroundColor: 'rgba(11,16,32,0.85)',
        fontFamily: fontMono,
        fontSize: 32,
        fontWeight: 700,
        color: colors.fg,
      }}
    >
      {text}
    </div>
    {tag && (
      <div
        style={{
          position: 'absolute',
          left: 12,
          bottom: 12,
          padding: '2px 14px',
          borderRadius: 10,
          backgroundColor: tagColor,
          color: colors.ink,
          fontSize: 30,
          fontWeight: 800,
          opacity: tagIn,
        }}
      >
        {tag}
      </div>
    )}
  </>
);

export const Scene02DualWatermark: React.FC = () => {
  const frame = useCurrentFrame();

  // --- P1: gambar + grid ---
  const tileIn = progress(frame, 10, 30);
  const gridDraw = progress(frame, 40, 40);
  const p1Fade = 1 - progress(frame, 100, 22);
  const blockIn = progress(frame, 70, 16);

  // --- Transisi blok -> pusat, lalu pecah DWT ---
  const move = progress(frame, 100, 36, easeInOut);
  const blockSize = lerp(CELL, BLOCK_FINAL, move);
  const blockLeft = lerp(80 + BLOCK_COL * CELL, (920 - BLOCK_FINAL) / 2, move); // koordinat stage
  const blockTop = lerp(20 + BLOCK_ROW * CELL, 20, move);
  const split = progress(frame, 142, 30, easeInOut);
  const gap = split * 24;
  const p2Out = 1 - progress(frame, 232, 16);
  const blockSolid = (1 - progress(frame, 142, 14)) * p2Out;
  const bandsIn = progress(frame, 146, 14) * p2Out;
  const tagIn = progress(frame, 190, 16);
  const notes = progress(frame, 175, 18) * p2Out;

  // --- Caption bergantian ---
  const cap1 = visibleBetween(frame, 28, 112);
  const cap2 = visibleBetween(frame, 128, 236);
  const cap3 = progress(frame, 252, 18);

  const message = progress(frame, 340, 20);
  const band = BAND;

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 80, top: 140}}>
        <SectionLabel index="02" label="Solusi" color={colors.auth} />
      </div>

      <div style={{position: 'absolute', left: 80, top: 220, width: 920}}>
        <AnimatedText text={'Dua lapis\nwatermark'} fontSize={92} delay={6} color={colors.fg} />
      </div>

      {/* Caption */}
      <div style={{position: 'absolute', left: 80, top: 455, width: 920, height: 110, fontSize: 44, lineHeight: 1.25, color: colors.auth, fontWeight: 600}}>
        <div style={{position: 'absolute', opacity: cap1}}>Gambar dibagi menjadi blok 32 × 32 piksel</div>
        <div style={{position: 'absolute', opacity: cap2}}>DWT memisahkan bentuk kasar dari detail</div>
        <div style={{position: 'absolute', opacity: cap3}}>Dua lapis, dua tugas berbeda</div>
      </div>

      {/* Stage */}
      <div style={{position: 'absolute', left: 80, top: 620, width: 920, height: 900}}>
        {/* P1: gambar + grid */}
        <div
          style={{
            position: 'absolute',
            left: 80,
            top: 20,
            width: TILE,
            height: TILE,
            opacity: tileIn * p1Fade,
            transform: `scale(${0.94 + tileIn * 0.06})`,
          }}
        >
          <SampleImage size={TILE} uid="s2-main" radius={24} />
          <svg
            width={TILE}
            height={TILE}
            viewBox={`0 0 ${TILE} ${TILE}`}
            style={{position: 'absolute', left: 0, top: 0}}
          >
            {Array.from({length: 9}, (_, i) => (
              <React.Fragment key={i}>
                <line
                  x1={i * CELL}
                  y1={0}
                  x2={i * CELL}
                  y2={TILE * gridDraw}
                  stroke={colors.fg}
                  strokeOpacity={0.55}
                  strokeWidth={2}
                />
                <line
                  x1={0}
                  y1={i * CELL}
                  x2={TILE * gridDraw}
                  y2={i * CELL}
                  stroke={colors.fg}
                  strokeOpacity={0.55}
                  strokeWidth={2}
                />
              </React.Fragment>
            ))}
          </svg>
        </div>

        {/* Blok terpilih -> membesar -> DWT */}
        <div
          style={{
            position: 'absolute',
            left: blockLeft,
            top: blockTop,
            width: blockSize,
            height: blockSize,
            opacity: blockIn * blockSolid,
            outline: `${lerp(4, 6, move)}px solid ${colors.auth}`,
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <SampleImage
            size={blockSize}
            uid="s2-block"
            radius={0}
            crop={BLOCK_CROP}
          />
        </div>

        {/* Sub-pita DWT 2 x 2 */}
        <div
          style={{
            position: 'absolute',
            left: (920 - BLOCK_FINAL) / 2 - gap / 2,
            top: 20,
            width: band * 2 + gap,
            height: band * 2 + gap,
            opacity: bandsIn,
          }}
        >
          {([
            ['LL', 0, 0],
            ['HL', band + gap, 0],
            ['LH', 0, band + gap],
            ['HH', band + gap, band + gap],
          ] as const).map(([name, x, y]) => (
            <div key={name} style={{position: 'absolute', left: x, top: y, width: band, height: band}}>
              {name === 'LL' ? (
                <SampleImage
                  size={band}
                  uid="s2-ll"
                  radius={14}
                  blur={2}
                  crop={BLOCK_CROP}
                />
              ) : (
                <DetailBand kind={name} size={band} />
              )}
              <BandLabel
                text={name}
                tag={name === 'LL' ? 'ID robust' : name === 'HL' ? 'fingerprint' : undefined}
                tagColor={name === 'LL' ? colors.auth : colors.warn}
                tagIn={tagIn}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 690,
            width: 920,
            opacity: notes,
            fontSize: 40,
            lineHeight: 1.35,
            color: colors.fg,
          }}
        >
          <div><span style={{fontFamily: fontMono, fontWeight: 700, color: colors.auth}}>LL</span> · bentuk kasar</div>
          <div><span style={{fontFamily: fontMono, fontWeight: 700, color: colors.warn}}>HL · LH · HH</span> · detail halus</div>
        </div>

        {/* P3: dua lapis */}
        <div style={{opacity: progress(frame, 246, 12)}}>
          <WatermarkDiagram start={255} />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 1600,
          width: 920,
          fontSize: 44,
          lineHeight: 1.3,
          color: colors.fg,
          opacity: message,
          transform: `translateY(${(1 - message) * 20}px)`,
        }}
      >
        ID pendek menunjuk ke sertifikat. Fingerprint memeriksa perubahan lokal.
      </div>
    </AbsoluteFill>
  );
};
