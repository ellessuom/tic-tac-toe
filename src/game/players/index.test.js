import React from 'react';
import { shallow } from 'enzyme';
import PlayersParent from './index';

describe('<PlayersParent />', () => {
  it('should render layout structure correctly', () => {
    const component = shallow(<PlayersParent />);

    expect(component).toMatchSnapshot();
  });

  describe('<PlayersParent />\'s children', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow((<PlayersParent />));
    });

    it('should render both children', () => {
      expect(wrapper.children()).toHaveLength(2);
    });

    it('should render first child with correct playerId prop', () => {
      expect(wrapper.childAt(0).props().playerId).toBe('p1');
    });

    it('should render second child with correct playerId prop', () => {
      expect(wrapper.childAt(1).props().playerId).toBe('p2');
    });
  });
});
