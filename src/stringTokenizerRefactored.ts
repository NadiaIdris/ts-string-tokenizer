export function cd(currentPath: string, cdAction: string): string {
  if (cdAction.startsWith("/")) return cdAction;

  const currentPathArray = parseCurrentPathToArray(currentPath);
  const cdActionArray = cdAction.split("/");
  modifyCdActionArray(cdActionArray, currentPathArray);

  const output: string = `/` + currentPathArray.join("/"); 
  return output;
}

function modifyCdActionArray(cdActionArray: string[], currentPathArray: string[]) {
  cdActionArray.forEach((action) => {
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