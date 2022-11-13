# String tokenizer and in memory rate limiter

## Run tests

- Run all tests:

  ```
  npx jest --watchAll
  ```

## Exercise 1: String tokenizer aka mimic cd command in terminal

We want to create a function that mimics the cd command in the terminal.

### Function signature

```TypeScript
function cd(currentPath: string, action: string): string
```

The function takes two argument, first argument is a current path and the second argument is an action to apply to the current path to change the path. The function modifies the path and returns the resulting path as a string. For example:

| Current path         | Action             | Resulting path                       |
| -------------------- | ------------------ | ------------------------------------ |
| /                    | /folder            | /folder                              |
| /folder              | nestedFolder       | /folder/nestedFolder                 |
| /folder              | /home              | /home                                |
| /folder/nestedFolder | ..                 | /folder                              |
| /folder/nestedFolder | ../folder2/folder3 | /folder/folder2/folder3              |
| /folder/nestedFolder | folder2/./folder3  | /folder/nestedFolder/folder2/folder3 |

## String Tokenizer Logic

Our `currentPath` is a string and we need to manipulate this string and eventually return a new string.

### Data modelling

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

3. Now we have `action` string array. In order to apply the `action` to our `currentPath`, we need to go through
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

## In Memory Rate Limiter

- **Exercise 2:** Implement a in-memory rate limiter that limits the number of tokens that can be
  produced in a given time period.
  ![](/docs/readme_images/in-memory-rate-limiter.png)

## In Memory Rate Limiter Logic

1. We have a web service (API) running on a remote server listening for requests.
2. When a request comes in, we want to record the request time (and the request IP address?) and save it in an array data structure.

   ```TypeScript
   type RequestRecord = {
     requestTimeStamp: number; // timestamp is in milliseconds (e.g. 1660426545749)
     ipAddress: string;
   };
   type RequestRecords = RequestRecord[];
   ```

   ```TypeScript
   const requests: RequestRecords = [
     {requestTimeStamp: number, ipAddress: string},
     ... (more requests)
   ]
   ```

3. API rate limiter tales
