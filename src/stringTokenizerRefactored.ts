/* Read about the logic of cd function in README.md. */
export function cd(currentPath: string, action: string): string {
  if (action.startsWith("/")) return action;

  const currentPathArray = parseCurrentPathToArray(currentPath);
  const actionArray = action.split("/");
  modifyCurrentPathArray(currentPathArray, actionArray);

  return `/${currentPathArray.join("/")}`;
}

function modifyCurrentPathArray(
  currentPathArray: string[],
  actionArray: string[]
) {
  actionArray.forEach((action) => {
    if (action === "..") {
      currentPathArray.pop(); // remove the last element from the array. Outcome is ["home", "user"]
    } else if (action !== ".") {
      currentPathArray.push(action);
    }
  });
}

function parseCurrentPathToArray(currentPath: string): string[] {
  let currentPathArray: string[] = [];

  if (currentPath === "/") {
    currentPathArray = [];
  } else {
    // 1.1 Chunk up currentPath into smaller strings and store those smaller strings into an array.
    currentPathArray = currentPath.split("/");
    currentPathArray.shift();
  }
  return currentPathArray;
}
