/* Read about the logic of cd function in README.md. */
export function cd(currentPath: string, action: string): string {
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
  if (action.startsWith("/")) return action;

  // 2.1 Chunk up cdAction into smaller strings and store those smaller strings into an array.
  const cdActionArray = action.split("/"); // If no delimiter is found, it will return an array with one cdAction string.

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
