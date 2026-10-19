# Video edukasi: Watermark Ganda DWT + ML-DSA-44 pada WhatsApp

Remotion + React + TypeScript + Tailwind CSS · 1080×1920 · 30 fps · 1740 frame (58 detik)
Sumber angka: Arifin, Suhariyanto, Winardi (2026), JTIK Univ. Mandiri Vol.19 No.1.

## Menjalankan

```bash
npm install          # butuh jaringan; versi di package.json bisa disesuaikan dengan proyek Anda
npm run dev          # buka Remotion Studio, composition: EducationalVideo
npm run build        # render ke out/educational-video.mp4
```

Jika proyek Remotion Anda sudah ada, salin `src/` dan `remotion.config.ts`, lalu pasang
`@remotion/google-fonts` dan Tailwind sesuai versi proyek (lihat
https://www.remotion.dev/docs/tailwind-v4). Hanya `src/styles/globals.css` dan
`remotion.config.ts` yang bergantung pada versi Tailwind.

## Linimasa (frame global)

| Scene | Detik | Frame |
|---|---|---|
| 01 Masalah | 0–9 | 0–270 |
| 02 Dual-watermark | 9–22 | 270–660 |
| 03 Pascakuantum | 22–31 | 660–930 |
| 04 Hasil pengujian | 31–46 | 930–1380 |
| 05 Kesimpulan | 46–58 | 1380–1740 |

Durasi diatur di `src/data/researchData.ts` (`SCENES`, `TOTAL_FRAMES`).

## Struktur

- `src/compositions/EducationalVideo.tsx` — latar global + `Sequence` tiap scene
- `src/scenes/` — lima scene
- `src/components/` — `AnimatedText`, `SectionLabel`, `MetricCard`, `WatermarkDiagram`, `SceneTransition`, `SampleImage`, `motion.ts`
- `src/data/researchData.ts` — seluruh angka dari jurnal
- `src/styles/` — `globals.css` (Tailwind), `theme.ts`, `fonts.ts`

## Catatan akurasi

- Gambar contoh dan nilai hash pada Scene 1 adalah ilustrasi (diberi label "ilustrasi"), bukan data penelitian.
- Scene 4: baris "Manipulasi lokal terdeteksi" menampilkan 9/12 (Web, Tabel 6) dan 2/3 (seluler, Tabel 9). Kedua nilai berasal dari kumpulan citra berbeda dan n sangat kecil; penyebut ditampilkan di kartu.
- Garis ambang 0,30 pada bar BER adalah ambang per blok; bar menunjukkan BER rata-rata citra utuh (pembacaan yang sama dengan Tabel 8 pada jurnal).
- Resize/transformasi geometris tidak digambarkan sebagai kasus yang tertangani.
