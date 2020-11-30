import React from 'react';
import { mount } from 'enzyme';
import Status from './index';
import { useData } from "../../../context";

const fakeUseData = [
  {
    winner: null,
    isTie: false,
    usedTiles: [],
    currentPlayer: null,
  }
];

jest.mock('../../../context');

describe('<Status />', () => {
  let wrapper;
  const init = (payload) => {
    useData.mockImplementation(() => payload);
    return mount(<Status />);
  };
  beforeAll(() => {
    wrapper = init(fakeUseData);
  });

  it('should render default title', () => {
    expect(wrapper.find('.subtitle').text()).toBe('Select a tile to start the game!');
  });

  describe('rendering title for player one as winner', () => {
    beforeAll(() => {
      wrapper = init(([{ winner: 'p1' }]));
    });
    it('should render the expected title', () => {
      expect(wrapper.find('.subtitle').text()).toBe('Player One won the game!');
    });
  });

  describe('rendering title for player two as winner', () => {
    beforeAll(() => {
      wrapper = init(([{ winner: 'p2' }]));
    });
    it('should render the expected title', () => {
      expect(wrapper.find('.subtitle').text()).toBe('Player Two won the game!');
    });
  });

  describe('rendering title for tie', () => {
    beforeAll(() => {
      wrapper = init(([{
        winner: null,
        isTie: true
      }]));
    });
    it('should render the expected title', () => {
      expect(wrapper.find('.subtitle').text()).toBe('No one wins this time!');
    });
  });

  describe('rendering title for Player One turn', () => {
    beforeAll(() => {
      wrapper = init(([{
        currentPlayer: 'p1',
      }]));
    });
    it('should render the expected title', () => {
      expect(wrapper.find('.subtitle').text()).toBe('Is Player One turn');
    });
  });

  describe('rendering title for Player Two turn', () => {
    beforeAll(() => {
      wrapper = init(([{
        currentPlayer: 'p2',
      }]));
    });
    it('should render the expected title', () => {
      expect(wrapper.find('.subtitle').text()).toBe('Is Player Two turn');
    });
  });
});
