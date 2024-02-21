import React from 'react'
import { Flex, Box, Button,Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div>
       <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bg="black"
      color="white"
    >
      <Box>
       <h3>Homepage</h3>
       
      </Box>
      <Flex align="center">
        <Button colorScheme="white" mr={4} variant="outline">
          <Link to="/login">Login</Link>
        </Button>
        <Button colorScheme="white" variant="outline">
          <Link to="/signup">SignUp</Link>
        </Button>
      </Flex>
    </Flex>
    <Box textAlign="center" mt={12}>
      <Text fontSize="lg" fontWeight="bold">Welcome to Home Page</Text>
      <Text mt={4}>Please log in or sign up to continue.</Text>
   
      </Box>
    </div>
  )
}

export default Navbar
