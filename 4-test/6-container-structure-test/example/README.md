# Fastify App

> This is an example app returninga hello world JSON on route `/`.

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

- How to write Dockerfiles
- How to build Docker images
- How to start, stop and manage Docker containers

---

## Getting Started

---

### Prerequisites

List any dependencies or tools required before installing or running the project. For example:

- [Node.js](https://nodejs.org/) (version 20.x or later)
- [Docker](https://www.docker.com/) (version 20.x or later)
- [Container Structure Test](https://github.com/GoogleContainerTools/container-structure-test) (version 1.9.3 or later)

---

### Local Development Setup

Follow this step-by-step instruction to set up the project locally:

```sh
# Clone the repository
git clone https://github.com/aichbauer/devops-training

# Navigate to the project directory
cd devops-training/3-build/container/docker/example

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
cd devops-training/3-build/container/docker/example

# Install dependecies
npm install

# Start the server
npm run start

# visit http://localhost:3000/
curl http://localhost:3000/
# => { "message": "Hello World!", host: "<hostname>" }
```

---

### Containerized Setup With Docker

```sh
# build a new docker image
# --tag: give the image a name usually <user-name>/<repository-name>:<version>
docker build --tag <image-name> .

# start a container
# --detach: run the container as a background process
# --rm: delete the container when it is stopped
# --publish: forward the container port to a unused host port <host-port>:<container-port>
docker run --detach --rm --publish 3000:3000 <image-name>
```

### Container Structure Test

```sh
# create a docker image
# replace <image-name> with a real name e.g, test-node:latest
docker build --tag <image-name> .

# create a tarball out of  the docker image
# replace <image-name> with a real name e.g, test-node:latest
docker save --output <image-name>.tar <image-name>

# run the container image tests
# replace <image-name> with a real name e.g, test-node:latest
container-structure-test test --image <image-name>.tar --driver tar --config <test-configuration>
```

---

### Licence

MIT © Lukas Aichbauer <lukas@devopscycle.com> (https://devopscycle.com)
