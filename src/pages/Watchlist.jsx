

// Watchlist page component and its a protected route and conditionally rendered

// imports
import { useState, useEffect } from "react";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import { Container, Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
import WatchlistCard from "../components/WatchlistCard";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  // Hook to get the watchlist data from Firestore
  const { getWatchlist } = useFirestore();
  // Hook to get the authenticated user
  const { user } = useAuth();
  // State to store the watchlist data
  const [watchlist, setWatchlist] = useState([]);
  // State to manage the loading state
  const [isLoading, setIsLoading] = useState(true);
  // State to manage error state
  const [error, setError] = useState(null);
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Effect to fetch the watchlist data when the component mounts
  useEffect(() => {
    if (!user?.uid) {
      // Redirect to login if user is not authenticated
      navigate("/login");
      return;
    }

    const fetchWatchlist = async () => {
      try {
        // Fetch the watchlist data from Firestore
        const data = await getWatchlist(user.uid);
        setWatchlist(data);
      } catch (err) {
        // Handle errors and provide feedback
        setError("An error occurred while fetching the watchlist.");
        console.error(err);
      } finally {
        // Set the loading state to false
        setIsLoading(false);
      }
    };

    fetchWatchlist();
  }, [user?.uid, getWatchlist, navigate]);

  return (
    <Container maxW={"container.xl"} mt={"7rem"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Watchlist
        </Heading>
      </Flex>
      {isLoading && (
        // Show a spinner while loading
        <Flex justify={"center"} mt="10">
          <Spinner size={"xl"} color="red" />
        </Flex>
      )}
      {error && (
        // Show an error message if there's an error
        <Flex justify={"center"} mt="10">
          <Heading as="h2" fontSize={"md"} color="red.500">
            {error}
          </Heading>
        </Flex>
      )}
      {!isLoading && !error && watchlist.length === 0 && (
        // Show a message if the watchlist is empty
        <Flex justify={"center"} mt="10">
          <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
            Watchlist is empty
          </Heading>
        </Flex>
      )}
      {!isLoading && !error && watchlist.length > 0 && (
        // Render the watchlist items if there are any
        <Grid
          templateColumns={{
            base: "1fr",
          }}
          gap={"4"}
        >
          {watchlist.map((item) => (
            <WatchlistCard
              key={item.id}
              item={item}
              type={item.type}
              setWatchlist={setWatchlist}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Watchlist;



///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////



// import React, { useState, useEffect } from 'react';
// import { Container, Flex, Grid, Heading, Spinner, Text, Box, Image } from '@chakra-ui/react';

// const apiKey = '24a820de59aa820995038cfb9a53ea27'; // TMDB API key

// // Function to get full data for a movie or TV show
// const fetchFullData = async (type, id) => {
//   const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) throw new Error(`Error fetching ${type} data`);
//     return response.json();
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// // Function to find the type and get full data
// const fetchDataByExternalId = async (externalId) => {
//   const url = `https://api.themoviedb.org/3/find/${externalId}?api_key=${apiKey}&external_source=imdb_id`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) throw new Error('Error finding data');
//     const data = await response.json();
//     if (data.movie_results.length > 0) {
//       return fetchFullData('movie', data.movie_results[0].id);
//     } else if (data.tv_results.length > 0) {
//       return fetchFullData('tv', data.tv_results[0].id);
//     }
//     console.log('No movie or TV show found with this ID.');
//     return null;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// const Watchlist = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBookmarksData = async () => {
//       try {
//         const userResponse = await fetch(' https://backend-imdb.vercel.app/user/getMyProfile', {
//           method: 'GET',
//           credentials: 'include',
//         });
//         if (!userResponse.ok) throw new Error('Failed to fetch user profile');
//         const userData = await userResponse.json();

//         if (userData.success) {
//           const fetchPromises = userData.user.bookmarks.map(externalId => fetchDataByExternalId(externalId));
//           const results = await Promise.all(fetchPromises);
//           setData(results.filter(item => item !== null));
//         }
//       } catch (error) {
//         setError(error.message);
//         console.error('Error fetching user data or bookmarks:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookmarksData();
//   }, []);

//   if (loading) return <Spinner size="xl" color="red" />;
//   if (error) return <Text color="red.500">Error: {error}</Text>;

//   return (
//     <Container maxW="container.xl" mt="7rem">
//       <Flex alignItems="baseline" gap="4" my="10">
//         <Heading as="h2" fontSize="md" textTransform="uppercase">Watchlist</Heading>
//       </Flex>
//       {data.length === 0 ? (
//         <Text>No bookmarks found</Text>
//       ) : (
//         <Grid
//           templateColumns={{ base: '1fr' }}
//           gap="4"
//         >
//           {data.map((item) => (
//             <Box key={item.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
//               <Image
//                 src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
//                 alt={item.title || item.name}
//                 boxSize="200px"
//                 objectFit="cover"
//               />
//               <Box p="6">
//                 <Heading as="h3" fontSize="lg">{item.title || item.name}</Heading>
//                 <Text mt="2">{item.overview}</Text>
//               </Box>
//             </Box>
//           ))}
//         </Grid>
//       )}
//     </Container>
//   );
// };

// export default Watchlist;
