# Definition of Done (DoD)

This document outlines the **Definition of Done (DoD)** for the **<Project>**. It sets the criteria that must be met before a task, feature, or bug fix can be considered "done." The purpose of this document is to ensure that all work meets the quality standards and is consistent with the project's goals.

---

## General Criteria

1. **Code Complete**
   - The feature or bug fix has been implemented and is working according to the requirements.
   - The code follows the established coding standards and best practices.

2. **Code Review**
   - The code has been reviewed by at least one other team member.
   - Feedback has been addressed and the code is approved by the reviewer.
   - This review can be in a pair programming session or during a pull request.

3. **Testing**
   - The feature has been manually tested (if applicable) and works as expected in the appropriate environments (e.g., `local`, `development`).
   - All **unit tests** for the feature/bug fix have been written and passed.
   - All **integration tests** have passed, ensuring the component works with other parts of the system.
   - **End-to-end (E2E) tests** have been executed (if applicable) to validate the full user flow.
   - **Performance tests** have been run and the feature/bug fix does not degrade the performance of the application.
   - Tests have been added or updated to reflect the changes made.

4. **Documentation**
   - All relevant documentation has been updated, including:
     - Code comments (if applicable).
     - README or any setup instructions (if applicable).
     - API documentation (if applicable).
     - Any related documentation or configuration files (if applicable).
   - New functionality or changes have been documented in the **changelog**.

5. **CI/CD Checks**
   - The code has passed all **CI/CD pipeline** checks (e.g., linting, tests, build).
   - The code is merged into the appropriate branch (e.g., `development`).
   - The **merge conflict** resolution has been completed (if applicable).

6. **Code Quality**
   - The code is free from obvious bugs or issues.
   - No new **technical debt** has been introduced.
   - **Static analysis tools** (e.g., ESLint, SonarQube) have been run and passed.

7. **Feature Toggles**
   - If the feature requires a feature toggle, it has been implemented and properly configured.
   - Ensure that the feature toggle can be enabled or disabled easily without code changes.

8. **Deployable**
   - The feature/bug fix can be deployed to the **staging** environment.
   - If deployed to staging, it works as expected in the staging environment.

9. **Usability**
   - The user interface (UI) meets the design requirements and is consistent with the existing design guidelines.
   - The user experience (UX) has been validated (e.g., user flows, accessibility).

10. **Regression Testing**
    - The feature or bug fix has been tested for **regression** to ensure it doesn't negatively affect existing functionality.
    - Existing tests are still passing.

---

## Additional Criteria for Specific Types of Work

### New Features
- All new functionality has clear, concise user stories and acceptance criteria.
- The feature meets the "Definition of Ready" before development begins.
- The feature is **user-facing** and includes both functional and non-functional requirements (e.g., performance, security).

### Bug Fixes
- The bug has been reproduced and verified in a development or staging environment.
- The bug is fixed, and no new issues are introduced by the fix.

### Refactoring
- The code has been refactored to improve readability, maintainability, and/or performance without changing functionality.
- Refactored code passes all tests and works as expected.

---

## Example DoD Checklist for a Feature

| **Task**                         | **Done?** |
|-----------------------------------|-----------|
| Feature implemented               | ✅        |
| Code reviewed by peers            | ✅        |
| Unit tests written and passed     | ✅        |
| Manual testing completed          | ✅        |
| Integration tests passed          | ✅        |
| Documentation updated             | ✅        |
| Feature toggled (if applicable)   | ✅        |
| Deployed to staging environment   | ✅        |
| CI/CD checks passed               | ✅        |
| Code quality checks passed        | ✅        |
| Regression testing completed      | ✅        |

