import os
import sys
from playwright.sync_api import sync_playwright

def test_mobile_filters():
    print("Running E2E Mobile Filters Test...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Simulate mobile device
        context = browser.new_context(
            viewport={"width": 390, "height": 844},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1"
        )
        page = context.new_page()
        
        page.goto('http://localhost:5173')
        page.wait_for_load_state('networkidle')
        
        # Click the mobile "Filters" button
        filters_button = page.get_by_role("button", name="Filters")
        print("Clicking 'Filters' toggle button...")
        filters_button.click()
        
        # Wait for the mobile drawer to open
        page.wait_for_timeout(500)
        
        # Try to click the Close filters ("X") button
        close_button = page.get_by_role("button", name="Close filters")
        
        print("Checking if close button is visible...")
        if not close_button.is_visible():
            print("FAIL: Close filters button is not visible")
            sys.exit(1)
            
        print("Attempting to click the close button...")
        try:
            close_button.click(timeout=3000)
            print("PASS: Successfully clicked close button!")
        except Exception as e:
            print(f"FAIL: Click intercepted or failed: {e}")
            sys.exit(1)
            
        browser.close()

if __name__ == '__main__':
    test_mobile_filters()
