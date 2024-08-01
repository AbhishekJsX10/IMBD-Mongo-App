import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import theme from "../theme.js";
import Home from "./pages/Home.jsx";
import Movies from "./pages/movies/Movies.jsx";
import Shows from "./pages/shows/Shows.jsx";
import Search from "./pages/search/Search.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import { AuthProvider } from "./context/authProvider.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import Protected from "./components/routes/Protected.jsx";
import Login from "./pages/login/Login.jsx"
import SignUp from "./pages/signup/SignUp.jsx";
// import State from "./context/State.jsx"
import State from "./context/State.jsx"
import MongoWatchlist from "./pages/MongoDbWatchlist/MongoWatchlist.jsx";
import DetailsPage2 from "./pages/DetailsPage2.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/shows",
        element: <Shows />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/:type/:id",
        // element: <DetailsPage />,
        element: <DetailsPage2 />,
      },
      {
        path: "/mongo-watchlist",
        element: <MongoWatchlist />,
      },
      {
        path: "/watchlist",
        element: (
          <Protected>
            <Watchlist />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <State>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      </State>
    </ChakraProvider>
  </React.StrictMode>
);
