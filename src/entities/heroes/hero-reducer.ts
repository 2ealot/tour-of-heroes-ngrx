import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Hero } from './hero';
import * as heroActions from './hero-actions';

export interface HeroState extends EntityState<Hero> {
  selectedHeroId: number | null;
 }

const heroAdapter = createEntityAdapter<Hero>({
    selectId: (hero: Hero) => hero.id
});

const heroInitialState: HeroState = heroAdapter.getInitialState({
    selectedHeroId: null
});

export function heroReducer(
  state: HeroState = heroInitialState,
  action
) {
  console.log(action.type);
  switch (action.type) {
    case heroActions.ADD_HERO_SUCCESS:
      return heroAdapter.addOne(action.payload, state);
    case heroActions.GET_HEROES_SUCCESS:
      // return heroAdapter.addAll(action.payload, state);
      return heroAdapter.addMany(action.payload, state);
    case heroActions.UPDATE_HERO_SUCCESS:
      return heroAdapter.updateOne(action.payload, state);
    case heroActions.DELETE_HERO_SUCCESS:
      return heroAdapter.removeOne(action.payload, state);
    case heroActions.SELECT_HERO:
      state.selectedHeroId = action.payload;
      return state;
    default:
      return state;
  }
}

export const selectHeroState = createFeatureSelector<HeroState>('heroes');

export const { selectAll: selectAllHeroes, selectIds } = heroAdapter.getSelectors(
  selectHeroState
);

export const getSelectedHero = createSelector(
    selectHeroState,
    (state) => {
      return state.entities[state.selectedHeroId];
    }
)
