# 4-end-to-end example

> This is an example of how to use Playwright for end-2-end tests

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Local Development Setup](#local-development-setup)
   - [Production Setup](#production-setup)
7. [Licence](#licence)

---

## Introduction

With this example app you will learn:

- How to test your application

---

## Getting Started

---

### Prerequisites

List any dependencies or tools required before installing or running the project. For example:

- [Node.js](https://nodejs.org/) (version 20.x or later)

---

### Local Development Setup

Follow this step-by-step instruction to set up the project locally:

```sh
# Clone the repository
git clone https://github.com/aichbauer/devops-training

# Navigate to the project directory
cd devops-training/4-test/4-end-to-end/example

# Install dependecies
npm install

# Run the end-2-end tests in the `tests/e2e` folder
npm run test

# Run the end-2-end test with a UI to ecplore and see whats happening
npx playwright test --ui

# Generate test code with a UI
# replace <your-url> with the actual url you want to test, e.g. `demo.playwright.dev/todomvc`
npx plywright codegen <your-url>
```

---

### Production Setup

Follow this step-by-step instruction to set up the project in production.

```sh
# Clone the repository
git clone https://github.com/aichbauer/devops-training

# Navigate to the project directory
cd devops-training/4-test/2-integration/example/backend

# Install dependecies
npm install

# Build and Start the server
npm run build
npm run start

# visit http://localhost:4000/
curl http://localhost:4000/
# => NextJS APP with all messages and a form to create a new message
```

---

### Licence

MIT © Lukas Aichbauer <lukas@devopscycle.com> (https://devopscycle.com)
