import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Loader from 'ldmaapp/src/components/common/Loader';

Enzyme.configure({ adapter: new Adapter() });

describe('Loader component', () => {
  it('renders correctly in black color', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly in white color and again in black color', () => {
    const wrapper = shallow(<Loader white />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ white: false });
    expect(wrapper).toMatchSnapshot();
  });
});
