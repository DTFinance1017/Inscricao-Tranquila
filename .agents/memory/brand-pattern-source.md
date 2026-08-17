---
name: Brand pattern source
description: Where the official Copa Raceman Kart 2027 design pattern and assets live and how to reuse them.
---

- The authoritative design reference is `attached_assets/copa_pattern/pattern.html` (the media-kit document with inline styles). Tokens: navy #0C2C55 (gradient #154C8C→#0C2C55→#071B36), yellow #F2B21C, orange #CA4F24, blue #1B5FA8; fonts Saira (display) + Montserrat (body); signature top strip = yellow bar + 120px orange block.
- Official transparent PNG assets (logos + photos) are in `artifacts/inscricao/src/assets/brand/` (rkt-color, rkt-white, panther-white, aro, aro-white, sponsor logos, photo-driver, photo-kart).
- **Why:** the user twice corrected earlier improvised themes — all future visuals must follow this pattern.
- **How to apply:** for any new artifact/page for this championship, start from these tokens/assets, not a new palette.
- Extracting logos from PDFs with PyMuPDF: `extract_image` drops the SMask — recombine base image + smask alpha or logos get solid black backgrounds. Attached files with unicode/space-heavy names may fail direct ReadFile; copy to /tmp first.
