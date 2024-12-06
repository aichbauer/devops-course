# Orchastration (Kubernetes)

## What is Orchastration?

Orchestration is the process of automating the management, deployment, scaling, and operation of containerized applications. It ensures that applications are efficiently distributed across infrastructure, resources are allocated appropriately, and workloads are continuously monitored and maintained to meet desired states.

Container orchestration becomes especially valuable as applications grow in complexity, requiring coordination across multiple containers, services, and environments.

## What is Kubernetes?

Kubernetes, often abbreviated as K8s, is a open-source platform designed for orchestrating containerized applications. Originally developed by Google, Kubernetes automates deployment, scaling, and operations, ensuring applications remain highly available and efficient.

With Kubernetes, developers can focus on building applications without worrying about the underlying infrastructure, as Kubernetes handles container placement, resource allocation, scaling, and self-healing.

## What is the Difference Between Docker Compose and Kubernetes?

| **Feature**           | **Docker Compose**                     | **Kubernetes**                           |
|-----------------------|-----------------------------------------|------------------------------------------|
| **Purpose**           | Simplifies local development and testing | Manages large-scale, production environments |
| **Scalability**       | Limited scaling for small environments  | Designed for high scalability            |
| **High Availability** | Lacks built-in self-healing            | Provides self-healing and failover       |
| **Networking**        | Simplistic networking setup            | Advanced networking capabilities         |
| **Multi-Node Support**| Primarily single-node                  | Multi-node cluster management            |


## What is the Difference Between Docker Swarm and Kubernetes?

| **Feature**           | **Docker Swarm**                        | **Kubernetes**                               |
|-----------------------|------------------------------------------|----------------------------------------------|
| **Purpose**           | Simplifies orchestration for small to medium setups | Manages large-scale, production environments |
| **Scalability**       | Scales easily for moderate workloads     | Designed for high scalability                |
| **High Availability** | Basic failover and replication           | Provides advanced self-healing and failover  |
| **Networking**        | Built-in overlay networking              | Advanced networking capabilities             |
| **Multi-Node Support**| Multi-node with simpler configuration    | Multi-node cluster management with fine-grained control |
| **Ease of Use**       | Easier to set up and configure           | Steeper learning curve but more powerful     |
| **Ecosystem**         | Limited to Docker                       | Supports multiple container runtimes         |
| **Features**          | Basic orchestration features            | Rich ecosystem with advanced orchestration   |
| **State Management**  | Weaker support for stateful applications | Strong support for stateful applications     |
| **Community Support** | Smaller community and ecosystem          | Large, active community with extensive tools |


## When do you use Kubernetes?

Kubernetes is the ideal choice when:

* You need to scale applications dynamically based on demand
* Applications span multiple services or microservices that need coordination
* High availability and fault tolerance are critical requirements
* You require advanced deployment strategies, like rolling updates, blue-green deployments, or canary releases

## Core Concepts of Kubernetes?

### What is a Cluster?

A cluster in Kubernetes is a collection of machines (nodes) that work together to run containerized applications. A cluster is the foundational unit of Kubernetes, consisting of a control plane and one or multiple worker nodes.

### What is a Node?

A node is a physical or virtual machine that serves as a worker within the Kubernetes cluster. It runs the workloads and is managed by the control plane.

#### What is a Control Plane?

The Control Plane manages the cluster, including scheduling workloads, maintaining the desired state, and managing communication between components. Key components of a control plane include:

* **API Server**: Serves as the interface for Kubernetes
* **Controller Manager**: Handles cluster-level functions
* **Scheduler**: Assigns workloads to nodes.
* **etcd**: Stores cluster data.

#### What is a Worker Node?

A worker node is responsible for running the containers. Key components include:

* **Kubelet**: Communicates with the control plane and ensures containers run as expected
* **Kube-proxy**: Handles network communication within the cluster
* **Container Runtime**: Runs the containers (e.g., Docker, containerd)

### What is a Pod?

A pod is the smallest deployable unit in Kubernetes. It represents one or more containers that share resources, such as storage and networking. Pods ensure containers run together and can communicate efficiently.

### What is a Namespace?

A namespace is a virtual cluster within a physical cluster. It helps organize and manage resources, providing logical separation for different teams, projects, or environments.

### What is a Controller?

A controller ensures that the desired state of the cluster matches the actual state. Examples of controllers include:

* **ReplicaSet**: Ensures the desired number of pod replicas
* **Deployment**: Manages rolling updates and rollbacks
* **StatefulSet**: Manages stateful applications

### What is a Service?

A service exposes an application running in a pod to other pods or external users. It provides a stable endpoint for accessing dynamic workloads and load balances requests.

### What is a Volume?

A volume is a storage abstraction in Kubernetes, allowing containers to persist data. Unlike container storage, the lifecycle of a volume is tied to the pod, ensuring data persistence across container restarts.


## How does Networking work in Kubernetes?

