


// The Pagination component used throughout the application
// It inherits active page state and its update function along with the total number of pages

// imports
import { Button, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const PaginationComponent = ({ activePage, totalPages, setActivePage }) => {
  return (
    <Flex gap={"2"} alignItems={"center"}> {/* Container for pagination controls */}
      <Flex gap={"2"} maxW={"250px"} my="10"> {/* Container for Prev and Next buttons */}
        <Button
          onClick={() => setActivePage(activePage - 1)} // Decrement active page
          isDisabled={activePage === 1} // Disable if on the first page
        >
          Prev
        </Button>
        <Button
          onClick={() => setActivePage(activePage + 1)} // Increment active page
          isDisabled={activePage === totalPages} // Disable if on the last page
        >
          Next
        </Button>
      </Flex>
      <Flex gap="1"> {/* Container for displaying current page and total pages */}
        <Text>{activePage}</Text> {/* Current active page */}
        <Text>of</Text>
        <Text>{totalPages}</Text> {/* Total number of pages */}
      </Flex>
    </Flex>
  );
};

// PropTypes to enforce the type and presence of props
PaginationComponent.propTypes = {
  activePage: PropTypes.number.isRequired, // 'activePage' prop is required and should be a number
  totalPages: PropTypes.number.isRequired, // 'totalPages' prop is required and should be a number
  setActivePage: PropTypes.func.isRequired, // 'setActivePage' prop is required and should be a function
};

export default PaginationComponent;
