const {test, expect} = require('@playwright/test');

test('Home Page', async({page})=> {
    await page.goto('https://www.thankyou.com/cms/thankyou');

    await page.waitForTimeout(3000);
    const pageTitle = await page.title();
    console.log('Page tile is: ', pageTitle);

    await expect(page).toHaveTitle(/Rewards - Redeem your ThankYou/i);

    const pageURL = page.url();
    console.log('Page  URL is: ', pageURL);

    await expect(page).toHaveURL('https://www.thankyou.com/cms/thankyou?pageName=index');
    
    await page.close();

} );