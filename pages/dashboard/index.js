const cardContainer = document.querySelector(".card-container");

const cardData = [
  {
    heading: "Heading1",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure sequi culpa officiis quae, quod aperiam temporibus pariatur, est laboriosam corporis similique laudantium repellat quas expedita possimus tempora provident doloremque illum exercitationem, architecto deserunt. Fuga repellat incidunt assumenda dolore cumque nihil facilis repudiandae? Explicabo aspernatur earum nostrum amet aperiam, ab distinctio!",
    id: 1,
  },
  { heading: "Heading2", content: "dhjalk;gjasjfasfs", id: 2 },
  { heading: "Heading3", content: "dhjalk;gjasjfasfs", id: 3 },
  { heading: "Heading4", content: "dhjalk;gjasjfasfs", id: 4 },
  { heading: "Heading5", content: "dhjalk;gjasjfasfs", id: 5 },
  { heading: "Heading6", content: "dhjalk;gjasjfasfs", id: 6 },
  { heading: "Heading7", content: "dhjalk;gjasjfasfs", id: 7 },
];

const createNotes = (array) => {
  array.forEach((cardObj) => {
    const { heading, content, id } = cardObj;

    const card = document.createElement("div");
    card.classList.add("card");
    card.id = id;

    const insideHtml = `<div class="card-header"><div class="card-heading">${heading}</div><a href="../update-notes/index.html?noteId=${id}"><div class="edit-note"><img src="../../assets/edit-note.svg" alt="" /></div></a></div><div class="card-content">${content}</div>`;

    card.innerHTML = insideHtml;

    cardContainer.appendChild(card);
  });
};

createNotes(cardData);

const body = document.querySelector("body");

window.addEventListener("load", () => {
  body.classList.add("visible");
});