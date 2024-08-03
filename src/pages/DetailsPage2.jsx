
// // details Page it displays Singular tvShow/movies 

import React, { useContext } from 'react'
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
import axios from "axios";
import Context from "../context/Context"

const DetailsPage2 = () => {
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


    const authenticationByMongoDB = useContext(Context); 

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
                const response = await axios.get("https://backend-imdb.vercel.app/user/getMyProfile",{ withCredentials: true });
                if(response.data.success){
                    //console.log(response.data)
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
                const response = await axios.get("https://backend-imdb.vercel.app/bookmarks/all",{ withCredentials: true });
                if (response.data.success) {
                    setIsInWatchlist(response.data.data.includes(id));
                }
            }catch(error){
                // console.error("Error check watch list", error)
            }
        }
        fetchUser()
        checkWatchlist();
    },[id,user])

const handleSaveToWatchlist = async() =>{
    try{

        if(user && !authenticationByMongoDB.userSignOut){
            const response = await axios.post(`https://backend-imdb.vercel.app/bookmarks/add/${id}`, null ,{
              withCredentials: true,
          })
            if(response.data.success){
                toast({
                    title: "Added to Watchlist",
                    description: "Added to your watchlist",
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
            description: "Failed to add show to your watchlist",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    }
}
const handleRemoveFromWatchlist = async() =>{
    try{

        if(user && !authenticationByMongoDB.userSignOut){
            const response = await axios.delete(`https://backend-imdb.vercel.app/bookmarks/remove/${id}`,{ withCredentials: true });
            if(response.data.success){
                toast({
                    title: "deleted from Watchlist",
                    description: "The show has been deleted from your watchlist",
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
            description: "Failed to delete the show from your watchlist",
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
                    {isInWatchlist  && !authenticationByMongoDB.userSignOut? (
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

export default DetailsPage2