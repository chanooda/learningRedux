import React, { Dispatch, useState } from "react";
import { connect } from "react-redux";
import { IAction, IHomeProps, IState } from "../interfaces/storeInterface";
import { actions } from "../store";

function Home({ toDos, addToDo, deleteToDo }: IHomeProps) {
  const [text, setText] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setText("");
    addToDo(text);
  };

  return (
    <div>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((el) => (
          <li key={el.id}>
            {el.text} <button onClick={() => deleteToDo(el.id)}>DEL</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function mapStateToProps(state: IState[]) {
  return { toDos: state };
}

function mapDispatchToProps(dispatch: Dispatch<IAction>) {
  return {
    addToDo: (text: string) => dispatch(actions.addToDo(text)),
    deleteToDo: (id: number) => dispatch(actions.deleteToDo(id)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
