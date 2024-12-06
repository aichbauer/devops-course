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
docker build --tag node-test .

# start a container
# --detach: run the container as a background process
# --rm: delete the container when it is stopped
# --publish: forward the container port to a unused host port <host-port>:<container-port>
docker run --detach --rm --publish 3000:3000 node-test

# visit http://localhost:3000/
curl http://localhost:3000/
# => { "message": "Hello World!", host: "<hostname>" }
```

### Setup Tracing with OpenTelemetry, Tempo, Grafana

We have a `compose.yaml` to start all required services:

* **Tempo**
   - Tempo is an open-source distributed tracing backend developed by Grafana Labs. It stores and queries traces and integrates well with observability tools like Grafana
   - **Purpose in this setup**: Collect and store distributed traces from applications for performance monitoring and debugging
* **Grafana**
    - Grafana is a visualization and analytics tool that allows you to query, visualize, and set up alerts based on metrics from a variety of data sources, including Tempo and the OTEL collector
    - **Purpose in this setup**: Display dashboards for traces, logs, and metrics collected by the OTEL Collector and Tempo
* **OTEL Collector**
    - The OpenTelemetry (OTEL) Collector is a vendor-agnostic agent and collector for telemetry data (metrics, logs, and traces). It can collect telemetry data from applications, transform it, and export it to observability tools like Tempo
    - **Purpose in this setup**: Collect and forward telemetry data from your applications to Tempo and other backends.

Start docker compose to have OTEL, Tempo and Grafana ready:

```sh
docker compose up
```

Start the app:

```sh
npm run start
```

Visit Grafana Dashboard and set up a new Connection:

* Click `Add Data Source`
* Search for Tempo
* Configure the URL to: http://tempo:3100
* Click on Explore (you need to make request to the localhost:5555 to see traces)

Here are some query examples:

* `{ span.net.host.ip = "127.0.0.1" }`
* `{ span.http.route = "/"}`
* `{ span.http.status_code = 500 }`
* `{ span.http.status_code >= 200 && span.http.status_code < 300 }`

---

### Licence

MIT © Lukas Aichbauer <lukas@devopscycle.com> (https://devopscycle.com)
