// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, continueCheckout } from '../_helpers/saucedemo';

test.describe('AC5 — Error Handling', () => {
  test('TC-23: Validation shows first error first (sequential validation)', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);

    const err = page.locator('[data-test="error"]');

    // Step 1: empty form → First Name error
    await continueCheckout(page);
    await expect(err).toContainText('Error: First Name is required');

    // Step 2: First Name filled → Last Name error
    await page.locator('[data-test="firstName"]').fill('John');
    await continueCheckout(page);
    await expect(err).toContainText('Error: Last Name is required');

    // Step 3: Last Name filled → Postal Code error
    await page.locator('[data-test="lastName"]').fill('Doe');
    await continueCheckout(page);
    await expect(err).toContainText('Error: Postal Code is required');
  });
});
