"""Generate editable Commonity UI mockups and PNG previews."""

from __future__ import annotations

from html import escape
from pathlib import Path
import shutil
import subprocess


ROOT = Path(__file__).resolve().parent
GREEN = "#0DD5B2"
FONT = "Helvetica Neue, Arial, sans-serif"

THEMES = {
    "light": {
        "bg": "#F7FAF8", "surface": "#FFFFFF", "surface2": "#F1F7F3",
        "text": "#17312D", "muted": "#647C72", "border": "#E1EBE6",
        "mint": "#E4FAF1", "green_text": "#087D69", "on_green": "#10382F",
        "shadow": "#DDE9E3", "hero": "#DDF9EE", "hero_text": "#173D34",
    },
    "dark": {
        "bg": "#0D1715", "surface": "#17241F", "surface2": "#1E3028",
        "text": "#EEF7F2", "muted": "#9CB5A8", "border": "#2B4137",
        "mint": "#214A3B", "green_text": "#5EE5CA", "on_green": "#0A3129",
        "shadow": "#0A1210", "hero": "#194737", "hero_text": "#E9FFF6",
    },
}

CATEGORY_COLORS = {
    "light": {
        "Ask Local": ("#E4F8F0", "#087D69"),
        "Recommendations": ("#EDF0FB", "#5868A6"),
        "Events": ("#FFF2DE", "#9B671D"),
        "Lost & Found": ("#FDEDED", "#B75D61"),
    },
    "dark": {
        "Ask Local": ("#224838", "#63E8C8"),
        "Recommendations": ("#2B3453", "#BCC9FF"),
        "Events": ("#42351F", "#F1C57B"),
        "Lost & Found": ("#4A2F34", "#F2A7B0"),
    },
}

POSTS = [
    {
        "category": "Ask Local", "age": "18 min ago", "title": "Best quiet place to read after 6?",
        "body": ["The library closes early. Looking for", "somewhere cozy and calm."],
        "desktop_body": "The library closes early. Looking for somewhere cozy and calm.",
        "votes": "42", "replies": "16",
    },
    {
        "category": "Events", "age": "2 hr ago", "title": "Maple Street market is back Saturday",
        "body": ["The bread stall and plant swap are", "both returning this weekend."],
        "desktop_body": "The bread stall and plant swap are both returning this weekend.",
        "votes": "87", "replies": "24",
    },
    {
        "category": "Lost & Found", "age": "4 hr ago", "title": "Found a set of keys near the park",
        "body": ["Describe the keychain and I'll help", "get them back to you."],
        "desktop_body": "Describe the keychain and I'll help get them back to you.",
        "votes": "31", "replies": "8",
    },
]


