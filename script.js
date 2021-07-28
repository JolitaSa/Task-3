/* ------------------------------ TASK 3 -----------------------------------
Parašykite JS kodą, kuris leis vartotojui paspaudus ant mygtuko "Show users"
pamatyti vartotojus iš Github API (endpoint'as pateiktas žemiau).

Paspaudus mygtuką "Show users":
1. Pateikiamas informacijos atvaizdavimas <div id="output"></div> bloke
1.1. Infrmacija, kuri pateikiama: "login" ir "avatar_url" reikšmės (kortelėje)
2. Žinutė "Press "Show Users" button to see users" turi išnykti;
"
Pastaba: Informacija apie user'į (jo kortelė) bei turi turėti bent minimalų stilių;
-------------------------------------------------------------------------- */

const ENDPOINT = "https://api.github.com/users";
const resultDiv = document.getElementById("output");

class UserComponent {
  constructor(user) {
    this.login = user.login;
    this.avatar_url = user.avatar_url;
  }
  render() {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");

    h2.textContent = this.login;
    img.setAttribute("src", this.avatar_url);
    img.style =
      "margin-top: 0.1rem; object-fit: cover; width: 100%; height: 20vh;";
    div.append(h2, img);
    div.style =
      "margin-top: 10px; box-sizing: border-box; width: calc(25% - 0.75rem); border-radius: 5px; background-color: #222; text-align: center; color: #fff;";
    return div;
  }
}

document.getElementById("btn").addEventListener("click", showUsers);

function showUsers(e) {
  e.preventDefault();
  fetch(ENDPOINT)
    .then((response) => response.json())
    .then((users) => {
      deleteAllChildElements(resultDiv);
      users.forEach((user) => {
        const userComponent = new UserComponent(user);
        resultDiv.style =
          "display: flex; flex-wrap: wrap; justify-content: space-between";
        resultDiv.appendChild(userComponent.render());
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
}

function deleteAllChildElements(parent) {
  while (parent.lastElementChild) {
    parent.removeChild(parent.lastElementChild);
  }
}
