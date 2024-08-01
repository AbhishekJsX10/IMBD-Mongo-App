// help me in the code I am facing the issue that once I login the token is created but when i logout the token still exist in the application tab i observed so check my code 

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

//   const { onOpen, isOpen, onClose } = useDisclosure();

//   const authenticationByMongoDB = useContext(Context)
//   const navigate = useNavigate()
//   const toast = useToast();


//   // logout functionality
//   const handelLogout = async()=>{
    
//     // const api = await axios.get("https://back-entertainment.onrender.com/user/logout") 
//      await axios.get("https://backend-imdb.vercel.app/user/logout",{withCredentials:true}) 
    
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



// import React from 'react'
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Badge,
//   Box,
//   Button,
//   CircularProgress,
//   CircularProgressLabel,
//   Container,
//   Flex,
//   Heading,
//   Image,
//   Spinner,
//   Text,
//   useToast,
// } from "@chakra-ui/react";
// import {
//   fetchCredits,
//   fetchDetails,
//   fetchVideos,
//   imagePath,
//   imagePathOriginal,
// } from "../services/api";
// import {
//   CalendarIcon,
//   CheckCircleIcon,
//   SmallAddIcon,
//   TimeIcon,
// } from "@chakra-ui/icons";
// import {
//   minutesTohours,
//   ratingToPercentage,
//   resolveRatingColor,
// } from "../utils/helpers";
// // import VideoComponent from "../components/VideoComponent";
// // import { useAuth } from "../context/useAuth";
// import axios from "axios";

// const DetailsPage2 = () => {
//     const { type, id } = useParams();
//     const navigate = useNavigate();
//     const toast = useToast();

//     // user by api/user/getMyProfile
//     const [user, setUser] = useState(false)

//     const [details, setDetails] = useState({});
//     const [cast, setCast] = useState([]);
//     const [video, setVideo] = useState(null);
//     const [videos, setVideos] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isInWatchlist, setIsInWatchlist] = useState(false);


