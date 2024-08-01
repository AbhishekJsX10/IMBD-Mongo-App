
// Chakra UI designed footer section component
// This component provides the footer layout with social media links, navigation, and contact information

// imports
import React from "react";
import { Box, Flex, Text, VStack, HStack, Link as ChakraLink } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => (
  <Box w="full" bg="#212121" color="white" mt={"7rem"}>
    {/* Container for the footer content */}
    <Flex
      direction={{ base: "column", md: "row" }}
      wrap="wrap"
      px={5}
      py={16}
      mx="auto"
      gap={{ base: "0rem", md: "3rem" }}
      align={{ base: "center", md: "flex-start" }}
    >
      {/* Left section of the footer with logo and social media links */}
      <Box flexShrink={0} textAlign={{ base: "center", md: "left" }} mx="auto" mb={{ base: 4, md: 0 }}>
        {/* Footer logo */}
        <Box className="footer-logo">
          <svg id="home_img" className="ipc-logo" xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32" version="1.1">
            <g fill="#F5C518">
              <rect x="0" y="0" width="100%" height="100%" rx="4"></rect>
            </g>
            <g transform="translate(8.000000, 7.000000)" fill="#000000" fillRule="nonzero">
              <polygon points="0 18 5 18 5 0 0 0"></polygon>
              <path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path>
              <path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path>
              <path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path>
            </g>
          </svg>
        </Box>
        
        {/* Social media icons */}
        <Box mt={4}>
          <HStack justify={{ base: "center", sm: "flex-start" }} spacing={3}>
            <ChakraLink href="/" isExternal>
              <FaFacebook className="text-gray-500 cursor-pointer hover:text-blue" size="20px" />
            </ChakraLink>
            <ChakraLink href="/" isExternal>
              <FaTwitter className="text-gray-500 cursor-pointer hover:text-gray-700" size="20px" />
            </ChakraLink>
            <ChakraLink href="/" isExternal>
              <FaInstagram className="text-gray-500 cursor-pointer hover:text-gray-700" size="20px" />
            </ChakraLink>
            <ChakraLink href="/" isExternal>
              <FaLinkedin className="text-gray-500 cursor-pointer hover:text-gray-700" size="20px" />
            </ChakraLink>
            <ChakraLink href="/" isExternal>
              <FaGithub className="text-gray-500 cursor-pointer hover:text-gray-700" size="20px" />
            </ChakraLink>
          </HStack>
        </Box>
      </Box>

      {/* Navigation sections */}
      <Flex direction="row" wrap="wrap" flex="1" mt={{ base: 10, md: 0 }} textAlign={{ base: "center", md: "left" }}>
        {/* About section */}
        <Box px={4} w={{ base: "full", md: "50%", lg: "25%" }} mb={10}>
          <Text mb={3} textTransform="uppercase" fontWeight="medium" color="#878787">
            About
          </Text>
          <VStack as="nav" align="stretch">
            <ChakraLink as={Link} to="/" className="hover:underline" _hover={{ textDecoration: "underline" }}>
              Company
            </ChakraLink>
            <ChakraLink as={Link} to="/" className="hover:underline" _hover={{ textDecoration: "underline" }}>
              Careers
            </ChakraLink>
            <ChakraLink as={Link} to="/" className="hover:underline" _hover={{ textDecoration: "underline" }}>
              Blog
            </ChakraLink>
          </VStack>
        </Box>

        {/* Support section */}
        <Box px={4} w={{ base: "full", md: "50%", lg: "25%" }} mb={10}>
          <Text mb={3} textTransform="uppercase" fontWeight="medium" color="#878787">
            Support
          </Text>
          <VStack as="nav" align="stretch">
            <ChakraLink as={Link} to="/" className="hover:underline" _hover={{ textDecoration: "underline" }}>
              Contact Support
            </ChakraLink>
            <ChakraLink as={Link} to="/" className="hover:underline" _hover={{ textDecoration: "underline" }}>
              Help Resources
            </ChakraLink>
            <ChakraLink as={Link} to="/" className="hover:underline" _hover={{ textDecoration: "underline" }}>
              Release Updates
            </ChakraLink>
          </VStack>
        </Box>

        {/* Platform section */}
        <Box px={4} w={{ base: "full", md: "50%", lg: "25%" }} mb={10}>
          <Text mb={3} textTransform="uppercase" fontWeight="medium" color="#878787">
            Platform
          </Text>
          <VStack as="nav" align="stretch">
            <ChakraLink as={Link} to="/" className="hover:underline" _hover={{ textDecoration: "underline" }}>
              Terms &amp; Privacy
            </ChakraLink>
            <ChakraLink as={Link} to="/" className="hover:underline" _hover={{ textDecoration: "underline" }}>
              Pricing
            </ChakraLink>
            <ChakraLink as={Link} to="/" className="hover:underline" _hover={{ textDecoration: "underline" }}>
              FAQ
            </ChakraLink>
          </VStack>
        </Box>

        {/* Contact section */}
        <Box px={4} w={{ base: "full", md: "50%", lg: "25%" }} mb={10}>
          <Text mb={3} textTransform="uppercase" fontWeight="medium" color="#878787">
            Contact
          </Text>
          <VStack as="nav" align="stretch">
            <ChakraLink as={Link} to="/" className="hover:underline" _hover={{ textDecoration: "underline" }}>
              Send a Message
            </ChakraLink>
            <ChakraLink as={Link} to="/" className="hover:underline" _hover={{ textDecoration: "underline" }}>
              Request a Quote
            </ChakraLink>
            <ChakraLink as={Link} to="/" className="hover:underline" _hover={{ textDecoration: "underline" }}>
              1860-200-9898
            </ChakraLink>
          </VStack>
        </Box>
      </Flex>
    </Flex>

    {/* Copyright notice */}
    <Box px={5} pb={5} mx="auto" textAlign="center">
      <ChakraLink as={Link} to="/">
        <Text textTransform="capitalize" color="gray.200">
          © {new Date().getFullYear()} All rights reserved
        </Text>
      </ChakraLink>
    </Box>
  </Box>
);

export default Footer;
