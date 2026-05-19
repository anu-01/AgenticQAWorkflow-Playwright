// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, continueCheckout, finishCheckout, URLS } from '../_helpers/saucedemo';

test.describe('AC4 — Order Completion', () => {
  test('TC-21: Cart is cleared after order completion', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await addToCart(page, 'sauce-labs-bike-light');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    await goToCart(page);
    await goToCheckoutInfo(page);
    await fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await continueCheckout(page);
    await finishCheckout(page);

    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(URLS.inventory);

    // Cart is empty: no badge visible
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
    // Add-to-cart buttons returned to default state (not Remove)
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toBeVisible();
  });
});
