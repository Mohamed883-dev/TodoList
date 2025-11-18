import { createContext ,useContext } from "react";
import { useState } from "react";
import MySnackBar from "../Components/MySnackBar";

const SnackBar = createContext({});

export const SnackBarProvider = ({children})=> {

     const [open, setOpen] = useState(false);
     const [message,setMessage] = useState("")
  
    function HandleSnackBarAppear(message){
    setOpen(true);
    setMessage(message)
  
    setTimeout(() => {
      setOpen(false)
    } , 3000);
  }
  
  return <SnackBar.Provider value={{HandleSnackBarAppear}}>
            <MySnackBar open={open} message={message} />
             {children}  
             </SnackBar.Provider>
}

export const useSnackBar = ()=> {
return useContext(SnackBar)
};







