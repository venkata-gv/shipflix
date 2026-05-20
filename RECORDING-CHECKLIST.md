# ShipFlix — Trailer Recording Checklist

Six 8–12 second silent loops. Drop them into `public/projects/{slug}/preview.webm`, then
add one line per project in `src/lib/projects.ts` and they go live everywhere
(card hover, hero autoplay, detail modal background).

## Specs (every clip)

| Setting | Value | Why |
|---|---|---|
| Resolution | 1280×720 (min) · 1920×1080 (preferred) | Card aspect is 16:10 — 1280×720 crops cleanly |
| Frame rate | 24 or 30 fps | Loops feel smoother at 24; 30 is also fine |
| Duration | **8–12 seconds** | Anything longer kills the loop illusion |
| Audio | **None** — strip the track entirely | Cards autoplay; sound is hostile |
| Codec | VP9 (.webm) or H.264 (.mp4) | VP9 = ~40% smaller for the same quality |
| Bitrate target | < 1.5 MB final file | Above this and hover-autoplay stalls on slow connections |
| Loop | First frame ≈ last frame | Cut the clip so it loops invisibly |

Compression tip after recording:

```bash
# Re-encode to web-optimised VP9 webm (set CRF higher for smaller file)
ffmpeg -i raw.mov -c:v libvpx-vp9 -crf 34 -b:v 0 -an -row-mt 1 \
  -vf "scale=1280:720,fps=24" preview.webm
```

## Storyboard — what to capture per project

| Slug | Title | The "one moment" — capture this |
|---|---|---|
| `filingsiq` | FilingsIQ | Type "Compare Apple vs Microsoft R&D spend FY21 → FY24" → table renders → cite-row tags appear |
| `evidenceiq` | EvidenceIQ | Drop 3 PDFs onto the upload zone → timeline auto-builds → "Export evidence pack" → PDF preview |
| `dora-mifid` | DORA & MiFID II | Toggle role from ANALYST → DPO → fields redact → "Generate snapshot" → SHA-256 fingerprint flashes in |
| `sarops` | SAROps Agent | The 7-step pipeline advancing (Triage → ER → Graph → ...) → 🛑 Human-Review Gate halts at step 7 |
| `data-port` | Enterprise Data Port | Agent calls `read_records` → HMAC tokens visible in payload → audit ledger row appears in real time |
| `roi-calc` | AI ROI Calculator | Drag the headcount slider → burndown chart redraws → break-even line shifts dramatically |

## Tooling

| Tool | Platform | Why |
|---|---|---|
| **Screen.studio** | Mac only · paid | Auto-zoom on clicks, cinematic motion, exports straight to webm |
| **Loom** | Win / Mac / Web | Fastest, cloud upload, export mp4 — re-encode to webm with ffmpeg |
| **OBS Studio** | Win / Mac / Linux · free | Full control, harder learning curve, best for compositing |
| **ScreenToGif** | Win · free | Good for GIF, but webm is much smaller — convert with ffmpeg afterwards |

## After you record

For each project:

1. Save as `public/projects/{slug}/preview.webm` (or `.mp4`)
2. (Optional) Save a poster frame at `public/projects/{slug}/poster.webp` (1280×720, the most visually striking still)
3. Open `src/lib/projects.ts`, find the record for that slug, add:

```ts
{
  slug: "filingsiq",
  // ...existing fields...
  preview: "/projects/filingsiq/preview.webm",
  poster: "/projects/filingsiq/poster.webp",  // optional
  // ...
}
```

That's it. The card will autoplay on hover, the hero will autoplay when that
project rotates in, and the modal will play it as background.

Missing files fall back silently to the gradient — so you can ship one project
at a time without breaking anything.

## Cards still look great without videos

If you decide to ship before recording all six, the gradient cards already work
as the production fallback. Don't let perfect get in the way of shipping.
