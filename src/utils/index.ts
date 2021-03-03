const dev = process.env.NODE_ENV === "development";

const addLinks = (text: string) => {
  let pat = /@([a-zA-Z])\w+/;

  while (text.match(pat)) {
    let el = text.match(pat)![0];

    text = text.replace(
      pat,
      `<a class="blue-link" target="_blank" rel="noreferrer" href="https://github.com/${el.substr(
        1
      )}" >${el.substr(1)}</a>`
    );
  }

  return text;
};

export { dev, addLinks };
