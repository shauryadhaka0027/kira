import React, { createContext, useState } from 'react'
export const ContextApi=createContext()
const ContextApiProvider = ({children}) => {
  const[isAuth,setIsAuth]=useState(false);
  const[email,setEmail]=useState("")
 
  
  return (
    <ContextApi.Provider value={{setIsAuth,isAuth,email,setEmail}}>
      {children}
    </ContextApi.Provider>
  )
}

export default ContextApiProvider