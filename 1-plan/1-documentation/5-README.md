# Project Name

> A brief description of your project that highlights its purpose or key features.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Local Development Setup](#local-development-setup)
   - [Production Setup](#production-setup)
3. [Create Database Migrations](#create-database-mirgations)
4. [Create Database Seeds](#create-database-seeds)
5. [Test](#test)
   - [Unit Tests](#unit-tests)
   - [Integration Tests](#integration-tests)
   - [End-to-End Tests](#end-to-end-tests)
6. [Deployment](#deployment)
   - [Development](#development)
   - [Staging](#staging)
   - [Production](#production)
7. [Licence](#licence)

---

## Introduction

Provide a brief introduction to your project, explaining:
- What the project is about.
- The problem it solves or the use case it addresses.
- Why it’s useful or unique.

---

## Getting Started

### Prerequisites

List any dependencies or tools required before installing or running the project. For example:

- [Node.js](https://nodejs.org/) (version X.X or later)
- [Docker](https://www.docker.com/) (version X.X or later)

### Local Development Setup

Provide step-by-step instructions to set up the project locally.

```sh
# Clone the repository
git clone https://github.com/your-username/your-project.git

# Navigate to the project directory
cd your-project

# Installs dependencies, starts the database,
# the message queue, and the secret vault,
# migrates and seeds the database
npm run setup:dev:seed

# if you just need to start the services without seeding
npm run setup:dev

# Run the project
npm run dev
```

### Production Setup

Provide step-by-step instructions to set up the project locally.

```sh
# Clone the repository
git clone https://github.com/your-username/your-project.git

# Navigate to the project directory
cd your-project

# create a .env file and fill it with envs
touch .env

# Installs dependencies, migrates the database
npm install

# migrate the database
npm run migrate

# build the project
npm run build

# Run the project
npm run start
```

---

## Create Database Migrations

Database migrations are used to manage changes to the database schema over time.

### Creating a New Migration

1. **Edit the Schema File**

Open the file `src/api/db/schema.prisma` and add your changes.

2. **Run the Mirgation**

```sh
npm run migrate
```

## Create Database Seeds

Database seeds are used to manage test data for the project.

### Creating a New Seed

1. **Generate a Seed File**

```sh
npm run create-seed --name <seed-name>
```

2. **Edit the Seed File**

Open the new file under `src/api/db/seeds/<timestamp>-<seed-name>.ts`

```ts
import dotenvFlow from 'dotenv-flow';
import type { DataMigration } from '../umzug';

dotenvFlow.config();

export const up: DataMigration = async ({ context: prisma }) => {
  try {
    await prisma.$transaction([
      // add your schema seed data here
    ]);
  } catch (err) {
    console.error(err);

    throw new Error(err as string);
  }
};

export const down: DataMigration = async ({ context: prisma }) => {
  try {
    await prisma.$transaction([
      // delete your seed data here
    ]);
  } catch (err) {
    console.error(err);

    throw new Error(err as string);
  }
};

```

---

## Test

Run tests to ensure the application is functioning correctly.

### Unit Tests

Run unit tests with your test runner:

```sh
npm test
```

### Integration Tests

Run integration tests to ensure that components and services work together:

```sh
npm run test:integration
```

### End-to-End Tests

Test the entire application flow:

```sh
npm run test:e2e
```

---


## Deployment

### Development

Deploy the current HEAD to our cloud development environment.

```sh
# switch to the branch you want to deploy
# e.g. feature/registration
git checkout <your-branch>

# deploy to development
npm run deploy:development
```

### Staging

Deploy to staging by promoting the current development environemnt to to our cloud staging environment.

```sh
# promote development to staging
npm run promote:development:to:staging
```

Deploy the current HEAD to our cloud staging environment.

```sh
# switch to the branch you want to deploy
# e.g. feature/registration
git checkout <your-branch>

# deploy to development
npm run deploy:staging
```

### Production


Deploy to staging by promoting the current staging environemnt to to our cloud production environment.

```sh
# promote staging to production
npm run promote:staging:to:production
```

Deploy the current HEAD to our cloud production environment.

```sh
# switch to the branch you want to deploy
# e.g. feature/registration
git checkout <your-branch>

# deploy to development
npm run deploy:production
```

---

### Licence

MIT © Lukas Aichbauer <lukas@devopscycle.com> (https://devopscycle.com)
