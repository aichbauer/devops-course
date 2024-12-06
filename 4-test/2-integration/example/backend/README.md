# Fastify App

> This is an example app. You can add messages (`POST /messages { message: "your message" }`) and read all messages (`GET /messages`)

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
cd devops-training/4-test/2-integration/example/backend

# Install dependecies
npm install

# Start the server
npm run start

# visit http://localhost:3000/
curl http://localhost:3000/
# => { "message": "Hello World!", host: "<hostname>" }
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

# Start the server
npm run start

# visit http://localhost:3000/
curl http://localhost:3000/
# => { "message": "Hello World!", host: "<hostname>" }
```

---

### Licence

MIT © Lukas Aichbauer <lukas@devopscycle.com> (https://devopscycle.com)
