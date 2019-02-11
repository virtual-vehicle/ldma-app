import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SafeDrivingScreen } from '../../../components/safe-driving/SafeDrivingScreen';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
  };

  const wrapper = shallow(<SafeDrivingScreen {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('SafeDrivingScreen component', () => {
  it('should renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
