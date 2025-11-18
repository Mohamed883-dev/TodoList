import { createContext, useContext , useReducer } from "react";
import TodoReducer from "../Reducers/todoReducer";
import { v4 as uuidv4 } from 'uuid';

const initialTodos = [
  { id: uuidv4(), title: "here's the task 1", details: "project details 1", isFinished: false },
  { id: uuidv4(), title: "here's the task 2", details: "project details 2", isFinished: false },
  { id: uuidv4(), title: "here's the task 3", details: "project details 3", isFinished: false }
];

const TodosContext = createContext([])

const TodosProvider =({children}) => {
 const [ Todos , TodosDispatch] = useReducer(TodoReducer , initialTodos) 

  return (

    <TodosContext.Provider value={{ todos:Todos , Dispatch : TodosDispatch }}>
        {children}
    </TodosContext.Provider>
  )
  
}

export default TodosProvider;

export const useTodos = ()=> {
  return useContext(TodosContext)
}