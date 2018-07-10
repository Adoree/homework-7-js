import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PokeItem = ({ name, id, date }) => (
  <li>
    <img
      src={`https://raw.githubusercontent.com/epam-js-may-2018/homework-7-js/master/pokemons/${id}.png`}
      className="img img-small"
      alt={`${name}.png`}
    />
    <h3>
      <Link
        to={`/pokemons/${id}`}
      >
        {name}
      </Link>
    </h3>
    <span>
      {date}
    </span>
  </li>
);

PokeItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export default PokeItem;