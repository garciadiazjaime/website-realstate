import React from "react";
import Head from "next/head";

import Header from "../components/header";
import ListItem from "../components/listItems";
import Filters from "../components/filters";

const isBrowser = typeof window !== "undefined";

const API_URL = `http://${
  // eslint-disable-next-line no-undef
  isBrowser !== "production" ? "0.0.0.0:3030" : "api.mintitmedia.com"
}/real-state/place`;

function getPlacesQuery(filters = {}) {
  const { minPrice, maxPrice, keyword } = filters;

  return `
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
          images
          url
          address
        }
      }
    `;
}

async function getPlaces(filters) {
  const payload = {
    query: getPlacesQuery(filters)
  };

  const result = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const {
    data: { places }
  } = await result.json();

  return places;
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.search = this.search.bind(this);
  }

  async componentDidMount() {
    const filters = JSON.parse(window.localStorage.getItem("filters") || "{}");
    const places = await getPlaces(filters);

    this.setState({
      data: places
    });
  }

  async search(filters) {
    const places = await getPlaces(filters);
    this.setState({
      data: places
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Head>
          <title>Propiedades a la Venta en Tijuana, México</title>
          <link rel="icon" type="image/png" href="/static/favicon.png" />
        </Head>
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

export default Home;
