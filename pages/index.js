import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-unfetch";
import { ApolloProvider, withApollo } from "react-apollo";

import Header from "../components/header";
import ListItem from "../components/listItems";
import Filters from "../components/filters";

const isBrowser = typeof window !== "undefined";

const API_URL = `http://${
  // eslint-disable-next-line no-undef
  process && process.env.NODE_ENV !== "production"
    ? "0.0.0.0:3030"
    : "api.mintitmedia.com"
}/real-state/place`;

const client = new ApolloClient({
  link: new HttpLink({
    uri: API_URL,
    fetch: !isBrowser && fetch
  }),
  cache: new InMemoryCache()
});

function getPlacesQuery(filters = {}) {
  const { minPrice, maxPrice, keyword } = filters;

  return gql`
      query RealState {
        places(
          first: 100
          ${minPrice ? `minPrice: ${minPrice}` : ""}
          ${maxPrice ? `maxPrice: ${maxPrice}` : ""}
          ${keyword ? `keyword: "${keyword}"` : ""}
        ) {
          _id
          price
          currency
          description
          latitude
          longitude
          images
          url
          address
          city
          source
          updatedAt
        }
      }
    `;
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.search = this.search.bind(this);
  }

  async componentDidMount() {
    const filters = JSON.parse(window.localStorage.getItem("filters") || "{}");
    const result = await this.props.client.query({
      query: getPlacesQuery(filters)
    });
    this.setState({
      data: result.data.places
    });
  }

  async search(filters) {
    const result = await this.props.client.query({
      query: getPlacesQuery(filters)
    });
    this.setState({
      data: result.data.places
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Header />
        <Filters search={this.search} />
        <ListItem data={data} />
        <style global jsx>{`
          body {
            margin: 0px;
            font-family: PostGrotesk, system, -apple-system, Roboto,
              Segoe UI Bold, Arial, sans-serif;
          }
        `}</style>
      </div>
    );
  }
}

Home.propTypes = {
  client: PropTypes.object.isRequired
};

const HomeWrapper = withApollo(Home);

function HomeHOC() {
  return (
    <ApolloProvider client={client}>
      <HomeWrapper />
    </ApolloProvider>
  );
}

export default HomeHOC;
