import React from "react";
import PropTypes from "prop-types";

function Card({ data, formatter }) {
  return (
    <a key={data._id} href={data.url} target="blank" rel="nofollow">
      <span style={{ backgroundImage: `url("${data.image}")` }}></span>
      <ul>
        <li>
          <strong>
            {formatter.format(data.price)} {data.currency}
          </strong>
        </li>
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
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
  formatter: PropTypes.object.isRequired
};

export default Card;