Kubernetes uses a flat network model, allowing pods to communicate with each other across nodes. Key components include:

* **ClusterIP**: Default service type, accessible only within the cluster
* **NodePort**: Exposes services on a static port of each node
* **LoadBalancer**: Integrates with cloud providers to create external-facing load balancers

### What is an Ingress?

An Ingress is a resource for managing external HTTP and HTTPS access to services. It provides routing rules, SSL termination, and host-based or path-based routing.

### How Do You Deploy an Application on Kubernetes?

* **Define a Deployment YAML**: Specify the application, replicas, and containers
* **Apply the Configuration**: Use kubectl apply -f <file> to create the deployment
* **Define a Service YAML**: Create a service to expose the application internally or externally (NodePort, Loadbalancer, ClusterIP, ExternalName)
* **Apply the Configuration**: Use kubectl apply -f <file> to create the deployment

### Here is an Example

```yaml
# Deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3  # Number of replicas
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21.0  # Nginx container image
        ports:
        - containerPort: 80
```

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx  # Matches pods with label `app: nginx`
  ports:
  - protocol: TCP
    port: 80       # Exposed port
    targetPort: 80 # Port on the container
  type: NodePort   # Exposes the service on a port accessible outside the cluster
```

### How do you Scale Applications on Kubernetes?

1. Use the kubectl scale command:
```sh
kubectl scale deployment <deployment-name> --replicas=<number> -n <namespace>
```
2. Kubernetes automatically schedules the additional replicas.

### How do you Rollback Applications?

1. Check the revision history:
```sh
kubectl rollout history deployment <deployment-name> -n <namespace>
```
2. Roll back to a previous revision:
```sh
kubectl rollout undo deployment <deployment-name> -n <namespace>
```

### How do you get the logs of Applications?

1. Use the kubectl logs command:

```sh
kubectl logs <pod-name> -n <namespace>
```

2. For multi-container pods, specify the container:

```sh
kubectl logs <pod-name> -c <container-name> -n <namespace>
```

## What is the Helm Package Manager?

Helm is a package manager for Kubernetes, designed to simplify the deployment, management, and configuration of applications. Think of Helm as the Kubernetes equivalent of tools like apt for Ubuntu or yum for CentOS. It allows developers and operators to bundle Kubernetes manifests (YAML files) into a reusable package known as a Helm Chart, which can be easily deployed and managed.

### What is a Helm Chart?

A Helm chart is a package of pre-configured Kubernetes resources. It simplifies application deployment by providing reusable templates for Kubernetes manifests.

### Example of a Helm Chart?

```txt
my-helm-chart/
├── Chart.yaml          # Metadata about the Helm chart (name, version, description, etc.)
├── values.yaml         # Default configuration values for the chart
├── templates/          # Directory containing Kubernetes manifest templates
│   ├── deployment.yaml # Template for a Kubernetes Deployment resource
│   ├── service.yaml    # Template for a Kubernetes Service resource
│   ├── ingress.yaml    # Template for an Ingress resource (optional)
│   ├── configmap.yaml  # Template for a ConfigMap resource (optional)
│   ├── secrets.yaml    # Template for a Secret resource (optional)
│   └── _helpers.tpl    # Template helpers (functions or reusable snippets)
├── charts/             # Subcharts or dependencies (optional)
├── .helmignore         # File for excluding files from the chart package
└── README.md           # Documentation about the chart and its usage (optional)
```

### Description of Key Files and Directories

1. Chart.yaml:
   - The metadata file describing the chart.
   - Example content:
```yaml
apiVersion: v2
name: my-helm-chart
description: A Helm chart for Kubernetes
version: 0.1.0
appVersion: 1.0.0
````

2. values.yaml:
   - The default configuration values for the chart.
   - Users can override these values during deployment.
   - Example content:
```yaml
replicaCount: 2
image:
  repository: nginx
  tag: "1.21.0"
  pullPolicy: IfNotPresent
service:
  type: ClusterIP
  port: 80
````

3. templates/:

   - Contains the Kubernetes manifest templates for resources such as Deployments, Services, ConfigMaps, etc.
   - Example deployment.yaml:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-deployment
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ .Release.Name }}
  template:
    metadata:
      labels:
        app: {{ .Release.Name }}
    spec:
      containers:
      - name: nginx
        image: {{ .Values.image.repository }}:{{ .Values.image.tag }}
        ports:
        - containerPort: 80
```

4. .helmignore:
   - Specifies files to ignore when packaging the chart
   - Example content:
```md
*.md
*.bak
*.tmp
```

5. README.md (optional):
   - Contains documentation for the chart, usage instructions, and configuration details.

### How This File Structure Works
* **Chart.yaml** defines the chart’s identity
* **values.yaml** provides customizable default values for template.
* **Templates** use Go templating syntax ({{ ... }}) to dynamically render Kubernetes manifests based on values.yaml or user-provided overrides
