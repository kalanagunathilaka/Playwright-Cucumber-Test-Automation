# ITQA_GroupAssignment_Reformers - Group - 46

This repository contains a robust test automation framework using Cucumber, Playwright, and TypeScript for end-to-end (E2E) testing. It supports behavior-driven development (BDD) to make test cases readable and understandable for all stakeholders.

## 🛠️ Features
- **Cucumber BDD**: Write human-readable test scenarios in `.feature` files.  
- **Playwright**: Fast and reliable browser automation for Chromium, Firefox, and WebKit.  
- **TypeScript**: Type-safe test scripts for improved maintainability.  
- **Tag Filtering**: Run specific scenarios using tags.  
- **Reports**: Generate HTML and Allure reports for test results.  
- **Environment Variables**: Configurable test environments using `.env` files.  
- **Cross-Browser Testing**: Supports Chrome, Firefox, and Safari.  

# 🚀 Getting Started

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

To set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yesitha/ITQA_GroupAssignment_Reformers.git
   ```

2. Navigate to the relevant folder (UI or API) and install dependencies:  
   ```bash
   cd e2eui
   npm install
   ```

   ```bash
   cd e2eapi
   npm install
   ```
# 🏗️ Configuration  

## Environment Variables  
Create a .env file in the both e2e directries to manage test environment variables:  
  
- API
  ```bash
  BASE_URL=http://example.com
  ADMIN_USERNAME=********
  PASSWORD=********
  USER_USERNAME=********
  ```
- UI
  ```bash
  BASE_URL=https://example.com
  UI_USERNAME=********
  PASSWORD=********
  ```
  
# 🔨 Running Tests  

## Scripts

The following scripts are available for testing and reporting:

### General Test Execution

- Run tests:
  ```bash
  npm run test
  ```
- Run tests with Allure report generation:
  ```bash
  npm run test:allure
  ```
- Run tests with the default Cucumber formatter:
  ```bash
  npm run test:cucumber
  ```
- Run tests with tags: (API only)    
  Create Functionalities
  ```bash
  npm run test:create
  ```
  Retrieval Functionalities
  ```bash
  npm run test:retrieval
  ```
  Update Functionalities
  ```bash
  npm run test:update
  ```  
  Delete Functionalities
  ```bash
  npm run test:delete
  ```

###  Allure Reports

- Generate an Allure report:
  ```bash
  npm run allure:generate
  ```
- Open the Allure report:
  ```bash
  npm run allure:open
  ```
- Generate and open the Allure report:
  ```bash
  npm run allure-report
  ```

# 🧪 CI/CD Pipeline and Reports

The GitHub Actions pipeline automatically runs tests and generates reports for both UI and API projects. The results are published at the following locations:

- [UI Report](https://yesitha.github.io/ITQA_GroupAssignment_Reformers/ui-report/)
- [API Report](https://yesitha.github.io/ITQA_GroupAssignment_Reformers/api-report/)

# 📂 Project Structure

```
ITQA_GroupAssignment_Reformers/
├── .github/                 # GitHub Actions workflows
├── API                      # Spring project details
├── e2eapi/                  # API testing project
│   ├── src/                 
│   │   ├── data/            # Test data for API tests
│   │   │   ├── enum/        # Relevant Enums for API tests
│   │   │   ├── factoryData/ # Data that are used for API tests
│   │   ├── model/           # Models for API tests
│   │   ├── requests/        # Requests implementation for API tests (Page-Object Model)
│   │   ├── tests/           # Test cases for API tests
│   │   │   ├── features/    # Feature files
│   │   │   ├── steps/       # Step definitions
│   │   │   ├── support/     # Hooks
│   │   ├── utils/           # Utility functions for API tests
│   ├── .env.example         # Example environment file for API
│   ├── .gitignore           # Gitignore for API project
│   ├── package.json         # Dependencies and scripts for API
│   ├── package-lock.json    # Lock file for API project
│   └── tsconfig.json        # TypeScript configuration for API
├── e2eui/                   # UI testing project
│   ├── src/                 
│   │   ├── data/            # Test data for UI tests
│   │   │   ├── enum/        # Relevant Enums for UI tests
│   │   │   ├── factoryData/ # Data that are used for UI tests
│   │   ├── locators/        # UI Locators
│   │   ├── model/           # Models for UI tests
│   │   ├── pages/           # Pages implementations for UI (Page-Object Model)
│   │   ├── tests/           # Test cases for UI tests
│   │   │   ├── features/    # Feature files
│   │   │   ├── steps/       # Step definitions
│   │   │   ├── support/     # Hooks
│   │   ├── utils/           # Utility functions for UI tests
│   ├── .env.example         # Example environment file for UI
│   ├── .gitignore           # Gitignore for UI project
│   ├── package.json         # Dependencies and scripts for UI
│   ├── package-lock.json    # Lock file for UI project
│   └── tsconfig.json        # TypeScript configuration for UI
├── Documents/               # Bug Report and test case docuemnets
```

# 🔗 Resources  
- [Cucumber Documentation](https://cucumber.io/docs/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
