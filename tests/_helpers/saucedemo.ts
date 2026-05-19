// Shared helpers for SauceDemo checkout tests (SCRUM-101)
// See: specs/saucedemo-checkout-test-plan.md

import { Page, expect } from '@playwright/test';

export const URLS = {
  login: 'https://www.saucedemo.com',
  inventory: /inventory\.html/,
  cart: /cart\.html/,
  stepOne: /checkout-step-one\.html/,
  stepTwo: /checkout-step-two\.html/,
  complete: /checkout-complete\.html/,
};

export async function login(page: Page, user = 'standard_user', pass = 'secret_sauce') {
  await page.goto(URLS.login);
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(URLS.inventory);
}

export async function addToCart(page: Page, productSlug: string) {
  await page.locator(`[data-test="add-to-cart-${productSlug}"]`).click();
}

export async function goToCart(page: Page) {
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(URLS.cart);
}

export async function goToCheckoutInfo(page: Page) {
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(URLS.stepOne);
}

export async function fillCheckoutInfo(page: Page, first: string, last: string, zip: string) {
  if (first) await page.locator('[data-test="firstName"]').fill(first);
  if (last) await page.locator('[data-test="lastName"]').fill(last);
  if (zip) await page.locator('[data-test="postalCode"]').fill(zip);
}

export async function continueCheckout(page: Page) {
  await page.locator('[data-test="continue"]').click();
}

export async function finishCheckout(page: Page) {
  await page.locator('[data-test="finish"]').click();
  await expect(page).toHaveURL(URLS.complete);
}
