import { useState } from "react";
export default function SuccessAndErrorMsg({stateSuccessAndErrorMsg}){
  return (
    <h2 className={`${stateSuccessAndErrorMsg['style'][stateSuccessAndErrorMsg.msgType]} ${stateSuccessAndErrorMsg.displayNone}`}>
      <span className="font-semibold">{stateSuccessAndErrorMsg.msgType}: </span>
      <span>{stateSuccessAndErrorMsg.msg}</span>
    </h2>
  );
}

export function showError(error, updateStateSuccessAndErrorMsg){
  // //console.log('hi', updateStateSuccessAndErrorMsg);
  updateStateSuccessAndErrorMsg(previousState=>{
    return {
      ...previousState,
      msgType: 'Error',
      msg : error, 
      displayNone: ''
    }
  });
}
export function hideError(updateStateSuccessAndErrorMsg){
  updateStateSuccessAndErrorMsg(previousState=>{
    return {
      ...previousState,
      displayNone: 'displayNone'
    }
  });
}  

export function useStateSuccessAndErrorMsg(){  
  let [stateSuccessAndErrorMsg, updateStateSuccessAndErrorMsg] = useState({
    style: {
      Success: "text-green-300 text-[1.5rem]",
      Error: "text-red-300 text-[1.5rem]"
    },
    msgType: "Success",
    msg: "",
    displayNone: 'displayNone'        
  
  });

  return [stateSuccessAndErrorMsg, updateStateSuccessAndErrorMsg];
}  