class SVG:
    def __init__(self, width: int, height: int, theme: str, title: str, export_scale: int = 1):
        self.width, self.height = width, height
        self.theme = theme
        self.p = THEMES[theme]
        self.parts = [
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{width * export_scale}" '
            f'height="{height * export_scale}" viewBox="0 0 {width} {height}" '
            'role="img" aria-labelledby="title">',
            f'<title id="title">{escape(title)}</title>',
        ]
        self.rect(0, 0, width, height, 0, self.p["bg"])

    def raw(self, value: str):
        self.parts.append(value)

    def rect(self, x, y, w, h, radius, fill, stroke=None, sw=1):
        edge = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
        self.raw(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}"{edge}/>')

    def circle(self, x, y, radius, fill, stroke=None, sw=1):
        edge = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
        self.raw(f'<circle cx="{x}" cy="{y}" r="{radius}" fill="{fill}"{edge}/>')

    def line(self, x1, y1, x2, y2, color, sw=1):
        self.raw(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{sw}"/>')

    def text(self, x, y, value, size=14, color=None, weight=400, anchor="start", letter=None):
        color = color or self.p["text"]
        tracking = f' letter-spacing="{letter}"' if letter is not None else ""
        self.raw(
            f'<text x="{x}" y="{y}" fill="{color}" font-family="{FONT}" '
            f'font-size="{size}" font-weight="{weight}" text-anchor="{anchor}"{tracking}>'
            f'{escape(value)}</text>'
        )

    def save(self, name: str):
        path = ROOT / name
        path.write_text("\n".join(self.parts + ["</svg>"]) + "\n", encoding="utf-8")
        if shutil.which("sips"):
            subprocess.run(["sips", "-s", "format", "png", str(path), "--out", str(path.with_suffix(".png"))],
                           check=True, stdout=subprocess.DEVNULL)


def brand_icon(c: SVG, x: float, y: float, size: float):
    """Exact Soft Point mark selected from logos/v4/03-soft-point.svg."""
    scale = size / 96
    c.raw(f'<g transform="translate({x} {y}) scale({scale})">')
    c.raw(f'<rect width="96" height="96" rx="22" fill="{GREEN}"/>')
    c.raw('<path d="M48 9C27.6 9 12 24.7 12 44.3 12 62.7 25.1 76.9 45.7 90.4Q48 92.7 50.3 90.4C70.9 76.9 84 62.7 84 44.3 84 24.7 68.4 9 48 9Z" fill="#fff"/>')
    c.raw(f'<path d="M61 33.5C57.3 30.1 52.5 28.5 47.1 28.5 36.6 28.5 29 36.7 29 47.2S36.6 66 47.1 66c5.4 0 10.2-1.6 13.9-5" transform="translate(1.5 0)" fill="none" stroke="{GREEN}" stroke-width="8.2" stroke-linecap="round"/>')
    c.raw("</g>")


ICON_PATHS = {
    "search": '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/>',
    "bell": '<path d="M18 9a6 6 0 0 0-12 0c0 7-2 7-2 9h16c0-2-2-2-2-9Z"/><path d="M10 21h4"/>',
    "home": '<path d="M3 10 12 3l9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z"/><path d="M9 21v-7h6v7"/>',
    "explore": '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z"/>',
    "bookmark": '<path d="M6 3h12v18l-6-4-6 4V3Z"/>',
    "profile": '<circle cx="12" cy="8" r="4"/><path d="M4.5 21c0-4 3-6 7.5-6s7.5 2 7.5 6"/>',
    "chat": '<path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.4A8 8 0 1 1 20 11.5Z"/>',
    "up": '<path d="m12 19 0-14m-5 5 5-5 5 5"/>',
    "plus": '<path d="M12 5v14M5 12h14"/>',
    "chevron": '<path d="m7 10 5 5 5-5"/>',
    "calendar": '<rect x="4" y="6" width="16" height="15" rx="2"/><path d="M8 3v6M16 3v6M4 11h16"/>',
    "spark": '<path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/>',
}


def ui_icon(c: SVG, name: str, x: float, y: float, size=20, color=None, sw=1.8):
    color = color or c.p["muted"]
    c.raw(f'<g transform="translate({x} {y}) scale({size / 24})" fill="none" stroke="{color}" '
          f'stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">{ICON_PATHS[name]}</g>')


def category_pill(c: SVG, x, y, name: str, theme: str, width=None, height=24):
    bg, ink = CATEGORY_COLORS[theme][name]
    width = width or {"Ask Local": 86, "Recommendations": 139, "Events": 64, "Lost & Found": 110}[name]
    c.rect(x, y, width, height, height / 2, bg)
    c.text(x + width / 2, y + height / 2 + 4, name, 11, ink, 600, "middle")


def filter_chip(c: SVG, x, y, label, width, selected=False):
    bg = c.p["mint"] if selected else c.p["surface"]
    ink = c.p["green_text"] if selected else c.p["muted"]
    c.rect(x, y, width, 31, 15.5, bg, None if selected else c.p["border"])
    c.text(x + width / 2, y + 20, label, 12, ink, 600 if selected else 500, "middle")


def anonymous_dots(c: SVG, x, y, radius=15):
    c.circle(x, y, radius, c.p["mint"])
    for dx in (-5, 0, 5):
        c.circle(x + dx, y, 1.4, c.p["green_text"])


def post_card(c: SVG, x, y, w, h, post, theme: str, mobile=False):
    p = c.p
    pad = 16 if mobile else 22
    c.rect(x, y, w, h, 17, p["surface"], p["border"])
    category_pill(c, x + pad, y + 15, post["category"], theme)
    meta_x = x + (139 if mobile else 158)
    c.text(meta_x, y + 31, f'Brookside · {post["age"]}', 11, p["muted"])
    anonymous_dots(c, x + pad + 10, y + 61, 10)
    c.text(x + pad + 28, y + 65, "Anonymous neighbor", 12, p["muted"], 600)
    c.text(x + pad, y + 96, post["title"], 16 if mobile else 18, p["text"], 600)
    if mobile:
        for index, line in enumerate(post["body"]):
            c.text(x + pad, y + 120 + index * 18, line, 12.5, p["muted"])
    else:
        c.text(x + pad, y + 123, post["desktop_body"], 14, p["muted"])
    c.line(x + pad, y + h - 42, x + w - pad, y + h - 42, p["border"])
    ui_icon(c, "up", x + pad, y + h - 34, 17, p["muted"])
    c.text(x + pad + 24, y + h - 17, post["votes"], 12, p["muted"], 600)
    ui_icon(c, "chat", x + pad + 74, y + h - 34, 17, p["muted"])
    c.text(x + pad + 99, y + h - 17, post["replies"], 12, p["muted"], 600)
    ui_icon(c, "bookmark", x + w - pad - 19, y + h - 34, 17, p["muted"])


def mobile_status(c: SVG):
    p = c.p
    c.text(20, 22, "9:41", 11, p["text"], 600)
    for i, height in enumerate((5, 8, 11, 14)):
        c.rect(316 + i * 5, 21 - height, 3, height, 1, p["text"])
    c.raw(f'<path d="M343 12q7-6 14 0m-11 3q4-3 8 0" fill="none" stroke="{p["text"]}" stroke-width="1.5" stroke-linecap="round"/>')
    c.rect(363, 11, 19, 10, 2, "none", p["text"], 1.2)
    c.rect(365, 13, 13, 6, 1, p["text"])


def mobile_header(c: SVG, board=False):
    p = c.p
    mobile_status(c)
    brand_icon(c, 20, 36, 35)
    c.text(66, 62, "Commonity", 20, p["text"], 600)
    ui_icon(c, "bell", 344, 43, 22, p["text"])
    c.text(20, 108, "Explore Brookside" if board else "Around Brookside", 23, p["text"], 600)
    c.text(20, 129, "Find your people, close to home." if board else "Your local conversations, all in one place.", 12, p["muted"])


def mobile_bottom_nav(c: SVG, active: str):
    p = c.p
    c.rect(0, 769, 390, 75, 0, p["surface"])
    c.line(0, 769, 390, 769, p["border"])
    items = [("home", "Home", 43), ("explore", "Explore", 118), ("plus", "Post", 195),
             ("bookmark", "Saved", 272), ("profile", "You", 347)]
    for name, label, center in items:
        if name == "plus":
            c.circle(center, 795, 23, GREEN)
            ui_icon(c, "plus", center - 12, 783, 24, p["on_green"], 2.2)
        else:
            color = p["green_text"] if active == name else p["muted"]
            ui_icon(c, name, center - 11, 780, 22, color)
        c.text(center, 833, label, 10, p["green_text"] if active == name else p["muted"], 600 if active == name else 500, "middle")


def mobile_feed(theme: str):
    c = SVG(390, 844, theme, f"Commonity mobile feed — {theme} mode", 3)
    p = c.p
    mobile_header(c)
    x = 20
    for label, width, selected in (("For you", 76, True), ("Ask Local", 88, False),
                                   ("Recommendations", 133, False), ("Events", 70, False)):
        filter_chip(c, x, 148, label, width, selected)
        x += width + 8
    c.rect(20, 194, 350, 88, 17, p["surface"], p["border"])
    anonymous_dots(c, 48, 225, 15)
    c.text(74, 228, "What's happening nearby?", 14, p["muted"])
    c.circle(340, 225, 17, GREEN)
    ui_icon(c, "plus", 329, 214, 22, p["on_green"], 2.2)
    c.line(36, 246, 354, 246, p["border"])
    c.text(36, 266, "Anonymous by default · Exact location stays private", 10.5, p["muted"])
    c.text(20, 316, "Local feed", 19, p["text"], 600)
    c.text(370, 315, "Top today  ⌄", 11.5, p["green_text"], 600, "end")
    for index, post in enumerate(POSTS):
        post_card(c, 20, 337 + index * 206, 350, 194, post, theme, True)
    mobile_bottom_nav(c, "home")
    c.save(f"feed-mobile-{theme}.svg")


def category_tile(c: SVG, x, y, w, h, name, count, theme):
    p = c.p
    bg, ink = CATEGORY_COLORS[theme][name]
    c.rect(x, y, w, h, 17, bg)
    c.circle(x + 27, y + 28, 15, p["surface"])
    icon_name = {"Ask Local": "chat", "Recommendations": "spark", "Events": "calendar", "Lost & Found": "search"}[name]
    ui_icon(c, icon_name, x + 16, y + 17, 22, ink)
    c.text(x + 16, y + h - 36, name, 14, p["text"], 600)
    c.text(x + 16, y + h - 17, count, 11.5, p["muted"])


def community_row(c: SVG, x, y, w, name, detail, initial):
    p = c.p
    c.rect(x, y, w, 64, 14, p["surface"], p["border"])
    c.circle(x + 32, y + 32, 18, p["mint"])
    c.text(x + 32, y + 38, initial, 16, p["green_text"], 600, "middle")
    c.text(x + 62, y + 28, name, 14, p["text"], 600)
    c.text(x + 62, y + 47, detail, 11.5, p["muted"])
    c.text(x + w - 20, y + 38, "›", 22, p["muted"], 400, "middle")


def mobile_board(theme: str):
    c = SVG(390, 844, theme, f"Commonity mobile explore board — {theme} mode", 3)
    p = c.p
    mobile_header(c, board=True)
    c.rect(20, 150, 350, 45, 14, p["surface"], p["border"])
    ui_icon(c, "search", 34, 161, 20, p["muted"])
    c.text(63, 178, "Search categories or communities", 13, p["muted"])
    c.text(20, 229, "Browse categories", 19, p["text"], 600)
    category_tile(c, 20, 245, 166, 115, "Ask Local", "2.1k conversations", theme)
    category_tile(c, 204, 245, 166, 115, "Recommendations", "1.4k conversations", theme)
    category_tile(c, 20, 372, 166, 115, "Events", "38 this week", theme)
    category_tile(c, 204, 372, 166, 115, "Lost & Found", "124 conversations", theme)
    c.text(20, 523, "Nearby communities", 19, p["text"], 600)
    c.text(370, 523, "See all", 11.5, p["green_text"], 600, "end")
    community_row(c, 20, 539, 350, "Brookside", "12.4k neighbors · Your area", "B")
    community_row(c, 20, 612, 350, "Old Town", "4.8k neighbors · Nearby", "O")
    community_row(c, 20, 685, 350, "West End", "3.1k neighbors · Nearby", "W")
    mobile_bottom_nav(c, "explore")
    c.save(f"board-mobile-{theme}.svg")


def desktop_header(c: SVG):
    p = c.p
    c.rect(0, 0, 1440, 76, 0, p["surface"])
    c.line(0, 75, 1440, 75, p["border"])
    brand_icon(c, 32, 18, 40)
    c.text(83, 48, "Commonity", 23, p["text"], 600)
    c.rect(385, 18, 436, 40, 12, p["surface2"], p["border"])
    ui_icon(c, "search", 399, 27, 20, p["muted"])
    c.text(432, 44, "Search local posts and communities", 13, p["muted"])
    c.rect(1075, 19, 197, 38, 19, p["surface2"], p["border"])
    c.circle(1094, 38, 4, GREEN)
    c.text(1110, 43, "Brookside · nearby", 12, p["text"], 600)
    ui_icon(c, "chevron", 1244, 27, 18, p["muted"])
    ui_icon(c, "bell", 1311, 28, 20, p["text"])
    c.circle(1382, 38, 18, p["mint"])
    ui_icon(c, "profile", 1371, 27, 22, p["green_text"])


def desktop_sidebar(c: SVG, active: str):
    p = c.p
    c.text(36, 127, "YOUR SPACE", 11, p["muted"], 700, letter="1.7")
    for name, label, y in (("home", "Home", 145), ("explore", "Explore", 198), ("bookmark", "Saved", 251)):
        selected = active == name
        if selected:
            c.rect(24, y, 244, 43, 12, p["mint"])
        color = p["green_text"] if selected else p["muted"]
        ui_icon(c, name, 41, y + 11, 21, color)
        c.text(77, y + 28, label, 14, p["text"] if selected else p["muted"], 600 if selected else 500)
    c.line(35, 314, 258, 314, p["border"])
    c.text(36, 343, "NEARBY COMMUNITIES", 11, p["muted"], 700, letter="1.2")
    for name, y, initial in (("Brookside", 360, "B"), ("Old Town", 408, "O"), ("West End", 456, "W")):
        c.circle(51, y + 17, 14, p["mint"])
        c.text(51, y + 22, initial, 12, p["green_text"], 600, "middle")
        c.text(75, y + 22, name, 13, p["text"] if name == "Brookside" else p["muted"], 600 if name == "Brookside" else 500)
    c.rect(24, 707, 244, 142, 16, p["surface"], p["border"])
    c.circle(53, 739, 16, p["mint"])
    c.text(53, 745, "?", 16, p["green_text"], 600, "middle")
    c.text(77, 744, "Anonymous by default", 13, p["text"], 600)
    c.text(40, 777, "Share what matters nearby.", 12, p["muted"])
    c.text(40, 796, "Your exact location is never", 12, p["muted"])
    c.text(40, 815, "shown on a post.", 12, p["muted"])


def right_card(c: SVG, x, y, w, h):
    c.rect(x, y, w, h, 17, c.p["surface"], c.p["border"])


def desktop_feed(theme: str):
    c = SVG(1440, 900, theme, f"Commonity desktop feed — {theme} mode")
    p = c.p
    desktop_header(c)
    desktop_sidebar(c, "home")
    c.text(300, 146, "Around Brookside", 29, p["text"], 600)
    c.text(300, 172, "The conversations happening around your neighborhood.", 14, p["muted"])
    x = 300
    for label, width, selected in (("For you", 80, True), ("Ask Local", 93, False),
                                   ("Recommendations", 143, False), ("Events", 73, False),
                                   ("Lost & Found", 116, False)):
        filter_chip(c, x, 195, label, width, selected)
        x += width + 9
    c.rect(300, 246, 700, 85, 17, p["surface"], p["border"])
    anonymous_dots(c, 334, 281, 17)
    c.text(365, 286, "What's happening nearby?", 15, p["muted"])
    c.text(365, 310, "Post anonymously · Your exact location stays private", 11.5, p["muted"])
    c.rect(886, 266, 96, 42, 12, GREEN)
    ui_icon(c, "plus", 900, 276, 19, p["on_green"], 2.1)
    c.text(928, 292, "Post", 13, p["on_green"], 700)
    c.text(300, 373, "Local feed", 19, p["text"], 600)
    c.text(1000, 372, "Top today  ⌄", 12, p["green_text"], 600, "end")
    for index, post in enumerate(POSTS):
        post_card(c, 300, 393 + index * 201, 700, 187, post, theme)
    right_card(c, 1028, 106, 380, 222)
    c.text(1051, 142, "Neighborhood pulse", 17, p["text"], 600)
    c.text(1051, 171, "12.4k", 29, p["text"], 600)
    c.text(1151, 170, "neighbors around Brookside", 12, p["muted"])
    c.line(1051, 193, 1385, 193, p["border"])
    c.circle(1062, 218, 5, GREEN)
    c.text(1079, 222, "Ask Local is active today", 12.5, p["text"], 600)
    c.text(1079, 241, "New questions, helpful answers", 11.5, p["muted"])
    c.circle(1062, 272, 5, "#E9B567")
    c.text(1079, 276, "38 events shared this week", 12.5, p["text"], 600)
    c.text(1079, 295, "See what's happening nearby", 11.5, p["muted"])
    right_card(c, 1028, 344, 380, 183)
    c.text(1051, 379, "Happening soon", 17, p["text"], 600)
    c.rect(1051, 398, 54, 54, 12, CATEGORY_COLORS[theme]["Events"][0])
    c.text(1078, 420, "SAT", 11, CATEGORY_COLORS[theme]["Events"][1], 700, "middle")
    c.text(1078, 440, "14", 18, CATEGORY_COLORS[theme]["Events"][1], 600, "middle")
    c.text(1119, 417, "Maple Street market", 13, p["text"], 600)
    c.text(1119, 438, "Plant swap, bread, and neighbors", 11.5, p["muted"])
    c.text(1051, 498, "Explore local events  →", 12, p["green_text"], 600)
    right_card(c, 1028, 543, 380, 165)
    c.text(1051, 580, "A little closer, together", 17, p["text"], 600)
    c.text(1051, 607, "Every voice is anonymous. Keep posts", 12.5, p["muted"])
    c.text(1051, 626, "kind, useful, and relevant to your area.", 12.5, p["muted"])
    c.text(1051, 674, "Read community guidelines  →", 12, p["green_text"], 600)
    c.save(f"feed-desktop-{theme}.svg")


def desktop_board(theme: str):
    c = SVG(1440, 900, theme, f"Commonity desktop explore board — {theme} mode")
    p = c.p
    desktop_header(c)
    desktop_sidebar(c, "explore")
    c.text(300, 146, "Explore Brookside", 29, p["text"], 600)
    c.text(300, 172, "Find useful conversations and people close to home.", 14, p["muted"])
    c.rect(300, 196, 700, 47, 13, p["surface"], p["border"])
    ui_icon(c, "search", 316, 209, 20, p["muted"])
    c.text(347, 225, "Search categories or nearby communities", 13, p["muted"])
    c.rect(300, 263, 700, 149, 18, p["hero"])
    c.text(326, 312, "Find your corner of", 25, p["hero_text"], 600)
    c.text(326, 343, "the community.", 25, p["hero_text"], 600)
    c.text(326, 376, "Ask questions, share finds, and make the neighborhood yours.", 13, p["hero_text"])
    brand_icon(c, 849, 292, 87)
    c.text(300, 454, "Browse categories", 20, p["text"], 600)
    category_tile(c, 300, 473, 340, 126, "Ask Local", "2.1k conversations", theme)
    category_tile(c, 660, 473, 340, 126, "Recommendations", "1.4k conversations", theme)
    category_tile(c, 300, 614, 340, 126, "Events", "38 this week", theme)
    category_tile(c, 660, 614, 340, 126, "Lost & Found", "124 conversations", theme)
    right_card(c, 1028, 106, 380, 373)
    c.text(1051, 143, "Nearby communities", 17, p["text"], 600)
    c.text(1051, 165, "A home for every corner of town.", 12, p["muted"])
    for y, name, detail, initial in ((184, "Brookside", "12.4k neighbors · Your area", "B"),
                                     (266, "Old Town", "4.8k neighbors · Nearby", "O"),
                                     (348, "West End", "3.1k neighbors · Nearby", "W")):
        c.circle(1074, y + 22, 19, p["mint"])
        c.text(1074, y + 28, initial, 16, p["green_text"], 600, "middle")
        c.text(1111, y + 19, name, 13.5, p["text"], 600)
        c.text(1111, y + 40, detail, 11.5, p["muted"])
        if y != 348:
            c.line(1051, y + 67, 1385, y + 67, p["border"])
    right_card(c, 1028, 496, 380, 208)
    c.text(1051, 535, "Start a conversation", 17, p["text"], 600)
    c.text(1051, 565, "A question, recommendation, or heads-up", 12.5, p["muted"])
    c.text(1051, 585, "can make someone else's day easier.", 12.5, p["muted"])
    c.rect(1051, 614, 160, 45, 12, GREEN)
    ui_icon(c, "plus", 1066, 626, 20, p["on_green"], 2.1)
    c.text(1094, 642, "Create post", 13, p["on_green"], 700)
    c.save(f"board-desktop-{theme}.svg")


def make_overview():
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        return

    canvas = Image.new("RGB", (1760, 1020), "#F1F6F3")
    draw = ImageDraw.Draw(canvas)
    font_path = "/System/Library/Fonts/Supplemental/Arial.ttf"
    heading = ImageFont.truetype(font_path, 29)
    label = ImageFont.truetype(font_path, 17)
    draw.text((30, 24), "Commonity · mockup concepts", font=heading, fill="#17312D")
    columns = [
        (30, 180, "mobile-light", "Mobile · Light"),
        (230, 180, "mobile-dark", "Mobile · Dark"),
        (440, 625, "desktop-light", "Desktop · Light"),
        (1085, 625, "desktop-dark", "Desktop · Dark"),
    ]
    for row, (concept, title) in enumerate((("feed", "01  Neighborhood Feed"), ("board", "02  Community Board"))):
        y = 104 + row * 455
        draw.text((30, y - 31), title, font=label, fill="#17312D")
        for x, width, suffix, column_title in columns:
            draw.text((x, y), column_title, font=label, fill="#617970")
            target_height = 390
            card_y = y + 26
            draw.rounded_rectangle((x - 3, card_y - 3, x + width + 3, card_y + target_height + 3),
                                   radius=15, fill="#FFFFFF", outline="#DCE8E1")
            device, mode = suffix.split("-")
            with Image.open(ROOT / f"{concept}-{device}-{mode}.png") as original:
                image = original.convert("RGB").resize((width, target_height), Image.Resampling.LANCZOS)
            canvas.paste(image, (x, card_y))
    canvas.save(ROOT / "overview.png")


if __name__ == "__main__":
    ROOT.mkdir(parents=True, exist_ok=True)
    for mode in ("light", "dark"):
        mobile_feed(mode)
        desktop_feed(mode)
        mobile_board(mode)
        desktop_board(mode)
    make_overview()
    print("Generated eight Commonity mockups in", ROOT)
