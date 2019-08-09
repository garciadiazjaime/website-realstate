import React from "react";
import PropTypes from "prop-types";

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minPrice: "",
      maxPrice: "",
      keyword: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const filters = JSON.parse(
      (window && window.localStorage.getItem("filters")) || "{}"
    );

    this.setState(filters);
  }

  async handleSubmit(event) {
    event.preventDefault();
    window.localStorage.setItem("filters", JSON.stringify(this.state));
    this.props.search(this.state);
  }

  handleInputChange(event) {
    const {
      target: { value, name }
    } = event;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul className="filters">
          <li>
            <span>Mínimo</span>
            <input
              name="minPrice"
              onChange={this.handleInputChange}
              value={this.state.minPrice}
            />
          </li>
          <li>
            <span>Máximo</span>
            <input
              name="maxPrice"
              onChange={this.handleInputChange}
              value={this.state.maxPrice}
            />
          </li>
          <li>
            <span>Término</span>
            <input
              name="keyword"
              onChange={this.handleInputChange}
              value={this.state.keyword}
            />
          </li>
          <li>
            <input type="submit" value="Buscar" />
          </li>
          <style jsx>{`
            ul {
              background: white;
              list-style-type: none;
              margin: 0;
              padding: 0 12px;
              font-size: 22px;
            }
            li {
              display: flex;
              align-items: flex-end;
            }
            li:last-child {
              flex-direction: row-reverse;
              margin: 6px 0;
            }
            input[type="submit"] {
              border: 1px dotted black;
              background: none;
            }
            span {
              color: #333;
              flex: 1;
              margin: auto 0;
            }
            input {
              flex: 4;
              font-size: 22px;
              border: none;
              border-bottom: 1px dotted black;
              padding: 10px;
            }
          `}</style>
        </ul>
      </form>
    );
  }
}

Filters.propTypes = {
  search: PropTypes.func.isRequired
};

export default Filters;
