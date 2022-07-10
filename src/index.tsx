import { createStore } from "redux";

const add = document.getElementById("add") as HTMLButtonElement;
const minus = document.getElementById("minus") as HTMLButtonElement;
const number = document.querySelector("span") as HTMLSpanElement;

number.innerText = "0";

const ADD = "ADD";
const MINUS = "MINUS";

// reducer = data를 수정하는 함수
const countModifier = (count = 0, action: any) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = String(countStore.getState());
};

countStore.subscribe(onChange);

add.addEventListener("click", () => countStore.dispatch({ type: ADD }));
minus.addEventListener("click", () => countStore.dispatch({ type: MINUS }));
