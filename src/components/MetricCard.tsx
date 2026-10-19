import React from 'react';
import {useCurrentFrame} from 'remotion';
import {fontMono} from '../styles/fonts';
import {colors, Tone, toneColor} from '../styles/theme';
import {easeInOut, progress} from './motion';

type Props = {
  value: number;
  total?: number; // bila ada: tampil "value/total"
  decimals?: number;
  ratio: number; // 0..1, panjang bar
  marker?: number; // 0..1, garis ambang pada bar
  tone: Tone;
  delay: number;
};

export const MetricCard: React.FC<Props> = ({
  value,
  total,
  decimals = 3,
  ratio,
  marker,
  tone,
  delay,
}) => {
  const frame = useCurrentFrame();
  const enter = progress(frame, delay, 18);
  const count = progress(frame, delay + 6, 40, easeInOut);
  const shown = value * count;
  const text =
    total !== undefined
      ? String(Math.round(shown))
      : shown.toFixed(decimals).replace('.', ',');
  const c = toneColor(tone);

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: colors.panel,
        border: `2px solid ${colors.line}`,
        borderLeft: `6px solid ${c}`,
        borderRadius: 20,
        padding: '18px 24px 22px',
        opacity: enter,
        transform: `translateY(${(1 - enter) * 24}px)`,
      }}
    >
      <div
        className="flex items-baseline"
        style={{fontFamily: fontMono, lineHeight: 1, height: 64}}
      >
        <span style={{fontSize: 60, fontWeight: 700, color: c}}>{text}</span>
        {total !== undefined && (
          <span style={{fontSize: 38, fontWeight: 500, color: colors.muted}}>
            /{total}
          </span>
        )}
      </div>
      <div
        style={{
          position: 'relative',
          marginTop: 14,
          height: 10,
          borderRadius: 5,
          backgroundColor: colors.line,
        }}
      >
        <div
          style={{
            width: `${ratio * count * 100}%`,
            height: '100%',
            borderRadius: 5,
            backgroundColor: c,
          }}
        />
        {marker !== undefined && (
          <div
            style={{
              position: 'absolute',
              left: `${marker * 100}%`,
              top: -8,
              width: 3,
              height: 26,
              backgroundColor: colors.fg,
            }}
          />
        )}
      </div>
    </div>
  );
};
