import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Hero } from './hero';
import * as heroActions from './hero-actions';

export interface HeroState {
  selectedHeroId: number | null;
  heroes: Hero[] | null;
}

const heroInitialState: HeroState = {
    selectedHeroId: null,
    heroes: [],
};

export function heroReducer(
  state: HeroState = heroInitialState,
  action
) {
  console.log(action.type);
  switch (action.type) {
    case heroActions.ADD_HERO_SUCCESS:
        return {
            ...state,
            heroes: [...state.heroes, action.payload],
        };
    case heroActions.GET_HEROES_SUCCESS:
        return {
            ...state,
            heroes: action.payload,
        };
    case heroActions.UPDATE_HERO_SUCCESS:
        const updatedHero = state.heroes.map((hero: Hero) => {
            if(hero.id === action.payload.id) {
                return action.payload;
            }
            return hero;
        });
        return {
            ...state,
            heroes: updatedHero,
        };
    case heroActions.DELETE_HERO_SUCCESS:
        return {
            ...state,
            heroes: state.heroes.filter((hero) => hero.id !== action.payload),
        };
    case heroActions.SELECT_HERO:
        return {
            ...state,
            selectedHeroId: action.payload,
        };
    default:
      return state;
  }
}


export const selectAllHeroes = (appState) => {
    return appState.heroes.heroes;
}
export const getSelectedHeroId = (appState) => {
    return appState.heroes.selectedHeroId;
}

export const getSelectedHero: MemoizedSelector<HeroState, Hero> = createSelector(
    selectAllHeroes,
    getSelectedHeroId,
    (heroes: Hero[], heroId: number) => {
        return heroes.find((hero: Hero) => hero.id === heroId);
    },
);
