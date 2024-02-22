import React from 'react'
import { Box, Flex, Button } from '@chakra-ui/react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Navbar2 = () => {
  const navigate=useNavigate()
  const logout=async()=>{
   try {
    await axios.get("http://localhost:3030/logout")
    navigate("/")
   } catch (error) {
    console.log(error)
   }
  }
    
  
  return (
    <Box bg="teal.500" color="white" py={4}>
    <Flex maxW="container.xl" mx="auto" justify="space-between" align="center">
      <Box>
        
        Products
      </Box>
      <Flex>
        <Button variant="outline" color="white"  mr={4} ><Link to="/addItem">AddItem</Link></Button>
        <Button variant="outline" color="white" onClick={logout} >Logout</Button>
      </Flex>
    </Flex>
  </Box>
  )
}

export default Navbar2
