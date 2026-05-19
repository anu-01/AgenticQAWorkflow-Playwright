// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, continueCheckout, URLS } from '../_helpers/saucedemo';

test.describe('AC3 — Order Overview', () => {
  test('TC-15: Overview page totals math is correct', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await addToCart(page, 'sauce-labs-bike-light');
    await goToCart(page);
    await goToCheckoutInfo(page);
    await fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await continueCheckout(page);
    await expect(page).toHaveURL(URLS.stepTwo);

    // $29.99 + $9.99 = $39.98 subtotal; tax $3.20; total $43.18
    await expect(page.locator('[data-test="subtotal-label"]')).toContainText('Item total: $39.98');
    await expect(page.locator('[data-test="tax-label"]')).toContainText('Tax: $3.20');
    await expect(page.locator('[data-test="total-label"]')).toContainText('Total: $43.18');
  });
});
