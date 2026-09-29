// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Order Completion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test('should display order confirmation with success message when Finish is clicked', async ({ page }) => {
    await test.step("Click 'Finish'", async () => {
      await page.locator('[data-test="finish"]').click();
      await expect(page).toHaveURL(/checkout-complete\.html/);
      await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
      await expect(
        page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
      ).toBeVisible();
      await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
    });
  });

  test('should clear the cart after order completion', async ({ page }) => {
    await test.step("Complete the order by clicking 'Finish'", async () => {
      await page.locator('[data-test="finish"]').click();
      await expect(page).toHaveURL(/checkout-complete\.html/);
    });

    await test.step('Verify the cart is empty', async () => {
      await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
    });
  });

  test('should navigate back to products page when Back Home is clicked', async ({ page }) => {
    await test.step("Complete the order and click 'Back Home'", async () => {
      await page.locator('[data-test="finish"]').click();
      await page.locator('[data-test="back-to-products"]').click();
      await expect(page).toHaveURL(/inventory\.html/);
    });
  });
});
