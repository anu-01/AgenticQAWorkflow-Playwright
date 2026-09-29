# SCRUM-101 Exploratory Testing Results

**Application:** https://www.saucedemo.com
**Tester:** AI QA Agent (manual exploration via Playwright MCP browser tools)
**Credentials used:** standard_user / secret_sauce

This document records the manual exploratory execution of the scenarios defined in
[specs/saucedemo-checkout-test-plan.md](../specs/saucedemo-checkout-test-plan.md).

## Suite 1: Cart Review

| # | Scenario | Result | Notes |
|---|----------|--------|-------|
| 1.1 | Add items and review cart details | ✅ PASS | Backpack ($29.99) and Bike Light ($9.99) both displayed with correct name, description, price, qty=1. Cart badge showed "2". |
| 1.2 | Continue Shopping returns to products page | ✅ PASS | Redirected to `/inventory.html` |
| 1.3 | Checkout button navigates to checkout info page | ✅ PASS | Redirected to `/checkout-step-one.html`, heading "Checkout: Your Information" |

Screenshot evidence: [cart-review.png](screenshots/cart-review.png)

## Suite 2: Checkout Information Entry

| # | Scenario | Result | Notes |
|---|----------|--------|-------|
| 2.1 | Valid info proceeds to overview | ✅ PASS | Redirected to `/checkout-step-two.html` |
| 2.2 | Empty First Name shows error | ✅ PASS | Alert text: "Error: First Name is required" |
| 2.3 | Empty Last Name shows error | ✅ PASS | Alert text: "Error: Last Name is required" |
| 2.4 | Empty Zip shows error | ✅ PASS | Alert text: "Error: Postal Code is required" |
| 2.5 | Cancel returns to cart page | ✅ PASS | Redirected to `/cart.html` |
| 2.6 | Dismiss (X) closes error banner | ✅ PASS | Alert (`[data-test="error"]`) removed from DOM after clicking `[data-test="error-button"]` |

Screenshot evidence: [checkout-validation-error.png](screenshots/checkout-validation-error.png)

## Suite 3: Order Overview

| # | Scenario | Result | Notes |
|---|----------|--------|-------|
| 3.1 | Item summary, payment & shipping info displayed | ✅ PASS | "Payment Information: SauceCard #31337", "Shipping Information: Free Pony Express Delivery!" |
| 3.2 | Subtotal/tax/total calculation correct | ✅ PASS | Item total $39.98 + Tax $3.20 = Total $43.18 (backpack + bike light) |
| 3.3 | Cancel on overview returns to products page | ⚠️ OBSERVATION | Cancel on the **overview** page redirects to `/inventory.html` (Products page), **not** the cart page. This differs from Cancel on the info page (which returns to cart). This asymmetry is by design in the app but is worth flagging for UX consistency review. |

Screenshot evidence: [checkout-overview.png](screenshots/checkout-overview.png)

## Suite 4: Order Completion

| # | Scenario | Result | Notes |
|---|----------|--------|-------|
| 4.1 | Finish shows confirmation | ✅ PASS | Heading "Thank you for your order!", message "Your order has been dispatched, and will arrive just as fast as the pony can get there!" |
| 4.2 | Cart cleared after completion | ✅ PASS | Cart icon shows "Cart, empty" after Finish |
| 4.3 | Back Home returns to products page | ✅ PASS | Redirected to `/inventory.html` |

Screenshot evidence: [order-confirmation.png](screenshots/order-confirmation.png)

## Suite 5: Navigation & Edge Cases

| # | Scenario | Result | Notes |
|---|----------|--------|-------|
| 5.1 | Unauthenticated access to checkout is blocked | ✅ PASS | Redirected to login (`/`) with alert: "Epic sadface: You can only access '/checkout-step-one.html' when you are logged in." |
| 5.2 | Checkout with empty cart | 🐞 **DEFECT FOUND** | The app **allows** navigating from the cart page to `/checkout-step-one.html` via the Checkout button even when the cart is empty, and even allows completing the checkout information step and reaching the Overview page with 0 items. This violates Business Rule 3 ("Cart cannot be empty when proceeding to checkout"). |
| 5.3 | Special characters / long strings in fields | 🐞 **DEFECT FOUND** | Entering `@#$%^&*()_+{}\|:<>?` in First Name, a 100+ character string in Last Name, and `!!!###` in Zip/Postal Code was accepted without any validation error — the app proceeded straight to the Overview page. Only presence/required-field validation exists; no format or length validation is implemented, which does not fully satisfy AC5 ("Error Handling" for invalid data). |

## Summary of Findings

- **18 scenarios executed manually**, 16 passed as expected, 1 is a documented behavioral observation (not a defect), and 2 scenarios surfaced genuine defects against the acceptance criteria / business rules.
- All happy-path flows (cart → checkout info → overview → confirmation) work correctly end-to-end.
- Required-field validation messages are accurate and specific per field.
- Session/auth guard correctly protects checkout routes from unauthenticated access.
- Two defects identified for the Defects Log (see [SCRUM-101-checkout-test-report.md](SCRUM-101-checkout-test-report.md)):
  1. Empty cart is not blocked from proceeding to checkout (violates Business Rule 3).
  2. No format/length validation on checkout information fields (partial gap vs AC5).
