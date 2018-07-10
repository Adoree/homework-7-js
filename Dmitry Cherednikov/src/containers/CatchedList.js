import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FetchError from '../components/FetchError';
import CatchedItem from './CatchedItem';
import { getCatchedPokemons, getError, getFetchedAllCatched } from '../reducers';
import { fetchCatchedPokemons } from '../actions';

class CatchedList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    fetchedAllCatched: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    fetchCatchedPokemons: () => {},
  };

  fetchPokemons = () => {
    this.props.fetchCatchedPokemons();
  };

  render() {
    const { list, error, fetchedAllCatched } = this.props;
    if (error && !list.length) {
      return (
        <FetchError
          message={error}
          onRetry={this.fetchPokemons}
        />
      )
    }

    return (
      <div className="wrapper">
        <ul
          className="list"
        >
          {list.map(elem => (
            <CatchedItem key={elem.id} {...elem} />
          ))}
        </ul>
        {!fetchedAllCatched &&
          <button
            className="button button-load"
            onClick={this.fetchPokemons}
          >
            load
          </button>
        }
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  list: getCatchedPokemons(state),
  fetchedAllCatched: getFetchedAllCatched(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCatchedPokemons: bindActionCreators(fetchCatchedPokemons, dispatch)
});

CatchedList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CatchedList);



export default CatchedList;