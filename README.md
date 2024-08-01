
# IMDB - Redesigned Tvshows and Movies Application

## Links:

- **Deployment URL:** https://imdb-redesigned.vercel.app/

## About the App:

This project is a clone of IMDb, the popular movie and TV show database. It is built using React.js, Chakra UI for the frontend, and Firebase for the backend services. The application leverages the TMDB API for fetching movie and TV show data and includes features like watchlist functionality and Google authentication.

## Technologies Used:

- **React:** A JavaScript library designed for creating dynamic user interfaces.
- **Redux Toolkit:** A library for efficiently managing and centralizing application state.
- **Chakra-UI:** A popular React component library that implements Google's Material Design guidelines, providing a rich set of customizable components.
- **Firebase:** A comprehensive platform that enables the development of web and mobile applications without the need for server-side programming. 

## Features:

- **Authentication:**
 Robust and seamless user authentication with Firebase, guaranteeing data privacy and security. Sign in with Google to save your watchlist.

- **Trending Movies and TV Shows:**
  Displays trending movies and TV shows for the day or week.

- **Search Functionality:**
  Enhanced user convenience with an integrated search feature, allowing users to easily  search for movies, TV shows, and people.Utilizes dynamic filtering and sorting based on TV show / Movie attributes.

- **Responsive UI:**
  A highly adaptive interface designed with Tailwind CSS, ensuring a smooth shopping experience on all devices.

- **Movie and TV Show Details:**
   A visually captivating and well-organized presentation of a diverse range of view detailed information about movies and TV shows including credits and trailers.

- **Watchlist:**
  Add or remove movies and TV shows from your personal watchlist.

## How to Run:

### **Clone the repository:**https://github.com/AbhishekJsX10/IMDB-Redesigned.git

```bash
git clone 
cd imdb-clone
```

### **Install the dependencies:**

```bash
npm install 
```

### **Run the development server:**

```bash
npm run dev
```

### **Build for production:**

```bash
npm run build
```
### **Environment Variables:**

```bash
VITE_API_KEY=your_tmdb_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

## Folder Structure

```plaintext```
<pre>
IMDB-clone/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── routes/
|   |   |   ├── Protected.jsx
│   │   ├── Banner/
│   │   │   ├── Banner.jsx
│   │   ├── SpecialBanner/
│   │   │   ├── Banner.css
│   │   │   ├── bg.png
│   │   │   ├── model.png
│   │   │   ├── SpecialBanner.jsx
│   │   ├── CardComponent.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── PaginationComponent.jsx
│   │   ├── VideoComponent.jsx
│   │   ├── WatchlistCard.jsx
│   ├── context/
│   │   ├── authProvider.jsx
│   │   ├── useAuth.js
│   ├── pages/
│   │   ├── movies/
│   │   |   ├── Movies.jsx
│   │   ├── search/
│   │   |   ├── Search.jsx
│   │   ├── shows/
│   │   |   ├── Shows.jsx
│   │   ├── DetailsPage.jsx
│   │   ├── Home.jsx
│   │   ├── Watchlist.jsx
│   ├── services/
│   |   ├── api.js
│   |   ├── firebase.js
│   |   ├── firestore.js
│   ├── utils/
│   │   ├── helpers.js
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .env
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── theme.js
├── vite.config.js
</pre>

## Documentation and Deployment

### Development Process

IMDB was created to offer a seamless tvshow and movie checking experience by utilizing cutting-edge web development technologies and best practices. The development process comprised several critical phases:

1. **Planning and Design:** Prior to coding, a meticulous plan and design phase established the app's structure, features, and user interface. This included developing wireframes and mockups to visualize the final product.

2. **Setting up the Environment:** The development environment was set up with essential tools and libraries, including React, TMDB Api, Chakra UI, and Firebase, chosen as the foundational technologies for the app's construction. 

3. **Feature Implementation:** Key functionalities, including authentication, wishlist management, movie/tvshow showcasing, category-based filtering, and trending and recommended section, were implemented with a focus on enhancing user experience and functionality.

4. **Testing and Debugging:** Thorough testing and debugging were conducted throughout the development phase to identify and resolve any issues. Cross-browser and device testing were performed to guarantee compatibility and responsiveness. Unit testing was employed for critical components and integration testing to ensure seamless interaction between modules.

5. **Optimization and Performance:** Techniques for optimizing performance were implemented to enhance the app's speed and efficiency. This involved strategies such as code splitting, lazy loading, and image optimization to reduce loading times and elevate overall performance.

6. **Documentation:** Thorough documentation was developed to facilitate the setup, usage, and deployment of the application. It includes clear instructions and explanations for each step, ensuring developers and users can effectively understand and utilize the app.

### Challenges Faced and Solutions Implemented

#### Authentication and Security

**Challenge:**  Ensuring secure user authentication and data privacy using Firebase.

**Solution:** Leveraged Firebase Authentication to establish secure user authentication through google pop-up, prioritizing data protection and privacy. Implemented stringent security rules to control access to sensitive data and mitigate unauthorized actions.

#### Wishlist Management

**Challenge:** Creating an efficient Wishlist management system with seamless add, remove, and uniquness made available for every user.

**Solution:** Developed a robust wishlist management system using Firebase database and connecting it with firebase authentication, enabling smooth operations for adding, removing, and updating movies/TV shows in the Wishlist Page.

#### Responsive UI

**Challenge:** Designing a highly responsive user interface that maintains consistency across all devices.

**Solution:**  Employed Chakra-UI to develop a responsive UI capable of adapting to different screen sizes and resolutions. Implemented responsive design strategies and media queries to ensure optimal layout and usability across desktops, tablets, and mobile devices.

### Deployment

#### Deployment Steps

1. **Fork the Repository:** https://github.com/AbhishekJsX10/IMDB-Redesigned.git to your local machine.
2. Sign up for a Vercel account if you haven't already done so.
3. After logging in, navigate to the Vercel dashboard and click on "New Project."
4. Choose "Import Git Repository" and connect your GitHub account if required.
5. Select the forked repository (IMDB-clone) from your GitHub repositories.
6. Configure project settings according to your requirements.
7. Set up environment variables, including your Firebase credentials, in the Vercel dashboard.
8. Finally, click on "Deploy" and monitor the deployment process until it finishes successfully.

#### Access the Deployed Application:

- Once deployed, the IMDB web application will be accessible via the provided deployment URL.
- Users can simply visit this URL to access the application.

