// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Order Overview', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test('should display item summary, payment information, and shipping information', async ({ page }) => {
    await test.step('Review the overview page', async () => {
      await expect(page.getByText('Checkout: Overview')).toBeVisible();

      const backpackItem = page.locator('[data-test="inventory-item"]').filter({ hasText: 'Sauce Labs Backpack' });
      await expect(backpackItem.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
      const bikeLightItem = page.locator('[data-test="inventory-item"]').filter({ hasText: 'Sauce Labs Bike Light' });
      await expect(bikeLightItem.locator('[data-test="inventory-item-price"]')).toHaveText('$9.99');

      await expect(page.locator('[data-test="payment-info-value"]')).toHaveText('SauceCard #31337');
      await expect(page.locator('[data-test="shipping-info-value"]')).toHaveText('Free Pony Express Delivery!');
    });
  });

  test('should calculate item total, tax, and total price correctly', async ({ page }) => {
    await test.step('Verify the price total section', async () => {
      await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $39.98');
      await expect(page.locator('[data-test="tax-label"]')).toHaveText('Tax: $3.20');
      await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $43.18');
    });
  });

  test('should return to the products page when Cancel is clicked', async ({ page }) => {
    await test.step("Click 'Cancel'", async () => {
      await page.locator('[data-test="cancel"]').click();
      // Cancel on the overview page returns to the products page, not the cart (verified during exploratory testing)
      await expect(page).toHaveURL(/inventory\.html/);
    });
  });
});
