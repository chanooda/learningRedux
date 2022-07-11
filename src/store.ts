import { createStore } from "redux";
import { IState, IAction } from "./interfaces/storeInterface";

const ADD = "ADD";
const DELETE = "DELETE";

const getToDoId = (toDos: IState[]) => {
  const maxId = toDos.reduce((prev, cur) => Math.max(cur.id, prev), -1);
  return maxId + 1;
};

const addToDo = (text: string) => {
  return { text, id: getToDoId(store.getState()), type: ADD };
};

const deleteToDo = (id: number) => {
  return {
    type: DELETE,
    id,
    text: "",
  };
};

const reducer = (state: IState[] = [], action: IAction) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: action.id }, ...state];
    case DELETE:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};
const store = createStore(reducer);

export const actions = {
  addToDo,
  deleteToDo,
};

export default store;
