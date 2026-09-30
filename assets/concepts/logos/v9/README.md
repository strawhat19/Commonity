# Commonity logo refinement — V9

Refines [V8's filled Local Lock](../v8/01-local-lock-fill.svg) with more space around the central mark.

- `01-local-lock-fill.svg` — editable logo.
- `01-local-lock-fill.png` — 512 × 512 preview.
- `02-local-lock-outline.svg` — transparent outline variant with mint pin, C, arcs and stem strokes; no background or opaque fills.
- `03-c-brackets.svg` — standalone mint C and four brackets on a transparent background, without the map pin or stem; framed as a 96 × 96 icon.
- `04-c-brackets-white-pin.svg` — mint C, four brackets and stem over the original white map pin; transparent outside the pin, without a tile or green window.

The C is scaled to **80%** about the existing center `(48, 43)`. Its source stroke decreases from 7 to 5.5, giving a final visible width of **4.4 units** after scaling.

The four surrounding arcs move from radius **22 to 18.5**. Each arc shortens from **72° to 56°**, with equal 34° centerline gaps. The 2-unit white strokes and rounded caps remain. Copies rotated by 90°, 180° and 270° keep all four segments identical and symmetrical.

The green window remains radius 25, so the smaller center artwork has a wider margin inside the pin. The map pin, window, tile, short stem, colors and original SVG dimensions are unchanged. V8 is preserved. Application code is untouched.
