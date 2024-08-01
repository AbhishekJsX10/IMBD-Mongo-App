

// // details Page it displays Singular tvShow/movies 

// // imports
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
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
// import VideoComponent from "../components/VideoComponent";
// import { useAuth } from "../context/useAuth";
// import { useFirestore } from "../services/firestore";

// const DetailsPage = () => {
//   // Retrieve type (movie/tv) and id from URL parameters
//   const router = useParams();
//   const { type, id } = router;

//   // Auth and Firestore hooks for handling watchlist operations
//   const { user } = useAuth();
//   const { addToWatchlist, checkIfInWatchlist, removeFromWatchlist } =
//     useFirestore();
//   const toast = useToast();

//   // State variables
//   const [details, setDetails] = useState({}); // Detailed information about the movie/TV show
//   const [cast, setCast] = useState([]); // Cast information
//   const [video, setVideo] = useState(null); // Main trailer video
//   const [videos, setVideos] = useState([]); // Other related videos
//   const [loading, setLoading] = useState(true); // Loading state
//   const [isInWatchlist, setIsInWatchlist] = useState(false); // Watchlist status

//   // Fetch details, cast, and videos on component mount or when type/id changes
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch data in parallel using Promise.all
//         const [detailsData, creditsData, videosData] = await Promise.all([
//           fetchDetails(type, id), // Fetch detailed info
//           fetchCredits(type, id), // Fetch cast info
//           fetchVideos(type, id), // Fetch video info
//         ]);

//         // Update state with fetched data
//         setDetails(detailsData);
//         setCast(creditsData?.cast?.slice(0, 10)); // Limit to the first 10 cast members

//         // Find and set the trailer video
//         const video = videosData?.results?.find(
//           (video) => video?.type === "Trailer"
//         );
//         setVideo(video);

//         // Filter out non-trailer videos and limit to the first 10
//         const videos = videosData?.results
//           ?.filter((video) => video?.type !== "Trailer")
//           ?.slice(0, 10);
//         setVideos(videos);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false); // Data fetching complete
//       }
//     };

//     fetchData();
//   }, [type, id]); // Re-fetch data if type or id changes

//   // Add to watchlist functionality
//   const handleSaveToWatchlist = async () => {
//     if (!user) {
//       // Notify user to log in if not authenticated
//       toast({
//         title: "Login to add to watchlist",
//         status: "error",
//         isClosable: true,
//       });
//       return;
//     }

//     // Data to be added to the watchlist
//     const data = {
//       id: details?.id,
//       title: details?.title || details?.name,
//       type: type,
//       poster_path: details?.poster_path,
//       release_date: details?.release_date || details?.first_air_date,
//       vote_average: details?.vote_average,
//       overview: details?.overview,
//     };

//     // Add data to watchlist and update state
//     const dataId = details?.id?.toString();
//     await addToWatchlist(user?.uid, dataId, data);
//     const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId);
//     setIsInWatchlist(isSetToWatchlist);
//   };

//   // Check watchlist status on component mount or when id/user changes
//   useEffect(() => {
//     if (!user) {
//       setIsInWatchlist(false); // Reset status if user is not logged in
//       return;
//     }

//     checkIfInWatchlist(user?.uid, id).then((data) => {
//       setIsInWatchlist(data); // Update watchlist status
//     });
//   }, [id, user, checkIfInWatchlist]);

//   // Remove from watchlist functionality
//   const handleRemoveFromWatchlist = async () => {
//     await removeFromWatchlist(user?.uid, id);
//     const isSetToWatchlist = await checkIfInWatchlist(user?.uid, id);
//     setIsInWatchlist(isSetToWatchlist); // Update watchlist status
//   };

//   // Display spinner while loading data
//   if (loading) {
//     return (
//       <Flex justify={"center"} mt={"7rem"}>
//         <Spinner size={"xl"} color="red" />
//       </Flex>
//     );
//   }

