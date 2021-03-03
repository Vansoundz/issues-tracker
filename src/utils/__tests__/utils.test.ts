import { addLinks } from "..";

test("addlinks", () => {
  expect(addLinks("@vansoundz")).toBe(
    `<a class="blue-link" target="_blank" rel="noreferrer" href="https://github.com/vansoundz" >vansoundz</a>`
  );

  expect(addLinks("what @vansoundz did")).toBe(
    `what <a class="blue-link" target="_blank" rel="noreferrer" href="https://github.com/vansoundz" >vansoundz</a> did`
  );
});
