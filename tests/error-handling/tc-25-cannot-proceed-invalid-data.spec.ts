// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, continueCheckout, URLS } from '../_helpers/saucedemo';

test.describe('AC5 — Error Handling', () => {
  test('TC-25: User cannot reach overview page with invalid checkout info data', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);

    // Type only special characters in First Name; leave others empty
    await page.locator('[data-test="firstName"]').fill('!@#$%');

    await continueCheckout(page);

    await expect(page).toHaveURL(URLS.stepOne);
    // With First Name filled (any value), next sequential error is Last Name
    await expect(page.locator('[data-test="error"]')).toContainText('Error: Last Name is required');
    await expect(page).not.toHaveURL(URLS.stepTwo);
  });
});
