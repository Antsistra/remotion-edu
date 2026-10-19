import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {AnimatedText} from '../components/AnimatedText';
import {SectionLabel} from '../components/SectionLabel';
import {progress} from '../components/motion';
import {fontMono} from '../styles/fonts';
import {colors} from '../styles/theme';

const points = [
  {n: '1', color: colors.valid, delay: 20, text: 'Asal penerbit tetap dapat ditelusuri setelah kompresi WhatsApp.'},
  {n: '2', color: colors.auth, delay: 90, text: 'Deteksi manipulasi lebih andal pada kompresi sedang.'},
  {
    n: '3',
    color: colors.warn,
    delay: 160,
    text: 'Ambang deteksi perlu dikalibrasi per kanal, khususnya untuk kompresi aplikasi seluler yang lebih berat.',
  },
] as const;

export const Scene05Conclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const source = progress(frame, 322, 20);

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 80, top: 140}}>
        <SectionLabel index="05" label="Kesimpulan" color={colors.valid} />
      </div>

      <div style={{position: 'absolute', left: 80, top: 240, width: 920, display: 'flex', flexDirection: 'column', gap: 24}}>
        {points.map((p) => {
          const enter = progress(frame, p.delay, 26);
          return (
            <div
              key={p.n}
              className="flex"
              style={{
                gap: 24,
                padding: '28px 30px',
                borderRadius: 24,
                backgroundColor: colors.panel,
                border: `2px solid ${colors.line}`,
                borderLeft: `8px solid ${p.color}`,
                opacity: enter,
                transform: `translateX(${(1 - enter) * 60}px)`,
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{width: 56, height: 56, flexShrink: 0, borderRadius: 28, backgroundColor: p.color, color: colors.ink, fontFamily: fontMono, fontSize: 32, fontWeight: 700}}
              >
                {p.n}
              </div>
              <div style={{fontSize: 46, lineHeight: 1.25, color: colors.fg, fontWeight: 600}}>
                {p.text}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{position: 'absolute', left: 80, top: 1130, width: 920}}>
        <AnimatedText text="Asal dapat ditelusuri." fontSize={84} delay={250} color={colors.valid} />
        <div style={{height: 14}} />
        <AnimatedText text="Integritas tetap perlu diuji." fontSize={84} delay={285} color={colors.warn} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 1690,
          width: 920,
          fontSize: 30,
          lineHeight: 1.3,
          color: colors.muted,
          opacity: source,
        }}
      >
        Sumber: Arifin, Suhariyanto, Winardi (2026). Jurnal Teknologi Informasi dan Komunikasi,
        Univ. Mandiri, Vol.19 No.1.
      </div>
    </AbsoluteFill>
  );
};
