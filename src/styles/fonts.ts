import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

// Hanya subset latin: hindari glyph di luar subset (≠, →, ✓, τ) pada teks.
// Simbol tersebut digambar sebagai SVG.
export const {fontFamily: fontSans} = loadInter('normal', {
  weights: ['400', '600', '800'],
  subsets: ['latin'],
});

export const {fontFamily: fontMono} = loadMono('normal', {
  weights: ['500', '700'],
  subsets: ['latin'],
});
