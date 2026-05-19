// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, continueCheckout } from '../_helpers/saucedemo';

test.describe('AC5 — Error Handling', () => {
  test('TC-24: Input fields receive error styling when validation fails', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);

    await continueCheckout(page);
    await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');

    // Each form_group container renders an error icon img after validation failure
    const firstGroup = page.locator('.form_group').filter({ has: page.locator('[data-test="firstName"]') });
    const lastGroup = page.locator('.form_group').filter({ has: page.locator('[data-test="lastName"]') });
    const zipGroup = page.locator('.form_group').filter({ has: page.locator('[data-test="postalCode"]') });

    await expect(firstGroup.locator('.error_icon')).toBeVisible();
    await expect(lastGroup.locator('.error_icon')).toBeVisible();
    await expect(zipGroup.locator('.error_icon')).toBeVisible();
  });
});
