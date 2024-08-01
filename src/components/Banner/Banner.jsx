
// // it is a Normal carousel banner section

// // imports
// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { IconButton, Box, Image, Spinner, Flex, Text } from "@chakra-ui/react";
// import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
// import { fetchTrending } from "../../services/api";

// // Previous button for all sliders in the app
// export const PreviousBtn = ({ className, onClick }) => {
//   return (
//     <IconButton
//       aria-label="Previous slide"
//       icon={<ArrowBackIcon />}
//       className={className}
//       onClick={onClick}
//       pos="absolute"
//       left="10px"
//       top="50%"
//       transform="translateY(-50%)"
//       zIndex="1"
//     />
//   );
// };

// // Next button for all sliders in the app
// export const NextBtn = ({ className, onClick }) => {
//   return (
//     <IconButton
//       aria-label="Next slide"
//       icon={<ArrowForwardIcon />}
//       className={className}
//       onClick={onClick}
//       pos="absolute"
//       right="10px"
//       top="50%"
//       transform="translateY(-50%)"
//       zIndex="1"
//     />
//   );
// };

// const Banner = ({ data }) => {

//   // variable declarations
//   const [loading, setLoading] = useState(true);
//   const [bData, setBData] = useState([]);
//   const imagePath = "https://image.tmdb.org/t/p/original";



//   // calling API to fetch data and the function is already present in api.js
//   useEffect(() => {
//     setLoading(true);
//     // Simulating fetch data
//     fetchTrending().then((data) => {
//       setBData(data);
//       setLoading(false);
//     });
//   }, []);

//   const settings = {
//     autoplay: true,
//     autoplaySpeed: 3000,
//     dots: false,
//     infinite: true,
//     speed: 1500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     // prevArrow: <PreviousBtn />,
//     // nextArrow: <NextBtn />,
//   };

//   return (
//     <Box
//       w="100%"
//       rounded="sm"
//       shadow="md"
//       px={1}
//       py={1}
//       overflow="hidden"
//       mt={"5rem"}
//       sm={{ m: 2 }}
//       className="slider-container"
//       css={{
//         userSelect: "none", // Prevent text selection
//         WebkitTouchCallout: "none", // Prevent long tap menu in iOS
//         msUserSelect: "none", // IE10+
//         MozUserSelect: "none", // Firefox
//       }}
      
//     >
//       {/* Slider using react-slick */}

//       {/* conditional rendering of loading state untill the data is fetched it will show loading state */}
//       {loading ? (
//         <Flex justify="center" mt="10">
//           <Spinner size="xl" color="red" />
//         </Flex>
//       ) : (

//         //the slider part 

//         <Slider {...settings} borderRadius="10px">
//           {bData.map((el, i) => (
//             <Box key={i} position="relative">
//               <Image
//                 draggable="false"
//                 h={{ base: "150px", sm: "380px" }}
//                 w="full"
//                 objectFit="cover"
//                 objectPosition="center"
//                 src={`${imagePath}${el?.backdrop_path}`}
//                 alt="banner"
//                 opacity={0.8}
//                 borderRadius="10px"
//                 css={{ pointerEvents: 'none' }}
//               />

//               {/* the overlay part of each slide */}
//               <Box className="overlay" bg="blackAlpha.800"  p={2} px={10} pos="absolute" bottom={0} w="100%" borderBottomRadius="10px">
//                 <Text fontSize="lg" fontWeight="bold" color="white">
//                   {el?.title || el?.name}
//                 </Text>
//                 <Text fontSize="sm" color="white">
//                     {el.release_date ? String(el?.release_date).split("-")[0]:""}
//                     {el.first_air_date ? String(el?.first_air_date).split("-")[0]:""}
//                 </Text>
//               </Box>
//             </Box>
//           ))}
//         </Slider>
//       )}
//     </Box>
//   );
// };

// export default Banner;

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconButton, Box, Image, Spinner, Flex, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { fetchTrending } from "../../services/api";

export const PreviousBtn = ({ className, onClick }) => {
  return (
    <IconButton
      aria-label="Previous slide"
      icon={<ArrowBackIcon />}
      className={className}
      onClick={onClick}
      pos="absolute"
      left="10px"
      top="50%"
      transform="translateY(-50%)"
      zIndex="1"
    />
  );
};

export const NextBtn = ({ className, onClick }) => {
  return (
    <IconButton
      aria-label="Next slide"
      icon={<ArrowForwardIcon />}
      className={className}
      onClick={onClick}
      pos="absolute"
      right="10px"
      top="50%"
      transform="translateY(-50%)"
      zIndex="1"
    />
  );
};

const Banner = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [bData, setBData] = useState([]);
  const imagePath = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    setLoading(true);
    fetchTrending().then((data) => {
      setBData(data);
      setLoading(false);
    });
  }, []);

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box
      w="100%"
      rounded="sm"
      shadow="md"
      px={1}
      py={1}
      overflow="hidden"
      mt={"5rem"}
      sm={{ m: 2 }}
      className="slider-container"
      css={{
        userSelect: "none", 
        WebkitTouchCallout: "none", 
        msUserSelect: "none", 
        MozUserSelect: "none", 
      }}
    >
      {loading ? (
        <Flex justify="center" mt="10">
          <Spinner size="xl" color="red" />
        </Flex>
      ) : (
        <Slider {...settings} borderRadius="10px">
          {bData.map((el, i) => (
            <Box key={i} position="relative">
              <Image
                draggable="false"
                h={{ base: "150px", sm: "380px" }}
                w="full"
                objectFit="cover"
                objectPosition="center"
                src={`${imagePath}${el?.backdrop_path}`}
                alt="banner"
                opacity={0.8}
                borderRadius="10px"
                css={{ pointerEvents: 'none' }}
              />
              <Box
                className="overlay"
                bg="blackAlpha.800"
                p={2}
                px={10}
                pos="absolute"
                bottom={0}
                w="100%"
                borderBottomRadius="10px"
                opacity={0} // Initially hidden
                transition="opacity 0.3s ease-in-out"
                _groupHover={{ opacity: 1 }} // Show on hover
              >
                <Text fontSize="lg" fontWeight="bold" color="white">
                  {el?.title || el?.name}
                </Text>
                <Text fontSize="sm" color="white">
                  {el.release_date ? String(el?.release_date).split("-")[0] : ""}
                  {el.first_air_date ? String(el?.first_air_date).split("-")[0] : ""}
                </Text>
              </Box>
            </Box>
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default Banner;


