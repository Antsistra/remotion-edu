import {Easing, interpolate} from 'remotion';

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** Progres 0..1 dari frame `start` selama `duration` frame (deterministik, ter-clamp). */
export const progress = (
  frame: number,
  start: number,
  duration: number,
  easing: (t: number) => number = easeOut,
): number =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

/** Opacity masuk lalu keluar: 0 -> 1 pada [inAt, inAt+d], 1 -> 0 pada [outAt, outAt+d]. */
export const visibleBetween = (
  frame: number,
  inAt: number,
  outAt: number,
  d = 14,
): number => progress(frame, inAt, d) * (1 - progress(frame, outAt, d));
