// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, continueCheckout, finishCheckout, URLS } from '../_helpers/saucedemo';

test.describe('Happy Path — E2E', () => {
  test('TC-26: Full end-to-end checkout with a single item', async ({ page }) => {
    await login(page);
    await expect(page.locator('.inventory_item')).toHaveCount(6);

    await addToCart(page, 'sauce-labs-backpack');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

    await goToCart(page);
    const backpack = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' });
    await expect(backpack.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
    await expect(backpack.locator('[data-test="item-quantity"]')).toHaveText('1');

    await goToCheckoutInfo(page);
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');

    await fillCheckoutInfo(page, 'Jane', 'Smith', '90210');
    await continueCheckout(page);

    await expect(page).toHaveURL(URLS.stepTwo);
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');
    await expect(page.locator('[data-test="total-label"]')).toContainText('$32.39');

    await finishCheckout(page);
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });
});
