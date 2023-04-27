const Login = ($container) => {
  const constructor = () => {
    template();
    render();
  };

  const template = () => {
    const $loginForm = document.createElement("form");
    $loginForm.classList.add("login-form");
    $loginForm.innerHTML = `
      <span>What is your name?</span>
      <input type='text' placeholder='Enter your name' required />
      <button type='submit'>Enter</button>
    `;
    $container.appendChild($loginForm);
  };

  const render = () => {
    const loginForm = $container.querySelector(".login-form");
    loginForm.addEventListener("submit", onSubmitLogin);
  };

  const onSubmitLogin = () => {
    const loginInput = $container.querySelector(".login-form input");

    localStorage.setItem("username", `${loginInput.value}`);
  };

  return constructor;
};

export default Login;
