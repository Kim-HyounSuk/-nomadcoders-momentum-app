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
        <li><i class="fas fa-home"></i></li>
        <li><i class="fas fa-calendar-week"></i></li>
        <li><i class="fas fa-power-off"></i></li>
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
    const isvisitedPage = localStorage.getItem("visited");

    if (isvisitedPage) {
      if (isvisitedPage === "home") {
        const home = Home($app);
        home();
      } else {
        const schedule = Schedule($app);
        schedule();
      }
    } else {
      const home = Home($app);
      home();
    }

    navItems[0].addEventListener("click", () => {
      superEventHandler.onClickHome();
    });
    navItems[1].addEventListener("click", () => {
      superEventHandler.onClickScheduler();
    });
    navItems[2].addEventListener("click", () => {
      superEventHandler.onClickReset();
    });
  };

  const superEventHandler = {
    onClickHome: () => {
      const $app = document.querySelector("#app");
      $app.innerHTML = "";
      const home = Home($app);
      home();
      localStorage.setItem("visited", "home");
    },
    onClickScheduler: () => {
      const $app = document.querySelector("#app");
      $app.innerHTML = "";
      const schedule = Schedule($app);
      schedule();
      localStorage.setItem("visited", "schedule");
    },
    onClickReset: () => {
      localStorage.removeItem("username");
      location.reload();
    },
  };

  return constructor;
};

export default App;
