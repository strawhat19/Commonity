"""Generate Commonity Home and Feed mockups using the v1 drawing primitives."""

from __future__ import annotations

import importlib.util
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parent / "v1" / "generate.py"
spec = importlib.util.spec_from_file_location("commonity_mockups_v1", SOURCE)
assert spec and spec.loader
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
base.ROOT = ROOT


def mobile_header(c, heading: str, subtitle: str):
    p = c.p
    base.mobile_status(c)
    base.brand_icon(c, 20, 36, 35)
    c.text(66, 62, "Commonity", 20, p["text"], 600)
    base.ui_icon(c, "bell", 344, 43, 22, p["text"])
    c.text(20, 108, heading, 22.5, p["text"], 600)
    c.text(20, 129, subtitle, 12, p["muted"])


def mobile_nav(c, active: str):
    p = c.p
    c.rect(0, 769, 390, 75, 0, p["surface"])
    c.line(0, 769, 390, 769, p["border"])
    items = [("home", "Home", 43), ("chat", "Feed", 118), ("plus", "Post", 195),
             ("explore", "Explore", 272), ("profile", "You", 347)]
    for name, label, center in items:
        selected = active == label.lower()
        if name == "plus":
            c.circle(center, 795, 23, base.GREEN)
            base.ui_icon(c, "plus", center - 12, 783, 24, p["on_green"], 2.2)
        else:
            color = p["green_text"] if selected else p["muted"]
            base.ui_icon(c, name, center - 11, 780, 22, color)
        c.text(center, 833, label, 10, p["green_text"] if selected else p["muted"],
               600 if selected else 500, "middle")


def desktop_sidebar(c, active: str):
    p = c.p
    c.text(36, 127, "YOUR SPACE", 11, p["muted"], 700, letter="1.7")
    for icon, label, y in (("home", "Home", 145), ("chat", "Feed", 198),
                           ("explore", "Explore", 251), ("bookmark", "Saved", 304)):
        selected = active == label.lower()
        if selected:
            c.rect(24, y, 244, 43, 12, p["mint"])
        color = p["green_text"] if selected else p["muted"]
        base.ui_icon(c, icon, 41, y + 11, 21, color)
        c.text(77, y + 28, label, 14, p["text"] if selected else p["muted"],
               600 if selected else 500)
    c.line(35, 365, 258, 365, p["border"])
    c.text(36, 393, "NEARBY COMMUNITIES", 11, p["muted"], 700, letter="1.2")
    for name, y, initial in (("Brookside", 411, "B"), ("Old Town", 459, "O"), ("West End", 507, "W")):
        c.circle(51, y + 17, 14, p["mint"])
        c.text(51, y + 22, initial, 12, p["green_text"], 600, "middle")
        c.text(75, y + 22, name, 13, p["text"] if name == "Brookside" else p["muted"],
               600 if name == "Brookside" else 500)
    c.rect(24, 707, 244, 142, 16, p["surface"], p["border"])
    c.circle(53, 739, 16, p["mint"])
    c.text(53, 745, "?", 16, p["green_text"], 600, "middle")
    c.text(77, 744, "Anonymous by default", 13, p["text"], 600)
    c.text(40, 777, "Share what matters nearby.", 12, p["muted"])
    c.text(40, 796, "Your exact location is never", 12, p["muted"])
    c.text(40, 815, "shown on a post.", 12, p["muted"])


def quick_tile(c, x, y, w, h, label, category=None):
    p = c.p
    if category:
        bg, ink = base.CATEGORY_COLORS[c.theme][category]
        icon = {"Ask Local": "chat", "Recommendations": "spark", "Events": "calendar",
                "Lost & Found": "search"}[category]
    else:
        bg, ink, icon = p["mint"], p["green_text"], "home"
    c.rect(x, y, w, h, 14, bg)
    c.circle(x + 23, y + h / 2, 15, p["surface"])
    base.ui_icon(c, icon, x + 13, y + h / 2 - 10, 20, ink)
    c.text(x + 45, y + h / 2 + 5, label, 11.5, p["text"], 600)


