

// ///////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////            old code      ////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////



// The sticky Navbar component having left and right sections
// Left section contains the logo
// Right section contains navigation links and a Google login button with the logged-in user info

// // imports
// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   Drawer,
//   DrawerBody,
//   DrawerCloseButton,
//   DrawerContent,
//   DrawerHeader,
//   DrawerOverlay,
//   Flex,
//   IconButton,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/useAuth";
// import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

// const Navbar = () => {
//   // Get user authentication status and methods from context
//   const { user, signInWithGoogle, logout } = useAuth();
//   // Control the state of the drawer (for mobile view)
//   const { onOpen, isOpen, onClose } = useDisclosure();

//   // Handle Google login action
//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithGoogle();
//       console.log("success");
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   return (
//     // Navbar container with fixed position
//     <Box py="4" mb="2" position={"fixed"} top={"2"} mx={"auto"} width={"100vw"} zIndex={"99"}>
//       <Container maxW={"container.xl"}>
//         <Flex justifyContent={"space-between"}>
//           {/* Logo part */}
//           <Link to="/">
//             <svg id="home_img" className="ipc-logo" xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32" version="1.1"><g fill="#F5C518"><rect x="0" y="0" width="100%" height="100%" rx="4"></rect></g><g transform="translate(8.000000, 7.000000)" fill="#000000" fillRule="nonzero"><polygon points="0 18 5 18 5 0 0 0"></polygon><path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path><path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path><path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path></g></svg>
//           </Link>

//           {/* DESKTOP - screen size layout of Navbar */}
//           <Flex
//             gap="4"
//             alignItems={"center"}
//             display={{ base: "none", md: "flex" }}
//           >
//             {/* Navigation links */}
//             <Link to="/">Home</Link>
//             <Link to="/movies">Movies</Link>
//             <Link to="/shows">TV Shows</Link>
//             <Link to="/search">
//               <SearchIcon fontSize={"xl"} />
//             </Link>
//             {/* Authentication handled */}
//             {user && (
//               <Menu>
//                 <MenuButton>
//                   <Avatar
//                     bg={"red.500"}
//                     color={"white"}
//                     size={"sm"}
//                     name={user?.email}
//                   />
//                 </MenuButton>
//                 <MenuList>
//                   <Link to="/watchlist">
//                     <MenuItem>Watchlist</MenuItem>
//                   </Link>
//                   <MenuItem onClick={logout}>Logout</MenuItem>
//                 </MenuList>
//               </Menu>
//             )}
//             {!user && (
//               <Avatar
//                 size={"sm"}
//                 bg={"gray.800"}
//                 as="button"
//                 onClick={handleGoogleLogin}
//               />
//             )}
//           </Flex>

//           {/* Mobile - screen size Navbar design */}
//           <Flex
//             display={{ base: "flex", md: "none" }}
//             alignItems={"center"}
//             gap="4"
//           >
//             <Link to="/search">
//               <SearchIcon fontSize={"xl"} />
//             </Link>
//             <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
//             <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
//               <DrawerOverlay />
//               <DrawerContent bg={"black"}>
//                 <DrawerCloseButton />
//                 <DrawerHeader>
//                   {user ? (
//                     <Flex alignItems="center" gap="2">
//                       <Avatar bg="red.500" size={"sm"} name={user?.email} />
//                       <Box fontSize={"sm"}>
//                         {user?.displayName || user?.email}
//                       </Box>
//                     </Flex>
//                   ) : (
//                     <Avatar
//                       size={"sm"}
//                       bg="gray.800"
//                       as="button"
//                       onClick={handleGoogleLogin}
//                     />
//                   )}
//                 </DrawerHeader>

//                 <DrawerBody>
//                   <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
//                     <Link to="/">Home</Link>
//                     <Link to="/movies">Movies</Link>
//                     <Link to="/shows">TV Shows</Link>
//                     {user && (
//                       <>
//                         <Link to="/watchlist">Watchlist</Link>
//                         <Button
//                           variant={"outline"}
//                           colorScheme="red"
//                           onClick={logout}
//                         >
//                           Logout
//                         </Button>
//                       </>
//                     )}
//                   </Flex>
//                 </DrawerBody>
//               </DrawerContent>
//             </Drawer>
//           </Flex>
//         </Flex>
//       </Container>
//     </Box>
//   );
// };

// export default Navbar;


// ///////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////            New code      ////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////




// // imports
// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   Drawer,
//   DrawerBody,
//   DrawerCloseButton,
//   DrawerContent,
//   DrawerHeader,
//   DrawerOverlay,
//   Flex,
//   IconButton,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   useDisclosure,
//   useToast,
// } from "@chakra-ui/react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/useAuth";
// import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
// import { useContext } from "react";

// import Context from "../context/Context.jsx"
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const Navbar = () => {
//   // Get user authentication status and methods from context
//   // const { user, signInWithGoogle, logout } = useAuth();
//   // Control the state of the drawer (for mobile view)
//   const { onOpen, isOpen, onClose } = useDisclosure();

//   // Handle Google login action
//   // const handleGoogleLogin = async () => {
//   //   try {
//   //     await signInWithGoogle();
//   //     console.log("success");
//   //   } catch (error) {
//   //     console.log("error", error);
//   //   }
//   // };

//   const authenticationByMongoDB = useContext(Context)
//   const navigate = useNavigate()
//   const toast = useToast();


//   // logout functionality
//   const handelLogout = async()=>{
    
//     // const api = await axios.get("https://back-entertainment.onrender.com/user/logout") 
//      await axios.get("https://backend-imdb.vercel.app/user/logout",{withCredentials:true}) 
//     // console.log(api)
//     // toast.success(`${api.data.message}`, {
//     //   position: "top-center",
//     //   autoClose: 5000,
//     //   hideProgressBar: false,
//     //   closeOnClick: true,
//     //   pauseOnHover: true,
//     //   draggable: true,
//     //   progress: undefined,
//     //   theme: "dark",
//     //   });
//     toast({
//       title: "Logout successful",
//       status: "success",
//       isClosable: true,
//     });
//     authenticationByMongoDB.setIsAuthenticated(false)
//     Cookies.remove('token');
//     setTimeout(()=>{navigate("/login")},1000)


//   }



//   return (
//     // Navbar container with fixed position
//     <Box py="4" mb="2" position={"fixed"} top={"2"} mx={"auto"} width={"100vw"} zIndex={"99"}>
//       <Container maxW={"container.xl"}>
//         <Flex justifyContent={"space-between"}>
//           {/* Logo part */}
//           <Link to="/">
//             <svg id="home_img" className="ipc-logo" xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32" version="1.1"><g fill="#F5C518"><rect x="0" y="0" width="100%" height="100%" rx="4"></rect></g><g transform="translate(8.000000, 7.000000)" fill="#000000" fillRule="nonzero"><polygon points="0 18 5 18 5 0 0 0"></polygon><path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path><path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path><path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path></g></svg>
//           </Link>

//           {/* DESKTOP - screen size layout of Navbar */}
//           <Flex
//             gap="4"
//             alignItems={"center"}
//             display={{ base: "none", md: "flex" }}
//           >
//             {/* Navigation links */}
//             <Link to="/">Home</Link>
//             <Link to="/movies">Movies</Link>
//             <Link to="/shows">TV Shows</Link>
//             <Link to="/search">
//               <SearchIcon fontSize={"xl"} />
//             </Link>
//             {/* Authentication handled */}
//             {authenticationByMongoDB.isAuthenticated && (
//               <Menu>
//                 <MenuButton>
//                   <Avatar
//                     bg={"red.500"}
//                     color={"white"}
//                     size={"sm"}
//                     name="LOG-U"
//                   />
//                 </MenuButton>
//                 <MenuList>
//                   <Link to="/mongo-watchlist">
//                     <MenuItem>Watchlist</MenuItem>
//                   </Link>
//                   <MenuItem onClick={()=>handelLogout()}>Logout</MenuItem>
//                 </MenuList>
//               </Menu>
//             )}
//             {!authenticationByMongoDB.isAuthenticated && (
//               <Avatar
//                 size={"sm"}
//                 bg={"gray.800"}
//                 as="button"
//                 onClick={()=>navigate("/login")}
//               />
//             )}
//           </Flex>

//           {/* Mobile - screen size Navbar design */}
//           <Flex
//             display={{ base: "flex", md: "none" }}
//             alignItems={"center"}
//             gap="4"
//           >
//             <Link to="/search">
//               <SearchIcon fontSize={"xl"} />
//             </Link>
//             <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
//             <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
//               <DrawerOverlay />
//               <DrawerContent bg={"black"}>
//                 <DrawerCloseButton />
//                 <DrawerHeader>
//                   {authenticationByMongoDB.isAuthenticated ? (
//                     <Flex alignItems="center" gap="2">
//                       <Avatar bg="red.500" size={"sm"} name="LOG-U" />
//                       {/* <Box fontSize={"sm"}>
//                         {user?.displayName || user?.email}
//                       </Box> */}
//                     </Flex>
//                   ) : (
//                     <Avatar
//                       size={"sm"}
//                       bg="gray.800"
//                       as="button"
//                       onClick={()=>navigate("/login")}
//                     />
//                   )}
//                 </DrawerHeader>

//                 <DrawerBody>
//                   <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
//                     <Link to="/">Home</Link>
//                     <Link to="/movies">Movies</Link>
//                     <Link to="/shows">TV Shows</Link>
//                     {authenticationByMongoDB.isAuthenticated && (
//                       <>
//                         <Link to="/mongo-watchlist">Watchlist</Link>
//                         <Button
//                           variant={"outline"}
//                           colorScheme="red"
//                           onClick={()=>handelLogout()}
//                         >
//                           Logout
//                         </Button>
//                       </>
//                     )}
//                   </Flex>
//                 </DrawerBody>
//               </DrawerContent>
//             </Drawer>
//           </Flex>
//         </Flex>
//       </Container>
//     </Box>
//   );
// };

// export default Navbar;









import React, { useContext } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import Context from "../context/Context.jsx";
import axios from 'axios';
// import {Cookies} from 'js-cookie';

const Navbar = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const authenticationByMongoDB = useContext(Context);
  const navigate = useNavigate();
  const toast = useToast();

  // logout functionality
  const handleLogout = async () => {
    try {
      await axios.get("https://backend-imdb.vercel.app/user/logout", null ,{ withCredentials: true });
      toast({
        title: "Logout successful",
        status: "success",
        isClosable: true,
      });
      authenticationByMongoDB.setIsAuthenticated(false);
      await Cookies.remove('token').then(()=>console.log("token deleted")); // Remove the token cookie

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Error during logout", error);
      toast({
        title: "Logout failed",
        status: "error",
        isClosable: true,
      });
    }
  }

  return (
    <Box py="4" mb="2" position={"fixed"} top={"2"} mx={"auto"} width={"100vw"} zIndex={"99"}>
      <Container maxW={"container.xl"}>
        <Flex justifyContent={"space-between"}>
          <Link to="/">
            <svg id="home_img" className="ipc-logo" xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32" version="1.1"><g fill="#F5C518"><rect x="0" y="0" width="100%" height="100%" rx="4"></rect></g><g transform="translate(8.000000, 7.000000)" fill="#000000" fillRule="nonzero"><polygon points="0 18 5 18 5 0 0 0"></polygon><path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path><path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path><path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path></g></svg>
          </Link>

          <Flex
            gap="4"
            alignItems={"center"}
            display={{ base: "none", md: "flex" }}
          >
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/shows">TV Shows</Link>
            <Link to="/search">
              <SearchIcon fontSize={"xl"} />
            </Link>
            {authenticationByMongoDB.isAuthenticated && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={"red.500"}
                    color={"white"}
                    size={"sm"}
                    name="LOG-U"
                  />
                </MenuButton>
                <MenuList>
                  <Link to="/mongo-watchlist">
                    <MenuItem>Watchlist</MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
            {!authenticationByMongoDB.isAuthenticated && (
              <Avatar
                size={"sm"}
                bg={"gray.800"}
                as="button"
                onClick={() => navigate("/login")}
              />
            )}
          </Flex>

          <Flex
            display={{ base: "flex", md: "none" }}
            alignItems={"center"}
            gap="4"
          >
            <Link to="/search">
              <SearchIcon fontSize={"xl"} />
            </Link>
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              variant="ghost"
              onClick={onOpen}
            />
            {/* Drawer containing navigation links */}
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>IMDB</DrawerHeader>
                <DrawerBody>
                  <Flex direction="column" gap="4">
                    <Link to="/" onClick={onClose}>Home</Link>
                    <Link to="/movies" onClick={onClose}>Movies</Link>
                    <Link to="/shows" onClick={onClose}>TV Shows</Link>
                    {authenticationByMongoDB.isAuthenticated && (
                      <MenuItem>
                        <Link to="/mongo-watchlist" onClick={onClose}>Watchlist</Link>
                        <Button onClick={handleLogout}>Logout</Button>
                      </MenuItem>
                    )}
                    {!authenticationByMongoDB.isAuthenticated && (
                      <Avatar
                        size={"sm"}
                        bg={"gray.800"}
                        as="button"
                        onClick={() => {
                          navigate("/login");
                          onClose();
                        }}
                      />
                    )}
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;


