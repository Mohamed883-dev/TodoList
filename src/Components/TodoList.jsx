import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';




 
export default function TodoList({ todo , HandleFinishDialog  , HandleDeleteDialog , HandleEditDialog }) {



  function HandleFinishButton(){
      HandleFinishDialog(todo.id)
  }
  function HandleDialiogEditButton(){
    HandleEditDialog(todo.id)
 }

 function HandleDialiogDeleteButton(){
    HandleDeleteDialog(todo.id)
 }


  return (

    <>

    
    
<Card
className='cardContent'
  sx={{
    minWidth: 275,
    background: "#202224",
    marginBottom:"20px",
    display: "flex",
    flexDirection: "column",
  }}
>
  <CardContent
    sx={{
      p: 2, // tighter padding (default is 16px = p:2)
      "&:last-child": { pb: 2 }, // remove default extra bottom padding
    }}
  >
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      
      
    >
      {/* Left side: text */}
      <Grid item xs={8}>
        <div>
          <Typography className="task-text" variant="h5" sx={{ color: "white", textAlign: "left" , textDecoration:todo.isFinished? "line-through" : "none"}}>
            {todo.title}
          </Typography>
          <Typography className="task-text" variant="subtitle1" sx={{ color: "#c5c5c5", textAlign: "left" }}>
            {todo.details}
          </Typography>
        </div>
      </Grid>

      {/* Right side: icons */}
      <Grid item xs={4}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          alignItems="center"
        >
          {/* Finish Button */}
          <IconButton
            onClick= {() => {HandleFinishButton()}}
            aria-label="Finish"
            size="large"
            sx={{ color: todo.isFinished ? "white" : "green" ,
                  background: todo.isFinished ? "green" : "white" 
               }}
          >
            <DoneIcon />
          </IconButton>
          {/*====== Finish Button =====*/}
          
          <IconButton
            onClick={() => {HandleDialiogEditButton()}}
            aria-label="Edit"
            size="large"
            sx={{ 
               color: "blue",
               background: "white" 
               }}
          >
            <EditIcon />
          </IconButton>
          {/* Deletion Button */}

  
          <IconButton
            onClick={() => {HandleDialiogDeleteButton()}}
            aria-label="Delete"
            size="large"
            sx={{ color: "red", background: "white" }}
          >
            <DeleteIcon />
          </IconButton>
          {/*====== Deletion Button =====*/}
        </Stack>
      </Grid>
    </Grid>
  </CardContent>
</Card>


    </>
  )
}