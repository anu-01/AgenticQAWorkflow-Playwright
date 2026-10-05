// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Checkout Information Entry', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test("should proceed to overview page with valid First Name, Last Name and Zip", async ({ page }) => {
    await test.step("Fill First Name='John', Last Name='Doe', Zip='12345' and click 'Continue'", async () => {
      await page.locator('[data-test="firstName"]').fill('John');
      await page.locator('[data-test="lastName"]').fill('Doe');
      await page.locator('[data-test="postalCode"]').fill('12345');
      await page.locator('[data-test="continue"]').click();
      await expect(page).toHaveURL(/checkout-step-two\.html/);
    });
  });

  test("should show 'Error: First Name is required' when First Name is empty", async ({ page }) => {
    await test.step("Click 'Continue' with all fields empty", async () => {
      await page.locator('[data-test="continue"]').click();
      await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });
  });

  test("should show 'Error: Last Name is required' when Last Name is empty", async ({ page }) => {
    await test.step("Fill only First Name='John' and click 'Continue'", async () => {
      await page.locator('[data-test="firstName"]').fill('John');
      await page.locator('[data-test="continue"]').click();
      await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');
    });
  });

  test("should show 'Error: Postal Code is required' when Zip is empty", async ({ page }) => {
    await test.step("Fill First Name='John' and Last Name='Doe', leave Zip empty, and click 'Continue'", async () => {
      await page.locator('[data-test="firstName"]').fill('John');
      await page.locator('[data-test="lastName"]').fill('Doe');
      await page.locator('[data-test="continue"]').click();
      await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');
    });
  });

  test('should return to the cart page when Cancel is clicked', async ({ page }) => {
    await test.step("Click 'Cancel'", async () => {
      await page.locator('[data-test="cancel"]').click();
      await expect(page).toHaveURL(/cart\.html/);
    });
  });

  test('should dismiss the error banner when the dismiss (X) button is clicked', async ({ page }) => {
    await test.step("Trigger a validation error by clicking 'Continue' with empty fields", async () => {
      await page.locator('[data-test="continue"]').click();
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    });

    await test.step("Click the 'Dismiss error' button", async () => {
      await page.locator('[data-test="error-button"]').click();
      await expect(page.locator('[data-test="error"]')).toHaveCount(0);
    });
  });
});