def compact_category_tile(c, x, y, name, count):
    p = c.p
    bg, ink = base.CATEGORY_COLORS[c.theme][name]
    icon = {"Ask Local": "chat", "Recommendations": "spark", "Events": "calendar",
            "Lost & Found": "search"}[name]
    c.rect(x, y, 166, 80, 17, bg)
    c.circle(x + 27, y + 23, 13, p["surface"])
    base.ui_icon(c, icon, x + 17, y + 13, 20, ink)
    c.text(x + 16, y + 54, name, 13, p["text"], 600)
    c.text(x + 16, y + 72, count, 11, p["muted"])


def composer(c, x, y, w, h, desktop=False):
    p = c.p
    c.rect(x, y, w, h, 17, p["surface"], p["border"])
    base.anonymous_dots(c, x + 28, y + 29, 15)
    c.text(x + 56, y + 33, "What's happening nearby?", 14 if not desktop else 15, p["muted"])
    c.text(x + 17, y + h - 17, "Post anonymously · Exact location stays private", 10.5 if not desktop else 11.5, p["muted"])
    if desktop:
        c.rect(x + w - 111, y + 18, 94, 42, 12, base.GREEN)
        base.ui_icon(c, "plus", x + w - 98, y + 29, 20, p["on_green"], 2)
        c.text(x + w - 69, y + 44, "Post", 13, p["on_green"], 700)
    else:
        c.circle(x + w - 30, y + 29, 17, base.GREEN)
        base.ui_icon(c, "plus", x + w - 41, y + 18, 22, p["on_green"], 2.2)


def mobile_home(theme: str):
    c = base.SVG(390, 844, theme, f"Commonity v2 mobile Home — {theme} mode", 3)
    p = c.p
    mobile_header(c, "Good morning, Brookside", "Your community at a glance.")
    c.rect(20, 147, 350, 91, 17, p["hero"])
    c.text(36, 181, "Around you today", 18, p["hero_text"], 600)
    c.text(36, 205, "124 new local conversations today", 12, p["hero_text"])
    base.brand_icon(c, 304, 164, 55)
    c.text(20, 270, "Browse categories", 18, p["text"], 600)
    c.text(370, 269, "See all", 11.5, p["green_text"], 600, "end")
    compact_category_tile(c, 20, 284, "Ask Local", "2.1k conversations")
    compact_category_tile(c, 204, 284, "Recommendations", "1.4k conversations")
    compact_category_tile(c, 20, 375, "Events", "38 this week")
    compact_category_tile(c, 204, 375, "Lost & Found", "124 conversations")
    c.rect(20, 468, 350, 45, 14, p["surface"], p["border"])
    c.circle(43, 490, 13, p["mint"])
    c.text(43, 495, "B", 12, p["green_text"], 600, "middle")
    c.text(63, 495, "Brookside · 12.4k neighbors", 12, p["text"], 600)
    c.text(351, 495, "›", 21, p["muted"], 400, "middle")
    c.text(20, 542, "Popular near you", 18, p["text"], 600)
    c.text(370, 541, "View feed", 11.5, p["green_text"], 600, "end")
    base.post_card(c, 20, 555, 350, 194, base.POSTS[0], theme, True)
    mobile_nav(c, "home")
    c.save(f"home-mobile-{theme}.svg")


def mobile_feed(theme: str):
    c = base.SVG(390, 844, theme, f"Commonity v2 mobile Feed — {theme} mode", 3)
    p = c.p
    mobile_header(c, "Brookside feed", "Anonymous conversations from your area.")
    quick_tile(c, 20, 151, 108, 63, "All posts")
    quick_tile(c, 138, 151, 108, 63, "Ask Local", "Ask Local")
    quick_tile(c, 256, 151, 114, 63, "Events", "Events")
    composer(c, 20, 228, 350, 83)
    c.text(20, 339, "Latest from neighbors", 18, p["text"], 600)
    c.text(370, 338, "Top today  ⌄", 11.5, p["green_text"], 600, "end")
    base.post_card(c, 20, 354, 350, 194, base.POSTS[0], theme, True)
    base.post_card(c, 20, 560, 350, 194, base.POSTS[1], theme, True)
    mobile_nav(c, "feed")
    c.save(f"feed-mobile-{theme}.svg")


