import dateObject from "../libs/date.js";

const TodoList = ($container, $activeItem) => {
  const { fullWeekList, monthList } = dateObject;
  let activeDate = "";

  const constructor = () => {
    template();
    render();
  };

  const template = () => {
    /* Calendar 모듈에서 활성화된 date 판별 */
    const activeItem = $container.querySelector(
      ".calendar__table--dates__item.active"
    );
    if (activeItem) {
      activeDate = activeItem.dataset.id;
    } else {
      activeDate = $activeItem;
    }

    /* 기본 template 렌더링 부분 */
    const $todoListBox = document.createElement("div");
    $todoListBox.classList.add("todo-box");

    $todoListBox.innerHTML = `
      <div class='todo-title'>
        <span></span>
        <span></span>
      </div>
      <div class='todo-form'>
        <form>
          <input type='text' placeholder='오늘 할일' minlength='2' required />
          <button type='submit'>
            <i class="fas fa-plus fa-lg"></i>
          </button>
        </form>
      </div>
      <div class='todo-list'>
        <ul><ul>
      </div>
    `;
    $container.appendChild($todoListBox);

    /* Form submit 이벤트 추가 */
    const todoForm = $container.querySelector(".todo-form form");
    todoForm.addEventListener("submit", (e) => {
      superEventHandler.onSubmitTodo(e);
    });
  };

  const render = () => {
    /* 투두리스트-Title 월/일(요일) */
    const selectedDate = new Date(activeDate);
    const month = monthList[selectedDate.getMonth()];
    const date = selectedDate.getDate().toString().padStart(2, "0");
    const day = fullWeekList[selectedDate.getDay()];
    const todoTitle = $container.querySelectorAll(".todo-title span");
    todoTitle[0].innerText = `${day}`;
    todoTitle[1].innerText = `${month} ${date}`;

    /* 투두리스트 내용 */
    const todoList = $container.querySelector(".todo-list");
    const isTodoList = JSON.parse(localStorage.getItem(activeDate));
    let loadTodoList = "";
    if (isTodoList) {
      isTodoList.forEach((todo) => {
        if (todo.state === "doing") {
          loadTodoList += `
          <li id='${todo.id}' class='todo-list__item'>
            <span class='todo-list__item--content'>${todo.text}</span>
            <i class="fas fa-minus todo-list__item__btn"></i>
          </li>
        `;
        } else {
          loadTodoList += `
          <li id='${todo.id}' class='todo-list__item'>
            <span class='todo-list__item--content done'>${todo.text}</span>
            <i class="fas fa-minus todo-list__item__btn"></i>
          </li>
        `;
        }
      });
    }
    todoList.innerHTML = loadTodoList;

    const todoItemsBtn = $container.querySelectorAll(".todo-list__item__btn");
    todoItemsBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        superEventHandler.onClickRemove(e);
      });
    });

    const todoItems = $container.querySelectorAll(".todo-list__item--content");
    todoItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        superEventHandler.onToggleState(e);
      });
    });
  };

  const superEventHandler = {
    onSubmitTodo: (e) => {
      console.log("submit", activeDate);
      e.preventDefault();
      const todoInput = $container.querySelector(".todo-form input");
      const newTodo = {
        id: Date.now(),
        text: todoInput.value,
        state: "doing",
      };
      const isTodoList = localStorage.getItem(`${activeDate}`);
      if (isTodoList) {
        localStorage.setItem(
          `${activeDate}`,
          JSON.stringify([
            ...JSON.parse(localStorage.getItem(`${activeDate}`)),
            newTodo,
          ])
        );
      } else {
        localStorage.setItem(`${activeDate}`, JSON.stringify([newTodo]));
      }
      todoInput.value = "";
      render(activeDate);
    },
    onClickRemove: (e) => {
      const todoItems = $container.querySelectorAll(".todo-list__item");
      todoItems.forEach((item) => {
        if (item.id === e.target.parentNode.id) {
          item.remove();
          const renewal = JSON.parse(
            localStorage.getItem(`${activeDate}`)
          ).filter((item) => item.id !== parseInt(e.target.parentNode.id));
          localStorage.setItem(`${activeDate}`, JSON.stringify(renewal));
        }
      });
    },
    onToggleState: (e) => {
      if (e.target.classList.contains("todo-list__item--content")) {
        if (e.target.classList.contains("done"))
          e.target.classList.remove("done");
        else e.target.classList.add("done");
        const renewal = JSON.parse(localStorage.getItem(`${activeDate}`)).map(
          (item) => {
            if (item.id === parseInt(e.target.parentNode.id)) {
              if (item.state === "doing") return { ...item, state: "done" };
              else return { ...item, state: "doing" };
            }
          }
        );
        localStorage.setItem(`${activeDate}`, JSON.stringify(renewal));
      }
    },
  };

  return constructor;
};

export default TodoList;
