import React from 'react';
import { mount } from 'enzyme';
import Footer from './index';
import { useData } from "../../../context";

jest.mock('../../../context');

describe('<Footer />', () => {
  let wrapper;
  const init = (payload) => {
    useData.mockImplementation(() => payload);
    return mount(<Footer />);
  };
  beforeAll(() => {
    wrapper = init(([{ winner: null, usedTiles: [] }]));
  });

  it('should not render button when no tiles have been used', () => {
    expect(wrapper.children()).toHaveLength(1); // <div className="footer" />
  });

  describe('rendering button when winning', () => {
    beforeAll(() => {
      wrapper = init(([{ winner: 'p1', usedTiles: [0] }]));
    });

    it('should render expected title when someone wins', () => {
      expect(wrapper.find('.footer').text()).toBe('Play again');
    });
  });

  describe('rendering button when playing', () => {
    beforeAll(() => {
      wrapper = init(([{ winner: '', usedTiles: [0] }]));
    });

    it('should render expected title during the game', () => {
      expect(wrapper.find('.footer').text()).toBe('Restart');
    });
  });

  describe('onClick', () => {
    const mockStartGame = jest.fn();
    const fakeData = { winner: '', usedTiles: [0] };
    const fakeActions = { startGame: mockStartGame };
    beforeAll(() => {
      wrapper = init([fakeData, fakeActions]);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });
    it ('should trigger \'startGame\' function', () => {
      wrapper.find('button').simulate('click');
      expect(mockStartGame).toHaveBeenCalledTimes(1);
    });
  });
});
