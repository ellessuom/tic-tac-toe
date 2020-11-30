import React from 'react';
import { mount } from 'enzyme';
import BasePlayer from './index';

const fakeUseData = [
  {
    fake1: {
      wins: 3 // Random number, different from the default which is 0
    }
  }
];

const fakeLabels = {
  fake1: 'Player Fake'
};

jest.mock('./labels', () => fakeLabels);

jest.mock('../../../context', () => {
  return {
    useData: jest.fn(() => fakeUseData)
  };
});

describe('<BasePlayer />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <BasePlayer playerId="fake1" />
    );
  });

  it('should render <BasePlayer /> structure correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('<BasePlayer />\s children', () => {
    it('should have the expected title', () => {
      expect(wrapper.find('.title').text()).toBe(fakeLabels.fake1);
    });

    it('should have the expected value for wins', () => {
      expect(wrapper.find('.paragraph').text()).toBe(`Wins: ${fakeUseData[0].fake1.wins}`);
    });
  })
});
