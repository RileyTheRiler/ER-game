import time
from playwright.sync_api import sync_playwright

def verify_progressbar():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to homepage...")
            # Retry a few times if connection refused initially
            for i in range(5):
                try:
                    page.goto("http://localhost:3000")
                    break
                except Exception:
                    print(f"Connection attempt {i+1} failed, retrying in 2s...")
                    time.sleep(2)
            else:
                 raise Exception("Could not connect to localhost:3000")

            # Wait for main menu
            print("Waiting for Main Menu...")
            page.wait_for_selector("text=CODE BLUE", timeout=10000)

            # Click CPC EXAM MODE
            print("Clicking CPC EXAM MODE...")
            page.click("text=CPC EXAM MODE")

            # Wait for CPC EXAM title (Start Screen)
            print("Waiting for CPC EXAM title...")
            page.wait_for_selector("h1:has-text('CPC EXAM MODE')", timeout=10000)

            # Click START EXAM
            print("Clicking START EXAM...")
            page.click("text=START EXAM")

            # Find progress bar by role
            print("Locating ProgressBar by role='progressbar'...")
            progressbar = page.locator("[role='progressbar']")

            # Wait for it to be visible
            progressbar.wait_for(state="visible", timeout=5000)

            # Verify attributes
            aria_label = progressbar.get_attribute("aria-label")
            aria_valuenow = progressbar.get_attribute("aria-valuenow")

            print(f"Found ProgressBar with aria-label='{aria_label}' and aria-valuenow='{aria_valuenow}'")

            if aria_label != "Time Remaining":
                print(f"❌ FAIL: Expected aria-label='Time Remaining', got '{aria_label}'")
                page.screenshot(path="verification/failure.png")
                browser.close()
                exit(1)

            if not aria_valuenow:
                 print(f"❌ FAIL: aria-valuenow is missing")
                 page.screenshot(path="verification/failure.png")
                 browser.close()
                 exit(1)

            print("✅ SUCCESS: ProgressBar has correct role and attributes.")
            page.screenshot(path="verification/success.png")

        except Exception as e:
            print(f"❌ ERROR: {e}")
            # Take screenshot on error
            try:
                page.screenshot(path="verification/error.png")
            except:
                pass
            exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    verify_progressbar()
