

// Home Page/Landing Page of the application

// imports
import { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { fetchTrending } from "../services/api";
import CardComponent from "../components/CardComponent";
import Banner from "../components/Banner/Banner";
// import SpecialBanner from "../components/SpecialBanner/SpecialBanner";
import Context from "../context/Context"

const Home = () => {
  // State variables
  const [data, setData] = useState([]); // Holds trending data
  const [loading, setLoading] = useState(true); // Loading state
  const [timeWindow, setTimeWindow] = useState("day"); // Time window for trending data (day or week)

  const authenticationByMongoDB = useContext(Context);


  // Fetch trending data whenever timeWindow changes
  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    // console.log("user Signout homepage",authenticationByMongoDB.userSignOut)
    fetchTrending(timeWindow)
      .then((res) => {
        setData(res); // Set data with the fetched results
      })
      .catch((err) => {
        console.log(err, "err"); // Log any errors
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching is complete
      });
  }, [timeWindow]); // Dependency on timeWindow to re-fetch data when it changes

  // console.log(data, "data"); // Log data for debugging

  return (
    <>
      {/* SpecialBanner component that displays a special banner with trending data */}
      {/* {data.length > 0 && <SpecialBanner data={data} mt={"7rem"} />} */}

      <Container maxW={"container.xl"}>
        <Banner data={data}/>
        {/* Header for the recommendations section */}
        <Flex alignItems={"baseline"} gap={"4"} my={"10"} mt={"2rem"}>
          <Heading as="h2" fontSize={"md"}>
            Recommendations
          </Heading>
          {/* Buttons to switch between "Today" and "This Week" trending data */}
          <Flex
            alignItems={"center"}
            gap={"2"}
            border={"1.5px solid teal"}
            borderRadius={"20px"}
          >
            <Box
              as="button"
              px="3"
              py="1"
              borderRadius={"20px"}
              bg={`${timeWindow === "day" ? "gray.800" : ""}`}
              onClick={() => setTimeWindow("day")}
            >
              Today
            </Box>
            <Box
              as="button"
              px="3"
              py="1"
              borderRadius={"20px"}
              bg={`${timeWindow === "week" ? "gray.800" : ""}`}
              onClick={() => setTimeWindow("week")}
            >
              This Week
            </Box>
          </Flex>
        </Flex>

        {/* Grid layout to display trending items */}
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={"4"}
        >
          {/* Render Skeleton components while loading */}
          {data &&
            data?.map((item, i) =>
              loading ? (
                <Skeleton height={300} key={i} />
              ) : (
                <CardComponent
                  key={item?.id}
                  item={item}
                  type={item?.media_type}
                />
              )
            )}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
