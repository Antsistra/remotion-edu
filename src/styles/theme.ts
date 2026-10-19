export const colors = {
  ink: '#0B1020',
  panel: '#121A30',
  panelHi: '#18223F',
  line: '#26324F',
  fg: '#E8ECF5',
  muted: '#8F9BB5',
  auth: '#22D3EE',
  valid: '#34D399',
  warn: '#F59E0B',
  bad: '#F87171',
} as const;

export type Tone = 'auth' | 'valid' | 'warn' | 'bad' | 'muted';

export const toneColor = (tone: Tone): string => colors[tone];
