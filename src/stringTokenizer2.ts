/* Read about the logic of cd function in README.md. */
export function cd(currentPath: string, action: string): string {
  // Early return:
  if (action.startsWith("/")) return action;

  // Data modelling:
  const currentPathArray: string[] =
    currentPath === "/" ? [] : currentPath.split("/").slice(1);
  const actionArray: string[] = action.split("/");

  // Logic:
  actionArray.forEach((action) => {
    // All the action cases go here:
    if (action === "..") {
      // Go up one level.
      currentPathArray.pop();
    } else if (action === ".") {
      // Do nothing.
    } else {
      // Add folder to the currentPathArray
      currentPathArray.push(action);
    }
  });

  return `/${currentPathArray.join("/")}`;
}
