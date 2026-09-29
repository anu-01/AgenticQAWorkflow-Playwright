# SCRUM-101 Checkout Test Report

**Application:** https://www.saucedemo.com (Swag Labs)
**Feature:** E-commerce Checkout Process
**Test Credentials:** standard_user / secret_sauce
**Report Date:** 2026-09-29

---

## 1. Executive Summary

| Metric | Count |
|---|---|
| Total test scenarios planned | 18 |
| Manual (exploratory) test cases executed | 18 |
| Automated test cases created | 18 |
| Automated test executions (3 browsers × 18 tests) | 54 |
| Automated tests passed | 54 / 54 (100%) |
| Automated tests failed | 0 |
| Automated tests requiring healing | 0 |
| Defects logged | 2 |
| Behavioral observations (non-defect) | 1 |

**Overall Status: ✅ PASS**, with 2 defects logged against the acceptance criteria / business rules (see [Section 4](#4-defects-log)). All core happy-path and validation flows for the checkout process work as expected across Chromium, Firefox, and WebKit.

---

## 2. Manual Test Results

Full details: [exploratory-testing-results.md](exploratory-testing-results.md)

Manual exploratory testing was performed directly against the live application using Playwright MCP browser tools, executing all 18 scenarios from the [test plan](../specs/saucedemo-checkout-test-plan.md).

| Suite | Scenarios | Passed | Observations | Defects |
|---|---|---|---|---|
| Cart Review | 3 | 3 | 0 | 0 |
| Checkout Information Entry | 6 | 6 | 0 | 0 |
| Order Overview | 3 | 2 | 1 | 0 |
| Order Completion | 3 | 3 | 0 | 0 |
| Navigation and Edge Cases | 3 | 1 | 0 | 2 |
| **Total** | **18** | **15** | **1** | **2** |

Screenshots captured as evidence:
- [cart-review.png](screenshots/cart-review.png) — cart with two items and calculated totals
- [checkout-validation-error.png](screenshots/checkout-validation-error.png) — required-field validation error
- [checkout-overview.png](screenshots/checkout-overview.png) — order overview with payment/shipping/pricing
- [order-confirmation.png](screenshots/order-confirmation.png) — order confirmation page

Key issues found during manual testing:
1. Checkout is reachable with an empty cart (violates Business Rule 3).
2. No format/length validation on checkout information fields (partial gap vs AC5).

---

## 3. Automated Test Results

### 3.1 Test Suite Structure

Automated Playwright TypeScript tests were generated in `tests/saucedemo-checkout/`, based on the test plan and using the exact selectors (`data-test` attributes) and application behaviors validated during manual exploratory testing:

| File | Suite | Test Count |
|---|---|---|
| [cart-review.spec.ts](../tests/saucedemo-checkout/cart-review.spec.ts) | Cart Review | 3 |
| [checkout-information.spec.ts](../tests/saucedemo-checkout/checkout-information.spec.ts) | Checkout Information Entry | 6 |
| [order-overview.spec.ts](../tests/saucedemo-checkout/order-overview.spec.ts) | Order Overview | 3 |
| [order-completion.spec.ts](../tests/saucedemo-checkout/order-completion.spec.ts) | Order Completion | 3 |
| [navigation-edge-cases.spec.ts](../tests/saucedemo-checkout/navigation-edge-cases.spec.ts) | Navigation and Edge Cases | 3 |

Tests are configured to run against Chromium, Firefox, and WebKit via [playwright.config.ts](../playwright.config.ts).

### 3.2 Initial Execution Results

The first execution run (Chromium only, 18 tests) produced **18/18 passed**, with no selector, timing, or assertion failures.

### 3.3 Cross-Browser Execution Results

A full cross-browser run (Chromium, Firefox, WebKit — 54 test executions) was performed next:

| Browser | Tests Run | Passed | Failed |
|---|---|---|---|
| Chromium | 18 | 18 | 0 |
| Firefox | 18 | 18 | 0 |
| WebKit | 18 | 18 | 0 |
| **Total** | **54** | **54** | **0** |

### 3.4 Healing Activities

**No healing was required.** Because the automation scripts were authored directly from the selectors and navigation behaviors validated in manual exploratory testing (Section 2), all 54 test executions passed on the first attempt across all three browsers. No selector adjustments, wait-strategy changes, or assertion corrections were necessary.

### 3.5 Final Test Execution Summary

| Metric | Result |
|---|---|
| Total automated executions | 54 |
| Passed | 54 |
| Failed | 0 |
| Flaky / healed | 0 |
| Pass rate | 100% |

---

## 4. Defects Log

### DEFECT-001: Checkout is reachable with an empty cart

- **Severity:** Medium
- **Title:** Application allows navigating to and through checkout with an empty cart
- **Description:** Business Rule 3 states "Cart cannot be empty when proceeding to checkout." However, the Checkout button on the cart page remains enabled and functional even when the cart contains zero items, allowing the user to reach the checkout information page and beyond.
- **Steps to Reproduce:**
  1. Log in as `standard_user`.
  2. Navigate to the cart page with no items added (or remove all items).
  3. Click "Checkout".
- **Expected Behavior:** The user should be blocked from proceeding to checkout, or shown a message indicating the cart must contain at least one item.
- **Actual Behavior:** The user is navigated to `/checkout-step-one.html` without any warning or restriction.
- **Evidence:** Documented in automated regression test `navigation-edge-cases.spec.ts` › "should currently allow proceeding to checkout even when cart is empty (known defect)" and in [exploratory-testing-results.md](exploratory-testing-results.md) (Suite 5, scenario 5.2).
- **Environment:** https://www.saucedemo.com, Chromium/Firefox/WebKit (latest), standard_user account.

### DEFECT-002: No format or length validation on checkout information fields

- **Severity:** Low
- **Title:** Checkout information form only validates presence, not format, of input
- **Description:** AC5 ("Error Handling") expects appropriate validation error messages when invalid data (special characters, incomplete/malformed information) is entered. The application only checks that First Name, Last Name, and Zip/Postal Code are non-empty; it accepts special characters and arbitrarily long strings without any error.
- **Steps to Reproduce:**
  1. Log in, add an item to cart, and navigate to the checkout information page.
  2. Enter `@#$%^&*()_+{}|:<>?` in First Name, a 100+ character string in Last Name, and `!!!###` in Zip/Postal Code.
  3. Click "Continue".
- **Expected Behavior:** A validation error should be shown indicating the data is invalid, per AC5.
- **Actual Behavior:** The application proceeds directly to the Order Overview page with the invalid data accepted as-is.
- **Evidence:** Documented in automated regression test `navigation-edge-cases.spec.ts` › "should currently accept special characters and boundary-length values without validation (known defect)" and in [exploratory-testing-results.md](exploratory-testing-results.md) (Suite 5, scenario 5.3).
- **Environment:** https://www.saucedemo.com, Chromium/Firefox/WebKit (latest), standard_user account.

> **Note:** No Critical or High severity defects (broken happy-path flows, data loss, security bypass) were found. Both logged defects are gaps against the acceptance criteria's validation expectations, not functional breakages, and the corresponding automated tests currently assert the *actual* observed behavior so they can serve as regression guards; they should be updated to assert the *corrected* behavior once these defects are fixed.

---

## 5. Test Coverage Analysis

| Acceptance Criteria | Covered By | Manual | Automated |
|---|---|---|---|
| AC1: Cart Review | Suite 1 (3 scenarios) | ✅ | ✅ |
| AC2: Checkout Information Entry | Suite 2 (6 scenarios) | ✅ | ✅ |
| AC3: Order Overview | Suite 3 (3 scenarios) | ✅ | ✅ |
| AC4: Order Completion | Suite 4 (3 scenarios) | ✅ | ✅ |
| AC5: Error Handling | Suite 2 (required-field errors) + Suite 5 (format validation gap) | ✅ (partial) | ✅ (partial — documents the gap) |

**Business Rules Coverage:**
- ✅ All checkout fields are mandatory — covered (Suite 2).
- ✅ Users must be logged in to access checkout — covered (Suite 5.1).
- 🐞 Cart cannot be empty when proceeding to checkout — **not enforced by the app** (DEFECT-001).
- ✅ Order confirmation clears the cart — covered (Suite 4.2).
- ✅ Users can cancel checkout at any step and return — covered (Suite 2.5, Suite 3.3), with the observation that "Cancel" on the overview page returns to Products rather than Cart.

**Gaps / Recommendations for Additional Testing:**
- Add coverage for other user types (`locked_out_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user`) to validate error handling and visual regressions across account states.
- Add mobile-viewport / responsive checkout tests, since the user story calls out mobile responsiveness as a technical requirement and this was not exercised in this pass.
- Add tests for multi-quantity or larger cart sizes (currently limited to 1–2 items).
- Consider adding explicit format/length validation to the checkout information form to close DEFECT-002, and cart-empty guard logic to close DEFECT-001.

---

## 6. Summary and Recommendations

**Overall Quality Assessment:** The core checkout journey (cart → information → overview → confirmation) is functionally solid and consistent across Chromium, Firefox, and WebKit, with accurate pricing calculations, clear required-field validation messaging, and correct session/auth guarding of checkout routes.

**Risk Areas:**
- The empty-cart checkout gap (DEFECT-001) is a business-rule compliance risk rather than a breakage risk, since the app doesn't crash but silently ignores the rule.
- The lack of input format validation (DEFECT-002) is a low-risk data-quality concern (e.g., garbage shipping data could be submitted) but is not a security issue in this demo application.

**Next Steps:**
1. Share DEFECT-001 and DEFECT-002 with the development team for triage and prioritization.
2. Once fixed, update `navigation-edge-cases.spec.ts` to assert the corrected (blocking/validating) behavior instead of the current documented workaround behavior.
3. Expand automated coverage to the additional user types and responsive/mobile scenarios noted above.
4. Continue running the automated suite (`tests/saucedemo-checkout/`) across all three browsers on every change to guard against regressions.
