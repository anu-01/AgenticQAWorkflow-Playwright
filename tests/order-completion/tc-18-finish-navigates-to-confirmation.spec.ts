// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, continueCheckout, URLS } from '../_helpers/saucedemo';

test.describe('AC4 — Order Completion', () => {
  test('TC-18: Finish button navigates to order confirmation page', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);
    await fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await continueCheckout(page);
    await expect(page).toHaveURL(URLS.stepTwo);

    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(URLS.complete);
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
  });
});
