import React from 'react';
import PropTypes from 'prop-types';

const Page = ({
  name,
  id,
  date,
  onBack,
}) => {
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
      <a
        className=""
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
      >
        Back
      </a>
    </div>
  )
};

Page.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  date: PropTypes.string,
  onBack: PropTypes.func.isRequired,
};

export default Page;