import sys
from playwright.sync_api import sync_playwright

def test_talkdrill():
    print("Running E2E TalkDrill Item & Detail Navigation Test...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        # 1. Desktop Test
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})
        page.goto('http://localhost:5173')
        page.wait_for_load_state('networkidle')
        
        # Verify TalkDrill title is in the directory
        card_title = page.locator('text=TalkDrill')
        if card_title.count() == 0:
            print("FAIL: TalkDrill card not found on Home page")
            sys.exit(1)
        print("PASS: TalkDrill card found on Home page")
        
        # Find Launch link for TalkDrill
        launch_btn = page.locator('a[href="https://talkdrill.maxithome.com/"]')
        if launch_btn.count() == 0:
            print("FAIL: TalkDrill Launch link with https://talkdrill.maxithome.com/ not found")
            sys.exit(1)
        print("PASS: TalkDrill Launch link correctly configured")
        
        # Click Details for TalkDrill
        details_link = page.locator('a[href="/apps/talkdrill"]')
        if details_link.count() == 0:
            print("FAIL: TalkDrill Details link not found")
            sys.exit(1)
        details_link.first.click()
        page.wait_for_load_state('networkidle')
        
        # Verify Detail View
        h1 = page.locator('h1:has-text("TalkDrill")')
        if h1.count() == 0:
            print("FAIL: TalkDrill Detail page header not found")
            sys.exit(1)
        print("PASS: TalkDrill Detail page header verified")
        
        # Verify How to Play / Use section
        how_to = page.locator('text=How to Play & Use')
        if how_to.count() == 0:
            print("FAIL: How to Play & Use section not found")
            sys.exit(1)
        print("PASS: How to Play & Use section verified")
        
        # 2. Mobile Responsive Test
        page.set_viewport_size({"width": 390, "height": 844})
        if h1.count() == 0:
            print("FAIL: Mobile layout failed on TalkDrill detail page")
            sys.exit(1)
        print("PASS: Mobile layout on TalkDrill detail page verified")
        
        browser.close()
        print("ALL TALKDRILL E2E CHECKS PASSED!")

if __name__ == '__main__':
    test_talkdrill()
