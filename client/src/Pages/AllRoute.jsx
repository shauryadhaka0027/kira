import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import SignUp from './SignUp'
import Login from './Login'
import Products from './Products'
import AddItem from './AddItem'
import Edit from './Edit'

const AllRoute = () => {
  return (
    <>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path='/login'  element={<Login/>}/> 
    <Route path='/product' element={<Products/>}     />
    <Route path='/addItem' element={<AddItem/>}    />
    <Route path='/edit/:UserId' element={<Edit/>}   />


    </Routes>
    
    
    </>
  )
}

export default AllRoute
