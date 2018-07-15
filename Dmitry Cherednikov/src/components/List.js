import React from 'react';
import PropTypes from 'prop-types';
import PokeItem from '../containers/PokeItem';

const List = ({
  list,
  catched,
  isFetchedAll,
  onClick,
  isFetching,
}) => (
  <div>
    <ul className="list">
      {list.map(elem => (
        <PokeItem catched={catched} key={elem.id} {...elem} />
      ))}
    </ul>
    {!isFetchedAll && !!list.length &&
      <button
        onClick={onClick}
        className="button button-load"
      >
        {isFetching ? 'loading': 'load'}
      </button>
    }
  </div>
);

List.propTypes = {
  isFetchedAll: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  catched: PropTypes.bool,
};

export default List;