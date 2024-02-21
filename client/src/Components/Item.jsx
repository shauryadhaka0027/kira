import React, { useEffect, useState } from 'react';
import { List, ListItem, ListIcon, Button, Flex, Image, Text } from '@chakra-ui/react';
import {  EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Item = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3030/product",{ withCredentials: true });
        setData(response.data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:3030/product/delete/${_id}`,{ withCredentials: true });
    
      const newData = data.filter(item => item._id._id !== _id._id); 
      setData(newData);
      console.log(`Item with ID ${_id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  
  

  return (
    <List mt={4}>
    {data.map((item, index) => (
      <ListItem
        key={index}
        mb={4}
        p={4}
        borderRadius="md"
        boxShadow="md"
      >
        <Flex align="center">
          <Image src={item.img} boxSize="300px" objectFit="cover" mr={4} />
          <Flex direction="column">
            <Text m={5} fontSize="xl" fontWeight="bold">{item.title}</Text>
            <Text m={5}>{item.desc}</Text>
            <Text m={5} fontWeight="bold">Price: ${item.price}</Text>
          </Flex>
          <Button ml="auto" mr={2} leftIcon={<EditIcon />} colorScheme="blue"><Link to={`/edit/${item.UserId}`} >Edit</Link></Button>
          <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={() => handleDelete(item._id)}>Delete</Button>
        </Flex>
      </ListItem>
    ))}
  </List>
  );
};

export default Item;
