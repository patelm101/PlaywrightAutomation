# SauceDemo Login

## Application Overview

Plan for validating the Swag Labs login form at https://www.saucedemo.com, including successful authentication, rejected accounts, required-field validation, and invalid credentials. The public page lists standard_user and locked_out_user among accepted demo usernames and displays the shared password secret_sauce.

## Test Scenarios

### 1. Login flow

**Seed:** `seed.spec.ts`

#### 1.1. 1.1 standard_user logs in successfully

**File:** `tests/saucedemo-login/standard-user-success.spec.ts`

**Steps:**
  1. Begin at https://www.saucedemo.com/ in a fresh logged-out browser session.
    - expect: The Login form is visible with Username and Password fields and a Login button.
  2. Enter standard_user in the Username field and secret_sauce in the Password field.
    - expect: Both fields contain the supplied values.
  3. Activate the Login button.
    - expect: The browser navigates to https://www.saucedemo.com/inventory.html.
    - expect: The Products heading is visible and six product entries are displayed.
    - expect: No login error is visible.

#### 1.2. 1.2 locked_out_user is rejected

**File:** `tests/saucedemo-login/locked-out-user.spec.ts`

**Steps:**
  1. Begin at https://www.saucedemo.com/ in a fresh logged-out browser session.
    - expect: The Login form is visible.
  2. Enter locked_out_user in the Username field and secret_sauce in the Password field.
    - expect: Both fields contain the supplied values.
  3. Activate the Login button.
    - expect: The browser remains on the login page; inventory navigation does not occur.
    - expect: An alert displays: Epic sadface: Sorry, this user has been locked out.

#### 1.3. 1.3 Empty username is rejected

**File:** `tests/saucedemo-login/empty-username.spec.ts`

**Steps:**
  1. Begin at https://www.saucedemo.com/ in a fresh logged-out browser session with both fields empty.
    - expect: The Login form is visible.
  2. Leave the Username field empty and enter secret_sauce in the Password field.
    - expect: Username remains empty and Password contains the supplied value.
  3. Activate the Login button.
    - expect: The browser remains on the login page.
    - expect: An alert displays: Epic sadface: Username is required.

#### 1.4. 1.4 Empty password is rejected

**File:** `tests/saucedemo-login/empty-password.spec.ts`

**Steps:**
  1. Begin at https://www.saucedemo.com/ in a fresh logged-out browser session with both fields empty.
    - expect: The Login form is visible.
  2. Enter standard_user in the Username field and leave the Password field empty.
    - expect: Username contains standard_user and Password remains empty.
  3. Activate the Login button.
    - expect: The browser remains on the login page.
    - expect: An alert displays: Epic sadface: Password is required.

#### 1.5. 1.5 Invalid credentials are rejected

**File:** `tests/saucedemo-login/invalid-credentials.spec.ts`

**Steps:**
  1. Begin at https://www.saucedemo.com/ in a fresh logged-out browser session.
    - expect: The Login form is visible.
  2. Enter foo in the Username field and bar in the Password field.
    - expect: Both fields contain the supplied values.
  3. Activate the Login button.
    - expect: The browser remains on the login page; inventory navigation does not occur.
    - expect: An alert displays: Epic sadface: Username and password do not match any user in this service.
