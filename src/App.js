import Home from "./pages/Home.js";
import Schedule from "./pages/Schedule.js";

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
    const navItems = document.querySelectorAll("nav li");

    const home = Home($app);
    home();

    navItems[0].addEventListener("click", () => {
      superEventHandler.onClickHome();
    });
    navItems[1].addEventListener("click", () => {
      superEventHandler.onClickScheduler();
    });
  };

  const superEventHandler = {
    onClickHome: () => {
      const $app = document.querySelector("#app");
      $app.innerHTML = "";
      const home = Home($app);
      home();
    },
    onClickScheduler: () => {
      const $app = document.querySelector("#app");
      $app.innerHTML = "";
      const schedule = Schedule($app);
      schedule();
    },
  };

  return constructor;
};

export default App;
