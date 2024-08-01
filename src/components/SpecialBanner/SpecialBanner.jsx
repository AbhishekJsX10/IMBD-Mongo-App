
// Special rotating banner section displaying trending movies/tv shows
// Each card shows a background image and overlays with name and year on hover
// Future extension could include paid promotions

// imports
import React, { useEffect, useState } from 'react';
import "./Banner.css";
import { fetchTrending } from '../../services/api';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SpecialBanner = ({ data }) => {
  // State variables
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [bData, setBData] = useState([]); // Stores trending movie/tvshow data
  const imagePath = "https://image.tmdb.org/t/p/original"; // Base URL for images

  // Fetch the 10 most trending movies/tv shows
  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching
    fetchTrending().then((data) => {
      const limitedData = data.slice(0, 10); // Limit to 10 items
      setBData(limitedData); // Update state with fetched data
      setLoading(false); // Set loading state to false after data is fetched
    });
  }, []);

  return (
    <>
      {/* Display a spinner while data is being fetched */}
      {loading ? (
        <Flex justify="center" height={"10rem"} mt={"7rem"}>
          <Spinner size="xl" color="red" />
        </Flex>
      ) : (
        // Render the rotating 3D carousel once data is available
        <div className="banner">
          <div className="slider" style={{ "--quantity": bData.length }}>
            {/* Map through the data to create carousel items */}
            {bData.map((ele, i) => (
              <div key={i} className="item" style={{ "--position": i + 1 }}>
                {/* Link to details page for each movie/tv show */}
                <Link to={`/${ele?.media_type}/${ele?.id}`}>
                  <img src={`${imagePath}${ele?.backdrop_path}`} alt={ele?.title || ele?.name} />
                </Link>

                {/* Overlay displaying title and release year */}
                <Box className="overlay" bg="blackAlpha.800" p={1} pos="absolute" bottom={0} w="100%">
                  <Text fontSize={"0.75rem"} fontWeight="bold" color="white">
                    {ele?.title || ele?.name}
                  </Text>
                  <Text fontSize="sm" color="white">
                    {ele.release_date ? String(ele?.release_date).split("-")[0] : ""}
                    {ele.first_air_date ? String(ele?.first_air_date).split("-")[0] : ""}
                  </Text>
                </Box>
              </div>
            ))}
          </div>

          {/* Website name banner, e.g., IMDB */}
          <div className="content">
            <h1 data-content="CSS ONLY">
              IMDB
            </h1>
            <div className="model"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpecialBanner;
