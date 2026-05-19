// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, continueCheckout, URLS } from '../_helpers/saucedemo';

test.describe('AC3 — Order Overview', () => {
  test('TC-14: Overview page displays payment and shipping information', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);
    await fillCheckoutInfo(page, 'Jane', 'Smith', '90210');
    await continueCheckout(page);
    await expect(page).toHaveURL(URLS.stepTwo);

    await expect(page.locator('[data-test="payment-info-label"]')).toContainText('Payment Information');
    await expect(page.locator('[data-test="payment-info-value"]')).toHaveText('SauceCard #31337');

    await expect(page.locator('[data-test="shipping-info-label"]')).toContainText('Shipping Information');
    await expect(page.locator('[data-test="shipping-info-value"]')).toHaveText('Free Pony Express Delivery!');
  });
});
