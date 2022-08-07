export function cd(currentPath: string, cdAction: string): string {
  /*  
    Our currentPath is a string and we need to manipulate this string and eventually return a new string. 

    1. In order for us to manipulate a string easily, we chunk the string into smaller strings and store 
    those smaller string chunks into an array. 
      - For example, "/home/user/folder" would be turned into an array of ["home", "user", "folder"].
      - We don't want to store delimiters into our array, this would only complicate manipulating the array.
      - We will add the delimiters back to our string later when we are returning output string.

    2. We have a string currentPath that we know we need to manipulate. But how? Our second argument is a cdAction.
    cdAction is a string that tells us how to manipulate our currentPath. 
      - For example cdAction can look like this: "../anotherFolder". This means we want to go up one folder (..) 
        and then go into folder called anotherFolder.  
    In order for us to understand what this cdAction string means, we need to break it down into smaller strings 
    and store those smaller strings in an array as well. 
      - For example, "../anotherFolder" would be turned into an array of ["..", "anotherFolder"].
      - If we encounter ".", then ignore it and go to the next element in the array.
      - If the action starts with "/" then this means that whatever comes after the "/" is the absolute path 
      and the string output we want to return. 
      - IMPORTANT: This tells me that when we are chunking our cdAction into a smaller string, we need to
        think about how to treat the "/" character, since we need to account for it (it tells us the new path is 
        an absolute path).
      - IDEA: We check if the first string character is "/", then don't chunk the string into an array and 
        just return the string as output string, since it's an absolute path.

    3. Now we have cdAction array. In order to apply the cdAction to our currentPath, we need to go through 
    each array element, check what it means and then manipulate our currentPath accordingly. We need to define
    all of our cdAction cases:
      - If the first character is "/", then we don't chunk the string into an array and just return the string
        as output string, since it's an absolute path.
      - ".." means go up one directory, which in terms or data structures means, remove the last 
      element of our currentPathArray. 
      - "anotherFolder" means go into another folder, which in terms of data structures means, 
      add the name of the anotherFolder to the end of our currentPathArray.
      - "." means do nothing, which in terms of data structures means just go to the next element in the array.

    4. Chunking up currentPath and cdAction:
      - FOR INTERVIEW I PREFER THIS: When we are chunking up our currentPath, we can use JS split() method and pass in a delimiter "/".
        - The caveat is that it returns an array of strings, but the first string is an empty string.
          - If we choose to go with this option, we need to remove the first string from our array using shift() 
          (modifies the array, returns the removed element) or splice(0,1) (0 is start index, 1 means how many 
            elements we need to remove from the start index. Splice modifies an array, returns removed element).
      - Another way to chunk up our currentPath is to loop over it and start collecting characters into a 
      currentString variable, when encounter "/" character, then push the currentString to currentPathArray 
      and reset the currentString to empty string. 

    5. Manipulating currentPathArray:
      - Now that we have cdActionArray, we need to loop over it and for each element we check our use cases (see number 3)
      and manipulate our currentPathArray accordingly.

    6. Done!
  */

  // Test case: currentPath = "/home/user/folder", cdAction = "../anotherFolder"

  let currentPathArray: string[] = [];

  // 1. If currentPath value is "/", then set currentPathArray to empty array.
  if (currentPath === "/") {
    currentPathArray = [];
  } else {
    // 1.1 Chunk up currentPath into smaller strings and store those smaller strings into an array.
    currentPathArray = currentPath.split("/");
    currentPathArray.shift(); // remove the first element from the array, since it's an empty string.
  }

  // 2. Check if cdAction string starts with "/", if so, then return the string as output string.
  if (cdAction.startsWith("/")) return cdAction;

  // 2.1 Chunk up cdAction into smaller strings and store those smaller strings into an array.
  const cdActionArray = cdAction.split("/"); // If no delimiter is found, it will return an array with one cdAction string.

  // 3. Loop over cdActionArray and for each element we check our use cases and manipulate our currentPathArray accordingly.
  cdActionArray.forEach((action) => {
    if (action === "..") {
      currentPathArray.pop(); // remove the last element from the array. Outcome is ["home", "user"]
    } else if (action !== ".") {
      currentPathArray.push(action); // add the name of the anotherFolder to the end of our currentPathArray. If cdAction is "p/./q" outcome is ["home", "user", "p", "q"]
    }
  });

  const output: string = `/` + currentPathArray.join("/"); // join the array back into a string. Outcome is "/home/user/p/q"

  return output;
}
