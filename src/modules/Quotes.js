import { bgList, quotes } from "../libs/quotes.js";

const Quotes = ($container) => {
  const constructor = () => {
    template();
    render();
  };

  const template = () => {
    const $quotesBox = document.createElement("section");
    $quotesBox.classList.add("quotes-box");
    $quotesBox.innerHTML = `
        <i class="fas fa-sync-alt"></i>
        <span></span>
    `;

    $container.appendChild($quotesBox);
  };

  const render = () => {
    const ranQuotesNum = Math.floor(Math.random() * quotes.length);
    const ranBgNum = Math.floor(Math.random() * bgList.length);
    const quotesBox = $container.querySelector(".quotes-box");
    const quoteItem = $container.querySelector(".quotes-box span");
    const quoteBtn = $container.querySelector(".quotes-box i");

    quotesBox.setAttribute(
      "style",
      `background-image: url(./src/img/${bgList[ranBgNum]}.png)`
    );
    quoteItem.innerText = `${quotes[ranQuotesNum].quote} -${quotes[ranQuotesNum].author}-`;
    quoteBtn.addEventListener("click", onClickQuoteBtn);
  };

  const onClickQuoteBtn = () => {
    render();
  };

  return constructor;
};

export default Quotes;
