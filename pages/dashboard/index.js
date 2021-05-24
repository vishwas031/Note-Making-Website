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
    const noteId = cardObj.noteId;

    const card = document.createElement("div");
    card.classList.add("card");
    card.id = noteId;

    const insideHtml = `<div class="card-header"><div class="card-heading">${heading}</div><div class="buttons"><a href="../updateNotes/updateNotes.html?noteId=${noteId}"><div class="edit-note"><img src="../../assets/edit-note.svg" alt="" /></div></a><svg
    width="20px"
    height="20px"
    viewBox="0 0 70 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xml
  >
    <path
      d="M35 0.5C38.019 0.499575 40.9291 1.62774 43.1589 3.66298C45.3887 5.69823 46.7771 8.49351 47.0516 11.5H65.8C66.6361 11.5003 67.4409 11.8179 68.0519 12.3887C68.6628 12.9595 69.0343 13.7409 69.0913 14.5751C69.1483 15.4092 68.8865 16.2339 68.3589 16.8825C67.8313 17.5311 67.0771 17.9552 66.2488 18.0692L65.8 18.1H63.2348L57.66 66.412C57.4117 68.5565 56.3838 70.535 54.7717 71.971C53.1597 73.407 51.0761 74.2003 48.9172 74.2H21.0828C18.9239 74.2003 16.8403 73.407 15.2282 71.971C13.6162 70.535 12.5883 68.5565 12.34 66.412L6.76079 18.1H4.19999C3.40255 18.1 2.63209 17.8112 2.0311 17.287C1.43011 16.7629 1.03925 16.0388 0.930794 15.2488L0.899994 14.8C0.900028 14.0026 1.18882 13.2321 1.71297 12.6311C2.23712 12.0301 2.96116 11.6393 3.75119 11.5308L4.19999 11.5H22.9484C23.2228 8.49351 24.6113 5.69823 26.8411 3.66298C29.0709 1.62774 31.981 0.499575 35 0.5V0.5ZM28.4 28C27.322 28 26.42 28.682 26.2352 29.5796L26.2 29.9272V56.8772L26.2352 57.2204C26.42 58.118 27.322 58.8 28.4 58.8C29.478 58.8 30.38 58.118 30.5648 57.2204L30.6 56.8728V29.9316L30.5648 29.5796C30.38 28.6864 29.478 28 28.4 28ZM41.6 28C40.522 28 39.62 28.682 39.4352 29.5796L39.4 29.9272V56.8772L39.4352 57.2204C39.62 58.118 40.522 58.8 41.6 58.8C42.678 58.8 43.58 58.118 43.7648 57.2204L43.8 56.8728V29.9316L43.7648 29.5796C43.58 28.6864 42.678 28.0044 41.6 28.0044V28ZM35 7.1C32.338 7.1 30.116 8.992 29.61 11.5H40.39C39.8796 8.992 37.662 7.1 35 7.1V7.1Z"
      fill="#FFFFFF"
    />
  </svg></div></div><div class="card-content">${content}</div>`;


    card.innerHTML = insideHtml;
    const deleteButton = card.querySelector("svg");

    // deleteButton.addEventListener("click",()=>{
    //   console.log("clicked",noteId);
    // });
    
    cardContainer.appendChild(card);
    
    deleteButton.addEventListener("click", () => {

      // console.log(noteId,token);
      if (token) {
        fetch(`${apiUrl}/note/delete/${noteId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        })
        .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              location.href = "/pages/dashboard/dashboard.html";
            }
          })
          .catch((err) => {
            alert("Error Deleting Note!! Re-try....");
            console.log(err);
          });
      }
    });

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