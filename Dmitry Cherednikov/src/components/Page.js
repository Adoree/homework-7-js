import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Page = ({ name, id, date }) => {
  let elem;

  if (date) {
    elem = (
      <p>
        {date}
      </p>
    )
  } else {
    elem = (
      <p>
        Not yet catched
      </p>
    )
  }

  return (
    <div className="page">
      <img
        src={`https://raw.githubusercontent.com/epam-js-may-2018/homework-7-js/master/pokemons/${id}.png`}
        className="img img-large"
        alt={`${name}.png`}
      />
      <h1>
        {name}
      </h1>
      {elem}
      <Link
        to='/pokemons'
      >
        Back
      </Link>
    </div>
  )
};

Page.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  date: PropTypes.string,
};

export default Page;