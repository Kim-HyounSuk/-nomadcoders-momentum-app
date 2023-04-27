const Wether = ($container) => {
  const constructor = () => {
    template();
    render();
  };

  const template = () => {
    const $wetherBox = document.createElement("section");
    $wetherBox.classList.add("wether-box");

    $container.appendChild($wetherBox);
  };

  const render = () => {};

  return constructor;
};

export default Wether;
