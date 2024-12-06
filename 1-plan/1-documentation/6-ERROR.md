# Known Issues and Errors Document

> This document provides troubleshooting information for common issues encountered in **<Project>**. To address issues quickly follow the documented resolutions. If you encounter a new issue that is not listed in this document, please contribute by adding it to the document following the provided template.

This document is intended for issues that arrise multiple times, e.g.:

* Setting up the local development environment, where you need a certain amount of RAM because you run a huge DB seeder
* Encountering platform-specific issues, such as different behavior on macOS versus Linux during builds or tests
* Writing code that is similar to an existing service or component because that now throws an error and you need to debug why
* Debugging a failure in CI/CD pipelines due to unexpected configuration overrides or missing secrets
* A specific problem that occurs when running integration tests, such as unexpected database locks or misconfigured test environments

---

## Table of Contents

1. [How to Use This Document](#how-to-use-this-document)
2. [Error Documentation Template](#error-documentation-template)
3. [Known Issues](#known-issues)
    * [Docker Containers Fails to Start Due to Port Conflicts](#docker-container-fails-to-start-due-to-port-conflicts)
4. [Licence](#licence)

---

## How to Use This Document

This document is intended for two primary uses:

1. **To troubleshoot an issue you encounter during development.** Search the document for similar error messages and follow the provided resolutions if available.
2. **To document a new issue you resolved.** If you encounter a new, undocumented issue and resolve it, please document it here using the [Error Documentation Template](#error-documentation-template) for future reference.

---

### 1. I Encountered an Issue While Developing

If you’ve encountered an issue, start by searching for it in this document:

- **Use `CTRL-F` or `CMD-F`** to open your browser's search functionality.
- **Paste part of the error message** or keywords from the issue.
- Review matching entries to see if there is a documented solution.

### 2. I Resolved a New Issue and Want to Document It

If you encountered and resolved a new issue that isn’t yet in this document:

1. Copy and paste the [Error Documentation Template](#error-documentation-template) below to a new entry in this document.
2. Provide all relevant details about the issue and the steps you took to resolve it.

---

## Error Documentation Template

> Use this template to document any new issues you encounter and resolve. Include as much detail as possible to make troubleshooting easier for future developers.

### Descriptive Headline (include key error message details if applicable)

> This template ensures consistent documentation, making it easy for others to follow and contribute to this document.

<details>
  <summary>Full Error Message - Click to Expand</summary>

  ```sh
  # Paste the full error message here, wrapped in code block formatting.
  # Modify language or format if necessary for readability.
  ```

</details>

----

**Description**: Provide a brief description of the error and its impact.

**Affected Systems**: List the environments and dependencies affected (e.g., Node.js version, Docker configuration).

**Steps to Reproduce**: Document the steps needed to reproduce the issue.
  - Step 1: ...
  - Step 2: ...
  - Step 3: ...

**Resolution/Workaround**: Detail the steps to resolve the issue or any known workarounds.
  - Step 1: ...
  - Step 2: ...
  - Step 3: ...

**Date Added**: Record the date for tracking updates.

## Known Issues

In this section you can fnd all known issues for this project.

### Docker Containers Fails to Start Due to Port Conflicts

<details>
  <summary>
    Full Error Message - Click to Expand
  </summary>

```sh
Error: Bind for 0.0.0.0:5432 failed: port is already allocated
```

</details>

---

**Description**: Docker containers fails to start when another process is already using the required port.

**Affected Systems**: Docker-based environments.

**Steps to Reproduce**:

1. Start the project during development using `docker compose up`
2. Observe the failure due to a port conflict.

**Resolution/Workaround**:

1. Identify the conflicting port `lsof -i :5432`
2. Stop the conflicting port gracefully with `kill <PID>` or forcefully with `kill -9 <PID>`
3. Verify the port is free with `lsof -i :5432`


**Date Added**: 2024-11-19

### Licence

MIT © Lukas Aichbauer <lukas@devopscycle.com> (https://devopscycle.com)
