// to be refactored

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Page = ({ name, id, catched }) => {
  let elem;
  if (catched) {
    elem = (
      <p>
        {catched.date}
      </p>
    )
  } else {
    elem = (
      <p>
        Not yet catched
      </p>
    )
  }

  if (!name) {
    return (
      <div>
        <p>Couldn't fetch your pokemon</p>
      </div>
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
};

export default Page;