// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('AC1 — Cart Review', () => {
  test('TC-02: Cart badge reflects item count accurately', async ({ page }) => {
    // 1. Log in
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);

    // 2. Verify no badge before adding items
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();

    // 3. Add Sauce Labs Bolt T-Shirt — badge shows 1
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // 4. Add Sauce Labs Onesie — badge shows 2
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // 5. Add Sauce Labs Fleece Jacket — badge shows 3
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');

    // 6. Navigate to cart and remove Bolt T-Shirt — badge decrements to 2
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    await expect(page.locator('.cart_item').filter({ hasText: 'Sauce Labs Bolt T-Shirt' })).not.toBeVisible();
  });
});
