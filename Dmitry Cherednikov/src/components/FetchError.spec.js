import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FetchError from './FetchError';

describe('<FetchError />', () => {
  it('renders the component', () => {
    const mockOnClick = jest.fn();
    const errorMessage = 'Something went wrong';
    const wrapper = shallow((
      <FetchError
        message={errorMessage}
        onRetry={mockOnClick}
      />
    ));

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('successfully calls the onClick handler', () => {
    const mockOnClick = jest.fn();
    const errorMessage = 'Something went wrong';
    const wrapper = shallow((
      <FetchError
        message={errorMessage}
        onRetry={mockOnClick}
      />
    ));

    wrapper.find('button').simulate('click');
    expect(mockOnClick.mock.calls.length).toEqual(1)
  })
});
