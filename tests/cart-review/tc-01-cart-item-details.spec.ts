// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('AC1 — Cart Review', () => {
  test('TC-01: Cart displays correct item details', async ({ page }) => {
    // 1. Navigate and log in
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page).toHaveTitle(/Swag Labs/);

    // 2. Add Sauce Labs Backpack to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

    // 3. Add Sauce Labs Bike Light to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // 4. Navigate to cart
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('.title')).toHaveText('Your Cart');

    // 5. Inspect first cart line item — Sauce Labs Backpack
    const backpackItem = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' });
    await expect(backpackItem.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
    await expect(backpackItem.locator('.inventory_item_desc')).toBeVisible();
    await expect(backpackItem.locator('[data-test="item-quantity"]')).toHaveText('1');
    await expect(backpackItem.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
    await expect(backpackItem.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

    // 6. Inspect second cart line item — Sauce Labs Bike Light
    const bikeLightItem = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Bike Light' });
    await expect(bikeLightItem.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Bike Light');
    await expect(bikeLightItem.locator('.inventory_item_desc')).toBeVisible();
    await expect(bikeLightItem.locator('[data-test="item-quantity"]')).toHaveText('1');
    await expect(bikeLightItem.locator('[data-test="inventory-item-price"]')).toHaveText('$9.99');
    await expect(bikeLightItem.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();

    // 7. Verify column headers
    await expect(page.locator('.cart_quantity_label')).toHaveText('QTY');
    await expect(page.locator('.cart_desc_label')).toHaveText('Description');
  });
});
