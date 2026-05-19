// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, continueCheckout, finishCheckout, URLS } from '../_helpers/saucedemo';

test.describe('AC4 — Order Completion', () => {
  test('TC-20: Back Home button returns to products page', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);
    await fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await continueCheckout(page);
    await finishCheckout(page);

    const back = page.locator('[data-test="back-to-products"]');
    await expect(back).toBeVisible();
    await back.click();

    await expect(page).toHaveURL(URLS.inventory);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });
});
