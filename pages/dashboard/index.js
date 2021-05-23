const cardContainer = document.querySelector(".card-container");
const logout = document.querySelector(".logout");
const createNoteButton = document.querySelector(".new-note");
const deleteNoteButton = document.querySelector(".delete-note"); 

const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");



const apiUrl = "https://polar-island-98522.herokuapp.com";

const token = localStorage.getItem("jwt");

logout.addEventListener("click", () => {
  localStorage.removeItem("jwt");
  location.href = "/";
});

let cardData = [];

createNoteButton.addEventListener("click", () => {
  location.href = "/pages/createNotes/createNotes.html";
});

// const userName = (array) => {
//   welcome.innerHTML = "";

//   array.forEach((cardObj) => {
//     const { name } = cardObj;
//     const user = document.createElement("h2");
//     const insideHtml = `Welcome ${name}` ;

//     user.innerHTML = insideHtml;

//     welcome.appendChild(user);
//   });
// };



const createNotes = (array) => {
  cardContainer.innerHTML = "";

  array.forEach((cardObj) => {
    const { heading, content } = cardObj;
    const id = cardObj.noteId;

    const card = document.createElement("div");
    card.classList.add("card");
    card.id = id;

    const insideHtml = `<div class="card-header"><div class="card-heading">${heading}</div><div class="buttons"><a href="../updateNotes/updateNotes.html?noteId=${id}"><div class="edit-note"><img src="../../assets/edit-note.svg" alt="" /></div></a><a href = "./dashboard.html"><div class="delete-note"><img src="../../assets/delete-note.svg" alt="" /></div></a></div></div><div class="card-content">${content}</div>`;

    card.innerHTML = insideHtml;

    cardContainer.appendChild(card);
  });
};

const body = document.querySelector("body");

window.addEventListener("load", () => {
  body.classList.add("visible");

  if (token) {
    fetch(`${apiUrl}/note/getallnotes`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        cardData = data.data;
        // userName(data.data);
        createNotes(data.data);
      })
      .catch((err) => {
        // userName(data.data);
        alert("Error Fetching data");
        console.log(err);
      });
  }
});



// deleteNoteButton.addEventListener("click", () => {

//   if (token) {
//     fetch(`${apiUrl}/note/delete/${noteId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: token,
//       },
//     })
//       .then((data) => {
//         if (data.message) {
//           location.href = "/pages/dashboard/dashboard.html";
//         }
//       })
//       .catch((err) => {
//         alert("Error Deleting Note!! Re-try....");
//         console.log(err);
//       });
//   }
// });