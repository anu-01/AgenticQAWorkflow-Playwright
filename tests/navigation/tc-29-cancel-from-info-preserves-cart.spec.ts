// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, URLS } from '../_helpers/saucedemo';

test.describe('Navigation & Edge Cases', () => {
  test('TC-29: Cancel from checkout info returns to cart with items intact', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);
    await fillCheckoutInfo(page, 'Partial', '', '');

    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(URLS.cart);
    await expect(page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' })).toHaveCount(1);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
