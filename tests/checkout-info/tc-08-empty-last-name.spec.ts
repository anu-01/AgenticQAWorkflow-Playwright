// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, continueCheckout, URLS } from '../_helpers/saucedemo';

test.describe('AC2 — Checkout Information Entry', () => {
  test('TC-08: Validation error when Last Name is empty', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);

    await fillCheckoutInfo(page, 'John', '', '12345');
    await continueCheckout(page);

    await expect(page).toHaveURL(URLS.stepOne);
    const err = page.locator('[data-test="error"]');
    await expect(err).toBeVisible();
    await expect(err).toContainText('Error: Last Name is required');
  });
});
