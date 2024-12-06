# Infrastructure as Code (Terraform)

## What is Infrastructure as Code?

Infrastructure as Code (IaC) is the practice of managing and provisioning infrastructure using machine-readable configuration files rather than manual processes. With IaC, you can version, share, and automate infrastructure configurations just like application code. This approach not only reduces human error but also improves scalability, consistency, and agility.

## What is Terraform?

Terraform is an open-source tool developed by HashiCorp for building, changing, and versioning infrastructure safely and efficiently. It allows users to define infrastructure as code using a high-level configuration language called HashiCorp Configuration Language (HCL). Terraform supports multiple cloud providers like AWS, Azure, and Google Cloud, as well as on-premises solutions, making it a versatile choice for infrastructure management.

### What is a Provider in Terraform?

A provider in Terraform is a plugin that enables interaction with APIs of cloud providers, SaaS platforms, or other services. Each provider is responsible for understanding and managing the resources of a specific platform. For example:

* **AWS Provider**: Manages resources like EC2, S3, and RDS on AWS
* **Azure Provider**: Manages resources like Azure VMs, Blob Storage, and Databases on Azure
* **Kubernetes Provider**: Manages Kubernetes clusters and resources

Providers must be explicitly defined in a Terraform configuration file. Example:

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}
```

### What is a Module in Terraform?

A module in Terraform is a container for multiple resources that are used together. It is a reusable, logical grouping of related infrastructure. Modules simplify complex configurations, improve readability, and enable sharing across teams or projects.


Example structure of a module:

```txt
my-module/
├── main.tf       # Resources
├── variables.tf  # Input variables
├── outputs.tf    # Outputs
```

To use a module:

```hcl
module "network" {
  source = "./modules/network"
  vpc_id = "vpc-12345"
}
```

### What is a State in Terraform?

Terraform maintains a state file to keep track of the resources it manages. This state file acts as a single source of truth for your infrastructure and enables Terraform to:

* Map your configuration to actual infrastructure resources
* Detect changes and update only the necessary parts of your infrastructure
* Optimize performance by avoiding redundant API calls

The state file can be stored locally or remotely (e.g., in S3, Azure Blob Storage, or Terraform Cloud).

### What is a Resource in Terraform?

A resource is the most fundamental building block in Terraform. It represents a piece of infrastructure, such as a virtual machine, an S3 bucket, or a database instance. Resources are declared in the configuration file using the resource block.

Example:

```hcl
resource "aws_s3_bucket" "example" {
  bucket = "my-example-bucket"
}
```

### How can you use Variables in Terraform?

Variables in Terraform make configurations flexible and reusable by allowing you to define dynamic values instead of hardcoding them. Variables can be declared in a variables.tf file and referenced within configuration files.

Example declaration:

```hcl
variable "region" {
  default     = "us-west-2"
  description = "AWS region"
}
```

Referencing the variable:

```hcl
provider "aws" {
  region = var.region
}
```

Variables can also be passed through CLI flags, environment variables, or a terraform.tfvars file.

## What is the Terraform workflow?

The typical Terraform workflow follows these steps:

* **Write**: Define infrastructure in .tf files using HCL
* **Initialize**: Run terraform init to set up the working directory and download provider plugins
* **Plan**: Run terraform plan to preview the changes Terraform will make
* **Apply**: Run terraform apply to execute the plan and create or modify resources
* **Manage**: Update the configuration, re-run plan, and apply as needed

This workflow ensures that changes are deliberate, predictable, and auditable.

## How do you apply changes do an infrastructure?

Terraform uses a declarative approach to apply changes. You simply update the configuration files to reflect the desired state, and Terraform determines the necessary actions to achieve that state.

Steps to apply changes:

* **Modify the Configuration**: Update the .tf files to reflect the desired changes
* **Plan the Changes**: Run terraform plan to preview the impact of the changes
* **Apply the Changes**: Run terraform apply to implement the changes.

Terraform ensures a smooth transition by updating resources incrementally and minimizing downtime.

## How do you manage state in Terraform?

State management is important for maintaining consistency between your configuration files and the actual infrastructure. Best practices include:

* **Remote State Storage**: Store the state file remotely (e.g., in AWS S3 with DynamoDB for locking) to allow collaboration across teams
* **State Locking**: Prevent multiple users from making simultaneous changes to the same state file by enabling locking. Terraform automatically locks the state if possibile.

```hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "state/terraform.tfstate"
    region         = "us-west-2"
  }
}
```

## What is a Drift in an Infrastructre?

Drift refers to the difference between the actual state of the infrastructure and the state defined in your Terraform configuration.

Drift can occur due to:

* Manual changes made directly to the infrastructure outside of Terraform
* Failures during terraform apply that leave resources in a partially updated state

Drift detection is important to ensure consistency. You can use terraform plan to identify drift and take corrective action by applying the desired state.
