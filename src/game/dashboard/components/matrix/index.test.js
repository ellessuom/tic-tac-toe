import React from 'react';
import { shallow } from 'enzyme';
import Matrix from './index';

describe('<Matrix />', () => {
  it('should render Matrix structure correctly', () => {
    const component = shallow(<Matrix />);
    expect(component).toMatchSnapshot();
  });

  it('should contain all 9 tiles', () => {
    const component = shallow(<Matrix />);
    expect(component.children()).toHaveLength(9);
  });
});
