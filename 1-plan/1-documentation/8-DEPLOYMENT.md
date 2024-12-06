# Deployment

> This document outlines the deployment process and branching strategy for **<Project>**. The goal is to ensure a consistent, repeatable, and predictable deployment process.

---

## Table of Contents

* [Migration Strategy](#migration-strategy)
* [Branching Strategy](#branching-strategy)
   * [Branching Workflow](#branching-workflow)
   * [Commit Message](#commit-message)
* [Environment Details](#environment-details)
* [Deployment Process](#deployment-process)
* [Rollback Procedure](#rollback-procedure)


---

## Migration Strategy

We **do not immediately remove fields** from the database or the search documents. Instead, we use a phased approach to deprecate and eventually remove fields in the future.

Whenever we have to drop a database field we mark it as deprecated in our `prisma.schema` and immediately add a scheduled clickup task for the sprint in 3 weeks. During this phase we have two fields: the old (marked as deprecated via the tripple-slash), and the new field.

Example:

> Make sure your editor config in VS Code has `"editor.showDeprecated": true,` and `  "editor.suggest.showDeprecated": true,` both set to true

```prisma
// prisma.schema

model User {
  id               String        @id
  username         String        @unique
  password         String        /// @deprecated WARNING: Use field `passwordHash` instead
  passwordHash     String
}
```

If you use it in the code it should be visible as deprecated:

```ts

// code.ts
const user = await User.findFirst({
  where: {
    id: '1',
  },
});

// your editor should make this visible via a strike-through
user.password;
// and if you hover over the field it shows the message: WARNING: Use field `passwordHash` instead
```

Whenever we have to drop a field in a search document we mark it as deprecated in the types and immediately add a scheduled clickup task for the sprint in 3 weeks. During this phase we have two fields: the old (marked as deprecated via the JSDoc multi-line comment), and the new field.

Example:

> Make sure your editor config in VS Code has `"editor.showDeprecated": true,` and `  "editor.suggest.showDeprecated": true,` both set to true

```ts
type Gen = {
  /**
   * @deprecated WARNING: Use field `uid` instead
   */
  id: string; // old field
  uid: string; // new field
}

const somegene: Gen = {
  id: 'test',
  uid: 'test',
}

// your editor should make this visible via a strike-through
somegene.id;
// and if you hover over the field it shows the message: WARNING: Use field `uid` instead
```

---

## Branching Strategy

We have 3 main branches that we work with:

- **`development`**: is used for development, developers merge new features into dev once they are finished with development
- **`staging`**: is used for verification and testing before we deploy to production
- **`production`**: is used for production

For every ticket in ClickUp (feature, fix, ...) we create a new branch:

- **`feat/<initials>/<xxx>`**: for a new feature
- **`fix/<initials>/<xxx>`**: for a fix
- **`hotfix/<initials>/<xxx>`**: for a production hotfix

> replace `<initials>` with your initials from your fullname

> replace `<xxx>` with a meaningful branch name

#### Branching Workflow

1. **Feature/Fix Development**:
   * Create a branch from `dev` (`feat/<initials>/<xxx>` or `fix/<initials>/<xxx>`, replace <xxx> with a meaningful branch name)
   * Complete development and local testing in `feat/<initials>/<xxx>` or `fix/<initials>/<xxx>`
   * Open a Pull Request (PR) as soon as you are done developing
     * Wait for review
       * Merge into `dev`
     * If there is no review within the end of the day, merge the PR into `dev`
     * After merging the PR add a link to the PR in the ClickUp Ticket
2. **Production Hotfix**:
   * Create a branch from `prod` (`hotfix/<initials>/<xxx>`, replace <xxx> with a meaningful branch name)
   * Complete development and local testing in `hotfix/<initials>/<xxx>`
   * Open a PR as soon as you are done developing
     * Wait for review
     * Merge the `hotfix/<initials>/<xxx>` into `prod` and `dev`

---

#### Commit Message

When you merge a PR into `dev`, follow the guidelines below to ensure consistency and traceability:

* **Structure**:
   * Start the Message with: `Merged PR ####:` where `####` is the ID-Number of the PR
   * give the the merge commit a meaningful message
   * after a line break link the URL of the ClickUp Ticket

Example:

```git
Merged PR 1234: Feat - searchable gen data in navigation

https://app.clickup.com/t/87686vs7
```

---

### Environment Details

| **Environment** | **URL/Host**          | **Branch**       | **Deployment Frequency** | **Notes**                  |
|------------------|-----------------------|------------------|--------------------------|----------------------------|
| Development      | [dev.project.com](dev.project.com)      | `dev`        | As Needed               | Testing of new features through developers    |
| Staging          | [stag.project.com](stag.project.com)   | `stag`        | As soon as a Ticket in ClickUp advances into Dev-Done                   | Pre-production testing through project owner, stakeholder     |
| Production       | [project.com](project.com) | `prod` | Weekly, every Monday               | Live environment           |

---

### Deployment Process

1. **Development Deploy**:
   * merge your PR into `dev`
      * if the CI/CD pipeline succeeds, the new version is visible on [dev.project.com](dev.project.com)

2. **Staging Deploy**:
   * run `npm run promote:dev:to:staging`
      * if the CI/CD pipeline succeeds, the new version is visible on [stag.project.com](stag.project.com)

3. **Production Deploy**:
   * run `npm run promote:staging:to:production`
      * if the CI/CD pipeline succeeds, the new version is visible on [project.com](project.com)

---

### Rollback Procedure

1. **Rollback Production**:
  * run `npm run rollback:production` to rollback to the last version
  * run `npm run rollback:production <short-commit-hash>` to rollback to a specific commit
2. **Rollback Staging**:
  * run `npm run rollback:staging` to rollback to the last version
  * run `npm run rollback:staging <short-commit-hash>` to rollback to a specific commit
2. **Rollback Development**:
  * run `npm run rollback:development` to rollback to the last version
  * run `npm run rollback:development <short-commit-hash>` to rollback to a specific commit

---
