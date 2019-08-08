import React from "react";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-unfetch";
import { ApolloProvider, Query } from "react-apollo";

import ListItem from "../components/listItems";

const isBrowser = typeof window !== "undefined";

const API_URL =
  process && process.env.NODE_ENV !== "production"
    ? "http://0.0.0.0:3030/real-state/place"
    : "http://api.mintitmedia.com/real-state/place";

const client = new ApolloClient({
  link: new HttpLink({
    uri: API_URL,
    fetch: !isBrowser && fetch
  }),
  cache: new InMemoryCache()
});

const query = gql`
  query RealState {
    places(first: 100) {
      _id
      price
      currency
      description
      latitude
      longitude
      image
      url
      address
      city
      source
      updatedAt
    }
  }
`;

function Home() {
  return (
    <ApolloProvider client={client}>
      <Query query={query}>
        {({ data }) => <ListItem data={data && data.places} />}
      </Query>
    </ApolloProvider>
  );
}

export default Home;
