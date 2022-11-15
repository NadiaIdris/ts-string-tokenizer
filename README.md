# String tokenizer and in memory rate limiter exercises

## Install project dependencies

- In the project root folder run: `npm install` (or `npm i`).

## Run tests

- In the project root folder run: `npx jest --watchAll`

---

# Exercise 1: String tokenizer aka mimic cd command in terminal

![](/docs/readme_images/string-tokenizer.png)

We want to create a function that mimics the cd command in the terminal.

## Function signature

```TypeScript
function cd(currentPath: string, action: string): string
```

The function takes two argument, first argument is a current path and the second argument is an action to apply to the current path to change the path. The function modifies the path and returns the resulting path as a string.

## Test against the following cases

| Current path         | Action             | Resulting path                       |
| -------------------- | ------------------ | ------------------------------------ |
| /                    | /folder            | /folder                              |
| /folder              | nestedFolder       | /folder/nestedFolder                 |
| /folder              | /home              | /home                                |
| /folder/nestedFolder | ..                 | /folder                              |
| /folder/nestedFolder | ../folder2/folder3 | /folder/folder2/folder3              |
| /folder/nestedFolder | folder2/./folder3  | /folder/nestedFolder/folder2/folder3 |

# String tokenizer logic

Our `currentPath` is a string and we need to manipulate this string and eventually return a new string.

## Data modelling

1. In order for us to manipulate a string easily, we chunk the string into smaller strings and store
   those smaller string chunks into an array.

- For example, "/home/user/folder" would be turned into an array of ["home", "user", "folder"] <- Data modelling.
- We don't want to store delimiters into our array, this would only complicate manipulating the array.
- We will add the delimiters back to our string later when we are returning output string.

2. We have a string `currentPath` that we know we need to manipulate. But how? Our second argument is a `action`.
   `action` is a string that tells us how to manipulate our `currentPath`.

- The meaning of `action` string command: For example `action` can look like this: "../anotherFolder". This means we want to go up one folder (..)
  and then go into folder called anotherFolder.  
  In order for us to understand what this `action` string means, we need to break it down into smaller strings
  and store those smaller strings in an array as well.
- For example, "../anotherFolder" would be turned into an array of ["..", "anotherFolder"].
- If we encounter ".", then ignore it and go to the next element in the array.
- If the action starts with "/" then this means that whatever comes after the "/" is the absolute path
  and the string output we want to return.
- IMPORTANT: This tells me that when we are chunking our `action` into a smaller strings, we need to
  think about how to treat the "/" character, since we need to account for it (it tells us the new path is
  an absolute path).
- IDEA: We check if the first string character is "/", then don't chunk the string into an array and
  just return the string as output string, since it's an absolute path.

## Assign meaning to each action

![](/docs/readme_images/string-tokenizer-assign-meaning.png) 3. Now we have `action` string array. In order to apply the `action` to our `currentPath`, we need to go through
each array element, check what it means and then manipulate our currentPath accordingly. We need to define
all of our `action` cases:

- If the first character is "/", then we don't chunk the string into an array and just return the string
  as output string, since it's an absolute path.
- ".." means go up one directory, which in terms or data structures means, remove the last
  element of our currentPathArray.
- "anotherFolder" means go into another folder, which in terms of data structures means,
  add the name of the anotherFolder to the end of our currentPathArray.
- "." means do nothing, which in terms of data structures means just go to the next element in the array.

4. Chunking up `currentPath` and `action` strings to arrays:

- FOR INTERVIEW I PREFER THIS: When we are chunking up our currentPath, we can use JS split() method and pass in a delimiter "/".
  - The caveat is that it returns an array of strings, but the first string is an empty string.
    - If we choose to go with this option, we need to remove the first string from our array using shift()
      (modifies the array, returns the removed element) or splice(0,1) (0 is start index, 1 means how many
      elements we need to remove from the start index. Splice modifies an array, returns removed element).
- Another way to chunk up our currentPath is to loop over it and start collecting characters into a
  currentString variable, when encounter "/" character, then push the currentString to currentPathArray
  and reset the currentString to empty string.

5. Manipulating `currentPathArray`:

- Now that we have `cdActionArray`, we need to loop over it and for each element we check our use cases (see number 3)
  and manipulate our `currentPathArray` accordingly.

6. Done!

# Exercise 2: In Memory Rate Limiter

![](/docs/readme_images/api-rate-limiter.png)
![](/docs/readme_images/api-rate-limiter2.png)

- **Exercise 2:** Implement a in-memory rate limiter that limits the number of tokens that can be
  produced in a given time period.

## Function signature

```TypeScript
function acceptOrDenyRequest(
  maxRequests: number,
  timeWindowInMs: number,
  successfulRequests: number[],
  newRequestTimestamp: number
): "accept" | "deny"
```

## Test against the following cases

| Request # | Timestamp | Result |
| --------- | --------- | ------ |
| 1         | 1100      | accept |
| 2         | 1200      | accept |
| 3         | 1300      | deny   |
| 4         | 2100      | accept |
| 5         | 2150      | deny   |
| 6         | 2200      | accept |

Request1: 1000ms

## In Memory Rate Limiter Logic

We have built and API and made it's endpoint public. This means that in theory we could have millions of requests coming in to our API endpoint. This could be costly or we could have a malicious code that could potentially crash our server. We need to protect our API endpoint from malicious code and also from too many requests coming in at the same time. We need to implement a rate limiter that limits the number of tokens (requests) that can be produced in a given time period.

1. We are going to create two functions: outer and inner function. Outer function defines all the variables and data structures we need to keep track of and the inner function accepts all those variables as arguments and checks is there space left in the time window to allow another request in or not.

Things we need to keep track of in our outer function:

- We need to keep track of all the successful request timestamps. Create an empty array `successfulRequests` to start tracking the successful request timestamps.
- We need to define how many requests we want to allow in a given time period. This is the `maxRequests`.
- Then we need to define the time period that we count how many requests come in and which requests to allow and which to deny. This is the `timeWindowInMs`.
- One more thing. When a new request comes in, we need to create a timestamp for it. This is the `newRequestTimestamp`. This is the time window endpoint. We use this timestamp to calculate the window start point to check if there are less than max requests currently in the time window.

2. Now we are going to call a function `acceptOrDenyRequest` which will accept or deny the request to hit the API endpoint. This function will take in the arguments we just defined:

   - `maxRequests: number`
   - `timeWindowInMs: number`
   - `successfulRequests: number[]`
   - `newRequestTimestamp: number`.

   - We need to keep track of request count in the time window. We create a `requestCount` variable. When the request count is equal to the max requests, we need to deny the request since the time window is full.

   - We will loop through the `successfulRequests` array from back to front. We will check if the previously successful timestamp is still within the time window. If it is, we will increment the request count. If it is not, we will stop the loop since we know we have reached outside of the window bounds.

     ![](/docs/readme_images/api-rate-limiter3.svg)

   - Now that we know how many requests were successful in the current time window, we can compare successful requests number with the max requests allowed in the time window. If successful requests number is less than max request allowed, then we can accept the request. If successful requests number is equal to max requests allowed, then we need to deny the request since the time window is full with successful requests already.
     ![](/docs/readme_images/api-rate-limiter4.svg)

3. In the outer function we check if the request was successful or not. It the request was successful, we push the request timestamp to `successfulRequests` array and return "accept". If the request was not successful, we return "deny".
