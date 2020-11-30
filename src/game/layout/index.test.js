import React from 'react';
import { shallow } from 'enzyme';
import Layout from './index';

describe('<Layout />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <Layout>
        <div className="layout-test" />
      </Layout>
    );
  });

  it('should have rendered single child', () => {
    expect(wrapper.children()).toHaveLength(1);
  });

  it('should render layout structure correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render layout with correct test child', () => {
    expect(wrapper.contains(<div className="layout-test" />)).toBe(true);
  });

});
