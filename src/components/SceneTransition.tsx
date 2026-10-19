import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {easeInOut} from './motion';

type Props = {
  durationInFrames: number; // durasi Sequence induk
  fade?: number;
  children: React.ReactNode;
};

/** Fade + drift halus di awal dan akhir scene (frame lokal Sequence). */
export const SceneTransition: React.FC<Props> = ({
  durationInFrames,
  fade = 12,
  children,
}) => {
  const frame = useCurrentFrame();
  const inP = interpolate(frame, [0, fade], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeInOut,
  });
  const outP = interpolate(
    frame,
    [durationInFrames - fade, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut},
  );

  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(inP, outP),
        transform: `translateY(${(1 - inP) * 16}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