def right_card(c, x, y, w, h):
    c.rect(x, y, w, h, 17, c.p["surface"], c.p["border"])


def desktop_home(theme: str):
    c = base.SVG(1440, 900, theme, f"Commonity v2 desktop Home — {theme} mode")
    p = c.p
    base.desktop_header(c)
    desktop_sidebar(c, "home")
    c.text(300, 146, "Good morning, Brookside", 29, p["text"], 600)
    c.text(300, 172, "Here's what's happening around your community.", 14, p["muted"])
    c.rect(300, 192, 700, 129, 18, p["hero"])
    c.text(326, 239, "A little closer, together.", 25, p["hero_text"], 600)
    c.text(326, 268, "124 fresh conversations in your area today.", 13, p["hero_text"])
    c.text(326, 294, "Open your feed  →", 12, p["green_text"], 600)
    base.brand_icon(c, 867, 213, 88)
    c.text(300, 354, "Browse categories", 20, p["text"], 600)
    c.text(1000, 353, "Explore all  →", 12, p["green_text"], 600, "end")
    base.category_tile(c, 300, 371, 340, 99, "Ask Local", "2.1k conversations", theme)
    base.category_tile(c, 660, 371, 340, 99, "Recommendations", "1.4k conversations", theme)
    base.category_tile(c, 300, 483, 340, 99, "Events", "38 this week", theme)
    base.category_tile(c, 660, 483, 340, 99, "Lost & Found", "124 conversations", theme)
    c.text(300, 618, "Popular near you", 20, p["text"], 600)
    c.text(1000, 617, "View feed  →", 12, p["green_text"], 600, "end")
    base.post_card(c, 300, 637, 700, 190, base.POSTS[0], theme)
    right_card(c, 1028, 106, 380, 206)
    c.text(1051, 143, "Neighborhood pulse", 17, p["text"], 600)
    c.text(1051, 182, "12.4k", 30, p["text"], 600)
    c.text(1150, 181, "neighbors around Brookside", 12, p["muted"])
    c.line(1051, 203, 1385, 203, p["border"])
    c.circle(1060, 236, 5, base.GREEN)
    c.text(1076, 240, "Ask Local is active today", 12.5, p["text"], 600)
    c.circle(1060, 273, 5, "#E9B567")
    c.text(1076, 277, "38 events shared this week", 12.5, p["text"], 600)
    right_card(c, 1028, 328, 380, 255)
    c.text(1051, 365, "Nearby communities", 17, p["text"], 600)
    for y, initial, name, detail in ((384, "B", "Brookside", "Your area · 12.4k neighbors"),
                                      (446, "O", "Old Town", "Nearby · 4.8k neighbors"),
                                      (508, "W", "West End", "Nearby · 3.1k neighbors")):
        c.circle(1071, y + 14, 15, p["mint"])
        c.text(1071, y + 19, initial, 13, p["green_text"], 600, "middle")
        c.text(1100, y + 10, name, 13, p["text"], 600)
        c.text(1100, y + 28, detail, 11.5, p["muted"])
    right_card(c, 1028, 599, 380, 175)
    c.text(1051, 636, "Coming up", 17, p["text"], 600)
    c.text(1051, 665, "Maple Street market · Saturday", 13, p["text"], 600)
    c.text(1051, 687, "Plant swap, bread, and neighbors.", 12, p["muted"])
    c.text(1051, 740, "Explore local events  →", 12, p["green_text"], 600)
    c.save(f"home-desktop-{theme}.svg")


