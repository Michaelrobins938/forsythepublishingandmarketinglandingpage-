# Video Poster Thumbnails

This directory contains poster/thumbnail images for the video gallery.

## Quick Setup

### Option 1: Extract from videos (Recommended)
Use FFmpeg to extract a frame from each video at ~0.5-1.0 seconds:

```bash
# Navigate to the ads folder
cd public/ads

# Extract poster for each video (adjust timestamp as needed)
ffmpeg -i roofing.mp4 -ss 00:00:00.5 -frames:v 1 -q:v 2 thumbs/roofing.jpg
ffmpeg -i hvac.mp4 -ss 00:00:00.5 -frames:v 1 -q:v 2 thumbs/hvac.jpg
ffmpeg -i plumbing.mp4 -ss 00:00:00.5 -frames:v 1 -q:v 2 thumbs/plumbing.jpg
ffmpeg -i solar-10s.mp4 -ss 00:00:00.5 -frames:v 1 -q:v 2 thumbs/solar.jpg
ffmpeg -i landscaping.mp4 -ss 00:00:00.5 -frames:v 1 -q:v 2 thumbs/landscaping.jpg
ffmpeg -i coffeeshop.mp4 -ss 00:00:00.5 -frames:v 1 -q:v 2 thumbs/coffeeshop.jpg
```

### Option 2: Use video editing software
1. Open each video in your editor (Premiere, Final Cut, DaVinci, etc.)
2. Navigate to a compelling frame (usually 0.5-1.0s in)
3. Export as JPG at 1280×720px
4. Name to match: `roofing.jpg`, `hvac.jpg`, etc.

### Option 3: Quick placeholder
Until you have real posters, you can:
- Use brand images or screenshots from your website
- Create simple branded graphics with the industry name
- The videos will still work, just without the poster preview

## Recommended Settings
- **Resolution**: 1280×720px (matches aspect ratio 16:9)
- **Format**: JPG
- **Quality**: 85-90% (balance between quality and file size)
- **File size**: Aim for 100-300KB per image

## Current Poster Mappings
From `page.tsx`:
- `roofing.jpg` → `/ads/roofing.mp4`
- `hvac.jpg` → `/ads/hvac.mp4`
- `plumbing.jpg` → `/ads/plumbing.mp4`
- `solar.jpg` → `/ads/solar-10s.mp4`
- `landscaping.jpg` → `/ads/landscaping.mp4`
- `coffeeshop.jpg` → `/ads/coffeeshop.mp4`

## Benefits
- Eliminates blank/loading states before video loads
- Better Lighthouse performance scores
- More professional gallery appearance
- Improved SEO (image alt attributes)


