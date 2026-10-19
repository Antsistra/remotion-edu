import React from 'react';
import {useCurrentFrame} from 'remotion';
import {progress} from './motion';

type Props = {
  text: string; // gunakan "\n" untuk baris baru eksplisit
  fontSize: number;
  delay?: number;
  stagger?: number;
  duration?: number;
  weight?: number;
  color?: string;
  lineHeight?: number;
  letterSpacing?: number;
  fontFamily?: string;
  align?: 'left' | 'center';
};

/** Reveal per kata dengan masking (translateY + opacity). Murni berbasis frame. */
export const AnimatedText: React.FC<Props> = ({
  text,
  fontSize,
  delay = 0,
  stagger = 3,
  duration = 22,
  weight = 800,
  color,
  lineHeight = 1.1,
  letterSpacing = -0.02,
  fontFamily,
  align = 'left',
}) => {
  const frame = useCurrentFrame();
  let wordIndex = 0;
  const pad = fontSize * 0.14;

  return (
    <div
      style={{
        fontSize,
        fontWeight: weight,
        lineHeight,
        color,
        fontFamily,
        letterSpacing: `${letterSpacing}em`,
        textAlign: align,
      }}
    >
      {text.split('\n').map((line, li) => (
        <div
          key={li}
          className={
            align === 'center' ? 'flex flex-wrap justify-center' : 'flex flex-wrap'
          }
          style={{columnGap: fontSize * 0.26}}
        >
          {line
            .split(' ')
            .filter(Boolean)
            .map((word) => {
              const i = wordIndex++;
              const p = progress(frame, delay + i * stagger, duration);
              return (
                <span
                  key={`${li}-${i}`}
                  className="inline-block overflow-hidden"
                  style={{
                    paddingTop: pad,
                    paddingBottom: pad,
                    marginTop: -pad,
                    marginBottom: -pad,
                  }}
                >
                  <span
                    className="inline-block"
                    style={{
                      transform: `translateY(${(1 - p) * 110}%)`,
                      opacity: p,
                    }}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
        </div>
      ))}
    </div>
  );
};
