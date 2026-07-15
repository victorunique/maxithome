import os
import sys
from playwright.sync_api import sync_playwright

def test_layout():
    print("Running E2E Layout Test...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})
        
        # Navigate to home
        page.goto('http://localhost:5173')
        page.wait_for_load_state('networkidle')
        
        # 1. Assert logo size is small (w-10 is 40px)
        logo = page.locator('img[alt="MindFlex Logo"]')
        if logo.count() == 0:
            print("FAIL: Logo not found")
            sys.exit(1)
            
        width = logo.first.evaluate("el => window.getComputedStyle(el).width")
        height = logo.first.evaluate("el => window.getComputedStyle(el).height")
        
        print(f"Computed logo size: {width} x {height}")
        
        # w-10 translates to 40px (or similar, but definitely not 1024px)
        # We assert it is under 50px
        width_val = float(width.replace('px', ''))
        height_val = float(height.replace('px', ''))
        
        if width_val > 50 or height_val > 50:
            print(f"FAIL: Logo is too large ({width_val}x{height_val} px). Tailwind CSS might not be working correctly.")
            sys.exit(1)
            
        print("PASS: Logo size is correct.")
        browser.close()

if __name__ == '__main__':
    test_layout()
