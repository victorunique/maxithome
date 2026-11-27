import sys
from playwright.sync_api import sync_playwright


def verify_screenshots_loaded(page):
    """Verify all 3 Party Nest screenshots exist, load cleanly, and can be navigated."""
    imgs = page.locator('img[alt^="Party Nest screenshot preview"]')
    if imgs.count() != 3:
        print(f"FAIL: Expected 3 Party Nest screenshots, found {imgs.count()}")
        sys.exit(1)

    for i in range(3):
        loaded = imgs.nth(i).evaluate(
            "el => el.complete && el.naturalWidth > 0 && el.naturalHeight > 0"
        )
        if not loaded:
            print(f"FAIL: Party Nest screenshot {i + 1} failed to load")
            sys.exit(1)

    for idx in range(3):
        dot = page.locator(f'button[aria-label="Go to screenshot {idx + 1}"]')
        if dot.count() == 0:
            print(f"FAIL: Missing carousel dot for screenshot {idx + 1}")
            sys.exit(1)
        dot.click()
        if dot.get_attribute("aria-current") != "true":
            print(f"FAIL: Carousel dot {idx + 1} did not activate")
            sys.exit(1)

    print("PASS: All 3 Party Nest screenshots loaded and carousel navigation verified")


def test_party_nest():
    print("Running E2E Party Nest Item & Detail Page Test...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})
        page.goto("http://localhost:5173")
        page.wait_for_load_state("networkidle")

        if page.locator("text=Party Nest").count() == 0:
            print("FAIL: Party Nest card not found on Home page")
            sys.exit(1)
        print("PASS: Party Nest card found on Home page")

        launch_btn = page.locator('a[href="https://party-nest.maxithome.com/"]')
        if launch_btn.count() == 0:
            print("FAIL: Party Nest Launch link with https://party-nest.maxithome.com/ not found")
            sys.exit(1)
        print("PASS: Party Nest Launch link correctly configured")

        details_link = page.locator('a[href="/apps/party-nest"]')
        if details_link.count() == 0:
            print("FAIL: Party Nest Details link (/apps/party-nest) not found")
            sys.exit(1)
        details_link.first.click()
        page.wait_for_load_state("networkidle")

        h1 = page.locator('h1:has-text("Party Nest")')
        if h1.count() == 0:
            print("FAIL: Party Nest Detail page header not found")
            sys.exit(1)
        print("PASS: Party Nest Detail page header verified")

        if page.locator("text=Host Mode").count() == 0 or page.locator("text=Invitee Mode").count() == 0:
            print("FAIL: Host Mode / Invitee Mode description not found on detail page")
            sys.exit(1)
        if page.locator("text=How to Play & Use").count() == 0:
            print("FAIL: How to Play & Use section not found")
            sys.exit(1)
        print("PASS: Party Nest description and How to Play section verified")

        verify_screenshots_loaded(page)

        page.set_viewport_size({"width": 390, "height": 844})
        if h1.count() == 0:
            print("FAIL: Mobile layout failed on Party Nest detail page")
            sys.exit(1)
        print("PASS: Mobile layout on Party Nest detail page verified")

        browser.close()
        print("ALL PARTY NEST E2E CHECKS PASSED!")


if __name__ == "__main__":
    test_party_nest()
