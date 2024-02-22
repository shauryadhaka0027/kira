import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const SignUp = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", password: "", userName: "" });

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user.email && user.password && user.userName) {
            try {
                const response = await axios.post("http://localhost:3030/user/signup", user, { mode: 'cors' });
                console.log(response.data); 
                alert("User registered successfully");
                if (response.status === 200) {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error registering user:", error);
                alert("Failed to register user. Please try again.");
            }
            setUser({ email: "", password: "", userName: "" });
        } else {
            alert('Please fill the form');
        }
    }

    return (
        <div>
            <Navbar/>
        <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
            <form onSubmit={handleSubmit}>
                <FormControl id="username" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" placeholder="Enter your name" name='userName' value={user.userName} onChange={handleUserChange} />
                </FormControl>

                <FormControl id="password" mt={4} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="Enter your password" name='password' value={user.password} onChange={handleUserChange} />
                </FormControl>

                <FormControl id="email" mt={4} isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="Enter your email" name='email' value={user.email} onChange={handleUserChange} />
                </FormControl>

                <Button mt={6} colorScheme="blue" type="submit">
                    Sign Up
                </Button>
            </form>
        </Box>
        </div>
    );
}

export default SignUp;
