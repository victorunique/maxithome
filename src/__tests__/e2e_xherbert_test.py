import sys
from playwright.sync_api import sync_playwright


def verify_screenshots_loaded(page):
    """Verify all 3 XHerbert screenshots exist, load cleanly, and can be navigated."""
    imgs = page.locator('img[alt^="XHerbert screenshot preview"]')
    if imgs.count() != 3:
        print(f"FAIL: Expected 3 XHerbert screenshots, found {imgs.count()}")
        sys.exit(1)

    for i in range(3):
        loaded = imgs.nth(i).evaluate(
            "el => el.complete && el.naturalWidth > 0 && el.naturalHeight > 0"
        )
        if not loaded:
            print(f"FAIL: XHerbert screenshot {i + 1} failed to load")
            sys.exit(1)

    # Navigate through carousel via dot indicators
    for idx in range(3):
        dot = page.locator(f'button[aria-label="Go to screenshot {idx + 1}"]')
        if dot.count() == 0:
            print(f"FAIL: Missing carousel dot for screenshot {idx + 1}")
            sys.exit(1)
        dot.click()
        if dot.get_attribute("aria-current") != "true":
            print(f"FAIL: Carousel dot {idx + 1} did not activate")
            sys.exit(1)

    print("PASS: All 3 XHerbert screenshots loaded and carousel navigation verified")


def test_xherbert():
    print("Running E2E XHerbert Item & Detail Page Test...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})
        page.goto("http://localhost:5173")
        page.wait_for_load_state("networkidle")

        # Verify XHerbert card and Launch link on Home page
        if page.locator("text=XHerbert").count() == 0:
            print("FAIL: XHerbert card not found on Home page")
            sys.exit(1)
        print("PASS: XHerbert card found on Home page")

        launch_btn = page.locator('a[href="https://xherbert.maxithome.com/"]')
        if launch_btn.count() == 0:
            print("FAIL: XHerbert Launch link with https://xherbert.maxithome.com/ not found")
            sys.exit(1)
        print("PASS: XHerbert Launch link correctly configured")

        # Navigate to XHerbert Detail page
        details_link = page.locator('a[href="/apps/xherbert"]')
        if details_link.count() == 0:
            print("FAIL: XHerbert Details link (/apps/xherbert) not found")
            sys.exit(1)
        details_link.first.click()
        page.wait_for_load_state("networkidle")

        h1 = page.locator('h1:has-text("XHerbert")')
        if h1.count() == 0:
            print("FAIL: XHerbert Detail page header not found")
            sys.exit(1)
        print("PASS: XHerbert Detail page header verified")

        # Verify updated description mentions H-Lang and Learn tab gameplay
        if page.locator("text=H-Lang").count() == 0:
            print("FAIL: Updated H-Lang description not found on detail page")
            sys.exit(1)
        if page.locator("text=How to Play & Use").count() == 0:
            print("FAIL: How to Play & Use section not found")
            sys.exit(1)
        print("PASS: XHerbert description and How to Play section verified")

        verify_screenshots_loaded(page)

        # Mobile responsive check
        page.set_viewport_size({"width": 390, "height": 844})
        if h1.count() == 0:
            print("FAIL: Mobile layout failed on XHerbert detail page")
            sys.exit(1)
        print("PASS: Mobile layout on XHerbert detail page verified")

        browser.close()
        print("ALL XHERBERT E2E CHECKS PASSED!")


if __name__ == "__main__":
    test_xherbert()
