fetch("https://breakingbadapi.com/api/characters")
  .then((res) => res.json())
  .then((data) => {
    printData(data);
  })
  .catch((data) => console.log("error"));

const printData = (data) => {
  for (let i = 0; i < data.length; i++) {
    const dataEl = data[i];
    const div$$ = document.createElement("div");
    const h2$$ = document.createElement("h2");
    const img$$ = document.createElement("img");

    h2$$.textContent = dataEl.name;
    img$$.setAttribute("src", dataEl.img);
    div$$.appendChild(h2$$);
    div$$.appendChild(img$$);
    document.body.appendChild(div$$);
  }
};
