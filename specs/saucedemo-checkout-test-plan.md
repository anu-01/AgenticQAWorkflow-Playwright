# SCRUM-101 E-commerce Checkout Test Plan

## Application Overview

Saucedemo (https://www.saucedemo.com) E-commerce Checkout Process test plan for SCRUM-101. Covers login as standard_user, cart review, checkout information entry with field validation, order overview, order completion, and navigation/edge-case behaviors. Credentials: standard_user / secret_sauce.

## Test Scenarios

### 1. Cart Review

**Seed:** `tests/seed.spec.ts`

#### 1.1. should display all added items with correct details and total price

**File:** `tests/saucedemo-checkout/cart-review.spec.ts`

**Steps:**
  1. Log in as standard_user / secret_sauce
    - expect: User is redirected to the products (inventory) page
  2. Add 'Sauce Labs Backpack' ($29.99) and 'Sauce Labs Bike Light' ($9.99) to the cart
    - expect: Cart icon badge shows '2'
  3. Navigate to the cart page
    - expect: Both items are listed with correct name, description, price and quantity of 1 each
    - expect: 'Continue Shopping' and 'Checkout' buttons are visible

#### 1.2. should navigate back to products page when Continue Shopping is clicked

**File:** `tests/saucedemo-checkout/cart-review.spec.ts`

**Steps:**
  1. Log in, add an item to cart, and go to the cart page
    - expect: Cart page shows the added item
  2. Click 'Continue Shopping'
    - expect: User is redirected to https://www.saucedemo.com/inventory.html

#### 1.3. should navigate to checkout information page when Checkout is clicked

**File:** `tests/saucedemo-checkout/cart-review.spec.ts`

**Steps:**
  1. Log in, add an item to cart, and go to the cart page
    - expect: Cart page shows the added item
  2. Click 'Checkout'
    - expect: User is redirected to https://www.saucedemo.com/checkout-step-one.html
    - expect: 'Checkout: Your Information' heading is visible

### 2. Checkout Information Entry

**Seed:** `tests/seed.spec.ts`

#### 2.1. should proceed to overview page with valid First Name, Last Name and Zip

**File:** `tests/saucedemo-checkout/checkout-information.spec.ts`

**Steps:**
  1. Log in, add an item to cart, and navigate to checkout information page
    - expect: Checkout information form with First Name, Last Name and Zip/Postal Code fields is displayed
  2. Fill First Name='John', Last Name='Doe', Zip='12345' and click 'Continue'
    - expect: User is redirected to https://www.saucedemo.com/checkout-step-two.html

#### 2.2. should show 'Error: First Name is required' when First Name is empty

**File:** `tests/saucedemo-checkout/checkout-information.spec.ts`

**Steps:**
  1. Navigate to checkout information page and click 'Continue' with all fields empty
    - expect: An error alert with text 'Error: First Name is required' is displayed
    - expect: Page remains on checkout-step-one.html

#### 2.3. should show 'Error: Last Name is required' when Last Name is empty

**File:** `tests/saucedemo-checkout/checkout-information.spec.ts`

**Steps:**
  1. Navigate to checkout information page, fill only First Name='John', and click 'Continue'
    - expect: An error alert with text 'Error: Last Name is required' is displayed

#### 2.4. should show 'Error: Postal Code is required' when Zip is empty

**File:** `tests/saucedemo-checkout/checkout-information.spec.ts`

**Steps:**
  1. Navigate to checkout information page, fill First Name='John' and Last Name='Doe', leave Zip empty, and click 'Continue'
    - expect: An error alert with text 'Error: Postal Code is required' is displayed

#### 2.5. should return to the cart page when Cancel is clicked on checkout information page

**File:** `tests/saucedemo-checkout/checkout-information.spec.ts`

**Steps:**
  1. Navigate to checkout information page and click 'Cancel'
    - expect: User is redirected to https://www.saucedemo.com/cart.html

#### 2.6. should dismiss the error banner when the dismiss (X) button is clicked

**File:** `tests/saucedemo-checkout/checkout-information.spec.ts`

**Steps:**
  1. Trigger a validation error by clicking 'Continue' with empty fields, then click the 'Dismiss error' button
    - expect: The error alert is no longer visible

### 3. Order Overview

**Seed:** `tests/seed.spec.ts`

#### 3.1. should display item summary, payment information, and shipping information

**File:** `tests/saucedemo-checkout/order-overview.spec.ts`

**Steps:**
  1. Log in, add items to cart, and complete checkout information with valid data
    - expect: User is on checkout-step-two.html with heading 'Checkout: Overview'
  2. Review the overview page
    - expect: All cart items are listed with name, description and price
    - expect: 'Payment Information: SauceCard #31337' is displayed
    - expect: 'Shipping Information: Free Pony Express Delivery!' is displayed

#### 3.2. should calculate item total, tax, and total price correctly

**File:** `tests/saucedemo-checkout/order-overview.spec.ts`

**Steps:**
  1. Add 'Sauce Labs Backpack' ($29.99) and 'Sauce Labs Bike Light' ($9.99) to cart and proceed to overview page
    - expect: 'Item total: $39.98' is displayed
    - expect: 'Tax: $3.20' is displayed
    - expect: 'Total: $43.18' is displayed
    - expect: Total equals item total plus tax

#### 3.3. should return to the products page when Cancel is clicked on overview page

**File:** `tests/saucedemo-checkout/order-overview.spec.ts`

**Steps:**
  1. Navigate to the checkout overview page and click 'Cancel'
    - expect: User is redirected to https://www.saucedemo.com/inventory.html (not the cart page)

### 4. Order Completion

**Seed:** `tests/seed.spec.ts`

#### 4.1. should display order confirmation with success message when Finish is clicked

**File:** `tests/saucedemo-checkout/order-completion.spec.ts`

**Steps:**
  1. Complete cart review, checkout information, and reach the overview page
    - expect: Overview page with 'Finish' button is displayed
  2. Click 'Finish'
    - expect: User is redirected to https://www.saucedemo.com/checkout-complete.html
    - expect: Heading 'Thank you for your order!' is visible
    - expect: Message 'Your order has been dispatched, and will arrive just as fast as the pony can get there!' is visible
    - expect: 'Back Home' button is visible

#### 4.2. should clear the cart after order completion

**File:** `tests/saucedemo-checkout/order-completion.spec.ts`

**Steps:**
  1. Complete a full checkout flow ending with 'Finish'
    - expect: Cart icon shows 'Cart, empty' with no item count badge

#### 4.3. should navigate back to products page when Back Home is clicked

**File:** `tests/saucedemo-checkout/order-completion.spec.ts`

**Steps:**
  1. Complete a full checkout flow to reach the confirmation page and click 'Back Home'
    - expect: User is redirected to https://www.saucedemo.com/inventory.html

### 5. Navigation and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 5.1. should redirect unauthenticated users away from checkout pages

**File:** `tests/saucedemo-checkout/navigation-edge-cases.spec.ts`

**Steps:**
  1. Without logging in, navigate directly to https://www.saucedemo.com/checkout-step-one.html
    - expect: User is redirected to the login page or shown an 'Epic sadface' error indicating direct access is not allowed

#### 5.2. should allow proceeding to checkout even when cart is empty (edge case / potential defect)

**File:** `tests/saucedemo-checkout/navigation-edge-cases.spec.ts`

**Steps:**
  1. Log in, ensure the cart is empty (remove all items), navigate to the cart page, and click 'Checkout'
    - expect: Application currently allows navigation to checkout-step-one.html despite an empty cart; document this as a potential defect against Business Rule 3 (cart cannot be empty when proceeding to checkout)

#### 5.3. should accept special characters and boundary-length values in checkout fields

**File:** `tests/saucedemo-checkout/navigation-edge-cases.spec.ts`

**Steps:**
  1. Enter special characters (e.g. '@#$%') and a very long string in First Name, Last Name and Zip fields, then click Continue
    - expect: Document actual application behavior (accepted or rejected) since the UI does not show explicit format validation beyond required-field checks
