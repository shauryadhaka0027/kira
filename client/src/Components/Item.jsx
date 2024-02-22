import React, { useEffect, useState, useContext } from 'react';
import { List, ListItem, ListIcon, Button, Flex, Image, Text } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ContextApi } from '../ContextApi/ContextApiProvider';

const Item = () => {
  const [datas, setData] = useState([]);
  const [user, setUser] = useState({});

  const { email } = useContext(ContextApi);

  console.log("email", email);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        
        const response =await axios.get("http://localhost:3030/product", { withCredentials: true });
        
        const res =await  axios.get(`http://localhost:3030/user/search?email=${email}`, { withCredentials: true ,mode:'cors'});
        setUser(res.data.msg[0]);
        console.log("user", res.data.msg[0])
        console.log("data", datas);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [email]); 

  const handleDelete = async (UserId) => {
    try {
       
      if (user._id === UserId) {
        alert("Are you sure to delte this item")
        await axios.delete(`http://localhost:3030/product/delete/${UserId}`, {
          withCredentials: true 
        });
        const newData = data.filter(item => item.UserId !== UserId);
        setData(newData);
        console.log(`Item with UserId ${UserId} deleted successfully`);
      } else {
        alert("You Do not delete this item");
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = async (UserId) => {
    try {
      if (user._id === UserId) {
        alert("Are You sure To edit this item ");
      } else {
        alert("You do not edit this Item ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <List mt={4}>
      {datas.map((item, index) => (
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
            <Button onClick={() => handleEdit(item.UserId)} ml="auto" mr={2} leftIcon={<EditIcon />} colorScheme="blue">
              <Link to={`/edit/${item._id}`}>Edit</Link>
            </Button>
            <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={() => handleDelete(item.UserId)}>Delete</Button>
          </Flex>
        </ListItem>
      ))}
    </List>
  );
};

export default Item;
