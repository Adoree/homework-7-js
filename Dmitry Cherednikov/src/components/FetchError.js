import React from 'react';
import PropTypes from 'prop-types';

const FetchError = ({
  message,
  onRetry
}) => (
  <div>
    <p>
      {message}
    </p>
    <button
      className="button button-load"
      onClick={onRetry}
    >
      retry
    </button>
  </div>
);

FetchError.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired
};

export default FetchError;