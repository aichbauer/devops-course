# CI-Server (GitHub Actions)

## What is Continuous Integration?

Continuous Integration (CI) is a development practice where developers frequently integrate their code changes into a shared repository.

Each integration is verified by automated builds and tests to catch bugs early and ensure that the new code doesn't break the application.

### What Do You Need For Continuous Integration?

* **Version Control System (e.g., Git)**: To manage code repositories and track changes.
* **Build Tools**: To compile, build, or prepare the application.
* **Testing Frameworks**: To run unit tests, integration tests, or other validations.
* **CI Server**: To orchestrate the entire process of detecting changes, building code, and running tests.

## What is Continuous Delivery?

Continuous Delivery (CD) is an extension of CI that ensures code changes are automatically prepared for deployment. With CD, your application is always in a deployable state, and deploying to production is a decision (`click of a button`), not a process.

### What Do You Need For Continuous Delivery?

* **CI Pipeline**: To build and test changes.
* **Environment Configuration Management**: To handle configurations across multiple deployment environments.
* **Approval Mechanisms**: To control when and how the deployment is promoted to production.

## What is Continuous Deployment?

Continuous Deployment takes Continuous Delivery one step further by automating the entire release process. Every change that passes automated tests and checks is automatically deployed to production, eliminating manual approvals.

### What Do You Need For Continuous Deployment?

* **Robust CI/CD Pipelines**: To ensure code quality through testing and validation
* **High Test Coverage**: To ensure every change is validated before release
* **Monitoring and Rollback Mechanisms**: To monitor production environments and quickly revert changes if necessary
* **Automated Deployments**: To handle deployments without manual intervention

## What Are the Benefits of Continuous Integration/Continuous Deployment?

1. **Faster Feedback**: Detect issues early in the development cycle
2. **Reduced Risk**: Frequent integrations and testing reduce the likelihood of large-scale bugs
3. **Improved Developer Productivity**: Automating repetitive tasks frees up developers to focus on coding
4. **Consistent Quality**: Standardized testing and deployment processes improve reliability
5. **Accelerated Time-to-Market**: Rapid deployment cycles allow businesses to deliver features and updates faster

## What Is A CI Server?

A CI server is a tool that automates the process of detecting code changes, building the application, running tests, and reporting results. It acts as the backbone of the CI/CD process.

### How Do CI Servers Work?

1. **Monitor the Repository**: The CI server watches the code repository for changes
2. **Trigger Pipelines**: When changes are detected, the server triggers a pipeline (a series of automated steps)
3. **Report Results**: After running builds and tests, the server reports back whether the changes passed or failed.

### What Is a Pipeline?

A pipeline is a series of steps executed sequentially or in parallel to automate tasks like building, testing, and deploying applications.

### What Are the Steps In a Pipeline?

1. **Source Code Checkout**: Pulls the latest code from the repository
2. **Build**: Compiles the code and prepares the application
3. **Test**: Runs automated tests to validate changes
4. **Package**: Bundles the application into a deployable artifact
5. **Deploy**: Pushes the artifact to a development, testing, staging or production environment

## What Are GitHub Actions?

GitHub Actions are GitHub's built-in CI/CD solution, allowing you to automate workflows directly from your GitHub repositories. With GitHub Actions, you can define workflows to build, test, and deploy your code.

### What is A Workflow in GitHub Actions?

A workflow is a YAML-defined automation process triggered by specific events (e.g., a code push, a pull request). Workflows can include multiple jobs and steps that will be executed on a Runner.

### What is A Runner in GitHub Actions?

A runner is the execution environment where workflows run. GitHub provides hosted runners with pre-configured environments, or you can use self-hosted runners for custom configurations.

### What is A Job in GitHub Actions?

A job is a set of steps executed on the same runner. Each job runs in its own virtual environment and is responsible for a specific task (e.g., testing, building, or deploying).

### What is A Step in GitHub Actions?

A step is an individual task within a job. Steps can include running commands, executing scripts, or invoking predefined actions.

### What is A Action in GitHub Actions?

An action is a reusable unit of code that performs a specific task, such as checking out code, running tests, or deploying applications. Actions can be custom-written or pulled from the GitHub Marketplace.

### Example Workflow in GitHub Actions

```yaml
name: CI Pipeline

on:
  push:
    branches:
      - main

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 22

      - name: Install Dependencies
        run: npm install

      - name: Run Tests
        run: npm test

```
