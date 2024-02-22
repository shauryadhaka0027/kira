import React, { useState ,useContext} from 'react'

import { Box, FormControl, FormLabel, Input, Button ,Text} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { ContextApi } from '../ContextApi/ContextApiProvider';
import Navbar from '../Components/Navbar';

const Login = () => {
  const[user,setUser]=useState({email:"",password:""})
  const { isAuth, setIsAuth ,email,setEmail} = useContext(ContextApi);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 
  const handleUserChange=(e)=>{
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
}

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (user.email && user.password) {
            try {
              const response = await axios.post('http://localhost:3030/user/login', user,{withCredentials:true,mode:'cors'});
              setEmail(user.email)
              if(response.status === 200){
                 navigate("/product"); 
              }
              console.log(response)
              setMessage(response.data.message); 
            } catch (error) {
              console.error('Login error:', error);
              setMessage('Failed to login. Please try again.');
            }
            setUser({ email: '', password: '' });
          } else {
            setMessage('Please fill the form');
          }
    
      }
  return (
    <div>
      <Navbar/>
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
    <form onSubmit={handleSubmit}>
    <FormControl id="email" mt={4} isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Enter your email"  name='email' value={user.email}
                        onChange={handleUserChange}    />
      </FormControl>
  

      <FormControl id="password" mt={4} isRequired>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder="Enter your password"   name='password' value={user.password}
                        onChange={handleUserChange} />
      </FormControl>

 

      <Button mt={6} colorScheme="blue" type="submit">
        Login
      </Button>
    </form>
    <Text>{message}</Text>
  </Box>
  </div>
  )
}

export default Login
