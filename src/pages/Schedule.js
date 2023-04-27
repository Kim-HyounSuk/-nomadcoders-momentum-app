import Quotes from "../modules/Quotes.js";
import Scheduler from "../modules/Scheduler.js";
import Topbar from "../modules/Topbar.js";

const Schedule = ($container) => {
  const constructor = () => {
    template();
    render();
  };

  const template = () => {
    $container.innerHTML = `
      <article class='page__article'></article>
      <article class='page__article'></article>
      <article class='page__article'></article>
    `;
  };

  const render = () => {
    const articles = $container.querySelectorAll("article");

    const topbar = Topbar(articles[0]);
    topbar();

    const scheduler = Scheduler(articles[1]);
    scheduler();

    const quotes = Quotes(articles[2]);
    quotes();
  };

  return constructor;
};

export default Schedule;
