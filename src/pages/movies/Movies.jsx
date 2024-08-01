


// all movies page, it displays only movies

// imports
import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";

const Movies = () => {
  // State variables
  const [movies, setMovies] = useState([]); // Stores movie data
  const [activePage, setActivePage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [sortBy, setSortBy] = useState("popularity.desc"); // Sorting criteria
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Set loading state to true when fetching data
    setIsLoading(true);
    
    // Fetch movies data from API
    fetchMovies(activePage, sortBy)
      .then((res) => {
        console.log(res, "res"); // Log response for debugging
        setMovies(res?.results); // Update movies state with results
        setActivePage(res?.page); // Update current page number
        setTotalPages(res?.total_pages); // Update total pages
      })
      .catch((err) => console.log(err, "err")) // Log errors for debugging
      .finally(() => setIsLoading(false)); // Set loading state to false
  }, [activePage, sortBy]); // Dependency array to re-fetch data on page change or sort change

  return (
    <Container maxW={"container.xl"} mt={"7rem"}>
      {/* Header and sort selection */}
      <Flex alignItems={"baseline"} gap={"4"} my="10">
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Discover Movies
        </Heading>

        <Select
          w={"130px"}
          onChange={(e) => {
            setActivePage(1); // Reset to first page on sort change
            setSortBy(e.target.value); // Update sorting criteria
          }}
        >
          <option value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">
            Top Rated
          </option>
        </Select>
      </Flex>

      {/* Grid for displaying movie cards */}
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
      >
        {movies &&
          movies?.map((item, i) =>
            isLoading ? (
              // Show skeleton loader while data is loading
              <Skeleton height={300} key={i} />
            ) : (
              // Render movie cards once data is loaded
              <CardComponent key={item?.id} item={item} type={"movie"} />
            )
          )}
      </Grid>

      {/* Pagination controls */}
      <PaginationComponent
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
    </Container>
  );
};

export default Movies;
