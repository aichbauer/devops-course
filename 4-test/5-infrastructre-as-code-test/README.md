# Infrastructure as Code Test

## What is a Infrastructure as Code Test?

An Infrastructure as Code (IaC) test validates the configuration and behavior of infrastructure defined through code, such as Terraform, CloudFormation, or Ansible scripts. IaC tests ensure that the defined infrastructure is provisioned, configured, and behaves as expected. It involves automated validation of resources, security configurations, performance, and compliance against best practices.

IaC testing is crucial for ensuring reliability and avoiding misconfigurations that can lead to security vulnerabilities, downtime, or cost inefficiencies.

## What Do We Need to Validate in a Infrastructure as Code Test?

1. **Syntax and Formatting**: `terraform validate` and `terraform fmt`
   * Validate the syntax of the IaC files to ensure there are no errors or misconfigurations.
   * Enforce consistent formatting for readability and maintainability.
2. **Resource Creation**: `terraform test`
   * Verify that all required resources (e.g., VMs, databases, storage) are defined correctly in the IaC files
   * Ensure that dependencies between resources (e.g., network interfaces and subnets) are correctly specified.
3. **Output Validation**: `terraform test`
   * Test that the IaC outputs provide expected values after provisioning.
   * Verify resource attributes like IDs, names, and statuses.

## What Do We Need For Infrastructure as Code Tests?

1. Infrastructure as Code Tools (e.g., terraform, ansible, ...)
2. Infrastructure as Code Configuration Files
3. IaC Test Configuration Files
4. Optional: Access for provisioning and managing cloud ressources

## What Are the Benefits of a Infrastructure as Code Test?

* **Improved Quality**: Ensures infrastructure works as intended and adheres to best practices
* **Reduced Risks**: Identifies issues early, minimizing the risk of failures in production
* **Faster Deployment**: Automates validation, accelerating delivery timelines
* **Consistency**: Guarantees identical environments across development, staging, and production.
* **Enhanced Security**: Detects vulnerabilities and enforces compliance with security standards

## Example of a Infrastructure as Code Test

### Validate the Infrastructure as Code Configuration

Terraform provides a built-in command, terraform validate, to verify that the syntax of your configuration files is correct. This command helps identify syntax errors and ensure the configuration is well-formed before proceeding with further testing or deployment.

Given the following main.tf configuration:

```hcl
# main.tf
variable "bucket_prefix" {
  default = "test"
  typ     = string
}
```

Running the command:

```sh
terraform validate
# Output =>
##  Error: Unsupported argument
##
##    on main.tf line 3, in variable "bucket_prefix":
##    3:   typ     = string
##
##  An argument named "typ" is not expected here. Did you mean "type"?
```

Terraform provides a built-in testing framework that allows you to validate the behavior of your infrastructure code. You can call these tests using the `terraform test` command. Below is an example of how to define and execute tests.


Given the following main.tf configuration:

```hcl
variable "bucket_name" {
  type    = string
  default = "example-bucket"
}

resource "aws_s3_bucket" "example" {
  bucket = var.bucket_name

  versioning {
    enabled = true
  }
}
```

and the following main.tftest.hcl (usually stored in a test folder) configuration:

```hcl
mock_provider "aws" {}

variables {
  bucket_name = "test-bucket"
}

run "valid_string_concat" {

  command = plan

  assert {
    condition     = aws_s3_bucket.bucket.bucket == "test-bucket"
    error_message = "S3 bucket name did not match expected"
  }
}
```

Running the command:

```sh
terraform test
# Output =>
##  tests/main.tftest.hcl... in progress
##    run "valid_string_concat"... pass
##  tests/main.tftest.hcl... tearing down
##  tests/main.tftest.hcl... pass
##
##  Success! 1 passed, 0 failed.
```
