import { createStore } from "redux";
import React from "react";

const form = document.querySelector("form") as HTMLFormElement;
const input = document.querySelector("input") as HTMLInputElement;
const ul = document.querySelector("ul") as HTMLUListElement;

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

interface IAction {
  type: string;
  text: string;
  date: number;
  id: number;
}

interface IState {
  text: string;
  id: number;
  date: number;
}

function nextTodoId(todos: IState[]) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}

// store을 수정할 수 있는 방법은 오직 reducer
// store를 변형하면 안된다 새로운 값을 return 해야함

const reducer = (state: IState[] = [], action: IAction): IState[] => {
  switch (action.type) {
    case ADD_TODO:
      return [{ id: nextTodoId(state), text: action.text, date: action.date }, ...state];
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const toDoStore = createStore(reducer);

const deleteToDo = (event: Event) => {
  const target = event.target as HTMLButtonElement;
  const parent = target.parentNode as HTMLLIElement;
  const id = Number(parent.dataset.id);
  toDoStore.dispatch({ type: DELETE_TODO, id, text: "", date: 0 });
};

const painToDos = () => {
  const toDos = toDoStore.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerHTML = "DEL";
    btn.addEventListener("click", deleteToDo);
    li.innerHTML = toDo.text;
    li.dataset.id = String(toDo.id);
    li.dataset.date = String(toDo.date);
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

const addToDo = (text: string) => {
  toDoStore.dispatch({ type: ADD_TODO, text, date: Date.now(), id: 0 });
};

toDoStore.subscribe(painToDos);

const onSubmit = (e: Event) => {
  e.preventDefault();
  const toDo = input.value;
  if (toDo.length === 0) return;
  input.value = "";
  addToDo(toDo);
};

form.addEventListener("submit", onSubmit);
