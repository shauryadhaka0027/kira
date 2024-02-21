import React from 'react'
import { Box, Flex, Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";

const Navbar2 = () => {
  return (
    <Box bg="teal.500" color="white" py={4}>
    <Flex maxW="container.xl" mx="auto" justify="space-between" align="center">
      <Box>
        
        Products
      </Box>
      <Flex>
        <Button variant="outline" color="white"  mr={4} ><Link to="/addItem">AddItem</Link></Button>
        <Button variant="outline" color="white" >Logout</Button>
      </Flex>
    </Flex>
  </Box>
  )
}

export default Navbar2
