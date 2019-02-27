import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MainScreen } from 'ldmaapp/src/components/main/MainScreen';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    getTripsInfo: jest.fn(),
  };

  const wrapper = shallow(<MainScreen {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('MainScreen component', () => {
  it('should renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
