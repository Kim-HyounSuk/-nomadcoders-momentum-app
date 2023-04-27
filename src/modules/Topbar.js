const Topbar = ($container) => {
  const bgList = ["01", "02", "03", "04"];
  const constructor = () => {
    template();
    render();
  };

  const template = () => {
    const $topbarBox = document.createElement("section");
    $topbarBox.classList.add("topbar-box");
    $topbarBox.innerHTML = `
      <div class='topbar__btns'>
        <button></button>
        <button></button>
        <button></button>
      </div>
      <div class='topbar__greeting'>
        <span></span>
      </div>
    `;

    $container.appendChild($topbarBox);
  };

  const render = () => {
    const topbarBtns = $container.querySelectorAll(".topbar__btns button");
    const topbarGreeting = $container.querySelector(".topbar__greeting span");
    topbarBtns[0].addEventListener("click", () => {
      superEventHandler.onClickExit();
    });

    topbarGreeting.innerText = `Welcome, ${localStorage.getItem("username")}!`;
  };

  const superEventHandler = {
    onClickExit: () => {
      localStorage.removeItem("username");
      location.reload();
    },
  };

  return constructor;
};

export default Topbar;
