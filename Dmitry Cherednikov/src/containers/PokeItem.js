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
    date: PropTypes.string,
    catchPokemon: PropTypes.func.isRequired,
  };

  static defaultProps = {
    catchPokemon: () => {},
  };

  handleClick = () => {
    const {id, name, catchPokemon } = this.props;
    catchPokemon(id, name);
  };

  render() {
    const { name, id, date } = this.props;

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
        {!this.props.catched &&
          <button
            disabled={date}
            onClick={this.handleClick}
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
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  catchPokemon: bindActionCreators(catchPokemon, dispatch),
});

PokeItem = connect(null, mapDispatchToProps)(PokeItem);

export default PokeItem;