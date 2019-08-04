import React from "react";
import PropTypes from "prop-types";

import Card from "./card";

function gerFormatter(locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0
  });
}

function getLocale(data) {
  if (data.currency === "MXN") {
    return {
      locale: "es-MX",
      currency: "MXN"
    };
  }

  return {
    locale: "en-US",
    currency: "USD"
  };
}

function convertToUSD(item) {
  if (item.currency === "USD") {
    return item;
  }

  const rate = 20;

  item.currency = "USD";
  item.price /= rate;

  return item;
}

function sortByPrice(data) {
  return data.map(convertToUSD).sort((a, b) => a.price - b.price);
}

function ListItems({ data }) {
  if (!data || !data.length) {
    return null;
  }
  const sortedItems = sortByPrice(data);

  const { locale, currency } = getLocale(sortedItems[0]);
  const formatter = gerFormatter(locale, currency);

  return (
    <div>
      {sortedItems.map(item => (
        <Card data={item} formatter={formatter} key={item._id} />
      ))}
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
          font-family: PostGrotesk, system, -apple-system, Roboto, Segoe UI Bold,
            Arial, sans-serif;
        }
      `}</style>
    </div>
  );
}

ListItems.propTypes = {
  data: PropTypes.array
};

export default ListItems;
