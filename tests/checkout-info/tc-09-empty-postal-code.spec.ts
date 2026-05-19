// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, continueCheckout, URLS } from '../_helpers/saucedemo';

test.describe('AC2 — Checkout Information Entry', () => {
  test('TC-09: Validation error when Postal Code is empty', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);

    await fillCheckoutInfo(page, 'John', 'Doe', '');
    await continueCheckout(page);

    await expect(page).toHaveURL(URLS.stepOne);
    const err = page.locator('[data-test="error"]');
    await expect(err).toBeVisible();
    await expect(err).toContainText('Error: Postal Code is required');
  });
});
