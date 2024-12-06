# Unit Tests

## What is a Unit Test?

A unit test is a type of software testing that focuses on verifying the correctness of individual components or units of code in isolation. Typically, a "unit" refers to the smallest testable part of a software application, such as a single function, method, class, or in the context of frontend development, a component.

### Why do we need Mocking in Unit Tests?

We are mocking dependencies in unit testing because it allows developers to isolate the unit being tested by simulating the behavior of external dependencies. These dependencies might include databases, APIs, filesystems, or other services that the unit interacts with. Mocking ensures that the unit test focuses only on the logic within the unit itself, without relying on or being affected by external factors.

Mocking invloves the creation of "fake objects" or "fake implementations" that are used instead of a real object.

Here is an example:

```js
// userService.js
const axios = require('axios');

async function getUser(userId) {
  const response = await axios.get(`https://api.example.com/users/${userId}`);
  return response.data;
}

module.exports = { getUser };
```

