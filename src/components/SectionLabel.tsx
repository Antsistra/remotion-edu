import React from 'react';
import {useCurrentFrame} from 'remotion';
import {fontMono} from '../styles/fonts';
import {colors} from '../styles/theme';
import {progress} from './motion';

type Props = {
  index: string;
  label: string;
  color: string;
  delay?: number;
};

export const SectionLabel: React.FC<Props> = ({index, label, color, delay = 0}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, delay, 24);

  return (
    <div className="flex items-center" style={{opacity: p, gap: 20}}>
      <span
        style={{fontFamily: fontMono, fontSize: 34, fontWeight: 700, color}}
      >
        {index}
      </span>
      <div style={{height: 3, width: 80 * p, backgroundColor: color}} />
      <span
        className="uppercase"
        style={{
          fontSize: 34,
          fontWeight: 600,
          letterSpacing: '0.18em',
          color: colors.muted,
        }}
      >
        {label}
      </span>
    </div>
  );
};
