# SauceDemo E-Commerce Checkout Test Plan — SCRUM-101

## Application Overview

SauceDemo (https://www.saucedemo.com) is a demo e-commerce application by Sauce Labs. This test plan covers the complete checkout flow for SCRUM-101: from cart review through shipping info entry, order overview, and order confirmation. Tests are executed with credentials username=standard_user / password=secret_sauce. Key selectors discovered during exploration: [data-test="username"], [data-test="password"], [data-test="login-button"], [data-test="add-to-cart-*"], [data-test="checkout"], [data-test="continue-shopping"], [data-test="firstName"], [data-test="lastName"], [data-test="postalCode"], [data-test="continue"], [data-test="cancel"], [data-test="finish"], [data-test="back-to-products"], [data-test="error"], .shopping_cart_badge. Cancel from checkout-info page returns to /cart.html. Cancel from checkout-overview page returns to /inventory.html. Cart is cleared after order completion (no badge visible on /inventory.html).

## Test Scenarios

### 1. AC1 — Cart Review

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC-01: Cart displays correct item details

**File:** `tests/cart-review/tc-01-cart-item-details.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and log in with username 'standard_user' and password 'secret_sauce'
    - expect: User is redirected to /inventory.html
    - expect: Page title contains 'Swag Labs'
  2. Click 'Add to cart' button for 'Sauce Labs Backpack' ([data-test='add-to-cart-sauce-labs-backpack'])
    - expect: Cart badge shows '1'
    - expect: Button label changes to 'Remove'
  3. Click 'Add to cart' button for 'Sauce Labs Bike Light' ([data-test='add-to-cart-sauce-labs-bike-light'])
    - expect: Cart badge shows '2'
  4. Click the shopping cart icon to navigate to /cart.html
    - expect: URL is https://www.saucedemo.com/cart.html
    - expect: Page heading reads 'Your Cart'
  5. Inspect the first cart line item for 'Sauce Labs Backpack'
    - expect: Item name 'Sauce Labs Backpack' is visible
    - expect: Item description is visible
    - expect: Quantity shows '1'
    - expect: Price shows '$29.99'
    - expect: Remove button is present
  6. Inspect the second cart line item for 'Sauce Labs Bike Light'
    - expect: Item name 'Sauce Labs Bike Light' is visible
    - expect: Item description is visible
    - expect: Quantity shows '1'
    - expect: Price shows '$9.99'
    - expect: Remove button is present
  7. Verify the column headers on the cart table
    - expect: 'QTY' column header is visible
    - expect: 'Description' column header is visible

#### 1.2. TC-02: Cart badge reflects item count accurately

**File:** `tests/cart-review/tc-02-cart-badge-count.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and log in with username 'standard_user' and password 'secret_sauce'
    - expect: User is on /inventory.html
  2. Verify the shopping cart badge is absent or shows no count before adding items
    - expect: No badge (.shopping_cart_badge) is visible on the cart icon
  3. Click 'Add to cart' for 'Sauce Labs Bolt T-Shirt'
    - expect: Cart badge displays '1'
  4. Click 'Add to cart' for 'Sauce Labs Onesie'
    - expect: Cart badge displays '2'
  5. Click 'Add to cart' for 'Sauce Labs Fleece Jacket'
    - expect: Cart badge displays '3'
  6. Navigate to /cart.html and click 'Remove' for 'Sauce Labs Bolt T-Shirt' ([data-test='remove-sauce-labs-bolt-t-shirt'])
    - expect: Cart badge decrements to '2'
    - expect: Sauce Labs Bolt T-Shirt is no longer listed in the cart

#### 1.3. TC-03: Continue Shopping button returns to products page

**File:** `tests/cart-review/tc-03-continue-shopping.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and log in with username 'standard_user' and password 'secret_sauce'
    - expect: User is on /inventory.html
  2. Add 'Sauce Labs Backpack' to cart and navigate to /cart.html
    - expect: URL is /cart.html with one item displayed
  3. Click 'Continue Shopping' button ([data-test='continue-shopping'])
    - expect: URL changes to /inventory.html
    - expect: Products page is displayed with all items visible
    - expect: Cart badge still shows '1' (cart is preserved)

#### 1.4. TC-04: Remove button removes item from cart

**File:** `tests/cart-review/tc-04-remove-item-from-cart.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and log in with username 'standard_user' and password 'secret_sauce'
    - expect: User is on /inventory.html
  2. Add 'Sauce Labs Backpack' and 'Sauce Labs Bike Light' to cart, then navigate to /cart.html
    - expect: Two items are listed in the cart
    - expect: Cart badge shows '2'
  3. Click 'Remove' button for 'Sauce Labs Backpack' ([data-test='remove-sauce-labs-backpack'])
    - expect: Sauce Labs Backpack is removed from the cart list
    - expect: Only Sauce Labs Bike Light remains
    - expect: Cart badge updates to '1'

#### 1.5. TC-05: Checkout button is visible and navigates to checkout info

**File:** `tests/cart-review/tc-05-checkout-button.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and log in with username 'standard_user' and password 'secret_sauce'
    - expect: User is on /inventory.html
  2. Add 'Sauce Labs Backpack' to cart and navigate to /cart.html
    - expect: Cart shows one item
  3. Verify the 'Checkout' button ([data-test='checkout']) is visible in the cart footer
    - expect: Checkout button is visible and enabled
  4. Click the 'Checkout' button
    - expect: URL changes to /checkout-step-one.html
    - expect: Page heading reads 'Checkout: Your Information'

### 2. AC2 — Checkout Information Entry

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC-06: Checkout info form displays all required fields

**File:** `tests/checkout-info/tc-06-form-fields-visible.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com, log in as standard_user, add 'Sauce Labs Backpack' to cart, navigate to /cart.html, and click Checkout
    - expect: URL is /checkout-step-one.html
  2. Verify the page heading
    - expect: Page heading reads 'Checkout: Your Information'
  3. Inspect the form for required fields
    - expect: First Name field ([data-test='firstName']) is visible and empty
    - expect: Last Name field ([data-test='lastName']) is visible and empty
    - expect: Zip/Postal Code field ([data-test='postalCode']) is visible and empty
  4. Verify action buttons are present
    - expect: Cancel button ([data-test='cancel']) is visible
    - expect: Continue button ([data-test='continue']) is visible

#### 2.2. TC-07: Validation error when First Name is empty

**File:** `tests/checkout-info/tc-07-empty-first-name.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com, log in as standard_user, add 'Sauce Labs Backpack' to cart, navigate to /cart.html, and click Checkout
    - expect: URL is /checkout-step-one.html
  2. Leave the First Name field ([data-test='firstName']) empty; type 'Doe' in the Last Name field; type '12345' in the Zip/Postal Code field
    - expect: Last Name and Postal Code fields are filled; First Name remains empty
  3. Click the Continue button ([data-test='continue'])
    - expect: URL remains /checkout-step-one.html — user is NOT advanced to the next page
  4. Inspect the error message element ([data-test='error'])
    - expect: Error message reads 'Error: First Name is required'
    - expect: Error message is visible on the page

#### 2.3. TC-08: Validation error when Last Name is empty

**File:** `tests/checkout-info/tc-08-empty-last-name.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com, log in as standard_user, add 'Sauce Labs Backpack' to cart, navigate to /cart.html, and click Checkout
    - expect: URL is /checkout-step-one.html
  2. Type 'John' in the First Name field; leave the Last Name field empty; type '12345' in the Zip/Postal Code field
    - expect: First Name and Postal Code are filled; Last Name is empty
  3. Click the Continue button ([data-test='continue'])
    - expect: URL remains /checkout-step-one.html
  4. Inspect the error message element ([data-test='error'])
    - expect: Error message reads 'Error: Last Name is required'
    - expect: Error message is visible on the page

#### 2.4. TC-09: Validation error when Postal Code is empty

**File:** `tests/checkout-info/tc-09-empty-postal-code.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com, log in as standard_user, add 'Sauce Labs Backpack' to cart, navigate to /cart.html, and click Checkout
    - expect: URL is /checkout-step-one.html
  2. Type 'John' in the First Name field; type 'Doe' in the Last Name field; leave the Zip/Postal Code field empty
    - expect: First Name and Last Name are filled; Postal Code is empty
  3. Click the Continue button ([data-test='continue'])
    - expect: URL remains /checkout-step-one.html
  4. Inspect the error message element ([data-test='error'])
    - expect: Error message reads 'Error: Postal Code is required'
    - expect: Error message is visible on the page

#### 2.5. TC-10: Validation error when all fields are empty

**File:** `tests/checkout-info/tc-10-all-fields-empty.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com, log in as standard_user, add 'Sauce Labs Backpack' to cart, navigate to /cart.html, and click Checkout
    - expect: URL is /checkout-step-one.html
    - expect: All fields are empty
  2. Click Continue ([data-test='continue']) without entering any data
    - expect: URL remains /checkout-step-one.html
  3. Inspect the error message element ([data-test='error'])
    - expect: An error message is displayed — the application reports the first missing field: 'Error: First Name is required'

#### 2.6. TC-11: Cancel from checkout info returns to cart

**File:** `tests/checkout-info/tc-11-cancel-returns-to-cart.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com, log in as standard_user, add 'Sauce Labs Backpack' to cart, navigate to /cart.html, and click Checkout
    - expect: URL is /checkout-step-one.html
  2. Type 'John' in the First Name field (partial data entry)
    - expect: First Name field shows 'John'
  3. Click the Cancel button ([data-test='cancel'])
    - expect: URL changes to /cart.html
    - expect: User is returned to the cart page
    - expect: Cart still contains 'Sauce Labs Backpack'

#### 2.7. TC-12: Successful form submission navigates to overview

**File:** `tests/checkout-info/tc-12-valid-submission.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com, log in as standard_user, add 'Sauce Labs Backpack' to cart, navigate to /cart.html, and click Checkout
    - expect: URL is /checkout-step-one.html
  2. Type 'John' in First Name, 'Doe' in Last Name, '12345' in Zip/Postal Code
    - expect: All three fields show the entered values
  3. Click the Continue button ([data-test='continue'])
    - expect: URL changes to /checkout-step-two.html
    - expect: Page heading reads 'Checkout: Overview'

### 3. AC3 — Order Overview

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC-13: Overview page displays item summary with correct details

**File:** `tests/order-overview/tc-13-item-summary.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' ($29.99) and 'Sauce Labs Bike Light' ($9.99) to cart, proceed through /cart.html → checkout → fill 'John' / 'Doe' / '12345' → click Continue
    - expect: URL is /checkout-step-two.html
    - expect: Page heading reads 'Checkout: Overview'
  2. Inspect the item list on the overview page
    - expect: Sauce Labs Backpack is listed with QTY '1' and price '$29.99'
    - expect: Sauce Labs Bike Light is listed with QTY '1' and price '$9.99'
    - expect: Item names link to their detail pages
  3. Verify the QTY and Description column headers are present
    - expect: QTY column header is visible
    - expect: Description column header is visible

#### 3.2. TC-14: Overview page displays payment and shipping information

**File:** `tests/order-overview/tc-14-payment-shipping-info.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' to cart, proceed through checkout info form with 'Jane' / 'Smith' / '90210', and click Continue
    - expect: URL is /checkout-step-two.html
  2. Locate the Payment Information section
    - expect: Label 'Payment Information:' is visible
    - expect: Card value 'SauceCard #31337' is displayed
  3. Locate the Shipping Information section
    - expect: Label 'Shipping Information:' is visible
    - expect: Shipping value 'Free Pony Express Delivery!' is displayed

#### 3.3. TC-15: Overview page totals math is correct

**File:** `tests/order-overview/tc-15-totals-math.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' ($29.99) and 'Sauce Labs Bike Light' ($9.99) to cart, complete checkout info with 'John' / 'Doe' / '12345', and click Continue
    - expect: URL is /checkout-step-two.html
  2. Read the 'Item total' value from the Price Total section
    - expect: Item total reads '$39.98' (= $29.99 + $9.99)
  3. Read the 'Tax' value
    - expect: Tax reads '$3.20' (approximately 8% of $39.98)
  4. Read the 'Total' value
    - expect: Total reads '$43.18' (= $39.98 + $3.20)

#### 3.4. TC-16: Cancel from overview returns to products page

**File:** `tests/order-overview/tc-16-cancel-from-overview.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' to cart, proceed through cart → checkout info ('John' / 'Doe' / '12345') → click Continue to reach overview
    - expect: URL is /checkout-step-two.html
  2. Click the Cancel button ([data-test='cancel'])
    - expect: URL changes to /inventory.html
    - expect: User is returned to the Products page
    - expect: Cart badge still shows '1' (item remains in cart)

#### 3.5. TC-17: Overview page shows Cancel and Finish action buttons

**File:** `tests/order-overview/tc-17-overview-action-buttons.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' to cart, proceed through checkout to /checkout-step-two.html
    - expect: URL is /checkout-step-two.html
  2. Inspect the footer action area
    - expect: Cancel button ([data-test='cancel']) is visible and enabled
    - expect: Finish button ([data-test='finish']) is visible and enabled

### 4. AC4 — Order Completion

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC-18: Finish button navigates to order confirmation page

**File:** `tests/order-completion/tc-18-finish-navigates-to-confirmation.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' to cart, complete checkout info ('John' / 'Doe' / '12345'), reach /checkout-step-two.html
    - expect: URL is /checkout-step-two.html
  2. Click the Finish button ([data-test='finish'])
    - expect: URL changes to /checkout-complete.html
    - expect: Page heading reads 'Checkout: Complete!'

#### 4.2. TC-19: Order confirmation page displays success message

**File:** `tests/order-completion/tc-19-confirmation-success-message.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' to cart, complete the full checkout flow through to Finish
    - expect: URL is /checkout-complete.html
  2. Inspect the page heading
    - expect: Heading reads 'Thank you for your order!'
  3. Inspect the confirmation body text
    - expect: Message reads 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
  4. Verify the Pony Express image is visible on the page
    - expect: Pony Express image (img[alt='Pony Express']) is displayed above the heading

#### 4.3. TC-20: Back Home button returns to products page

**File:** `tests/order-completion/tc-20-back-home.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' to cart, complete the full checkout flow through to /checkout-complete.html
    - expect: URL is /checkout-complete.html
    - expect: 'Back Home' button is visible
  2. Click the Back Home button ([data-test='back-to-products'])
    - expect: URL changes to /inventory.html
    - expect: Products page is displayed with all 6 product cards visible

#### 4.4. TC-21: Cart is cleared after order completion

**File:** `tests/order-completion/tc-21-cart-cleared-after-order.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' and 'Sauce Labs Bike Light' to cart (cart badge shows '2'), complete the full checkout flow through to /checkout-complete.html
    - expect: URL is /checkout-complete.html
  2. Click Back Home ([data-test='back-to-products']) to return to /inventory.html
    - expect: URL is /inventory.html
  3. Inspect the cart icon for a badge
    - expect: No cart badge (.shopping_cart_badge) is visible — the cart is empty
    - expect: All product 'Add to cart' buttons are in their default state (not 'Remove')

### 5. AC5 — Error Handling

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC-22: Error message is dismissible via the X button

**File:** `tests/error-handling/tc-22-error-dismissible.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' to cart, proceed to /checkout-step-one.html, and click Continue without filling any fields
    - expect: Error message 'Error: First Name is required' appears ([data-test='error'])
  2. Click the close (X) button on the error message banner
    - expect: Error message is dismissed and no longer visible
    - expect: The form fields remain on the page and are editable

#### 5.2. TC-23: Validation shows first error first (sequential validation)

**File:** `tests/error-handling/tc-23-sequential-validation.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' to cart, proceed to /checkout-step-one.html
    - expect: URL is /checkout-step-one.html with all fields empty
  2. Click Continue without any data
    - expect: Error reads 'Error: First Name is required'
  3. Fill in First Name only ('John') and click Continue again
    - expect: Error changes to 'Error: Last Name is required'
  4. Fill in Last Name only ('Doe') and click Continue again
    - expect: Error changes to 'Error: Postal Code is required'

#### 5.3. TC-24: Input fields receive error styling when validation fails

**File:** `tests/error-handling/tc-24-error-field-styling.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' to cart, proceed to /checkout-step-one.html, and click Continue without any data
    - expect: Error banner with text 'Error: First Name is required' is displayed
  2. Inspect each form field wrapper for error styling indicators (error icon images)
    - expect: An error icon (img) is rendered inside each form field container
    - expect: All three fields show the error indicator, signalling they are part of the required set

#### 5.4. TC-25: User cannot reach overview page with invalid checkout info data

**File:** `tests/error-handling/tc-25-cannot-proceed-invalid-data.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' to cart, proceed to /checkout-step-one.html
    - expect: URL is /checkout-step-one.html
  2. Type only special characters in First Name: '!@#$%' — leave Last Name and Postal Code empty
    - expect: Fields accept input
  3. Click the Continue button
    - expect: URL remains /checkout-step-one.html
    - expect: Error message is shown (Last Name is required since First Name was filled)
  4. Verify the URL does NOT change to /checkout-step-two.html
    - expect: User remains on /checkout-step-one.html — navigation is blocked until all required fields have values

### 6. Happy Path — End-to-End Checkout

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC-26: Full end-to-end checkout with a single item

**File:** `tests/e2e/tc-26-single-item-checkout.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and log in with username 'standard_user' and password 'secret_sauce'
    - expect: Redirected to /inventory.html
    - expect: 6 product cards are visible
  2. Click 'Add to cart' for 'Sauce Labs Backpack' ([data-test='add-to-cart-sauce-labs-backpack'])
    - expect: Cart badge shows '1'
    - expect: Add to cart button changes to 'Remove'
  3. Click the shopping cart icon to go to /cart.html
    - expect: Cart page shows 'Sauce Labs Backpack' with price '$29.99' and QTY '1'
  4. Click the Checkout button ([data-test='checkout'])
    - expect: URL changes to /checkout-step-one.html
    - expect: Page heading reads 'Checkout: Your Information'
  5. Fill in First Name 'Jane', Last Name 'Smith', Postal Code '90210'
    - expect: All three fields show the entered values
  6. Click the Continue button ([data-test='continue'])
    - expect: URL changes to /checkout-step-two.html
    - expect: Page heading reads 'Checkout: Overview'
  7. Verify order summary on overview page
    - expect: Sauce Labs Backpack is listed
    - expect: Item total is '$29.99'
    - expect: Tax value is visible
    - expect: Total value is '$29.99' + tax
  8. Click the Finish button ([data-test='finish'])
    - expect: URL changes to /checkout-complete.html
    - expect: Page heading reads 'Checkout: Complete!'
    - expect: Success message 'Thank you for your order!' is displayed
  9. Click the Back Home button ([data-test='back-to-products'])
    - expect: URL changes to /inventory.html
    - expect: Cart badge is absent (cart is empty)

#### 6.2. TC-27: Full end-to-end checkout with multiple items

**File:** `tests/e2e/tc-27-multi-item-checkout.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and log in with username 'standard_user' and password 'secret_sauce'
    - expect: Redirected to /inventory.html
  2. Add 'Sauce Labs Backpack' ($29.99), 'Sauce Labs Bike Light' ($9.99), and 'Sauce Labs Bolt T-Shirt' ($15.99) to cart
    - expect: Cart badge shows '3'
  3. Navigate to /cart.html and verify all three items are listed
    - expect: Three items visible with correct names and prices
    - expect: Cart badge shows '3'
  4. Click Checkout, fill in 'John' / 'Doe' / '12345', and click Continue
    - expect: URL is /checkout-step-two.html
  5. Verify the overview shows all three items and correct totals
    - expect: All three items listed with quantities and prices
    - expect: Item total is '$55.97' (= $29.99 + $9.99 + $15.99)
    - expect: Tax and Total values are displayed
  6. Click Finish
    - expect: URL is /checkout-complete.html
    - expect: Confirmation heading 'Thank you for your order!' is visible
  7. Click Back Home
    - expect: URL is /inventory.html
    - expect: No cart badge present — cart is cleared

### 7. Navigation and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 7.1. TC-28: Cancel from cart (Continue Shopping) preserves cart state

**File:** `tests/navigation/tc-28-cancel-from-cart.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' and 'Sauce Labs Fleece Jacket' to cart, then navigate to /cart.html
    - expect: Cart page shows two items
    - expect: Cart badge shows '2'
  2. Click the 'Continue Shopping' button ([data-test='continue-shopping'])
    - expect: URL changes to /inventory.html
    - expect: Cart badge still shows '2'
  3. Navigate back to /cart.html
    - expect: Both items 'Sauce Labs Backpack' and 'Sauce Labs Fleece Jacket' are still in the cart

#### 7.2. TC-29: Cancel from checkout info returns to cart with items intact

**File:** `tests/navigation/tc-29-cancel-from-info-preserves-cart.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' to cart, go to /cart.html, click Checkout
    - expect: URL is /checkout-step-one.html
  2. Click the Cancel button ([data-test='cancel']) without entering any data
    - expect: URL changes to /cart.html
    - expect: Sauce Labs Backpack is still in the cart
    - expect: Cart badge shows '1'

#### 7.3. TC-30: Cancel from overview returns to products page with cart preserved

**File:** `tests/navigation/tc-30-cancel-from-overview.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' to cart, proceed through checkout to /checkout-step-two.html
    - expect: URL is /checkout-step-two.html
  2. Click the Cancel button ([data-test='cancel'])
    - expect: URL changes to /inventory.html (products page)
    - expect: Cart badge still shows '1' — item was NOT removed during the cancel

#### 7.4. TC-31: Checkout flow from products page item link to cart

**File:** `tests/navigation/tc-31-product-link-to-cart.spec.ts`

**Steps:**
  1. Log in as standard_user and navigate to /inventory.html
    - expect: 6 product cards are visible
  2. Click the product image link for 'Sauce Labs Backpack'
    - expect: URL changes to the product detail page
    - expect: Product name and price '$29.99' are visible on the detail page
  3. Click 'Add to cart' on the product detail page
    - expect: Cart badge shows '1'
    - expect: Button changes to 'Remove'
  4. Click the cart icon to navigate to /cart.html
    - expect: Sauce Labs Backpack is in the cart with the correct price

#### 7.5. TC-32: Complete checkout then start a new checkout with fresh items

**File:** `tests/navigation/tc-32-new-checkout-after-completion.spec.ts`

**Steps:**
  1. Log in as standard_user, add 'Sauce Labs Backpack' to cart, complete the full checkout flow, and click Back Home
    - expect: URL is /inventory.html
    - expect: Cart badge is absent (cart cleared)
  2. Add 'Sauce Labs Onesie' ($7.99) to cart
    - expect: Cart badge shows '1'
  3. Navigate to /cart.html
    - expect: Only 'Sauce Labs Onesie' is in the cart — previous order items are not present
  4. Complete the checkout flow with 'Alice' / 'Brown' / '67890'
    - expect: New order completes successfully
    - expect: URL reaches /checkout-complete.html
    - expect: Success message 'Thank you for your order!' is displayed
