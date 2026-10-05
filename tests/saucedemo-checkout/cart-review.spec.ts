// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Cart Review', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('should display all added items with correct details and total price', async ({ page }) => {
    await test.step("Add 'Sauce Labs Backpack' and 'Sauce Labs Bike Light' to the cart", async () => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    });

    await test.step('Navigate to the cart page and verify item details', async () => {
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/cart\.html/);

      const backpackItem = page.locator('[data-test="inventory-item"]').filter({ hasText: 'Sauce Labs Backpack' });
      await expect(backpackItem.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
      await expect(backpackItem.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
      await expect(backpackItem.locator('[data-test="item-quantity"]')).toHaveText('1');

      const bikeLightItem = page.locator('[data-test="inventory-item"]').filter({ hasText: 'Sauce Labs Bike Light' });
      await expect(bikeLightItem.locator('[data-test="inventory-item-price"]')).toHaveText('$9.99');
      await expect(bikeLightItem.locator('[data-test="item-quantity"]')).toHaveText('1');

      await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
      await expect(page.locator('[data-test="checkout"]')).toBeVisible();
    });
  });

  test('should navigate back to products page when Continue Shopping is clicked', async ({ page }) => {
    await test.step('Add an item to the cart and go to the cart page', async () => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/cart\.html/);
    });

    await test.step("Click 'Continue Shopping'", async () => {
      await page.locator('[data-test="continue-shopping"]').click();
      await expect(page).toHaveURL(/inventory\.html/);
    });
  });

  test('should navigate to checkout information page when Checkout is clicked', async ({ page }) => {
    await test.step('Add an item to the cart and go to the cart page', async () => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/cart\.html/);
    });

    await test.step("Click 'Checkout'", async () => {
      await page.locator('[data-test="checkout"]').click();
      await expect(page).toHaveURL(/checkout-step-one\.html/);
      await expect(page.getByText('Checkout: Your Information')).toBeVisible();
    });
  });
});
