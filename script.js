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
    const a = document.createElement("a");

    h2.textContent = this.login;
    a.setAttribute("href", this.avatar_url);
    a.textContent = this.avatar_url;
    a.style = "color: #bef";

    div.append(h2, a);
    div.style =
      "margin-top: 20px; padding: 10px; border-radius: 5px; background-color: #222; text-align: center; color: #fff;";
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
