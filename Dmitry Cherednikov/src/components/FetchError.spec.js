import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FetchError from './FetchError';

const setup = () => {
  const props = {
    message: 'Something went wrong',
    onRetry: jest.fn(),
  };

  const output = shallow((
    <FetchError { ...props } />
  ));

  return {
    output,
    props,
  }
};

describe('<FetchError />', () => {
  it('renders component', () => {
    const { output } = setup();

    expect(toJson(output)).toMatchSnapshot();
  });

  it('successfully calls the onClick handler', () => {
    const { output, props } = setup();

    output.find('button').simulate('click');
    expect(props.onRetry.mock.calls.length).toEqual(1);
  })
});
