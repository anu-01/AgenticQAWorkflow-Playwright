// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, continueCheckout, URLS } from '../_helpers/saucedemo';

test.describe('AC3 — Order Overview', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await addToCart(page, 'sauce-labs-bike-light');
    await goToCart(page);
    await goToCheckoutInfo(page);
    await fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await continueCheckout(page);
    await expect(page).toHaveURL(URLS.stepTwo);
  });

  test('TC-13: Overview page displays item summary with correct details', async ({ page }) => {
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');

    const backpack = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' });
    await expect(backpack.locator('[data-test="item-quantity"]')).toHaveText('1');
    await expect(backpack.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');

    const bike = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Bike Light' });
    await expect(bike.locator('[data-test="item-quantity"]')).toHaveText('1');
    await expect(bike.locator('[data-test="inventory-item-price"]')).toHaveText('$9.99');

    await expect(page.locator('.cart_quantity_label')).toHaveText('QTY');
    await expect(page.locator('.cart_desc_label')).toHaveText('Description');
  });
});
