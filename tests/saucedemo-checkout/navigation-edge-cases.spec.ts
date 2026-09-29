// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Navigation and Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

  test('should redirect unauthenticated users away from checkout pages', async ({ page }) => {
    await test.step('Attempt to navigate directly to the checkout information page without logging in', async () => {
      await page.goto('https://www.saucedemo.com/checkout-step-one.html');
      await expect(page).toHaveURL('https://www.saucedemo.com/');
      await expect(page.locator('[data-test="error"]')).toHaveText(
        "Epic sadface: You can only access '/checkout-step-one.html' when you are logged in."
      );
    });
  });

  // DEFECT (see test-results/SCRUM-101-checkout-test-report.md Defects Log):
  // Business Rule 3 states the cart cannot be empty when proceeding to checkout, but the
  // application currently allows this. This test documents the actual (buggy) behavior.
  test('should currently allow proceeding to checkout even when cart is empty (known defect)', async ({ page }) => {
    await test.step('Log in and ensure the cart is empty', async () => {
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
    });

    await test.step("Click 'Checkout' with an empty cart", async () => {
      await page.locator('[data-test="checkout"]').click();
      // Expected per Business Rule 3: user should be blocked from checking out with an empty cart.
      // Actual: the application navigates to the checkout information page regardless.
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });
  });

  // DEFECT (see test-results/SCRUM-101-checkout-test-report.md Defects Log):
  // AC5 expects validation error messages for invalid data, but the application only validates
  // that fields are non-empty; special characters and excessively long values are accepted.
  test('should currently accept special characters and boundary-length values without validation (known defect)', async ({ page }) => {
    await test.step('Log in, add an item to cart, and navigate to checkout information page', async () => {
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await page.locator('[data-test="checkout"]').click();
    });

    await test.step('Enter special characters and a very long string in the checkout fields', async () => {
      await page.locator('[data-test="firstName"]').fill('@#$%^&*()_+{}|:<>?');
      await page.locator('[data-test="lastName"]').fill('X'.repeat(110));
      await page.locator('[data-test="postalCode"]').fill('!!!###');
      await page.locator('[data-test="continue"]').click();
      // Expected per AC5: a validation error should be shown for invalid data.
      // Actual: the application proceeds straight to the overview page with no format validation.
      await expect(page).toHaveURL(/checkout-step-two\.html/);
    });
  });
});
