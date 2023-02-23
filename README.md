## Getting Started

Automation Framework for automating end-to-end tests based on Playwright. It provides features such as page object modeling, HTML and Allure report generation, support for multiple browsers,....

    1. Page object model
    2. HTML report, Allure Report
    3. Multiple browser: "chromium", "webkit", or "firefox"
    4. Paralell execute test
    5. Multiple test Enviroment

## Installation

The following software are required:

- Nodejs : Download and Install Node JS from
  ```sh
  https://nodejs.org/en/download/
  ```
- Install Java 8 or above, Allure Reports require Java 8 or higher.

## Setup

1. To set up this project on your local machine, clone it from the GitHub repository
2. From the command line in the project's root directory to install all dependencies by run:

   ```bash
   npm install
   ```

3. If Playwright Test or Playwright was just installed or updated on your local machine.
   Please run the following command to download new browsers:

   ```bash
   npx playwright install
   ```

## Tests Run config

In the file `./appsetting.json`, you can configure the following options:

- browserType: Configures the browser type to be used (chromium, webkit, or firefox) - `browserType: "chromium"`.
- slowMode: Configures the amount of time (in seconds) to run in slow mode - `"slowMode": 0`.

In the file `./playwright.config.ts`, you can configure the following options:

- fullyParallel: Configures whether tests should be run in parallel mode - `"fullyParallel: true"`.
  For more information, see the Playwright documentation [here](https://playwright.dev/docs/api/class-testproject#test-project-fully-parallel):
- headless: Configures whether tests should be run in headless mode - `"headless": true`.

## Running Tests

From the command line in the project's root directory:

- To show all Playwrigt option commnad :

```bash
   npx playwright --help
```

- Running all tests in ./test folder :

```bash
   npx playwright test
```

- Running a single test file:

```bash
   npx playwright test searchWeather
```

- Running each test case a specific number of times:

```bash
   npx playwright test searchWeather --repeat-each=5
```

- Running all test cases in the test file in parallel with four workers (threads).
  Need config fully Parallel to be true before run `"fullyParallel: true"`

```bash
    npx playwright test searchWeather --workers 4
```

## Tests Report

All output file and report is stored in `./testOutput` folder

- Generate HTML test report:

```bash
   npx playwright show-report testOutput/html
```

- Generate HTML test report test results when running stress test 5 times on each test case:

```bash
   npx playwright show-report testResultLoop5Time/html
```

- Generate Alure report: `npm run allure`

```bash
    npm run allure
```
