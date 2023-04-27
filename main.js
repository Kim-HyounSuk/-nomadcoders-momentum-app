import App from "./src/App.js";
import Login from "./src/modules/Login.js";

const $body = document.querySelector("body");
const isUsername = localStorage.getItem("username");

if (isUsername) {
  const app = App();
  app();
} else {
  const login = Login($body);
  login();
}
