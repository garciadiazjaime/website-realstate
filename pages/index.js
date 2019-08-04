import React from 'react'
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch'

import { ApolloProvider, Query } from 'react-apollo';
const isBrowser = typeof window !== 'undefined'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3030/real-state',
    fetch: !isBrowser && fetch
  }),
  cache: new InMemoryCache(),
});

const query = gql`
  query RealState {
    places(first: 100){
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
      created
    }
  }  
`;

function Card({data, formatter}) {
  return (
    <a key={data._id} href={data.url} target="blank" rel="nofollow">
      <span style={{ backgroundImage: `url("${data.image}")`}}></span>
      <ul>
        <li><strong>{formatter.format(data.price)} {data.currency}</strong></li>
        <li>{data.description}</li>
        <li className="address">{data.address}</li>
      </ul>
      <style jsx>{`
        a {
          width: 100%;
          max-width: 420px;
          margin-bottom: 12px;
          background: white;
          position: relative;
          text-decoration: none;
          color: #3b4144;
        }
        span {
          display: block;
          width: 100%;
          height: 250px;
          background-size: cover;
        }
        ul {
          list-style-type: none;
          padding: 0 12px 12px;
          margin: 0;
        }
        li {
          padding: 12px 0 0;
        }
        .address {
          color: #869099;
        }
        strong {
          font-size: 1.4em;
          color: black;
        }
        
        @media (max-width: 600px) {
          
        }
      `}</style>
    </a>
  )
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
  formatter: PropTypes.object.isRequired
}


function gerFormatter(locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  })
}

function getLocale(data) {
  if (data.currency === 'MXN') {
    return {
      locale: 'es-MX',
      currency: 'MXN'
    }
  }

  return {
    locale: 'en-US',
    currency: 'USD'
  }
}

function convertToUSD(item) {
  if (item.currency === 'USD') {
    return item
  }

  const rate = 20;

  item.currency = 'USD'
  item.price /= rate;

  return item
}

function sortByPrice(data) {
  return data
    .map(convertToUSD)
    .sort((a, b) => a.price - b.price)
}

function renderItems(data) {
  if (!data || !data.places || !data.places.length) {
    return null
  }

  const sortedItems = sortByPrice(data.places)

  const { locale, currency } = getLocale(sortedItems[0])
  const formatter = gerFormatter(locale, currency)


  return <div>
    { sortedItems.map(item => <Card data={item} formatter={formatter} key={item._id} /> )}
    <style jsx>{`
      div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        justify-content: space-evenly;
      }
    `}</style>
    <style global jsx>{`
      body {
        margin: 0px;
        background: #e8e9ea;
        font-family: PostGrotesk,system,-apple-system,Roboto,Segoe UI Bold,Arial,sans-serif;
      }
    `}</style>
  </div>
}

function Home() {
  return (
    <ApolloProvider client={client}>
      <Query query={query}>
        {({ data }) => renderItems(data)}
      </Query>
    </ApolloProvider>
  );
}

export default Home
