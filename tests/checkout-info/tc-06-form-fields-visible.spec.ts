// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo } from '../_helpers/saucedemo';

test.describe('AC2 — Checkout Information Entry', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);
  });

  test('TC-06: Checkout info form displays all required fields', async ({ page }) => {
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');

    const first = page.locator('[data-test="firstName"]');
    const last = page.locator('[data-test="lastName"]');
    const zip = page.locator('[data-test="postalCode"]');
    await expect(first).toBeVisible();
    await expect(first).toHaveValue('');
    await expect(last).toBeVisible();
    await expect(last).toHaveValue('');
    await expect(zip).toBeVisible();
    await expect(zip).toHaveValue('');

    await expect(page.locator('[data-test="cancel"]')).toBeVisible();
    await expect(page.locator('[data-test="continue"]')).toBeVisible();
  });
});
