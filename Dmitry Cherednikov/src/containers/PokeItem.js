// to be refactored

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { catchPokemon } from '../actions';

class PokeItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  };

  static defaultProps = {
    catchPokemon: () => {},
  };

  handleClick = () => {
    const {id, name, catchPokemon } = this.props;
    catchPokemon(id, name);
  };

  render() {
    const { name, id, catched } = this.props;

    let date;

    if (catched) {
      date = (
        <span>
          {catched.date}
        </span>
      )
    }

    return (
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
        <button
          disabled={catched}
          onClick={this.handleClick}
          className={!catched ? 'button button-active' : 'button button-disabled'}
        >
          {catched ? 'catched' : 'catch'}
        </button>
        {catched && date}
      </li>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  catchPokemon: bindActionCreators(catchPokemon, dispatch),
});

PokeItem = connect(null, mapDispatchToProps)(PokeItem);

export default PokeItem;