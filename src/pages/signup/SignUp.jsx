
import React, { useContext, useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Text,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import Context from "../../context/Context.jsx";
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const authenticationByMongoDB = useContext(Context);
  
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = await axios.post("https://backend-imdb.vercel.app/user/register", { name: username, email, password });
      // console.log(api);

      toast({
        title: api.data.message || "Registered successfully",
        status: "success",
        isClosable: true,
      });

      // authenticationByMongoDB.setIsAuthenticated(true);
      // authenticationByMongoDB.setUserSignOut(false)
      // console.log("user Signout register",authenticationByMongoDB.userSignOut)
      setTimeout(() => { navigate("/login"); }, 3000);

    } catch (error) {
      console.error(error);

      toast({
        title: error.response?.data?.message || "Sign-up failed",
        status: "error",
        isClosable: true,
      });

      authenticationByMongoDB.setIsAuthenticated(false);
    }
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <Flex
          flexDirection="column"
          bg="rgba(15, 15, 15, 0.95)"
          p={12}
          borderRadius={8}
          boxShadow="lg"
        >
          <Heading mb={6}>IMDB Sign-Up</Heading>
          <Input
            placeholder="Username"
            type="text"
            variant="filled"
            mb={3}
            onChange={(e) => setUserName(e.target.value)} value={username}
            id="username" name="username"
          />
          <Input
            placeholder="Email"
            type="email"
            variant="filled"
            mb={3}
            onChange={(e) => setEmail(e.target.value)} value={email}
            id="email" name="email"
          />
          <Input
            placeholder="Password"
            type="password"
            variant="filled"
            mb={6}
            onChange={(e) => setPassword(e.target.value)} value={password}
            id="password" name="password"
          />
          <Button colorScheme="teal" type="submit" mb={8}>
            Sign up
          </Button>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="dark_mode" mb="0">
              <span>Already have an account? </span>
              <Link to="/login">
                <Text as="span" color="teal.100">
                  Log-In
                </Text>
              </Link>
            </FormLabel>
          </FormControl>
        </Flex>
      </form>
    </Flex>
  );
};

export default SignUp;
