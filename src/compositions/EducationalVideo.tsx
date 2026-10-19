import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {SceneTransition} from '../components/SceneTransition';
import {HEIGHT, SCENES, WIDTH} from '../data/researchData';
import {Scene01Problem} from '../scenes/Scene01Problem';
import {Scene02DualWatermark} from '../scenes/Scene02DualWatermark';
import {Scene03PostQuantum} from '../scenes/Scene03PostQuantum';
import {Scene04Results} from '../scenes/Scene04Results';
import {Scene05Conclusion} from '../scenes/Scene05Conclusion';
import {fontSans} from '../styles/fonts';
import {colors} from '../styles/theme';

/** Latar global: grid teknis dengan drift pelan (kamera virtual) dan vinyet. */
const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <svg width={WIDTH} height={HEIGHT} style={{position: 'absolute', inset: 0}}>
        <defs>
          <pattern id="grid" width={60} height={60} patternUnits="userSpaceOnUse">
            <path d="M60 0 H0 V60" fill="none" stroke={colors.line} strokeWidth={1.5} opacity={0.35} />
          </pattern>
          <radialGradient id="vignette" cx="50%" cy="38%" r="75%">
            <stop offset="0" stopColor="#141D3A" stopOpacity={0.9} />
            <stop offset="1" stopColor={colors.ink} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill="url(#vignette)" />
        <g transform={`translate(0 ${-(frame * 0.2) % 60})`}>
          <rect y={0} width={WIDTH} height={HEIGHT + 60} fill="url(#grid)" />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

const scenes = [
  {name: 'Masalah', range: SCENES.problem, Component: Scene01Problem},
  {name: 'Dual-watermark', range: SCENES.dual, Component: Scene02DualWatermark},
  {name: 'Pascakuantum', range: SCENES.postQuantum, Component: Scene03PostQuantum},
  {name: 'Hasil pengujian', range: SCENES.results, Component: Scene04Results},
  {name: 'Kesimpulan', range: SCENES.conclusion, Component: Scene05Conclusion},
] as const;

export const EducationalVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: colors.ink, fontFamily: fontSans, color: colors.fg}}>
      <Backdrop />
      {scenes.map(({name, range, Component}) => (
        <Sequence key={name} name={name} from={range.from} durationInFrames={range.duration}>
          <SceneTransition durationInFrames={range.duration}>
            <Component />
          </SceneTransition>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