//     // data of movie / tvshow
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const [detailsData, creditsData, videosData] = await Promise.all([
//               fetchDetails(type, id),
//               fetchCredits(type, id),
//               fetchVideos(type, id),
//             ]);
    
//             setDetails(detailsData);
//             setCast(creditsData?.cast?.slice(0, 10));
    
//             const trailer = videosData?.results?.find(
//               (video) => video?.type === "Trailer"
//             );
//             setVideo(trailer);
    
//             const otherVideos = videosData?.results
//               ?.filter((video) => video?.type !== "Trailer")
//               ?.slice(0, 10);
//             setVideos(otherVideos);
//           } catch (error) {
//             console.error("Error fetching data:", error);
//           } finally {
//             setLoading(false);
//           }
//         };
    
//         fetchData();
//       }, [type, id]);

//     // check if user exist and check if movie/tvshow exist in user
//     useEffect(()=>{
//         const fetchUser = async()=>{
//             try{
//                 const response = await axios.get("https://backend-imdb.vercel.app/user/getMyProfile",{ withCredentials: true });
//                 if(response.data.success){
//                     console.log(response.data)
//                     setUser(true);
//                 }
//             }catch(error){
//                 console.error("Error fetching user", error)
//             }
//         }

//         const checkWatchlist = async () => {
//             if (!user) {
//                 setIsInWatchlist(false);
//                 return;
//             }
//             try{
//                 const response = await axios.get("https://backend-imdb.vercel.app/bookmarks/all",{ withCredentials: true });
//                 if (response.data.success) {
//                     setIsInWatchlist(response.data.data.includes(id));
//                 }
//             }catch(error){
//                 console.error("Error check watch list", error)
//             }
//         }
//         fetchUser()
//         checkWatchlist();
//     },[id,user])

// const handleSaveToWatchlist = async() =>{
//     try{

//         if(user){
//             const response = await axios.post(https://backend-imdb.vercel.app/bookmarks/add/${id}, null ,{
//               withCredentials: true,
//           })
//             if(response.data.success){
//                 toast({
//                     title: "Added to Watchlist",
//                     description: "Added to your watchlist",
//                     status: "success",
//                     duration: 5000,
//                     isClosable: true,
//                 });
//                 setIsInWatchlist(true);
//             }    
//         }else{
//             toast({
//                 title: "Login to add to watchlist",
//                 status: "error",
//                 isClosable: true,
//               });
//             navigate("/login");
//             return 
//         }
//     }catch(error){
//         console.error("Error adding to watchlist", error)
//         toast({
//             title: "Error",
//             description: "Failed to add show to your watchlist",
//             status: "error",
//             duration: 5000,
//             isClosable: true,
//         });
//     }
// }
// const handleRemoveFromWatchlist = async() =>{
//     try{

//         if(user){
//             const response = await axios.delete(https://backend-imdb.vercel.app/bookmarks/remove/${id},{ withCredentials: true });
//             if(response.data.success){
//                 toast({
//                     title: "deleted from Watchlist",
//                     description: "The show has been deleted from your watchlist",
//                     status: "success",
//                     duration: 5000,
//                     isClosable: true,
//                 });
//                 setIsInWatchlist(false);
//             }    
//         }else{
//             toast({
//                 title: "Login to remove from watchlist",
//                 status: "error",
//                 isClosable: true,
//               });
//             navigate("/login");
//             return 
//         }
//     }catch(error){
//         console.error("Error adding to watchlist", error)
//         toast({
//             title: "Error",
//             description: "Failed to delete the show from your watchlist",
//             status: "error",
//             duration: 5000,
//             isClosable: true,
//         });
//     }
// }


//     if (loading) {
//         return (
//           <Flex justify={"center"} mt={"7rem"}>
//             <Spinner size={"xl"} color="red" />
//           </Flex>
//         );
//     }
    
//     const title = details?.title || details?.name;
//     const releaseDate = type === "tv" ? details?.first_air_date : details?.release_date;
    
//     return (
//         <Box mt={"5rem"}>
//           <Box
//             // Backdrop with gradient overlay
//             background={linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${imagePathOriginal}/${details?.backdrop_path})}
//             backgroundRepeat={"no-repeat"}
//             backgroundSize={"cover"}
//             backgroundPosition={"center"}
//             w={"100%"}
//             h={{ base: "auto", md: "500px" }}
//             py={"2"}
//             zIndex={"-1"}
//             display={"flex"}
//             alignItems={"center"}
//           >
//             <Container maxW={"container.xl"}>
//               <Flex
//                 alignItems={"center"}
//                 gap="10"
//                 flexDirection={{ base: "column", md: "row" }}
//               >
//                 {/* Poster Image */}
//                 <Image
//                   height={"450px"}
//                   borderRadius={"sm"}
//                   src={${imagePath}/${details?.poster_path}}
//                 />
//                 <Box>
//                   {/* Title and Release Date */}
//                   <Heading fontSize={"3xl"}>
//                     {title}{" "}
//                     <Text as="span" fontWeight={"normal"} color={"gray.400"}>
//                       {new Date(releaseDate).getFullYear()}
//                     </Text>
//                   </Heading>
    
//                   {/* Additional Information */}
//                   <Flex alignItems={"center"} gap={"4"} mt={1} mb={5}>
//                     <Flex alignItems={"center"}>
//                       <CalendarIcon mr={2} color={"gray.400"} />
//                       <Text fontSize={"sm"}>
//                         {new Date(releaseDate).toLocaleDateString("en-US")} (US)
//                       </Text>
//                     </Flex>
//                     {type === "movie" && (
//                       <>
//                         <Box>*</Box>
//                         <Flex alignItems={"center"}>
//                           <TimeIcon mr="2" color={"gray.400"} />
//                           <Text fontSize={"sm"}>
//                             {minutesTohours(details?.runtime)}
//                           </Text>
//                         </Flex>
//                       </>
//                     )}
//                   </Flex>
//                   <Flex alignItems={"center"} gap={"4"}>
//                     {/* Rating Display */}
//                     <CircularProgress
//                       value={ratingToPercentage(details?.vote_average)}
//                       bg={"gray.800"}
//                       borderRadius={"full"}
//                       p={"0.5"}
//                       size={"70px"}
//                       color={resolveRatingColor(details?.vote_average)}
//                       thickness={"6px"}
//                     >
//                       <CircularProgressLabel fontSize={"lg"}>
//                         {ratingToPercentage(details?.vote_average)}{" "}
//                         <Box as="span" fontSize={"10px"}>
//                           %
//                         </Box>
//                       </CircularProgressLabel>
//                     </CircularProgress>
//                     <Text display={{ base: "none", md: "initial" }}>
//                       User Score
//                     </Text>
//                     {/* Watchlist Buttons */}
//                     {isInWatchlist ? (
//                       <Button
//                         leftIcon={<CheckCircleIcon />}
//                         colorScheme="green"
//                         variant={"outline"}
//                         onClick={handleRemoveFromWatchlist}
//                       >
//                         In watchlist
//                       </Button>
//                     ) : (
//                       <Button
//                         leftIcon={<SmallAddIcon />}
//                         variant={"outline"}
//                         onClick={handleSaveToWatchlist}
//                       >
//                         Add to watchlist
//                       </Button>
//                     )}
//                   </Flex>
//                   {/* Tagline and Overview */}
//                   <Text
//                     color={"gray.400"}
//                     fontSize={"sm"}
//                     fontStyle={"italic"}
//                     my="5"
//                   >
//                     {details?.tagline}
//                   </Text>
//                   <Box>
//                     <Heading fontSize={"lg"} mb="3">
//                       Overview
//                     </Heading>
//                     <Text fontSize={"sm"}>{details?.overview}</Text>
//                   </Box>
//                 </Box>
//               </Flex>
//             </Container>
//           </Box>
//           <Container maxW={"container.xl"} mt="10">
//             {/* Cast Section */}
//             <Box mt={10}>
//               <Heading fontSize={"2xl"} mb="4">
//                 Top Cast
//               </Heading>
//               <Flex gap={5} overflowX={"auto"} pb="3">
//                 {cast?.map((actor) => (
//                   <Box key={actor?.id} minW={"150px"} maxW={"150px"}>
//                     <Image
//                       src={${imagePath}/${actor?.profile_path}}
//                       mb="2"
//                       borderRadius={"md"}
//                       alt={actor?.name}
//                     />
//                     <Text fontSize={"sm"} fontWeight={"bold"}>
//                       {actor?.name}
//                     </Text>
//                     <Text fontSize={"sm"} color={"gray.400"}>
//                       {actor?.character}
//                     </Text>
//                   </Box>
//                 ))}
//               </Flex>
//             </Box>
//           </Container>
//         </Box>
//       );
// }

// export default DetailsPage2                                                                                                                                                                   backend                                                                                                    router.get('/getMyProfile', isAuthenticated, getMyProfile);import Jwt from "jsonwebtoken";
// import { User } from "../models/usersModel.js";

// export const isAuthenticated = async (req, res, next) => {

//     const {token} = req.cookies; // cookies  = in built things 

//     if (!token) return res.status(404).json({
//         success: false,
//         message: 'Token Not Found, Please Login'
//     })

//     const secretToken = process.env.TOKEN;

//     const decode = Jwt.verify(token, secretToken);
//     req.user = await User.findById(decode._id);

//     next();
// }import bcrypt from "bcrypt";
// import Jwt from "jsonwebtoken";
// import { User } from "../models/usersModel.js";
// import { generateCookie } from "../utils/feature.js";


// export const userRegister = async (req, res) => {

//     const { name, email, password } = req.body;  // destructuring 
//     let user = await User.findOne({ email });  // from mongoDB

//     if (user) return res.status(404).json({
//         success: false,
//         message: "user already exist",
//     })

//     const hashPassword = await bcrypt.hash(password, 10);
//     user = await User.create({
//         name,
//         email,
//         password: hashPassword,  // updating password  with hashpassword 
//     });

//     generateCookie(user, res, 201, "User Register Successfully");

// };



// export const userLogin = async (req, res) => {

//     const { email, password } = req.body;
//     let user = await User.findOne({ email });

//     if (!user) return res.status(400).json({
//         success: false,
//         message: "user do not exist",
//     });

//     // user.password = comming from db 
//     // password      = comming from frontend website 
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid Credential"
//         })
//     }

//     generateCookie(user, res, 201, Welcome ${user.name});

// };




// export const userLogout = (req, res) => {
//     res.status(200).clearCookie("token", {
//         httpOnly: true,
//         sameSite: 'None', // Important for cross-origin requests
//         secure: true,     // Important for cross-origin requests
//     }).json({
//         success: true,
//         message: "Logout successfully"
//     });
// }



// export const getMyProfile = async (req, res) => {
//     res.status(200).json({
//         success: true,
//         user: req.user
//     })
// }


// export const getUserById = async (req, res) => {
//     const id = req.params.id;
//     const user = await User.findById(id);

//     if (!user) return res.status(404).json({
//         success: false,
//         message: "Invalid id, user does not exist "
//     })

//     res.json({
//         success: true,
//         message: "This  is the data of user ",
//         data: user
//     })
// }
// ChatGPT