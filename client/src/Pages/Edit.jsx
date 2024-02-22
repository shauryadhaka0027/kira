import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Text, Image } from '@chakra-ui/react';
import axios from 'axios';
import Navbar2 from '../Components/Navbar2';

const Edit = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState([]);
  const [editedProducts, setEditedProducts] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/product/search?_id=${_id}`, { withCredentials: true, mode: 'cors' });
        setProduct(response.data);
        const initialEditedProducts = response.data.map(item => ({ ...item }));
        setEditedProducts(initialEditedProducts);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [_id]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProducts = [...editedProducts];
    updatedProducts[index][name] = value;
    setEditedProducts(updatedProducts);
  };

  const handleSubmit = async (_id) => {
    try {
      const editedProduct = editedProducts.find(item => item._id === _id);
      await axios.patch(`http://localhost:3030/product/update/${_id}`, editedProduct, { withCredentials: true, mode: 'cors' });
      console.log('Product updated successfully');
      navigate("/product")

    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    
    <Box mt={8}>
      {product.map((product, index) => (
        <div key={index}>
          <Text fontSize="2xl" fontWeight="bold">{product.title}</Text>
          <Image src={product.img} alt={product.title} mt={4} boxSize="300px" />
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="desc" value={editedProducts[index].desc} onChange={(e) => handleInputChange(e, index)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Image URL</FormLabel>
            <Input type="text" name="img" value={editedProducts[index].img} onChange={(e) => handleInputChange(e, index)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Input type="number" name="price" value={editedProducts[index].price} onChange={(e) => handleInputChange(e, index)} />
          </FormControl>
          <Button mt={4} colorScheme="blue" onClick={() => handleSubmit(product._id)}>Update</Button>
        </div>
      ))}
    </Box>
  );
};

export default Edit;
