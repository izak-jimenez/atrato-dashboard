import { useMemo } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./lib/apollo";
import Navbar from "./components/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RouterBuilder from "./App.router";
import "./App.css";

function App() {
  const routes = useMemo(() => RouterBuilder(), []);
  return (
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={createBrowserRouter(routes)} />
    </ApolloProvider>
  );
}

export default App;
