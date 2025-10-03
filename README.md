# Sauce Demo — Playwright UI Automation (Page Object Model)
Project Overview
This repository contains Playwright UI automation tests for the Sauce Demo application, implemented using the Page Object Model (POM) pattern to keep tests maintainable, readable, and scalable.
The tests validate core e-commerce flows such as login, product sorting, add/remove items, cart verification, and checkout.


## Table of Contents
- [Install Dependencies](#install-dependencies)
- [Test Execution Commands](#test-execution-commands)
- [How to View the HTML Report](#how-to-view-the-html-report)
- [Challenges Encountered and Solutions](#challenges-encountered-and-solutions)



## Install Dependencies
```bash
git clone https://github.com/<Bhgga007>/<PlaywrightAssessment>.git
cd <your-repo>
npm install
npx playwright install
```

## Test Execution Commands

```bash
npx playwright test
npx playwright test --headed
```


## How to View the HTML Report
```bash
npx playwright test --reporter=html
How to View the HTML Report
```

## Challenges Encountered and Solutions

### 1-Selectors sometimes unstable
Challenge: Elements occasionally not found, leading to flaky tests.

Solution: Used Playwright’s auto-wait and data-test selectors where possible.


### 2-Checkout flow validation
Challenge: Tests interfering with each other due to cart state.

Solution: Each test runs with a fresh context to isolate state.

### 3-Report readability
Challenge: Hard to debug failing tests.

Solution: Enabled HTML reports and Playwright trace viewer for retries.








