import os
import sys
from playwright.sync_api import sync_playwright

def test_footer():
    print("Running E2E Footer Refactoring Test...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})
        
        # Navigate to home
        page.goto('http://localhost:5173')
        page.wait_for_load_state('networkidle')
        
        # Check bio paragraph
        # The bio paragraph should be present and updated
        bio_locator = page.locator('#about p').first
        if bio_locator.count() == 0:
            print("FAIL: Bio paragraph not found in #about footer section")
            sys.exit(1)
            
        bio_text = bio_locator.inner_text().strip()
        expected_bio = (
            "An IT Specialist, Solution Architect, and AI Enthusiast based in Ireland, "
            "passionate about building scalable cloud systems and exploring the frontiers of Artificial Intelligence."
        )
        
        # Normalizing spaces/newlines
        bio_text_norm = " ".join(bio_text.split())
        expected_bio_norm = " ".join(expected_bio.split())
        
        if bio_text_norm != expected_bio_norm:
            print(f"FAIL: Bio text mismatch.\nExpected: '{expected_bio_norm}'\nActual: '{bio_text_norm}'")
            sys.exit(1)
            
        # Check Expertise section items and their exact order
        # Expertise heading should exist
        expertise_header = page.locator('#about h4:has-text("Expertise")')
        if expertise_header.count() == 0:
            print("FAIL: Expertise header not found")
            sys.exit(1)
            
        # Expertise items
        expertise_items = page.locator('#about h4:has-text("Expertise") + ul li')
        if expertise_items.count() != 4:
            print(f"FAIL: Expected 4 expertise items, got {expertise_items.count()}")
            sys.exit(1)
            
        expected_expertise = [
            "AI/ML & Agentic Engineering",
            "Cloud Architecture (AWS/Azure/GCP)",
            "Big Data & Analytics",
            "Full Stack Development"
        ]
        
        for i, expected in enumerate(expected_expertise):
            item_text = expertise_items.nth(i).inner_text().strip()
            # The text might contain "✓ " checkmarks, so let's verify if the text ends with or contains the expected string
            if expected not in item_text:
                print(f"FAIL: Expertise item {i} mismatch. Expected to contain '{expected}', got '{item_text}'")
                sys.exit(1)
        
        # Check Contact section
        # "Content" header should be changed to "Contact"
        contact_header = page.locator('#about h4:has-text("Contact")')
        if contact_header.count() == 0:
            print("FAIL: Contact header not found")
            sys.exit(1)
            
        content_header = page.locator('#about h4:has-text("Content")')
        if content_header.count() > 0:
            print("FAIL: Old 'Content' header still present")
            sys.exit(1)
            
        # "Immigration Channel" link should not be present
        immigration_link = page.locator('#about a:has-text("Immigration Channel")')
        if immigration_link.count() > 0:
            print("FAIL: 'Immigration Channel' link still present")
            sys.exit(1)
            
        # Contact items list
        contact_items = page.locator('#about h4:has-text("Contact") + ul li a')
        if contact_items.count() != 4:
            print(f"FAIL: Expected 4 contact items, got {contact_items.count()}")
            sys.exit(1)
            
        expected_contacts = [
            "Website",
            "GitHub",
            "LinkedIn",
            "Email"
        ]
        
        for i, expected in enumerate(expected_contacts):
            item_text = contact_items.nth(i).inner_text().strip()
            if expected != item_text:
                print(f"FAIL: Contact item {i} mismatch. Expected '{expected}', got '{item_text}'")
                sys.exit(1)
                
        print("PASS: Footer E2E tests verified successfully!")
        browser.close()

if __name__ == '__main__':
    test_footer()
