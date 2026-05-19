// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, URLS } from '../_helpers/saucedemo';

test.describe('AC2 — Checkout Information Entry', () => {
  test('TC-11: Cancel from checkout info returns to cart', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);

    // Partial data entry
    await page.locator('[data-test="firstName"]').fill('John');
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('John');

    await page.locator('[data-test="cancel"]').click();

    await expect(page).toHaveURL(URLS.cart);
    await expect(page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' })).toHaveCount(1);
  });
});
