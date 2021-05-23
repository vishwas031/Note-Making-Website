const body = document.querySelector("body");

const apiUrl = "https://polar-island-98522.herokuapp.com";

window.addEventListener("load", () => {
  body.classList.add("visible");
});

const signInForm = document.querySelector(".signin-form");

signInForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const signInEmail = document.querySelector(".signin-email");
  const signInPassword = document.querySelector(".signin-password");

  const email = signInEmail.value;
  const password = signInPassword.value;

  body.innerHTML =`<img scr="../../assets/Infinity-1s-200px.svg" alt="" />`;
  fetch(`${apiUrl}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { token } = data;

      if (token) {
        localStorage.setItem("jwt", token);
        location.href = "/pages/dashboard/dashboard.html";
      } else {
        alert("User Doesn't exist");
        location.href = "/pages/signin-signup-page/authenticate.html"
      }
    })
    .catch((err) => {
      alert("Error Signing In!!! Re-try....");
      location.href = "/pages/signin-signup-page/authenticate.html"
    });
});

const signUpForm = document.querySelector(".signup-form");

signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.querySelector(".signup-email").value;
  const name = document.querySelector(".signup-name").value;
  const password = document.querySelector(".signup-password").value;
  const retypedPassword = document.querySelector(".signup-retyped-password").value;

  if (password !== retypedPassword) {
    alert("Passwords didn't match");
    return;
  }else if(email.length === 0 || password.length === 0 || name.length === 0)
  {
    alert("Please Enter all Entries");
    return;
  }
  body.innerHTML =`<img scr="../../assets/Infinity-1s-200px.svg" alt="" />`;
  fetch(`${apiUrl}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { token } = data;

      if (token) {
        localStorage.setItem("jwt", token);
        location.href = "/pages/dashboard/dashboard.html";
      } else {
        alert("User Already Exists");
        location.href = "/pages/signin-signup-page/authenticate.html"
      }
    })
    .catch((err) => {
      alert("Error Signing Up!!! Re-try....");
      location.href = "/pages/signin-signup-page/authenticate.html"
    });
  
});