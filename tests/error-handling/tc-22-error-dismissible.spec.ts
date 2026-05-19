// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, continueCheckout } from '../_helpers/saucedemo';

test.describe('AC5 — Error Handling', () => {
  test('TC-22: Error message is dismissible via the X button', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);

    await continueCheckout(page);
    const err = page.locator('[data-test="error"]');
    await expect(err).toBeVisible();
    await expect(err).toContainText('Error: First Name is required');

    // Dismiss the error
    await page.locator('[data-test="error-button"]').click();
    await expect(err).toBeHidden();

    // Form fields remain editable
    await page.locator('[data-test="firstName"]').fill('John');
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('John');
  });
});
