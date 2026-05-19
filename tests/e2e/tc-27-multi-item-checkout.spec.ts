// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, continueCheckout, finishCheckout, URLS } from '../_helpers/saucedemo';

test.describe('Happy Path — E2E', () => {
  test('TC-27: Full end-to-end checkout with multiple items', async ({ page }) => {
    await login(page);

    // 3 items
    await addToCart(page, 'sauce-labs-backpack');     // $29.99
    await addToCart(page, 'sauce-labs-bike-light');   // $9.99
    await addToCart(page, 'sauce-labs-bolt-t-shirt'); // $15.99
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');

    await goToCart(page);
    await expect(page.locator('.cart_item')).toHaveCount(3);

    await goToCheckoutInfo(page);
    await fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await continueCheckout(page);
    await expect(page).toHaveURL(URLS.stepTwo);

    // Subtotal 29.99 + 9.99 + 15.99 = $55.97; tax = $4.48; total = $60.45
    await expect(page.locator('[data-test="subtotal-label"]')).toContainText('Item total: $55.97');
    await expect(page.locator('[data-test="tax-label"]')).toContainText('Tax: $4.48');
    await expect(page.locator('[data-test="total-label"]')).toContainText('Total: $60.45');

    await finishCheckout(page);
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });
});
