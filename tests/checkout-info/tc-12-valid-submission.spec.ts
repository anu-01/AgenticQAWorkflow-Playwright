// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, continueCheckout, URLS } from '../_helpers/saucedemo';

test.describe('AC2 — Checkout Information Entry', () => {
  test('TC-12: Successful form submission navigates to overview', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);

    await fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('John');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('Doe');
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue('12345');

    await continueCheckout(page);
    await expect(page).toHaveURL(URLS.stepTwo);
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');
  });
});
