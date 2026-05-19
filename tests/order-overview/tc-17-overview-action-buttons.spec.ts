// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, continueCheckout, URLS } from '../_helpers/saucedemo';

test.describe('AC3 — Order Overview', () => {
  test('TC-17: Overview page shows Cancel and Finish action buttons', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);
    await fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await continueCheckout(page);
    await expect(page).toHaveURL(URLS.stepTwo);

    const cancel = page.locator('[data-test="cancel"]');
    const finish = page.locator('[data-test="finish"]');
    await expect(cancel).toBeVisible();
    await expect(cancel).toBeEnabled();
    await expect(finish).toBeVisible();
    await expect(finish).toBeEnabled();
  });
});
