import React from 'react';
import { shallow } from 'enzyme';
import * as DataContext from './index';
import { INIT } from "./actions";

const TILE_IDX = 3;
describe('<BasePlayer />', () => {
  let wrapper;
  let actions;
  beforeAll(() => {
    wrapper = shallow(
      <DataContext.Provider>
        <div id="child-test"></div>
      </DataContext.Provider>
    );
    actions = wrapper.props().value[1];
  });

  it('should contain test child', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it ('should render with correct INIT data', () => {
    expect(wrapper.props().value[0]).toMatchObject(INIT);
  });

  describe('Simulate play', () => {
    beforeAll(() => {
      actions.play(TILE_IDX);
    });

    it('should have update data with correct next player', () => {
      const data = wrapper.props().value[0];
      expect(data.currentPlayer).toBe('p2');
    });

    it('should have update data with correct tile index', () => {
      const data = wrapper.props().value[0];
      expect(data.usedTiles).toEqual([TILE_IDX]);
    });

    it('should have updated player used tiles with correct tile index', () => {
      const data = wrapper.props().value[0];
      expect(data.p1.selectedTiles).toEqual([TILE_IDX]);
    });

    it('should have not updated the other player with the selected tile', () => {
      const data = wrapper.props().value[0];
      expect(data.p2.selectedTiles).toEqual([]);
    });
  });

  describe('Simulate restart', () => {
    beforeAll(() => {
      actions.play(TILE_IDX);
      actions.startGame();
    });

    it('expect to have reset the game', () => {
      expect(wrapper.props().value[0]).toMatchObject(INIT);
    });
  });
});
