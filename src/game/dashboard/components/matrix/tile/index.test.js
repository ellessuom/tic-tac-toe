import React from 'react';
import { mount } from 'enzyme';
import Tile from './index';
import { useData } from "../../../../context";

const TILE_IDX = 3;
const fakeUseData = [
  {
    canPlay: true,
    usedTiles: [],
    winnerPattern: '',
    currentPlayer: 'p1',
    p1: {
      selectedTiles: []
    },
    p2: {
      selectedTiles: []
    }
  }
];

jest.mock('../../../../context');

describe('<Tile />', () => {
  let wrapper;
  const fakeActions = { play: jest.fn()};
  const init = (payload) => {
    useData.mockImplementation(() => payload);
    return mount(<Tile i={TILE_IDX}/>);
  };

  beforeAll(() => {
    wrapper = init(fakeUseData);
  });

  it('should render the default tile', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default \'available\' class', () => {
    expect(wrapper.find('div').hasClass('available')).toEqual(true);
  });

  describe('onClick - available tile', () => {
    const generateFakeData = (playerId) => ({
      canPlay: true,
      usedTiles: [],
      winnerPattern: '',
      currentPlayer: playerId,
    });


    describe('Player One', () => {
      beforeAll(() => {
        wrapper = init([generateFakeData('p1'), fakeActions]);
        wrapper.find('div').simulate('click');
      });

      it('should have \'used\' class', () => {
        expect(wrapper.find('div').hasClass('used')).toEqual(true);
      });

      it(`should contain 'X' mark`, () => {
        expect(wrapper.find('img').props().alt).toEqual('X');
      });
    });

    describe('Player Two', () => {
      beforeAll(() => {
        wrapper = init([generateFakeData('p2'), fakeActions]);
        wrapper.find('div').simulate('click');
      });

      it('should have \'used\' class', () => {
        expect(wrapper.find('div').hasClass('used')).toEqual(true);
      });

      it(`should contain 'O' mark`, () => {
        expect(wrapper.find('img').props().alt).toEqual('O');
      });
    });
  });

  describe('onClick - used tile', () => {
    const generateFakeData = (playerId) => ({
      canPlay: true,
      usedTiles: [TILE_IDX],
      winnerPattern: '',
      currentPlayer: playerId,
      p1: {
        selectedTiles: [TILE_IDX]
      }
    });

    beforeAll(() => {
      wrapper = init([generateFakeData('p1'), fakeActions]);
      wrapper.find('div').simulate('click');
    });

    it('should have \'used\' class when clicked once', () => {
      expect(wrapper.find('div').hasClass('used')).toEqual(true);
    });

    it(`should not have changed when clicked again`, () => {
      wrapper.find('div').simulate('click');
      expect(wrapper).toMatchSnapshot();
    });

    describe('Player Two', () => {
      beforeAll(() => {
        wrapper = init([generateFakeData('p2'), fakeActions]);
        wrapper.find('div').simulate('click');
      });

      it('should have \'used\' class', () => {
        expect(wrapper.find('div').hasClass('used')).toEqual(true);
      });

      it(`should not have changed when clicked again`, () => {
        wrapper.find('div').simulate('click');
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