//   // Extract details for rendering
//   const title = details?.title || details?.name;
//   const releaseDate =
//     type === "tv" ? details?.first_air_date : details?.release_date;

//   return (
//     <Box mt={"5rem"}>
//       <Box
//         // Backdrop with gradient overlay
//         background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${imagePathOriginal}/${details?.backdrop_path})`}
//         backgroundRepeat={"no-repeat"}
//         backgroundSize={"cover"}
//         backgroundPosition={"center"}
//         w={"100%"}
//         h={{ base: "auto", md: "500px" }}
//         py={"2"}
//         zIndex={"-1"}
//         display={"flex"}
//         alignItems={"center"}
//       >
//         <Container maxW={"container.xl"}>
//           <Flex
//             alignItems={"center"}
//             gap="10"
//             flexDirection={{ base: "column", md: "row" }}
//           >
//             {/* Poster Image */}
//             <Image
//               height={"450px"}
//               borderRadius={"sm"}
//               src={`${imagePath}/${details?.poster_path}`}
//             />
//             <Box>
//               {/* Title and Release Date */}
//               <Heading fontSize={"3xl"}>
//                 {title}{" "}
//                 <Text as="span" fontWeight={"normal"} color={"gray.400"}>
//                   {new Date(releaseDate).getFullYear()}
//                 </Text>
//               </Heading>

//               {/* Additional Information */}
//               <Flex alignItems={"center"} gap={"4"} mt={1} mb={5}>
//                 <Flex alignItems={"center"}>
//                   <CalendarIcon mr={2} color={"gray.400"} />
//                   <Text fontSize={"sm"}>
//                     {new Date(releaseDate).toLocaleDateString("en-US")} (US)
//                   </Text>
//                 </Flex>
//                 {type === "movie" && (
//                   <>
//                     <Box>*</Box>
//                     <Flex alignItems={"center"}>
//                       <TimeIcon mr="2" color={"gray.400"} />
//                       <Text fontSize={"sm"}>
//                         {minutesTohours(details?.runtime)} {/* Runtime in hours */}
//                       </Text>
//                     </Flex>
//                   </>
//                 )}
//               </Flex>
//               <Flex alignItems={"center"} gap={"4"}>
//                 {/* Rating Display */}
//                 <CircularProgress
//                   value={ratingToPercentage(details?.vote_average)}
//                   bg={"gray.800"}
//                   borderRadius={"full"}
//                   p={"0.5"}
//                   size={"70px"}
//                   color={resolveRatingColor(details?.vote_average)}
//                   thickness={"6px"}
//                 >
//                   <CircularProgressLabel fontSize={"lg"}>
//                     {ratingToPercentage(details?.vote_average)}{" "}
//                     <Box as="span" fontSize={"10px"}>
//                       %
//                     </Box>
//                   </CircularProgressLabel>
//                 </CircularProgress>
//                 <Text display={{ base: "none", md: "initial" }}>
//                   User Score
//                 </Text>
//                 {/* Watchlist Buttons */}
//                 {isInWatchlist ? (
//                   <Button
//                     leftIcon={<CheckCircleIcon />}
//                     colorScheme="green"
//                     variant={"outline"}
//                     onClick={handleRemoveFromWatchlist}
//                   >
//                     In watchlist
//                   </Button>
//                 ) : (
//                   <Button
//                     leftIcon={<SmallAddIcon />}
//                     variant={"outline"}
//                     onClick={handleSaveToWatchlist}
//                   >
//                     Add to watchlist
//                   </Button>
//                 )}
//               </Flex>
//               {/* Tagline and Overview */}
//               <Text
//                 color={"gray.400"}
//                 fontSize={"sm"}
//                 fontStyle={"italic"}
//                 my="5"
//               >
//                 {details?.tagline}
//               </Text>
//               <Heading fontSize={"xl"} mb={"3"}>
//                 Overview
//               </Heading>
//               <Text fontSize={"md"} mb={"3"}>
//                 {details?.overview}
//               </Text>
//               {/* Genres */}
//               <Flex mt="6" gap="2">
//                 {details?.genres?.map((genre) => (
//                   <Badge key={genre?.id} p="1">
//                     {genre?.name}
//                   </Badge>
//                 ))}
//               </Flex>
//             </Box>
//           </Flex>
//         </Container>
//       </Box>

