

// it is the search movies/tvShows page

// imports
import { useEffect, useState } from "react";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { searchData } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";

const Search = () => {
  // State variables
  const [searchValue, setSearchValue] = useState(""); // Current search query
  const [tempSearchValue, setTempSearchValue] = useState(""); // Temporary search query for input
  const [activePage, setActivePage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [data, setData] = useState([]); // Stores search results

  // Effect to fetch search results when searchValue or activePage changes
  useEffect(() => {
    if (!searchValue) return; // Skip fetching if searchValue is empty

    setIsLoading(true);
    searchData(searchValue, activePage)
      .then((res) => {
        console.log(res, "res"); // Log response for debugging
        setData(res?.results); // Update data with search results
        setActivePage(res?.page); // Update current page number
        setTotalPages(res?.total_pages); // Update total pages
      })
      .catch((err) => console.log(err, "err")) // Log errors for debugging
      .finally(() => setIsLoading(false)); // Set loading state to false
  }, [searchValue, activePage]);

  // Handle form submission to update searchValue
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(tempSearchValue); // Set searchValue to trigger fetching
  };

  return (
    <Container maxW={"container.xl"} mt={"7rem"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Search
        </Heading>
      </Flex>

      {/* Search input form */}
      <form onSubmit={handleSearch}>
        <Input
          placeholder="Search movies, tv shows..."
          _placeholder={{ color: "gray.100" }}
          value={tempSearchValue}
          onChange={(e) => setTempSearchValue(e.target.value)} // Update tempSearchValue on input change
        />
      </form>

      {/* Show spinner while loading data */}
      {isLoading && (
        <Flex justifyContent={"center"} mt="10">
          <Spinner size={"xl"} color="red" />
        </Flex>
      )}

      {/* Display message when no results are found */}
      {data?.length === 0 && !isLoading && (
        <Heading textAlign={"center"} as="h3" fontSize={"sm"} mt="10">
          No results found
        </Heading>
      )}

      {/* Grid to display search results */}
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
        mt="6"
      >
        {data?.length > 0 &&
          !isLoading &&
          data?.map((item, i) =>
            isLoading ? (
              // Display skeleton loader for each card while loading
              <Skeleton height={300} key={i} />
            ) : (
              // Render search result cards once data is loaded
              <CardComponent
                key={item?.id}
                item={item}
                type={item?.media_type}
              />
            )
          )}
      </Grid>

      {/* Show pagination controls if there are results */}
      {data?.length > 0 && !isLoading && (
        <PaginationComponent
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      )}
    </Container>
  );
};

export default Search;
