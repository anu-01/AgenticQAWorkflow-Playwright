// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart } from '../_helpers/saucedemo';

test.describe('AC1 — Cart Review', () => {
  test('TC-04: Remove button removes item from cart', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await addToCart(page, 'sauce-labs-bike-light');
    await goToCart(page);
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' })).toHaveCount(0);
    await expect(page.locator('.cart_item').filter({ hasText: 'Sauce Labs Bike Light' })).toHaveCount(1);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
