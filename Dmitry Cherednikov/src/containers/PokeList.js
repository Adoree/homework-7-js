import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FetchError from '../components/FetchError';
import PokeItem from './PokeItem';
import { getPokemons, getError, getFetchedAllPokemons } from '../reducers'
import { fetchPokemons } from '../actions';

class PokeList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    fetchedAllPokemons: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    fetchPokemons: () => {},
  };

  fetchPokes = () => {
    this.props.fetchPokemons();
  };

  render() {
    const { list, error, fetchedAllPokemons } = this.props;
    if (!list.length && error) {
      return (
        <FetchError
          message={error}
          onRetry={this.fetchPokes}
        />
      )
    }

    return (
      <div>
        <ul
          className="list"
        >
          {this.props.list.map(elem => (
            <PokeItem key={elem.id} {...elem} />
          ))}
        </ul>
        {!fetchedAllPokemons &&
          <button
            onClick={this.fetchPokes}
            className="button button-load"
          >
            load
          </button>
        }
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  list: getPokemons(state),
  error: getError(state),
  fetchedAllPokemons: getFetchedAllPokemons(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPokemons: bindActionCreators(fetchPokemons, dispatch)
});

PokeList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokeList);

export default PokeList;