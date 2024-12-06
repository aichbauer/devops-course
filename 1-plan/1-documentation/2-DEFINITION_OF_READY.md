# Definition of Ready (DoR)

The **Definition of Ready (DoR)** is a set of criteria or conditions that must be met before a user story, feature, or task can be considered ready to be worked on in a development sprint or cycle. It ensures that the work is well-defined, clear, and actionable so the development team can start working on it without unnecessary delays or ambiguities.

## Criteria for Definition of Ready (DoR)

### 1. **Clear and Well-Defined User Story**
- The task should have a clear description of what needs to be done and why it is needed in form of a user story.
- It should be written in the format:
  - **As a** [user, system-admin, developer, ...], **I want to** [perform an action] **so that** [I can achieve a goal].

### 2. **Acceptance Criteria**
- Clear and measurable acceptance criteria should be defined, outlining the conditions that must be met for the story to be considered complete.

### 3. **No Ambiguities**
- The task should be free of any unclear or ambiguous requirements.
- The team should understand the scope of work, and any potential blockers or uncertainties should be resolved.

### 4. **Dependencies Identified**
- Any dependencies (e.g., third-party services, APIs, other tasks) should be identified and resolved before the task can be started.
- This includes ensuring that other teams or external resources are available or that pre-requisite tasks are completed.

### 5. **Design and Technical Details**
- If applicable, design documents, wireframes, or technical specifications should be in place to guide implementation.
- For API work, the endpoints, methods, and data structures should be clearly defined.

### 6. **Testability**
- It should be clear how the feature or task will be tested, whether via unit tests, integration tests, or manual QA.
- The testing requirements should be described (e.g., expected output, edge cases, etc.).

### 7. **Non-Functional Requirements**
- Any non-functional requirements (e.g., performance, security, scalability) must be clearly outlined.
- If the task has specific performance or security goals, these should be documented.

### 8. **Team Understanding**
- The entire team, including developers, testers, and product owners, should understand the user story, its purpose, and the expected outcome.
- If the task involves cross-team collaboration, all relevant stakeholders should be involved in the discussion.

### 9. **Prioritized**
- The user story must be prioritized in the backlog and ready to be worked on in the current sprint or iteration.

### 10. **Estimate Available**
- The user story should be estimated (e.g., hours) based on the team's understanding of the effort required.
- The estimate of a user a user story can not be longer than 8 hours (a full work day).
- The ideal estimate is 2-4 hours.
- The estimate helps the team assess the complexity and size of the task.

---

## Example DoR Checklist

| **Criteria**                         | **Description**                                                                                                                                          | **Done?** |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| **Clear User Story**                 | The user story clearly defines the feature and its value to the user.                                                                                   | ✅        |
| **Acceptance Criteria**              | Acceptance criteria have been defined and are testable.                                                                                                 | ✅        |
| **No Ambiguities**                   | All ambiguities have been resolved.                                                                                                                      | ✅        |
| **Dependencies Identified**          | All external or internal dependencies have been resolved.                                                                                                | ✅        |
| **Design and Technical Specs**       | Design and technical details are provided (e.g., API endpoints, UI designs, database schema changes).                                                   | ✅        |
| **Testability Defined**              | The feature is testable, and testing criteria are provided (e.g., automated tests, manual QA).                                                           | ✅        |
| **Non-Functional Requirements**      | Non-functional requirements like performance or security are defined.                                                                                   | ✅        |
| **Team Understanding**               | The whole team understands the requirements and the expected outcome.                                                                                    | ✅        |
| **Prioritized**                       | The user story is prioritized in the backlog for the upcoming sprint.                                                                                   | ✅        |
| **Estimate Available**               | The user story has been estimated by the team (e.g., in story points).                                                                                   | ✅        |

---

## Why DoR is Important

- **Prevents Wasted Time**: Ensures the team isn’t wasting time working on incomplete or unclear tasks.
- **Improves Efficiency**: When all necessary details are available from the start, development proceeds smoothly and efficiently.
- **Improves Communication**: Encourages clear communication among team members and stakeholders before the work begins.
- **Increases Quality**: With clear acceptance criteria and testing requirements, the chances of producing quality code increase.
- **Reduces Risk**: By identifying dependencies and potential blockers early on, the team can address these before starting the work.

---

## Example of Definition of Ready (DoR) in Action

**User Story:**
"As a user, I want to be able to reset my password if I forget it, so that I can regain access to my account."

### DoR Checklist:
- The user story has a clear description.
- Acceptance criteria:
  - The user can request a password reset by clicking a `Forgot Password?` Link under the login form.
  - The user is redirected to a new page where the user can input the email address and click on a button `Receive Reset Password Link`.
  - The user receives an email with a reset link.
  - The user can successfully reset their password within 30 minutes of receiving the email by clicking the link in the mail.
  - The user will be redirected to a page where the user can input the new password and click `Reset Password`
  - The user is able to login with the new password, and not with the old password.
- The task has been estimated at 8 hours.
- Design for the login, receive password, and reset password page is complete.
- No dependencies (all emails are set up and the backend is ready for password changes).
- Test cases are defined.
- Performance and security requirements are noted (e.g., rate limiting on reset requests, ensuring email is sent securely).
- The story is prioritized and ready to be worked on in the next sprint.
