import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {AnimatedText} from '../components/AnimatedText';
import {MetricCard} from '../components/MetricCard';
import {SectionLabel} from '../components/SectionLabel';
import {progress} from '../components/motion';
import {results, scheme} from '../data/researchData';
import {colors} from '../styles/theme';

const COL = 440;
const GAP = 40;

const GroupHeader: React.FC<{text: string; color: string; enter: number}> = ({text, color, enter}) => (
  <div className="flex items-center" style={{height: 44, gap: 18, opacity: enter}}>
    <span style={{fontSize: 30, fontWeight: 600, letterSpacing: '0.16em', color}}>{text}</span>
    <div style={{flex: 1, height: 2, backgroundColor: color, opacity: 0.5}} />
  </div>
);

const RowLabel: React.FC<{text: string; enter: number}> = ({text, enter}) => (
  <div style={{fontSize: 34, color: colors.fg, height: 42, paddingTop: 4, opacity: enter}}>{text}</div>
);

export const Scene04Results: React.FC = () => {
  const frame = useCurrentFrame();
  const {web, mobile, berScaleMax} = results;

  const colHead = progress(frame, 25, 20);
  const gA = progress(frame, 40, 18);
  const gB = progress(frame, 130, 18);
  const dimA = 1 - 0.45 * progress(frame, 300, 24);
  const frameB = progress(frame, 300, 30);
  const caption = progress(frame, 320, 22);
  const note = progress(frame, 350, 20);
  const r = (d: number) => progress(frame, d - 12, 16);
  const marker = scheme.berThreshold / berScaleMax;

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 80, top: 140}}>
        <SectionLabel index="04" label="Hasil pengujian nyata" color={colors.valid} />
      </div>

      <div style={{position: 'absolute', left: 80, top: 220, width: 920}}>
        <AnimatedText text={'Dua kanal,\nhasil berbeda'} fontSize={92} delay={6} color={colors.fg} />
      </div>

      <div style={{position: 'absolute', left: 80, top: 450, width: 920}}>
        {/* Header kolom */}
        <div className="flex" style={{gap: GAP, opacity: colHead}}>
          <div
            className="flex items-center justify-center"
            style={{width: COL, height: 64, borderRadius: 16, border: `3px solid ${colors.auth}`, fontSize: 38, fontWeight: 800, color: colors.auth}}
          >
            WhatsApp Web
          </div>
          <div
            className="flex items-center justify-center"
            style={{width: COL, height: 64, borderRadius: 16, border: `3px solid ${colors.warn}`, fontSize: 38, fontWeight: 800, color: colors.warn}}
          >
            WhatsApp seluler
          </div>
        </div>

        {/* Kelompok A: asal */}
        <div style={{marginTop: 14, opacity: dimA}}>
          <GroupHeader text="ASAL PENERBIT" color={colors.auth} enter={gA} />
          <RowLabel text="ID terbaca" enter={r(55)} />
          <div className="flex" style={{gap: GAP}}>
            <MetricCard value={web.idRead.value} total={web.idRead.total} ratio={1} tone="valid" delay={55} />
            <MetricCard value={mobile.idRead.value} total={mobile.idRead.total} ratio={1} tone="valid" delay={55} />
          </div>
          <RowLabel text="Tanda tangan valid" enter={r(75)} />
          <div className="flex" style={{gap: GAP}}>
            <MetricCard value={web.signatureValid.value} total={web.signatureValid.total} ratio={1} tone="valid" delay={75} />
            <MetricCard value={mobile.signatureValid.value} total={mobile.signatureValid.total} ratio={1} tone="valid" delay={75} />
          </div>
        </div>

        {/* Kelompok B: integritas */}
        <div
          style={{
            marginTop: 10,
            position: 'relative',
            padding: '0 0 6px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: -16,
              right: -16,
              top: -6,
              bottom: -10,
              borderRadius: 24,
              border: `3px solid ${colors.warn}`,
              opacity: frameB,
            }}
          />
          <GroupHeader text="INTEGRITAS CITRA" color={colors.warn} enter={gB} />
          <RowLabel text="Citra utuh dinilai malicious" enter={r(145)} />
          <div className="flex" style={{gap: GAP}}>
            <MetricCard
              value={web.intactMalicious.value}
              total={web.intactMalicious.total}
              ratio={web.intactMalicious.value / web.intactMalicious.total}
              tone="valid"
              delay={145}
            />
            <MetricCard
              value={mobile.intactMalicious.value}
              total={mobile.intactMalicious.total}
              ratio={mobile.intactMalicious.value / mobile.intactMalicious.total}
              tone="bad"
              delay={145}
            />
          </div>
          <RowLabel text="Manipulasi lokal terdeteksi" enter={r(185)} />
          <div className="flex" style={{gap: GAP}}>
            <MetricCard
              value={web.manipulationDetected.value}
              total={web.manipulationDetected.total}
              ratio={web.manipulationDetected.value / web.manipulationDetected.total}
              tone="warn"
              delay={185}
            />
            <MetricCard
              value={mobile.manipulationDetected.value}
              total={mobile.manipulationDetected.total}
              ratio={mobile.manipulationDetected.value / mobile.manipulationDetected.total}
              tone="warn"
              delay={185}
            />
          </div>
          <RowLabel text="BER citra utuh · garis = ambang blok 0,30" enter={r(225)} />
          <div className="flex" style={{gap: GAP}}>
            <MetricCard
              value={web.intactBer}
              ratio={web.intactBer / berScaleMax}
              marker={marker}
              tone="valid"
              delay={225}
            />
            <MetricCard
              value={mobile.intactBer}
              ratio={mobile.intactBer / berScaleMax}
              marker={marker}
              tone="warn"
              delay={225}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 1548,
          width: 920,
          fontSize: 44,
          fontWeight: 800,
          lineHeight: 1.2,
          color: colors.fg,
          opacity: caption,
          transform: `translateY(${(1 - caption) * 20}px)`,
        }}
      >
        Tanda tangan valid bukan berarti manipulasi terdeteksi.
      </div>
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 1700,
          width: 920,
          fontSize: 30,
          lineHeight: 1.3,
          color: colors.muted,
          opacity: note,
        }}
      >
        Skala terbatas (Web 60, seluler 10 citra): hasil indikatif.
      </div>
    </AbsoluteFill>
  );
};
