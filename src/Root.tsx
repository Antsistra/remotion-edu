import React from 'react';
import {Composition} from 'remotion';
import './styles/globals.css';
import {EducationalVideo} from './compositions/EducationalVideo';
import {FPS, HEIGHT, TOTAL_FRAMES, WIDTH} from './data/researchData';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="EducationalVideo"
      component={EducationalVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