//       <Container maxW={"container.xl"} pb="10">
//         {/* Cast Section */}
//         <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} mt="10">
//           Cast
//         </Heading>
//         <Flex
//           mt="5"
//           mb="10"
//           overflowX={"scroll"}
//           gap={"5"}
//         >
//           {cast?.length === 0 && <Text>No cast found</Text>}
//           {cast &&
//             cast?.map((item) => (
//               <Box key={item?.id} minW={"150px"}>
//                 <Image
//                   src={`${imagePath}/${item?.profile_path}`}
//                   w={"100%"}
//                   height={"225px"}
//                   objectFit={"cover"}
//                   borderRadius={"sm"}
//                   draggable="false"
//                 />
//               </Box>
//             ))}
//         </Flex>

//         {/* Videos Section */}
//         <Heading
//           as="h2"
//           fontSize={"md"}
//           textTransform={"uppercase"}
//           mt="10"
//           mb="5"
//         >
//           Videos
//         </Heading>
//         <VideoComponent id={video?.key} />
//         <Flex mt="5" mb="10" overflowX={"scroll"} gap={"5"}>
//           {videos &&
//             videos?.map((item) => (
//               <Box key={item?.id} minW={"290px"}>
//                 <VideoComponent id={item?.key} small />
//                 <Text fontSize={"sm"} fontWeight={"bold"} mt="2" noOfLines={2}>
//                   {item?.name}
//                 </Text>
//               </Box>
//             ))}
//         </Flex>
//       </Container>
//     </Box>
//   );
// };

// export default DetailsPage;

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////


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
// import VideoComponent from "../components/VideoComponent";
// import { useAuth } from "../context/useAuth";
// import axios from "axios";

// const DetailsPage = () => {
//   const { type, id } = useParams();
//   const navigate = useNavigate();
//   // const { user } = useAuth();
//   const toast = useToast();


//   // user by api/user/getMyProfile
//   const [user, setUser] = useState(false)

