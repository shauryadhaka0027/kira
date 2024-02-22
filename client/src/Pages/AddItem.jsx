import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Textarea, Button, Text } from '@chakra-ui/react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import Navbar2 from "../Components/Navbar2"

const AddItem = () => {
  const [product, setProduct] = useState({ title: "", desc: "", img: "", price: "" });
  const [message, setMessage] = useState('');
  const navigate=useNavigate()

  const handleUserChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (product.title && product.img && product.price && product.desc) {
      try {
        const response = await axios.post('http://localhost:3030/product/create', product, { withCredentials: true, mode: 'cors' });
        if (response.status === 200) {
          navigate("/product");
        }
        console.log(response)
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error:', error);
        setMessage('Failed to add item. Please try again.');
      }
      setProduct({ title: '', desc: '', img: '', price: '' });
    } else {
      setMessage('Please fill all the fields');
    }
  };

  return (
    <div>
      <Navbar2/>
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <FormControl id="title" isRequired>
          <FormLabel>Title</FormLabel>
          <Input type="text" placeholder="Enter the title" name='title' value={product.title} onChange={handleUserChange} />
        </FormControl>

        <FormControl id="description" mt={4} isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea placeholder="Enter the description" name='desc' value={product.desc} onChange={handleUserChange} />
        </FormControl>

        <FormControl id="image" mt={4} isRequired>
          <FormLabel>Image URL</FormLabel>
          <Input type="text" placeholder="Enter the image URL" name='img' value={product.img} onChange={handleUserChange} />
        </FormControl>

        <FormControl id="price" mt={4} isRequired>
          <FormLabel>Price</FormLabel>
          <Input type="number" placeholder="Enter the price" name='price' value={product.price} onChange={handleUserChange} />
        </FormControl>

        <Button mt={6} colorScheme="teal" type="submit">
          Add Item
        </Button>
      </form>
      <Text>{message}</Text>
    </Box>
    </div>
  );
};

export default AddItem;
