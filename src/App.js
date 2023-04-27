import Home from "./pages/Home.js";

const $body = document.querySelector("body");

const App = () => {
  const constructor = () => {
    template();
    render();
  };

  const template = () => {
    const $nav = document.createElement("nav");
    $nav.innerHTML = `
      <ul>
        <li>Home</li>
        <li>Scheduler</li>
      </ul>
    `;

    const $app = document.createElement("div");
    $app.setAttribute("id", "app");

    $body.appendChild($nav);
    $body.appendChild($app);
  };

  const render = () => {
    const $app = document.querySelector("#app");
    const home = Home($app);
    home();
  };

  const superEventHandler = {
    onClickHome: () => {},
    onClickCalendar: () => {},
  };

  return constructor;
};

export default App;
