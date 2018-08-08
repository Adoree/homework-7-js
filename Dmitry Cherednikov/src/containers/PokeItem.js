import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { catchPokemon } from '../actions';

let PokeItem = ({
  name,
  id,
  date,
  catched,
  onClick,
}) => ((
  <li>
    <img
      src={`https://raw.githubusercontent.com/epam-js-may-2018/homework-7-js/master/pokemons/${id}.png`}
      className="img-small"
      alt={`${name}.png`}
    />
    <h3>
      <Link
        to={`/pokemons/${id}`}
      >
        {name}
      </Link>
    </h3>
    {!catched &&
      <button
        disabled={date}
        onClick={() => onClick(id, name)}
        className={!date ? 'button button-active' : 'button button-disabled'}
      >
        {date ? 'catched' : 'catch'}
      </button>
    }
    {date &&
      <span>
        {date}
      </span>
    }
  </li>
));

const mapDispatchToProps = (dispatch) => ({
  catchPokemon: bindActionCreators(catchPokemon, dispatch),
});

PokeItem = connect(null, mapDispatchToProps)(PokeItem);

export default PokeItem;