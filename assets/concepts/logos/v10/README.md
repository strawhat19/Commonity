# Commonity logo refinement — V10

A precise centering adjustment to [V9](../v9/01-local-lock-fill.svg).

- `01-local-lock-fill.svg` — editable logo.
- `01-local-lock-fill.png` — 512 × 512 preview.

## Alignment

The complete foreground moves up **1.5 units**, taking the pin's vertical bounds from 10–89 to **8.5–87.5**. Their midpoint is exactly **48**, the center of the 96 × 96 tile. Its horizontal bounds remain 15–81, also centered at 48. The pin, window, arcs, C and lower stem move together.

The C moves **1.8 units right** within that foreground. Its visible bounds become **35.6–60.4** horizontally and **29.6–56.4** vertically before the shared upward translation. Those bounds are centered exactly at the window's local center **(48, 43)**. The C's source path, 80% scale and 4.4-unit rendered stroke remain unchanged.

## Symmetry

- Pin: mirrored left and right around x = 48.
- C: mirrored upper and lower curves around the window's horizontal center line.
- Four arcs: identical geometry at 0°, 90°, 180° and 270°, with equal gaps.

The window and inner artwork share final center **(48, 41.5)**. Arc size, C size, colors, window radius, pin geometry, tile and corner rounding are retained. V9 remains unchanged; application code is untouched.
