import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ModalSimple from '../../../components/common/ModalSimple';

Enzyme.configure({ adapter: new Adapter() });

const headline = 'This is test headline';
const content = 'This is tect content for the modal simple';

describe('ModalSimple component', () => {
  it('renders correctly with all props', () => {
    const onButtonPressMock = jest.fn();
    const wrapper = shallow(<ModalSimple
      isVisible
      onPress={onButtonPressMock}
      headline={headline}
      content={content}
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders correctly without content', () => {
    const onButtonPressMock = jest.fn();
    const wrapper = shallow(<ModalSimple
      isVisible
      onPress={onButtonPressMock}
      headline={headline}
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('close/hide the modal', () => {
    const onButtonPressMock = jest.fn();
    const wrapper = shallow(<ModalSimple
      isVisible
      onPress={onButtonPressMock}
      headline={headline}
      content={content}
    />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ isVisible: false });
    expect(wrapper).toMatchSnapshot();
  });
  it('simulate click OK', () => {
    const onButtonPressMock = jest.fn();
    const wrapper = shallow(<ModalSimple
      isVisible
      onPress={onButtonPressMock}
      headline={headline}
      content={content}
    />);
    expect(wrapper).toMatchSnapshot();
    const buttonElement = wrapper.find('Text').at(2); // step 1, find OK (third text)
    buttonElement.simulate('click'); // step 2, click OK,
    expect(wrapper).toMatchSnapshot();
  });
});
