// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, goToCheckoutInfo, fillCheckoutInfo, continueCheckout, URLS } from '../_helpers/saucedemo';

test.describe('Navigation & Edge Cases', () => {
  test('TC-30: Cancel from overview returns to products page with cart preserved', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await goToCheckoutInfo(page);
    await fillCheckoutInfo(page, 'John', 'Doe', '12345');
    await continueCheckout(page);
    await expect(page).toHaveURL(URLS.stepTwo);

    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(URLS.inventory);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
