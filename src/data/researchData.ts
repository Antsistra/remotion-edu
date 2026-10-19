/**
 * Seluruh angka bersumber dari jurnal:
 * Arifin, Suhariyanto, Winardi (2026), JTIK Universitas Mandiri Vol.19 No.1.
 * Tidak ada angka yang dikarang.
 */
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Durasi scene (frame @30 fps) -> 9 + 13 + 9 + 15 + 12 = 58 detik
export const SCENES = {
  problem: {from: 0, duration: 270},
  dual: {from: 270, duration: 390},
  postQuantum: {from: 660, duration: 270},
  results: {from: 930, duration: 450},
  conclusion: {from: 1380, duration: 360},
} as const;

export const TOTAL_FRAMES = 1740;

export const scheme = {
  blockSize: 32, // piksel
  idBits: 32,
  fingerprintBits: 256,
  signatureBytes: 2420, // ML-DSA-44 (FIPS 204)
  publicKeyBytes: 1312,
  berThreshold: 0.3,
} as const;

// Tabel 6 (WhatsApp Web, 60 citra) dan Tabel 9 (aplikasi seluler, 10 citra)
export const results = {
  web: {
    idRead: {value: 60, total: 60},
    signatureValid: {value: 60, total: 60},
    intactMalicious: {value: 0, total: 48},
    manipulationDetected: {value: 9, total: 12},
    intactBer: 0.027,
    hashMatch: {value: 0, total: 48},
  },
  mobile: {
    idRead: {value: 10, total: 10},
    signatureValid: {value: 10, total: 10},
    intactMalicious: {value: 4, total: 7},
    manipulationDetected: {value: 2, total: 3},
    intactBer: 0.278,
  },
  berScaleMax: 0.5, // BER ~0,5 = citra tak terkait (Tabel 8)
} as const;
