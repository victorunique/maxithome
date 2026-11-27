import sys
from playwright.sync_api import sync_playwright

VIEWPORTS = [
    ("desktop", 1280, 800),
    ("tablet", 768, 1024),
    ("mobile", 375, 812),
]


def test_related_apps_icons_are_square() -> None:
    """Verify all Related Apps icons render as 56x56 squares across viewports."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for name, width, height in VIEWPORTS:
            page = browser.new_page(viewport={"width": width, "height": height})
            page.goto("http://localhost:5173/apps/party-nest")
            page.wait_for_load_state("networkidle")

            related_section = page.locator("h3:has-text('Related Apps')").locator("..")
            links = related_section.locator("a")
            count = links.count()
            assert count > 0, f"Expected related apps on {name}, found {count}"

            for i in range(count):
                icon_box = links.nth(i).locator("div").first.bounding_box()
                assert icon_box is not None, f"Missing icon bounding box at index {i} on {name}"
                w = round(icon_box["width"], 1)
                h = round(icon_box["height"], 1)
                app_name = links.nth(i).locator("h4").inner_text()
                print(f"[{name}] {app_name}: {w}x{h}")
                assert abs(w - h) <= 1.0 and w >= 55.0, (
                    f"Icon for {app_name} on {name} is not a 56x56 square: {w}x{h}"
                )
            page.close()
        browser.close()


if __name__ == "__main__":
    try:
        test_related_apps_icons_are_square()
        print("PASS: All Related Apps icons are square.")
    except AssertionError as exc:
        print(f"FAIL: {exc}")
        sys.exit(1)
