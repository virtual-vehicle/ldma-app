import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Menu } from 'ldmaapp/src/components/common/Menu';

Enzyme.configure({ adapter: new Adapter() });

const user = {
  email: 'test@email.com',
  auth_token: 'token',
};

describe('Menu component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Menu user={user} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('check the texts', () => {
    const wrapper = shallow(<Menu user={user} />);
    expect(wrapper.find('Text')).toHaveLength(11);
  });
});
