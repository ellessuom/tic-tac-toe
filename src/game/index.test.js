import React from 'react';
import { shallow } from 'enzyme';
import Game from './index';

describe('<Game />', () => {
  it('should render app structure correctly', () => {
    const component = shallow(<Game />);

    expect(component).toMatchSnapshot();
  });
});
