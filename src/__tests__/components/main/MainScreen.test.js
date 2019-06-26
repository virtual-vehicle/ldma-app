import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { HomeScreen } from 'ldmaapp/src/components/home/HomeScreen';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    getTripsInfo: jest.fn(),
    getGraphTripscore: jest.fn(),
  };

  const wrapper = shallow(<HomeScreen {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('HomeScreen component', () => {
  it('should renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
