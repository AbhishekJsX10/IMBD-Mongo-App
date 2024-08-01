

// This is the iFrame component in which different related YouTube links appear
// It is used on the DetailsPage to display individual video details

import PropTypes from "prop-types";

const VideoComponent = ({ id, small }) => {
  return (
    <iframe
      width="100%" // The width of the iframe will take up 100% of its container
      height={small ? "150" : "500"} // Conditionally set the height based on the 'small' prop
      src={`https://www.youtube.com/embed/${id}`} // YouTube embed URL using the video ID
      title="YouTube video player" // Title attribute for accessibility
      allowFullScreen // Allow fullscreen mode for the video
    ></iframe>
  );
};

// PropTypes to enforce the type and presence of props
VideoComponent.propTypes = {
  id: PropTypes.string.isRequired, // 'id' prop is required and should be a string
  small: PropTypes.bool, // 'small' prop is optional and should be a boolean
};

export default VideoComponent;
