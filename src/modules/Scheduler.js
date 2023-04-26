import Calendar from "./Calendar.js";
import TodoList from "./TodoList.js";

const Scheduler = ($container) => {
  const constructor = () => {
    render();
  };

  const render = () => {
    const $schedulerBox = document.createElement("section");
    $schedulerBox.classList.add("scheduler-box");
    const calendar = Calendar($schedulerBox);
    const todoList = TodoList($schedulerBox);
    calendar();
    todoList();

    $container.appendChild($schedulerBox);
  };

  return constructor;
};

export default Scheduler;
