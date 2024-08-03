

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


x