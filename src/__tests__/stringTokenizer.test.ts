import { cd } from "../stringTokenizer";

test("action 'a' works on currentPath '/'", () => {
  expect(cd("/", "a")).toEqual("/a");
});

test("action 'c' works on currentPath '/b'", () => {
  expect(cd("/b", "c")).toEqual("/b/c");
});

test("action '/e' works on currentPath '/d'", () => {
  expect(cd("/d", "/e")).toEqual("/e");
});

test("action '..' works on currentPath '/foo/bar'", () => {
  expect(cd("/foo/bar", "..")).toEqual("/foo");
});

test("action '../p/q' works on currentPath '/x/y'", () => {
  expect(cd("/x/y", "../p/q")).toEqual("/x/p/q");
});

test("action 'p/./q' works on currentPath '/x/y'", () => {
  expect(cd("/x/y", "p/./q")).toEqual("/x/y/p/q");
});