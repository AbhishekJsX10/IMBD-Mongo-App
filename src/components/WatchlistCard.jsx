

// A card variant used on WatchList page component

// imports
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import {
  CheckIcon,
  StarIcon,
} from "@chakra-ui/icons";

const WatchlistCard = ({ type, item, setWatchlist }) => {
    // Hook to handle the remove from watchlist functionality
  const { removeFromWatchlist } = useFirestore();
    // Hook to get the current authenticated user
  const { user } = useAuth();

    // Function to handle the click event of the remove
  const handleRemoveClick = (event) => {
    event.preventDefault(); // Prevent the default behavior (link redirection)
     // Update the watchlist state by filtering out the removed item
    removeFromWatchlist(user?.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
    });
  };

  return (
    <Link to={`/${type}/${item.id}`}>{/* Link to the detailed page of the item */}
      <Flex gap="4"> {/* Container for the card layout */}
        <Box position={"relative"} w={"150px"}>  {/* Container for the image and remove button */}
          <Image
            src={`${imagePath}/${item.poster_path}`} // Poster image of the item
            alt={item.title}
            height={"200px"}
            minW={"150px"}
            objectFit={"cover"} // Image will cover the container
          />
          <Tooltip label="Remove from watchlist">
            <IconButton
              aria-label="Remove from watchlist"
              icon={<CheckIcon />}
              size={"sm"}
              colorScheme="green"
              position={"absolute"}
              zIndex={"999"}
              top="2px"
              left={"2px"}
              onClick={handleRemoveClick}
            />
          </Tooltip>
        </Box>

        <Box>  {/* Container for the text details */}
          <Heading fontSize={{base: 'xl', md: "2xl"}} noOfLines={1}>
            {item?.title || item?.name}  {/* Title of the item */}
          </Heading>
          <Heading fontSize={"sm"} color={"green.200"} mt="2">  {/* Release year of the item */}
            {new Date(
              item?.release_date || item?.first_air_date
            ).getFullYear() || "N/A"}
          </Heading>
          <Flex alignItems={"center"} gap={2} mt="4"> {/* Container for the rating */}
            <StarIcon fontSize={"small"} />
            <Text textAlign={"center"} fontSize="small">
              {item?.vote_average?.toFixed(1)}
            </Text>
          </Flex>
          <Text mt="4" fontSize={{base: "xs", md: "sm"}} noOfLines={5}> {/* Overview of the item */}
            {item?.overview}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default WatchlistCard;