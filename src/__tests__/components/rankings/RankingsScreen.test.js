import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RankingsScreen } from 'ldmaapp/src/components/rankings/RankingsScreen';

Enzyme.configure({ adapter: new Adapter() });

const getRanking = jest.fn();

function setup() {
  const props = {
    getRanking,
  };

  const wrapper = shallow(<RankingsScreen {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('RankingsScreen component', () => {
  it('should renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
