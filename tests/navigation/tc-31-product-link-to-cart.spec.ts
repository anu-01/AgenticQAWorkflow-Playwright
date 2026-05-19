// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, URLS } from '../_helpers/saucedemo';

test.describe('Navigation & Edge Cases', () => {
  test('TC-31: Checkout flow from product detail page to cart', async ({ page }) => {
    await login(page);

    // Open product detail by clicking product name link
    await page.locator('[data-test="item-4-title-link"]').click(); // Sauce Labs Backpack detail
    await expect(page).toHaveURL(/inventory-item\.html/);

    // Add to cart from detail page
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // Navigate to cart
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(URLS.cart);
    await expect(page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' })).toHaveCount(1);
  });
});
