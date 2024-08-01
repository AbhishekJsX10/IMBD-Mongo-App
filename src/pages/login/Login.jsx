
import React, { useContext, useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import Context from "../../context/Context.jsx"
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();
  const toast = useToast();
  const authenticationByMongoDB = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = await axios.post(`https://backend-imdb.vercel.app/user/login`, {
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
  
      console.log(api);
  
      toast({
        title: "Login successful",
        status: "success",
        isClosable: true,
      });
  
      authenticationByMongoDB.setIsAuthenticated(true);
      setTimeout(() => { navigate("/") }, 3000);
    } catch (error) {
      console.error(error);
      toast({
        title: "Login failed invalid credentials",
        status: "error",
        isClosable: true,
      });
  
      authenticationByMongoDB.setIsAuthenticated(false);
    }
  }

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <form onSubmit={handelSubmit}>
        <Flex
          flexDirection="column"
          bg="rgba(15, 15, 15, 0.95)"
          p={12}
          borderRadius={8}
          boxShadow="lg"
        >
          <Heading mb={6}>IMDB Log-In</Heading>
          <Input
            placeholder="test@gmail.com"
            type="email"
            variant="filled"
            mb={3}
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
            id="email" 
            name="email"
          />
          <Input
            placeholder="**********"
            type="password"
            variant="filled"
            mb={6}
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
            id="password" 
            name="password"
          />
          <Button type="submit" colorScheme="teal" mb={8}>
            Log In
          </Button>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="dark_mode" mb="0">
              <span>Don't have an account ? </span>
              <Link to="/signup">
                <Text as="span" color="teal.100">
                  Sign-Up
                </Text>
              </Link>
            </FormLabel>
          </FormControl>
        </Flex>
      </form>
    </Flex>
  );
};

export default Login;
