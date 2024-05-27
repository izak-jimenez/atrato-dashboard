import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: `${process.env.REACT_APP_ATRATO_GRAPHQL_API_BASE_URI}/atrato/graphql/api`,
  cache: new InMemoryCache(),
});
