import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnimatedText} from '../components/AnimatedText';
import {SampleImage} from '../components/SampleImage';
import {SectionLabel} from '../components/SectionLabel';
import {easeInOut, progress} from '../components/motion';
import {scheme} from '../data/researchData';
import {fontMono} from '../styles/fonts';
import {colors} from '../styles/theme';

const fmt = (n: number) => n.toLocaleString('id-ID');

const panelStyle = (color: string, enter: number): React.CSSProperties => ({
  position: 'absolute',
  left: 0,
  width: 920,
  borderRadius: 24,
  backgroundColor: colors.panel,
  border: `2px solid ${color}`,
  padding: '20px 30px',
  opacity: enter,
  transform: `translateY(${(1 - enter) * 24}px)`,
});

const PanelTag: React.FC<{text: string; color: string}> = ({text, color}) => (
  <div style={{fontSize: 30, fontWeight: 600, letterSpacing: '0.16em', color}}>{text}</div>
);

const Connector: React.FC<{top: number; height: number; packet: number; label?: string}> = ({
  top,
  height,
  packet,
  label,
}) => (
  <div style={{position: 'absolute', left: 0, top, width: 920, height}}>
    <div
      style={{
        position: 'absolute',
        left: 459,
        top: 0,
        width: 3,
        height: height * Math.min(1, packet * 1.5),
        backgroundColor: colors.muted,
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 450,
        top: height * packet - 10,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.auth,
        opacity: packet > 0 && packet < 1 ? 1 : 0,
      }}
    />
    {label && (
      <div
        style={{
          position: 'absolute',
          left: 490,
          top: 4,
          fontSize: 30,
          color: colors.muted,
          opacity: packet > 0.3 ? 1 : 0,
        }}
      >
        {label}
      </div>
    )}
  </div>
);

export const Scene03PostQuantum: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const badge = progress(frame, 20, 22);
  const pA = progress(frame, 40, 22);
  const packet1 = progress(frame, 70, 26, easeInOut);
  const pB = progress(frame, 85, 22);
  const row = (i: number) => progress(frame, 100 + i * 14, 18);
  const packet2 = progress(frame, 140, 24, easeInOut);
  const pC = progress(frame, 148, 22);
  const bar1 = progress(frame, 165, 30, easeInOut);
  const bar2 = progress(frame, 180, 30, easeInOut);
  const valid = spring({frame: Math.max(0, frame - 206), fps, config: {damping: 14, stiffness: 150}});
  const msg = progress(frame, 215, 22);
  const note = progress(frame, 236, 20);

  const rows = ['Sertifikat SHA-256 per blok', 'Root hash', 'Tanda tangan ML-DSA-44'];
  const pkRatio = scheme.publicKeyBytes / scheme.signatureBytes;

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 80, top: 140}}>
        <SectionLabel index="03" label="Pascakuantum" color={colors.auth} />
      </div>

      <div style={{position: 'absolute', left: 80, top: 220, width: 920}}>
        <AnimatedText text={'Keamanan\npascakuantum'} fontSize={92} delay={6} color={colors.fg} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 452,
          padding: '8px 28px',
          borderRadius: 999,
          border: `3px solid ${colors.auth}`,
          fontFamily: fontMono,
          fontSize: 44,
          fontWeight: 700,
          color: colors.auth,
          opacity: badge,
          transform: `scale(${0.9 + badge * 0.1})`,
          transformOrigin: 'left center',
        }}
      >
        ML-DSA-44 · FIPS 204
      </div>

      <div style={{position: 'absolute', left: 80, top: 570, width: 920, height: 840}}>
        {/* A: piksel */}
        <div style={{...panelStyle(colors.auth, pA), top: 0, height: 170}}>
          <PanelTag text="DI DALAM PIKSEL" color={colors.auth} />
          <div className="flex items-center" style={{marginTop: 10, gap: 24}}>
            <SampleImage size={90} uid="s3-a" radius={12} />
            <div style={{fontFamily: fontMono, fontSize: 38, fontWeight: 700, color: colors.fg}}>
              enrollment_id · {scheme.idBits} bit
            </div>
          </div>
        </div>

        <Connector top={170} height={40} packet={packet1} />

        {/* B: server */}
        <div style={{...panelStyle(colors.muted, pB), top: 210, height: 280}}>
          <PanelTag text="DISIMPAN DI SERVER" color={colors.muted} />
          {rows.map((r, i) => (
            <div
              key={r}
              className="flex items-center"
              style={{
                marginTop: i === 0 ? 14 : 8,
                height: 62,
                gap: 18,
                opacity: row(i),
                transform: `translateX(${(1 - row(i)) * 30}px)`,
              }}
            >
              <div style={{width: 16, height: 16, borderRadius: 4, backgroundColor: colors.fg}} />
              <span style={{fontSize: 40, fontWeight: 600, color: colors.fg}}>{r}</span>
            </div>
          ))}
        </div>

        <Connector top={490} height={40} packet={packet2} />

        {/* C: verifikasi */}
        <div style={{...panelStyle(colors.valid, pC), top: 530, height: 310}}>
          <PanelTag text="VERIFIKASI · KUNCI PUBLIK" color={colors.valid} />
          {[
            {label: 'Tanda tangan', bytes: scheme.signatureBytes, ratio: 1, p: bar1},
            {label: 'Kunci publik', bytes: scheme.publicKeyBytes, ratio: pkRatio, p: bar2},
          ].map((b) => (
            <div key={b.label} style={{marginTop: 12}}>
              <div className="flex justify-between" style={{fontSize: 36, color: colors.fg}}>
                <span>{b.label}</span>
                <span style={{fontFamily: fontMono, fontWeight: 700}}>
                  {fmt(Math.round(b.bytes * b.p))} byte
                </span>
              </div>
              <div style={{marginTop: 6, height: 12, borderRadius: 6, backgroundColor: colors.line}}>
                <div
                  style={{
                    width: `${b.ratio * b.p * 100}%`,
                    height: '100%',
                    borderRadius: 6,
                    backgroundColor: colors.auth,
                  }}
                />
              </div>
            </div>
          ))}
          <div
            className="flex items-center"
            style={{
              marginTop: 18,
              gap: 14,
              opacity: valid,
              transform: `scale(${0.9 + valid * 0.1})`,
              transformOrigin: 'left center',
            }}
          >
            <svg width={44} height={44} viewBox="0 0 44 44">
              <circle cx={22} cy={22} r={22} fill={colors.valid} />
              <path
                d="M12 23 L19 30 L33 15"
                fill="none"
                stroke={colors.ink}
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={{fontSize: 40, fontWeight: 800, color: colors.valid}}>
              Tanda tangan valid
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 1470,
          width: 920,
          fontSize: 44,
          lineHeight: 1.28,
          color: colors.fg,
          opacity: msg,
          transform: `translateY(${(1 - msg) * 20}px)`,
        }}
      >
        Piksel membawa pengenal pendek. Tanda tangan 2.420 byte terlalu besar untuk disisipkan,
        jadi disimpan di server.
      </div>
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 1654,
          width: 920,
          fontSize: 34,
          lineHeight: 1.3,
          color: colors.warn,
          opacity: note,
        }}
      >
        Membuktikan asal penerbit dan integritas citra, bukan kebenaran objek yang difoto.
      </div>
    </AbsoluteFill>
  );
};
