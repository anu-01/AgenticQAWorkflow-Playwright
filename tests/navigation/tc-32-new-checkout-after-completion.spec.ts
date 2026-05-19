// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, continueCheckout, finishCheckout, URLS } from '../_helpers/saucedemo';

test.describe('Navigation & Edge Cases', () => {
  test('TC-32: Complete checkout then start a new checkout with fresh items', async ({ page }) => {
    // First checkout
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);
    await fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await continueCheckout(page);
    await finishCheckout(page);

    // Back home — cart cleared
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(URLS.inventory);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();

    // Start a new checkout with a different item
    await addToCart(page, 'sauce-labs-onesie'); // $7.99
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await goToCart(page);
    await goToCheckoutInfo(page);
    await fillCheckoutInfo(page, 'Jane', 'Smith', '90210');
    await continueCheckout(page);
    await expect(page).toHaveURL(URLS.stepTwo);
    await finishCheckout(page);
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });
});
