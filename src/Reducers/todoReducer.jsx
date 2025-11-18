import { v4 as uuidv4 } from 'uuid';

export default function TodoReducer(currentState , action){

 switch (action.type) {

    case "added" :{
      
    if (action.payload.title.trim() === "") return;
    const newTodo = {
      id : uuidv4(),
      title: action.payload.title ,
      details: " ",
      isFinished: false,
    };
     
    const updatedTodos = [...currentState, newTodo];
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return updatedTodos; 
  }

    case "deleted" : {
      const updatedTodos = currentState.filter((t) => t.id !== action.payload.id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "edited" : {
      const updatedList = currentState.map((t) =>
      t.id === action.payload.id
        ? { ...t, title: action.payload.title , details: action.payload.details }
        : t
    );
    localStorage.setItem("todos", JSON.stringify(updatedList));
     return updatedList;
    }

    case "get": {
			const storageTodos =
				JSON.parse(localStorage.getItem("todos")) ?? [];
			return storageTodos;
		}

    case "finish" : {
          const updatedTodos = currentState.map((t) => {
          if (t.id === action.payload.id) {
            const updatedTodo = { ...t, isFinished: !t.isFinished };
            return updatedTodo;
           
          }
          return t;
          
        });
          localStorage.setItem("todos", JSON.stringify(updatedTodos));
          return updatedTodos;
    }



    default : {
      throw Error("Unknown Action " + action.type);
    }

    
      
  
   }
  }


  

