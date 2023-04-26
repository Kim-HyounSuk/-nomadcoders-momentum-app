import Clock from "./modules/Clock.js";
import Pomodoro from "./modules/Pomodoro.js";
import Scheduler from "./modules/Scheduler.js";
import Time from "./modules/Time.js";

const $app = document.getElementById("app");

// const scheduler = Scheduler($app);
// scheduler();

// const clock = Clock($app);
// clock();

// const pomodoro = Pomodoro($app);
// pomodoro();

const time = Time($app);
time();
