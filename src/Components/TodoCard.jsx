import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import TodoList from "./TodoList"; 
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
// import { v4 as uuidv4 } from 'uuid';
import { useState ,useEffect, useMemo } from "react"; 

// dialog imports 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// filter imports
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useSnackBar } from '../Contexts/SnackBarContext';
import { useTodos } from '../Contexts/TodosContext';
// Initial Data



export default function TodoCard() {

  // ----------------- 🧠 States -----------------
  // const [todos2, setTodos] = useState(initialTodos);
  // const [todos ,Dispatch] = useReducer(todoReducer , initialTodos)

  const [inputValue, setInputValue] = useState("");
  const [DeleteDialog, setDeleteDialog] = useState(false);
  const [EditDialog, setEditDialog] = useState(false);
  const [UpdatedDialog, setUpdatedDialog] = useState({ title: "", details: "" });
  const [SelectedTodoId, setSelectedTodoId] = useState(null);
  const [DisplayFilterTodos,setDisplayFilterTodos] = useState("all")


  // custom hooks for useContext
  const {HandleSnackBarAppear} = useSnackBar()
  const {todos,Dispatch} = useTodos();

  // ----------------- 💾 Load from LocalStorage -----------------

  	useEffect(() => {
		Dispatch({ type: "get" });
	}, []);


  // ----------------- ➕ Add Todo -----------------
  function HandleInputs() {
    Dispatch({type : "added" , payload : {title : inputValue}})
    setInputValue("");
    HandleSnackBarAppear("Task Added Successfully")
  }

  function handleVal(e) {
    setInputValue(e.target.value);
  }

  // ----------------- ✅ Finish Toggle -----------------
  function OnClickHandleFinish(todoId) {

    Dispatch({type:"finish" , payload: {id : todoId }})
    HandleSnackBarAppear("Task State Changed Successfully")
   
}


  // ----------------- ✏️ Edit Functions -----------------
  function onClickHandleEdit(todoId) {
    const selectedTodo = todos.find((t) => t.id === todoId);
    setSelectedTodoId(todoId);
    setUpdatedDialog({ title: selectedTodo.title, details: selectedTodo.details });
    setEditDialog(true);
    
  }

  function HandleEditDialogValue() {
   
Dispatch({
  type: "edited",
  payload: { id: SelectedTodoId, title: UpdatedDialog.title, details: UpdatedDialog.details }
})
   
    setEditDialog(false);
    setUpdatedDialog({ title: "", details: "" });
    HandleSnackBarAppear("Edited Successfully")
  }

  function onEditDialog() {
    setEditDialog(false);
  }

  // ----------------- 🗑️ Delete Functions -----------------
  function onClickHandleDelete(todoId) {
    setDeleteDialog(true);
    setSelectedTodoId(todoId);
  }

  function HandleDeleteButton() {
    Dispatch({type : "deleted" , payload : {id : SelectedTodoId }})
    setDeleteDialog(false);
    HandleSnackBarAppear("Deleted Successfully")
  }

  function onCloseDialog() {
    setDeleteDialog(false);
  }

    // -----------------  Filter Functions -----------------
    

     const DisplayFinished = useMemo(() => {
      return todos.filter((t) => {
      return t.isFinished
     });

     },[todos]
    ) 

     const DisplayNonFinished = useMemo(() => {
      return todos.filter((t) => {
      return !t.isFinished
     });

     },[todos]
    ) 

     
    let FilterTasks = todos

    if(DisplayFilterTodos == "Finished"){
      FilterTasks = DisplayFinished
    }else if( DisplayFilterTodos == "Non-Finished"){
      FilterTasks = DisplayNonFinished
    }else {
      FilterTasks
    }

  // ----------------- 🧾 Map Todo List -----------------
  const todosMap = FilterTasks.map((t) => (
  <TodoList
    key={t.id}
    todo={t}
    HandleFinishDialog={() => OnClickHandleFinish(t.id)}
    HandleDeleteDialog={() => onClickHandleDelete(t.id)}
    HandleEditDialog={() => onClickHandleEdit(t.id)}
  />
));


  // ----------------- 🧩 UI -----------------
  return (
    <>
    <container maxWidth="sm">
      <Card
        sx={{
          background: "white",
          textAlign: "center",
          padding: "20px ",
          borderRadius: "12px",
          marginLeft: "320px",
          maxHeight: "80vh",  
          overflowY: "auto",      
        }}
      >
        <CardContent>
          <Typography
            variant="h2"
            sx={{ color: "#222222", marginBottom: "20px", fontWeight: "700" }}
          >
            TASKS
          </Typography>

          <Divider variant="middle" sx={{ marginBottom: "20px" }} />

                {/* Filter Component */}
              <ToggleButtonGroup 
              value={DisplayFilterTodos}
              onChange={(e) => {setDisplayFilterTodos(e.target.value)}}
              exclusive
              style={{marginBottom:"20px"}
              }>
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="Finished" style={{color:"green"}}>Finished</ToggleButton>
                <ToggleButton value="Non-Finished" style={{color:"red"}}>Non-Finished</ToggleButton>
              </ToggleButtonGroup>
              {/*======== Filter Component =======*/}

          {todosMap}

<Grid container spacing={1} alignItems="center" sx={{ marginTop: 2 }}>
  <Grid item xs={8} sx={{paddingRight:"60px"}}>
    <TextField
      value={inputValue}
      onChange={handleVal}
      id="outlined-basic"
      label="Enter Task"
      variant="outlined"
      fullWidth
    />
  </Grid>

  <Grid item xs={4}>
    <Button
      variant="contained"
      fullWidth
      sx={{
        height: "56px",
        width:"150px", // matches TextField height
        backgroundColor: "#202224",
        "&:hover": { backgroundColor: "#383838" },
      }}
      onClick={HandleInputs}
    >
      Enter Task
    </Button>
  </Grid>
</Grid>


          {/* Delete Dialog */}
          <Dialog open={DeleteDialog} onClose={onCloseDialog}>
            <DialogTitle>{"Are you sure you want delete the task"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                note : if you delete that task you can't get it back ever again
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onCloseDialog}>Discard</Button>
              <Button onClick={HandleDeleteButton} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog open={EditDialog} onClose={onEditDialog}>
            <DialogTitle>Task Change</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You can change your task titles and details whenever you want
              </DialogContentText>
              <form id="subscription-form">
                <TextField
                  value={UpdatedDialog.title || ""}
                  onChange={(e) =>
                    setUpdatedDialog({ ...UpdatedDialog, title: e.target.value })
                  }
                  autoFocus
                  required
                  margin="dense"
                  label="Change Task Title"
                  type="text"
                  fullWidth
                  variant="standard"
                />

                <TextField
                  value={UpdatedDialog.details || ""}
                  onChange={(e) =>
                    setUpdatedDialog({ ...UpdatedDialog, details: e.target.value })
                  }
                  required
                  margin="dense"
                  label="Change Task Details"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={onEditDialog}>Cancel</Button>
              <Button onClick={HandleEditDialogValue} type="submit" form="subscription-form">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
      </container>
    </>
  );
}
