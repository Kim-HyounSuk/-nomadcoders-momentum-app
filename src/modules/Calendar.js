import dateObject from "../libs/date.js";
import TodoList from "./TodoList.js";

const Calendar = ($container) => {
  const now = new Date();
  const { weekList, monthList } = dateObject;

  const constructor = () => {
    template();
    render();
  };

  const template = () => {
    const $calendarBox = document.createElement("div");
    $calendarBox.classList.add("calendar-box");

    $calendarBox.innerHTML = `
      <div class='calendar__header'>
        <div class='calendar__header__title'>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class='calendar__content'>
        <button class='calendar__btn--left'>
          <i class="fas fa-chevron-left fa-lg"></i>
        </button>
        <div class='calendar__table'>
          <div class='calendar__table--weeks'></div>
          <div class='calendar__table--dates'></div>
        </div>
        <button class='calendar__btn--right'>
          <i class="fas fa-chevron-right fa-lg"></i>
        </button>
      </div>
    `;
    $container.appendChild($calendarBox);

    /* Left, Right Btn 이벤트 추가 */
    const calendarLbtn = $container.querySelector(".calendar__btn--left");
    const calendarRbtn = $container.querySelector(".calendar__btn--right");
    calendarLbtn.addEventListener("click", () => {
      superEventHandler.onClickLeftBtn();
    });
    calendarRbtn.addEventListener("click", () => {
      superEventHandler.onClickRightBtn();
    });
  };

  const render = () => {
    const year = now.getFullYear();
    const month = now.getMonth();

    /* Title 렌더링 */
    const spanList = $container.querySelectorAll(
      ".calendar__header__title span"
    );

    spanList[0].innerText = `${year}`;
    spanList[1].innerText = `${monthList[month]}`;

    /* 요일 Column */
    const calendarWeeks = $container.querySelector(".calendar__table--weeks");
    let innerWeeks = "";

    weekList.forEach((ele) => {
      innerWeeks += `
         <div class='calendar__table--weeks__item'>${ele}</div>
       `;
    });

    calendarWeeks.innerHTML = innerWeeks;

    /* 날짜 Column */
    const calendarDates = $container.querySelector(".calendar__table--dates");
    const firstday = new Date(year, month, 1).getDay();
    const lastday = new Date(year, month - 1, 0).getDate();
    let innerDates = "";

    for (let i = 1; i <= firstday; i++) {
      innerDates += `
        <div class='calendar__table--dates__blank'></div>
      `;
    }
    for (let i = 1; i <= lastday; i++) {
      innerDates += `
        <div data-id="${year}-${
        month + 1
      }-${i}" class='calendar__table--dates__item'><span>${i}</span></div>
      `;
    }

    calendarDates.innerHTML = innerDates;

    /* 오늘 날짜 및 휴일 색깔 변경 */
    const datesItemList = $container.querySelectorAll(
      ".calendar__table--dates__item"
    );
    datesItemList.forEach((ele) => {
      const today = new Date();
      const day = new Date(ele.dataset.id).getDay();
      if (day === 0) ele.classList.add("holiday");
      else if (day === 6) ele.classList.add("sub-holiday");
      else if (
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}` ===
        ele.dataset.id
      ) {
        ele.classList.add("active");
      }
    });

    /* Calendar 일자에 Click 이벤트 추가 */
    const calendarDatesItems = $container.querySelectorAll(
      ".calendar__table--dates__item"
    );
    calendarDatesItems.forEach((ele) => {
      ele.addEventListener("click", (e) => {
        superEventHandler.onToggleCalendarData(e);
      });
    });
  };

  /* 이벤트 핸들러 */
  const superEventHandler = {
    onToggleCalendarData: (e) => {
      const calendarDates = $container.querySelectorAll(
        ".calendar__table--dates__item"
      );
      calendarDates.forEach((ele) => {
        ele.classList.remove("active");
      });
      e.target.tagName === "DIV"
        ? e.target.classList.add("active")
        : e.target.parentNode.classList.add("active");

      // Calendar의 date 요소가 클릭 되면 기존 TodoList 요소를 제거 후 인스턴스 재생성(보완 필요)
      const todoBox = $container.querySelector(".todo-box");
      todoBox.remove();
      const todoList =
        e.target.tagName === "DIV"
          ? TodoList($container, e.target.dataset.id)
          : TodoList($container, e.target.parentNode.dataset.id);
      todoList();
    },
    onClickLeftBtn: () => {
      now.setMonth(now.getMonth() - 1);
      render();
    },
    onClickRightBtn: () => {
      now.setMonth(now.getMonth() + 1);
      render();
    },
  };

  return constructor;
};

export default Calendar;
