


// Tv shows Page displays only tv shows

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
import { fetchTvSeries } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";

const Shows = () => {
  // State variables
  const [shows, setShows] = useState([]); // Stores TV shows data
  const [activePage, setActivePage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [sortBy, setSortBy] = useState("popularity.desc"); // Sorting criteria
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Effect to fetch TV shows data when activePage or sortBy changes
  useEffect(() => {
    setIsLoading(true);
    fetchTvSeries(activePage, sortBy)
      .then((res) => {
        console.log(res, "res"); // Log response for debugging
        setShows(res?.results); // Update state with fetched TV shows
        setActivePage(res?.page); // Update current page number
        setTotalPages(res?.total_pages); // Update total pages
      })
      .catch((err) => console.log(err, "err")) // Log errors for debugging
      .finally(() => setIsLoading(false)); // Set loading state to false
  }, [activePage, sortBy]);

  return (
    <Container maxW={"container.xl"} mt={"7rem"}>
      <Flex alignItems={"baseline"} gap={"4"} my="10">
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Discover TV Shows
        </Heading>

        {/* Dropdown to select sorting criteria */}
        <Select
          w={"130px"}
          onChange={(e) => {
            setActivePage(1); // Reset to first page when sorting changes
            setSortBy(e.target.value); // Update sorting criteria
          }}
        >
          <option value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">Top Rated</option>
        </Select>
      </Flex>

      {/* Grid to display TV shows */}
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
      >
        {shows &&
          shows?.map((item, i) =>
            isLoading ? (
              // Display skeleton loader for each card while loading
              <Skeleton height={300} key={i} />
            ) : (
              // Render TV show cards once data is loaded
              <CardComponent key={item?.id} item={item} type={"tv"} />
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

export default Shows;


