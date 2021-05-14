const body = document.querySelector('body')
const createNoteInput = document.querySelector(".notesInput")

createNoteInput.addEventListener("change",(e)=>{
    console.log(e.target.value);
})

window.addEventListener('load',()=>{
    body.classList.add("visible");
});

