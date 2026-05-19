// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, URLS } from '../_helpers/saucedemo';

test.describe('Navigation & Edge Cases', () => {
  test('TC-28: Cancel from cart (Continue Shopping) preserves cart state', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await addToCart(page, 'sauce-labs-bike-light');
    await goToCart(page);
    await expect(page.locator('.cart_item')).toHaveCount(2);

    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL(URLS.inventory);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
  });
});
