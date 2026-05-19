// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import { login, addToCart, goToCart, URLS } from '../_helpers/saucedemo';

test.describe('AC1 — Cart Review', () => {
  test('TC-05: Checkout button is visible and navigates to checkout info', async ({ page }) => {
    await login(page);
    await addToCart(page, 'sauce-labs-backpack');
    await goToCart(page);
    await expect(page.locator('.cart_item')).toHaveCount(1);

    const checkoutBtn = page.locator('[data-test="checkout"]');
    await expect(checkoutBtn).toBeVisible();
    await expect(checkoutBtn).toBeEnabled();

    await checkoutBtn.click();
    await expect(page).toHaveURL(URLS.stepOne);
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
  });
});