//   const [details, setDetails] = useState({});
//   const [cast, setCast] = useState([]);
//   const [video, setVideo] = useState(null);
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isInWatchlist, setIsInWatchlist] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [detailsData, creditsData, videosData] = await Promise.all([
//           fetchDetails(type, id),
//           fetchCredits(type, id),
//           fetchVideos(type, id),
//         ]);

//         setDetails(detailsData);
//         setCast(creditsData?.cast?.slice(0, 10));

//         const trailer = videosData?.results?.find(
//           (video) => video?.type === "Trailer"
//         );
//         setVideo(trailer);

//         const otherVideos = videosData?.results
//           ?.filter((video) => video?.type !== "Trailer")
//           ?.slice(0, 10);
//         setVideos(otherVideos);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [type, id]);

//   useEffect(() => {
//     const checkWatchlist = async () => {
//       if (!user) {
//         setIsInWatchlist(false);
//         return;
//       }
      
//       try {
//         const response = await axios.get("https://backend-imdb.vercel.app/bookmarks/all");
//         if (response.data.success) {
//           setIsInWatchlist(response.data.data.includes(id));
//         }
//       } catch (error) {
//         console.error("Error checking watchlist:", error);
//       }
//     };

//     checkWatchlist();
//   }, [id, user]);

//   const handleSaveToWatchlist = async () => {
//     try {
//       const profileResponse = await axios.get("https://backend-imdb.vercel.app/user/getMyProfile");
//       if (profileResponse.data.success === false) {
//         toast({
//           title: "Login to add to watchlist",
//           status: "error",
//           isClosable: true,
//         });
//         setUser(false)
//         navigate("/login");
//         return;
//       }

//       // const data = {
//       //   id: details?.id,
//       //   title: details?.title || details?.name,
//       //   type: type,
//       //   poster_path: details?.poster_path,
//       //   release_date: details?.release_date || details?.first_air_date,
//       //   vote_average: details?.vote_average,
//       //   overview: details?.overview,
//       // };
//       setUser(true)
//       const saveResponse = await axios.post(`https://backend-imdb.vercel.app/bookmarks/add/${id}`);

//       if (saveResponse.data.success) {
//         toast({
//           title: "Bookmark added successfully",
//           status: "success",
//           isClosable: true,
//         });
//         setIsInWatchlist(true);
//       } else {
//         toast({
//           title: "Error adding bookmark",
//           status: "error",
//           isClosable: true,
//         });
//       }
//     } catch (error) {
//       console.error("Error adding to watchlist:", error);
//     }
//   };

//   const handleRemoveFromWatchlist = async () => {
//     try {
//       const profileResponse = await axios.get("https://backend-imdb.vercel.app/user/getMyProfile");
//       if (profileResponse.data.success === false) {
//         toast({
//           title: "Login to remove from watchlist",
//           status: "error",
//           isClosable: true,
//         });
//         setUser(false)
//         navigate("/login");
//         return;
//       }
//       setUser(true)
//       const removeResponse = await axios.delete(`https://backend-imdb.vercel.app/bookmarks/remove/${id}`);

//       if (removeResponse.data.success) {
//         toast({
//           title: "Bookmark removed successfully",
//           status: "success",
//           isClosable: true,
//         });
//         setIsInWatchlist(false);
//       } else {
//         toast({
//           title: "Error removing bookmark",
//           status: "error",
//           isClosable: true,
//         });
//       }
//     } catch (error) {
//       console.error("Error removing from watchlist:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <Flex justify={"center"} mt={"7rem"}>
//         <Spinner size={"xl"} color="red" />
//       </Flex>
//     );
//   }

//   const title = details?.title || details?.name;
//   const releaseDate = type === "tv" ? details?.first_air_date : details?.release_date;

//   return (
//     <Box mt={"5rem"}>
//       <Box
//         // Backdrop with gradient overlay
//         background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${imagePathOriginal}/${details?.backdrop_path})`}
//         backgroundRepeat={"no-repeat"}
//         backgroundSize={"cover"}
//         backgroundPosition={"center"}
//         w={"100%"}
//         h={{ base: "auto", md: "500px" }}
//         py={"2"}
//         zIndex={"-1"}
//         display={"flex"}
//         alignItems={"center"}
//       >
//         <Container maxW={"container.xl"}>
//           <Flex
//             alignItems={"center"}
//             gap="10"
//             flexDirection={{ base: "column", md: "row" }}
//           >
//             {/* Poster Image */}
//             <Image
//               height={"450px"}
//               borderRadius={"sm"}
//               src={`${imagePath}/${details?.poster_path}`}
//             />
//             <Box>
//               {/* Title and Release Date */}
//               <Heading fontSize={"3xl"}>
//                 {title}{" "}
//                 <Text as="span" fontWeight={"normal"} color={"gray.400"}>
//                   {new Date(releaseDate).getFullYear()}
//                 </Text>
//               </Heading>

//               {/* Additional Information */}
//               <Flex alignItems={"center"} gap={"4"} mt={1} mb={5}>
//                 <Flex alignItems={"center"}>
//                   <CalendarIcon mr={2} color={"gray.400"} />
//                   <Text fontSize={"sm"}>
//                     {new Date(releaseDate).toLocaleDateString("en-US")} (US)
//                   </Text>
//                 </Flex>
//                 {type === "movie" && (
//                   <>
//                     <Box>*</Box>
//                     <Flex alignItems={"center"}>
//                       <TimeIcon mr="2" color={"gray.400"} />
//                       <Text fontSize={"sm"}>
//                         {minutesTohours(details?.runtime)}
//                       </Text>
//                     </Flex>
//                   </>
//                 )}
//               </Flex>
//               <Flex alignItems={"center"} gap={"4"}>
//                 {/* Rating Display */}
//                 <CircularProgress
//                   value={ratingToPercentage(details?.vote_average)}
//                   bg={"gray.800"}
//                   borderRadius={"full"}
//                   p={"0.5"}
//                   size={"70px"}
//                   color={resolveRatingColor(details?.vote_average)}
//                   thickness={"6px"}
//                 >
//                   <CircularProgressLabel fontSize={"lg"}>
//                     {ratingToPercentage(details?.vote_average)}{" "}
//                     <Box as="span" fontSize={"10px"}>
//                       %
//                     </Box>
//                   </CircularProgressLabel>
//                 </CircularProgress>
//                 <Text display={{ base: "none", md: "initial" }}>
//                   User Score
//                 </Text>
//                 {/* Watchlist Buttons */}
//                 {isInWatchlist ? (
//                   <Button
//                     leftIcon={<CheckCircleIcon />}
//                     colorScheme="green"
//                     variant={"outline"}
//                     onClick={handleRemoveFromWatchlist}
//                   >
//                     In watchlist
//                   </Button>
//                 ) : (
//                   <Button
//                     leftIcon={<SmallAddIcon />}
//                     variant={"outline"}
//                     onClick={handleSaveToWatchlist}
//                   >
//                     Add to watchlist
//                   </Button>
//                 )}
//               </Flex>
//               {/* Tagline and Overview */}
//               <Text
//                 color={"gray.400"}
//                 fontSize={"sm"}
//                 fontStyle={"italic"}
//                 my="5"
//               >
//                 {details?.tagline}
//               </Text>
//               <Box>
//                 <Heading fontSize={"lg"} mb="3">
//                   Overview
//                 </Heading>
//                 <Text fontSize={"sm"}>{details?.overview}</Text>
//               </Box>
//             </Box>
//           </Flex>
//         </Container>
//       </Box>
//       <Container maxW={"container.xl"} mt="10">
//         {/* Cast Section */}
//         <Box mt={10}>
//           <Heading fontSize={"2xl"} mb="4">
//             Top Cast
//           </Heading>
//           <Flex gap={5} overflowX={"auto"} pb="3">
//             {cast?.map((actor) => (
//               <Box key={actor?.id} minW={"150px"} maxW={"150px"}>
//                 <Image
//                   src={`${imagePath}/${actor?.profile_path}`}
//                   mb="2"
//                   borderRadius={"md"}
//                   alt={actor?.name}
//                 />
//                 <Text fontSize={"sm"} fontWeight={"bold"}>
//                   {actor?.name}
//                 </Text>
//                 <Text fontSize={"sm"} color={"gray.400"}>
//                   {actor?.character}
//                 </Text>
//               </Box>
//             ))}
//           </Flex>
//         </Box>
//         {/* Trailer Section */}
//         {/* {video && (
//           <Box mt={10}>
//             <Heading fontSize={"2xl"} mb="4">
//               Trailer
//             </Heading>
//             <VideoComponent videoKey={video?.key} />
//           </Box>
//         )} */}
//         {/* Other Videos Section */}
//         {/* {videos?.length > 0 && (
//           <Box mt={10}>
//             <Heading fontSize={"2xl"} mb="4">
//               Videos
//             </Heading>
//             <Flex gap={5} overflowX={"auto"} pb="3">
//               {videos?.map((video) => (
//                 <Box key={video?.id} minW={"300px"}>
//                   <VideoComponent videoKey={video?.key} />
//                 </Box>
//               ))}
//             </Flex>
//           </Box>
//         )} */}
//       </Container>
//     </Box>
//   );
// };

// export default DetailsPage;

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////







import React from 'react'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  fetchCredits,
  fetchDetails,
  fetchVideos,
  imagePath,
  imagePathOriginal,
} from "../services/api";
import {
  CalendarIcon,
  CheckCircleIcon,
  SmallAddIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  minutesTohours,
  ratingToPercentage,
  resolveRatingColor,
} from "../utils/helpers";
// import VideoComponent from "../components/VideoComponent";
// import { useAuth } from "../context/useAuth";
import axios from "axios";

const DetailsPage = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    // user by api/user/getMyProfile
    const [user, setUser] = useState(false)

    const [details, setDetails] = useState({});
    const [cast, setCast] = useState([]);
    const [video, setVideo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    // data of movie / tvshow
    useEffect(() => {
        const fetchData = async () => {
          try {
            const [detailsData, creditsData, videosData] = await Promise.all([
              fetchDetails(type, id),
              fetchCredits(type, id),
              fetchVideos(type, id),
            ]);
    
            setDetails(detailsData);
            setCast(creditsData?.cast?.slice(0, 10));
    
            const trailer = videosData?.results?.find(
              (video) => video?.type === "Trailer"
            );
            setVideo(trailer);
    
            const otherVideos = videosData?.results
              ?.filter((video) => video?.type !== "Trailer")
              ?.slice(0, 10);
            setVideos(otherVideos);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [type, id]);

    // check if user exist and check if movie/tvshow exist in user
    useEffect(()=>{
        const fetchUser = async()=>{
            try{
                const response = await axios.get("https://backend-imdb.vercel.app/user/getMyProfile");
                if(response.data.success){
                    setUser(true);
                }
            }catch(error){
                console.error("Error fetching user", error)
            }
        }

        const checkWatchlist = async () => {
            if (!user) {
                setIsInWatchlist(false);
                return;
            }
            try{
                const response = await axios.get("https://backend-imdb.vercel.app/bookmarks/all");
                if (response.data.success) {
                    setIsInWatchlist(response.data.data.includes(id));
                }
            }catch(error){
                console.error("Error check watch list", error)
            }
        }
        checkWatchlist();
        fetchUser()
    },[id,user])

const handleSaveToWatchlist = async() =>{
    try{

        if(user){
            const response = await axios.post(`https://backend-imdb.vercel.app/bookmarks/add/${id}`);
            if(response.data.success){
                toast({
                    title: "Added to Watchlist",
                    description: "The movie/tv show has been added to your watchlist",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setIsInWatchlist(true);
            }    
        }else{
            toast({
                title: "Login to add to watchlist",
                status: "error",
                isClosable: true,
              });
            navigate("/login");
            return 
        }
    }catch(error){
        console.error("Error adding to watchlist", error)
        toast({
            title: "Error",
            description: "Failed to add the movie/tv show to your watchlist",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    }
}
const handleRemoveFromWatchlist = async() =>{
    try{

        if(user){
            const response = await axios.delete(`https://backend-imdb.vercel.app/bookmarks/remove/${id}`);
            if(response.data.success){
                toast({
                    title: "deleted from Watchlist",
                    description: "The movie/tv show has been deleted from your watchlist",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setIsInWatchlist(false);
            }    
        }else{
            toast({
                title: "Login to remove from watchlist",
                status: "error",
                isClosable: true,
              });
            navigate("/login");
            return 
        }
    }catch(error){
        console.error("Error adding to watchlist", error)
        toast({
            title: "Error",
            description: "Failed to delete the movie/tv show from your watchlist",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    }
}


    if (loading) {
        return (
          <Flex justify={"center"} mt={"7rem"}>
            <Spinner size={"xl"} color="red" />
          </Flex>
        );
    }
    
    const title = details?.title || details?.name;
    const releaseDate = type === "tv" ? details?.first_air_date : details?.release_date;
    
    return (
        <Box mt={"5rem"}>
          <Box
            // Backdrop with gradient overlay
            background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${imagePathOriginal}/${details?.backdrop_path})`}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            w={"100%"}
            h={{ base: "auto", md: "500px" }}
            py={"2"}
            zIndex={"-1"}
            display={"flex"}
            alignItems={"center"}
          >
            <Container maxW={"container.xl"}>
              <Flex
                alignItems={"center"}
                gap="10"
                flexDirection={{ base: "column", md: "row" }}
              >
                {/* Poster Image */}
                <Image
                  height={"450px"}
                  borderRadius={"sm"}
                  src={`${imagePath}/${details?.poster_path}`}
                />
                <Box>
                  {/* Title and Release Date */}
                  <Heading fontSize={"3xl"}>
                    {title}{" "}
                    <Text as="span" fontWeight={"normal"} color={"gray.400"}>
                      {new Date(releaseDate).getFullYear()}
                    </Text>
                  </Heading>
    
                  {/* Additional Information */}
                  <Flex alignItems={"center"} gap={"4"} mt={1} mb={5}>
                    <Flex alignItems={"center"}>
                      <CalendarIcon mr={2} color={"gray.400"} />
                      <Text fontSize={"sm"}>
                        {new Date(releaseDate).toLocaleDateString("en-US")} (US)
                      </Text>
                    </Flex>
                    {type === "movie" && (
                      <>
                        <Box>*</Box>
                        <Flex alignItems={"center"}>
                          <TimeIcon mr="2" color={"gray.400"} />
                          <Text fontSize={"sm"}>
                            {minutesTohours(details?.runtime)}
                          </Text>
                        </Flex>
                      </>
                    )}
                  </Flex>
                  <Flex alignItems={"center"} gap={"4"}>
                    {/* Rating Display */}
                    <CircularProgress
                      value={ratingToPercentage(details?.vote_average)}
                      bg={"gray.800"}
                      borderRadius={"full"}
                      p={"0.5"}
                      size={"70px"}
                      color={resolveRatingColor(details?.vote_average)}
                      thickness={"6px"}
                    >
                      <CircularProgressLabel fontSize={"lg"}>
                        {ratingToPercentage(details?.vote_average)}{" "}
                        <Box as="span" fontSize={"10px"}>
                          %
                        </Box>
                      </CircularProgressLabel>
                    </CircularProgress>
                    <Text display={{ base: "none", md: "initial" }}>
                      User Score
                    </Text>
                    {/* Watchlist Buttons */}
                    {isInWatchlist ? (
                      <Button
                        leftIcon={<CheckCircleIcon />}
                        colorScheme="green"
                        variant={"outline"}
                        onClick={handleRemoveFromWatchlist}
                      >
                        In watchlist
                      </Button>
                    ) : (
                      <Button
                        leftIcon={<SmallAddIcon />}
                        variant={"outline"}
                        onClick={handleSaveToWatchlist}
                      >
                        Add to watchlist
                      </Button>
                    )}
                  </Flex>
                  {/* Tagline and Overview */}
                  <Text
                    color={"gray.400"}
                    fontSize={"sm"}
                    fontStyle={"italic"}
                    my="5"
                  >
                    {details?.tagline}
                  </Text>
                  <Box>
                    <Heading fontSize={"lg"} mb="3">
                      Overview
                    </Heading>
                    <Text fontSize={"sm"}>{details?.overview}</Text>
                  </Box>
                </Box>
              </Flex>
            </Container>
          </Box>
          <Container maxW={"container.xl"} mt="10">
            {/* Cast Section */}
            <Box mt={10}>
              <Heading fontSize={"2xl"} mb="4">
                Top Cast
              </Heading>
              <Flex gap={5} overflowX={"auto"} pb="3">
                {cast?.map((actor) => (
                  <Box key={actor?.id} minW={"150px"} maxW={"150px"}>
                    <Image
                      src={`${imagePath}/${actor?.profile_path}`}
                      mb="2"
                      borderRadius={"md"}
                      alt={actor?.name}
                    />
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                      {actor?.name}
                    </Text>
                    <Text fontSize={"sm"} color={"gray.400"}>
                      {actor?.character}
                    </Text>
                  </Box>
                ))}
              </Flex>
            </Box>
          </Container>
        </Box>
      );
}

export default DetailsPage