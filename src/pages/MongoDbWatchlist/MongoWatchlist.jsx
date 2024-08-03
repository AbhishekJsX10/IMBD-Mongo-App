
import { Box, Flex, IconButton, Image, Tooltip, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CheckIcon, StarIcon } from '@chakra-ui/icons';

const WatchlistCard = ({ type, item, removeFunction }) => {
  return (
    <Link to={`/${type}/${item.id}`}>
      <Flex gap="4">
        <Box position={"relative"} w={"150px"}>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            alt={item.title}
            height={"200px"}
            minW={"150px"}
            objectFit={"cover"}
          />
          <Tooltip label="Remove from watchlist">
            <IconButton
              aria-label="Remove from watchlist"
              icon={<CheckIcon />}
              size={"sm"}
              colorScheme={"green"}
              position={"absolute"}
              zIndex={"999"}
              top="2px"
              left={"2px"}
              onClick={(e) => {
                e.preventDefault();
                removeFunction();
              }}
            />
          </Tooltip>
        </Box>

        <Box>
          <Heading fontSize={{ base: 'xl', md: '2xl' }} noOfLines={1}>
            {item?.title || item?.name}
          </Heading>
          <Heading fontSize={"sm"} color={"green.200"} mt="2">
            {new Date(item?.release_date || item?.first_air_date).getFullYear() || 'N/A'}
          </Heading>
          <Flex alignItems={"center"} gap={2} mt="4">
            <StarIcon fontSize={"small"} />
            <Text textAlign={"center"} fontSize="small">
              {item?.vote_average?.toFixed(1)}
            </Text>
          </Flex>
          <Text mt="4" fontSize={{ base: 'xs', md: 'sm' }} noOfLines={5}>
            {item?.overview}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

// export default WatchlistCard;


import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast, Container, Grid, Spinner } from '@chakra-ui/react';
import Context from '../../context/Context';



const MongoWatchlist = () => {
  const apiKey = '24a820de59aa820995038cfb9a53ea27';
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const toast = useToast();
  const [bookmarksIds, setBookmarksIds] = useState([]);
  const [bookmarksData, setBookmarksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authenticationByMongoDB = useContext(Context);

  const fetchFullData = async (id) => {
    try {
      const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
      if (movieResponse.ok) {
        const data = await movieResponse.json();
        return { ...data, type: 'movie' };
      } else {
        const tvResponse = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`);
        if (tvResponse.ok) {
          const tvData = await tvResponse.json();
          return { ...tvData, type: 'tv' };
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    return null;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://backend-imdb.vercel.app/user/getMyProfile', { withCredentials: true });
        if (response.data.success) {
          setUser(response.data.user);
          setBookmarksIds(response.data.user.bookmarks);
        } else {
          toast({
            title: 'Login to see watchlist',
            status: 'error',
            isClosable: true,
          });
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } catch (error) {
        console.error('Error fetching user', error);
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate, toast]);

  useEffect(() => {
    const fetchData = async () => {
      const uniqueBookmarks = Array.from(new Set(bookmarksIds)); // Ensure IDs are unique
      const fetchingShows = uniqueBookmarks.map((id) => fetchFullData(id));

      try {
        const results = await Promise.all(fetchingShows);
        setBookmarksData(results.filter((item) => item !== null));
      } catch (error) {
        console.error('Error fetching bookmarks data:', error);
        setError('Failed to load bookmarks data.');
      }
    };

    if (bookmarksIds.length > 0) {
      fetchData();
    }
  }, [bookmarksIds]);

  const handleRemoveClick = async (id) => {
    try {
      const response = await axios.delete(`https://backend-imdb.vercel.app/bookmarks/remove/${id}`, { withCredentials: true });
      if (response.data.success) {
        setBookmarksIds((prev) => prev.filter((bookmarkId) => bookmarkId !== id));
        setBookmarksData((prev) => prev.filter((item) => item.id !== id)); // Update bookmarksData immediately
        toast({
          title: 'Deleted from Watchlist',
          description: 'The show has been deleted from your watchlist',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error removing from watchlist', error);
      toast({
        title: 'Error',
        description: 'Failed to delete the show from your watchlist',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading)
    return (
      <Flex justify={'center'} h="50vh" pt={'10'}>
        <Spinner size={'xl'} color="red" mt={'10rem'} />
      </Flex>
    );

  return (
    <Container maxW={"container.xl"} mt={"7rem"} minH={"43vh"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Watchlist
        </Heading>
      </Flex>
      {loading && (
        <Flex justify={"center"} mt="10">
          <Spinner size={"xl"} color="red" />
        </Flex>
      )}
      {error && (
        <Flex justify={"center"} mt="10">
          <Heading as="h2" fontSize={"md"} color="red.500">
            {error}
          </Heading>
        </Flex>
      )}
      {!loading && !error && bookmarksData.length === 0 && (
        <Flex justify={"center"} mt="10">
          <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
            Watchlist is empty
          </Heading>
        </Flex>
      )}
      {!loading && !error && bookmarksData.length > 0 && (
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={"4"}>
          {bookmarksData.map((item) => (
            <WatchlistCard
              key={item.id}
              item={item}
              type={item.type}
              removeFunction={() => handleRemoveClick(item.id)}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MongoWatchlist;

