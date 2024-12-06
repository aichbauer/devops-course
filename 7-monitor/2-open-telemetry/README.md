# Open Telemetry

## What is Open Telemetry?

OpenTelemetry is an open-source observability framework for collecting, processing, and exporting telemetry data (metrics, logs, and traces) from distributed systems. It provides standardized APIs, libraries, and instrumentation tools to enhance observability and simplify troubleshooting in complex architectures like microservices or serverless environments.

Key Benefits:

* Simplifies telemetry data collection
* Provides vendor-neutral instrumentatio
* Facilitates debugging and performance optimization

## What Are the Core Components of OpenTelemetry?

OpenTelemetry consists of several core components that work together to collect and manage telemetry data:

* Instrumentation Libraries: Used to instrument applications for collecting telemetry data
* APIs: Define the standard for telemetry data collection
* SDKs: Implement the APIs to collect data in various programming languages
Collector: A standalone service for processing and exporting telemetry data
Exporters: Send telemetry data to backends like Prometheus, Jaeger, or Grafana

## What is the OpenTelemetry Collector and Why Do We Use It?

The OpenTelemetry Collector is a core component of the OpenTelemetry project, designed to enable the ingestion, processing, and exporting of telemetry data such as traces, metrics, and logs from distributed systems. It acts as a middleware pipeline that simplifies and standardizes the collection, transformation, and routing of observability data to various backends.

The Collector is an open-source, vendor-agnostic solution that provides a highly extensible framework to address common observability challenges, such as data aggregation, filtering, and reformatting, without requiring instrumentation code changes in your application.

### Key Features of the OpenTelemetry Collector

* **Receivers**: Ingest telemetry data (e.g., OTLP)
* **Processors**: Transform and filter data (e.g., batch processing, sampling)
* **Exporters**: Send data to one or more destinations (e.g., Tempo)

## What is the Difference Between Manual and Automatic Instrumentation?

Manual instrumentation involves explicitly writing code in your application to generate telemetry data. You directly use APIs provided by libraries (e.g., OpenTelemetry SDKs) to create spans, record metrics, or log events.

Automatic instrumentation involves using tools or libraries that instrument your application without requiring code changes. These tools typically attach to your application via:

* Pre-built instrumentation libraries
* Runtime agents (e.g., a Java agent or Python middleware)
* Environment configuration settings

## How Do You Instrument Code for Traces?

Instrumenting your code for traces involves adding telemetry to your application so you can track the flow of requests, processes, or transactions across services. Trace instrumentation helps you monitor latency, identify bottlenecks, and debug distributed systems.

1. **Span**:
A unit of work in a trace.
Represents an operation, such as an HTTP request or a database query.
Contains metadata such as a name, start and end timestamps, attributes, and events.
2. **Trace**:
A tree of spans that represents the lifecycle of a request as it travels through a system.
3. **Parent and Child Spans**:
A parent span represents a broader operation, and child spans represent sub-operations within it.
This hierarchy helps visualize the end-to-end flow.

Example for node.js:

First you need to install the libraries:

```
# install dependencies
npm i npm install @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node @opentelemetry/resources @opentelemetry/semantic-conventions @opentelemetry/exporter-otlp-grpc
```

Setup the `instrumentation.js`:

```js
// instrumentation.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-otlp-grpc');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const resource = Resource.default().merge(
  new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'user-service',
  })
);

const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4317', // cahnge the url to your tempo instance
});

const sdk = new NodeSDK({
  resource: resource,
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
```

Setup traces in your code:

```js
// server.js
require('./instrumentation');
const { trace } = require('@opentelemetry/api');

// ...
// ...
// ...
// ...

fastify.get('/', function (_, reply) {
  const span = trace.getTracer('example').startSpan('request');
  const hostname = os.hostname();
  span.setAttribute('hostname', hostname);

  reply.status(500).send({ message: 'Hello World', hostname });
  span.end();
});
// ...
// ...
// ...
// ...
// ...
```

