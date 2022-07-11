export interface IAction {
  type: string;
  id: number;
  text: string;
}

export interface IState {
  id: number;
  text: string;
}

export interface IHomeProps {
  toDos: IState[];
  addToDo: (text: string) => void;
  deleteToDo: (id: number) => void;
}
