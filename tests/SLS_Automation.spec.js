const { test, expect } = require('@playwright/test');

test('Bank Representative Full Workflow', async ({ page }) => {
  
  // Step 1: Visit Login Page
  await page.goto('https://sls.homedashboard.com/login');
  
  // Step 2: Login
  await page.fill('#email', 'bankrep@example.com');
  await page.fill('#password', 'yourpassword');
  await page.click('button:has-text("Login")');
  
  // Step 3: Verify Dashboard Loaded
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('text=Welcome')).toBeVisible();

  // Step 4: Navigate to Assign Applications
  await page.click('a:has-text("Assign Applications")');
  await expect(page).toHaveURL(/assign-applications/);

  // Step 5: Assign Loan Application to Himself
  await page.locator('button:has-text("Assign to Myself")').first().click();
  await expect(page.locator('text=Application assigned successfully')).toBeVisible();

  // Step 6: Navigate to Process Applications Page
  await page.click('a:has-text("Process Applications")');
  await expect(page).toHaveURL(/process-applications/);

  // Step 7: Approve or Reject Application
  const approveButton = page.locator('button:has-text("Approve")').first();
  const rejectButton = page.locator('button:has-text("Reject")').first();

  if (await approveButton.isVisible()) {
    await approveButton.click();
    await expect(page.locator('text=Application Approved')).toBeVisible();
  } else if (await rejectButton.isVisible()) {
    await rejectButton.click();
    await expect(page.locator('text=Application Rejected')).toBeVisible();
  } else {
    console.log('No application available to process.');
  }
  
});
