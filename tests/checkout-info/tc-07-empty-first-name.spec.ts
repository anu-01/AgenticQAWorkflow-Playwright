// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, continueCheckout, URLS } from '../_helpers/saucedemo';

test.describe('AC2 — Checkout Information Entry', () => {
  test('TC-07: Validation error when First Name is empty', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);

    // Leave First Name empty
    await fillCheckoutInfo(page, '', 'Doe', '12345');
    await continueCheckout(page);

    // URL must not change
    await expect(page).toHaveURL(URLS.stepOne);
    const err = page.locator('[data-test="error"]');
    await expect(err).toBeVisible();
    await expect(err).toContainText('Error: First Name is required');
  });
});
