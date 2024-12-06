# Flask Docker App

> This project demonstrates a simple NGINX Application with 3 Replicas on a Minikube (K8s) Cluster

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Local Development Setup](#local-development-setup)
   - [Production Setup](#production-setup)
   - [Containerized Setup with Docker](#containerized-setup-with-docker)
   - [Kubernetes Deployment](#kubernetes-deployment)
4. [License](#license)

---

## Introduction

This project is designed to help developers:

- Understand the basics of deploying a containerized application in Kubernetes.
- Learn how to use NGINX as a simple web server running in a cluster.
- Work with Minikube to simulate a Kubernetes cluster locally.
- Scale applications and manage replicas in a Kubernetes environment.

---

## Getting Started

---

### Prerequisites

Ensure you have the following tools installed on your system:

- [Docker](https://www.docker.com/) (version 20.x or later)
- [Minikube](https://minikube.sigs.k8s.io/) (latest version)
- [kubectl](https://kubernetes.io/docs/tasks/tools/) (command-line tool for Kubernetes)

---

### Local Development Setup

```sh
# start local k8s cluster
minikube start

# switch contect to minikube
kubectl config use-context minikube

# verify context
kubectl config current-context

# change direcotry
cd ops/k8s

# apply deployment
kubectl apply -f deployment.yaml

# verify deployment
kubectl get pods

# apply service
kubectl apply -f service.yaml

# check services
kubectl get services

# expose service through minikube
minikube service nginx-service

# check pods
# see self-healing capabilities
kubectl get pods --watch

# delete a pod
kubectl delete pod <pod-name>

# remove deployment
kubectl delete deployment nginx-deployment

# remove service
k delete service nginx-service
```