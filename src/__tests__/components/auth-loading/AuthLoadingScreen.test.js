import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AuthLoadingScreen } from 'ldmaapp/src/components/auth-loading/AuthLoadingScreen';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
  };

  const wrapper = shallow(<AuthLoadingScreen {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('Link component', () => {
  it('should renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
