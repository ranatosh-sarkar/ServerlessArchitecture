const {test, expect} = require('@playwright/test');

test('Navigate to Gift Cards > Apparel & Accessories', async ({ page }) => {
    // Step 1: Launch the ThankYou website
    await page.goto('https://www.thankyou.com/cms/thankyou/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(5000);

    // Step 2: Click on "Gift Cards" in the navigation menu
    const giftCardsMenu = page.getByRole('button', { name: 'Gift Card' });
    await giftCardsMenu.click();
    await page.waitForTimeout(1000);

    // Step 3: Click on "Apparel & Accessories"
    const apparelAccessories = page.locator('text=Apparel & Accessories');
    await apparelAccessories.click();
    await page.waitForTimeout(4000);

    // Step 4: Verify if the correct section/page is displayed
    const popupNotice = page.locator('text=IMPORTANT NOTICE ABOUT CITI THANKYOU® REWARDS');
    await page.waitForTimeout(2000);
    await expect(popupNotice).toBeVisible();

    console.log("✅ Test Passed: 'Gift Cards > Apparel & Accessories' navigation worked!");
    await page.close();
});