def desktop_feed(theme: str):
    c = base.SVG(1440, 900, theme, f"Commonity v2 desktop Feed — {theme} mode")
    p = c.p
    base.desktop_header(c)
    desktop_sidebar(c, "feed")
    c.text(300, 146, "Brookside feed", 29, p["text"], 600)
    c.text(300, 172, "Anonymous conversations from around your area.", 14, p["muted"])
    quick_tile(c, 300, 194, 162, 70, "All posts")
    quick_tile(c, 477, 194, 162, 70, "Ask Local", "Ask Local")
    quick_tile(c, 654, 194, 162, 70, "Events", "Events")
    quick_tile(c, 831, 194, 169, 70, "Finds", "Lost & Found")
    composer(c, 300, 284, 700, 82, True)
    c.text(300, 402, "Latest from neighbors", 20, p["text"], 600)
    c.text(1000, 401, "Top today  ⌄", 12, p["green_text"], 600, "end")
    for index, post in enumerate(base.POSTS):
        base.post_card(c, 300, 419 + index * 201, 700, 187, post, theme)
    right_card(c, 1028, 106, 380, 224)
    c.text(1051, 143, "Today in Brookside", 17, p["text"], 600)
    c.text(1051, 180, "124", 30, p["text"], 600)
    c.text(1112, 179, "new local conversations", 12, p["muted"])
    c.line(1051, 202, 1385, 202, p["border"])
    c.text(1051, 232, "Most active right now", 12, p["muted"])
    base.category_pill(c, 1051, 247, "Ask Local", theme)
    base.category_pill(c, 1147, 247, "Events", theme)
    c.text(1051, 302, "See neighborhood activity  →", 12, p["green_text"], 600)
    right_card(c, 1028, 347, 380, 171)
    c.text(1051, 384, "Popular categories", 17, p["text"], 600)
    for y, name, detail in ((410, "Recommendations", "1.4k conversations"),
                             (449, "Lost & Found", "124 conversations")):
        bg, ink = base.CATEGORY_COLORS[theme][name]
        c.circle(1060, y, 6, ink)
        c.text(1078, y + 5, name, 12.5, p["text"], 600)
        c.text(1383, y + 5, detail, 11.5, p["muted"], 400, "end")
    right_card(c, 1028, 534, 380, 187)
    c.text(1051, 571, "Keep it local", 17, p["text"], 600)
    c.text(1051, 601, "Every post is anonymous. Your exact", 12.5, p["muted"])
    c.text(1051, 621, "location is never shown to neighbors.", 12.5, p["muted"])
    c.text(1051, 686, "Read community guidelines  →", 12, p["green_text"], 600)
    c.save(f"feed-desktop-{theme}.svg")


def make_overview():
    from PIL import Image, ImageDraw, ImageFont

    canvas = Image.new("RGB", (1760, 1020), "#F1F6F3")
    draw = ImageDraw.Draw(canvas)
    font_path = "/System/Library/Fonts/Supplemental/Arial.ttf"
    heading = ImageFont.truetype(font_path, 29)
    label = ImageFont.truetype(font_path, 17)
    draw.text((30, 24), "Commonity · Home and Feed v2", font=heading, fill="#17312D")
    columns = [(30, 180, "mobile-light", "Mobile · Light"),
               (230, 180, "mobile-dark", "Mobile · Dark"),
               (440, 625, "desktop-light", "Desktop · Light"),
               (1085, 625, "desktop-dark", "Desktop · Dark")]
    for row, (screen, title) in enumerate((("home", "01  Home"), ("feed", "02  Feed"))):
        y = 104 + row * 455
        draw.text((30, y - 31), title, font=label, fill="#17312D")
        for x, width, suffix, column_title in columns:
            draw.text((x, y), column_title, font=label, fill="#617970")
            card_y = y + 26
            draw.rounded_rectangle((x - 3, card_y - 3, x + width + 3, card_y + 393),
                                   radius=15, fill="#FFFFFF", outline="#DCE8E1")
            device, mode = suffix.split("-")
            with Image.open(ROOT / f"{screen}-{device}-{mode}.png") as original:
                image = original.convert("RGB").resize((width, 390), Image.Resampling.LANCZOS)
            canvas.paste(image, (x, card_y))
    canvas.save(ROOT / "overview.png")


if __name__ == "__main__":
    ROOT.mkdir(parents=True, exist_ok=True)
    for mode in ("light", "dark"):
        mobile_home(mode)
        desktop_home(mode)
        mobile_feed(mode)
        desktop_feed(mode)
    make_overview()
    print("Generated eight Commonity v2 Home and Feed mockups in", ROOT)
