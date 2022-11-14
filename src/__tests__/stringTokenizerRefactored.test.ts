import { cd } from "../stringTokenizerRefactored";

test("Move to absolute path works", () => {
  expect(cd("/", "folder")).toEqual("/folder");
});

test("Move to nested folder works", () => {
  expect(cd("/folder", "nestedFolder")).toEqual("/folder/nestedFolder");
});

test("Move one folder up works", () => {
  expect(cd("/folder/nestedFolder", "..")).toEqual("/folder");
});

test("Move one folder up and then two folders down works", () => {
  expect(cd("/folder/nestedFolder", "../folder2/folder3")).toEqual(
    "/folder/folder2/folder3"
  );
});

test("Period in the middle of the path gets ignored", () => {
  expect(cd("/folder/nestedFolder", "folder2/./folder3")).toEqual(
    "/folder/nestedFolder/folder2/folder3"
  );
});

test("Period at the start of the path gets ignored", () => {
  expect(cd("/folder/nestedFolder", "./folder2/folder3")).toEqual(
    "/folder/nestedFolder/folder2/folder3"
  );
});
