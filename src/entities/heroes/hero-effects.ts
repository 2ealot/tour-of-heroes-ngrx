import { Injectable } from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as heroActions from './hero-actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { HeroService } from '../../app/hero.service';
import { MessageService } from '../../app/message.service';
import {Observable} from "rxjs";
import {ADD_HERO, DELETE_HERO, GET_HEROES, UPDATE_HERO} from "./hero-actions";
import {Hero} from "./hero";

@Injectable()
export class HeroEffects {
  constructor(
    private store: Store<any>,
    private update$: Actions,
    private heroService: HeroService,
    private messageService: MessageService) {}

addHero$: Observable<Action> = createEffect(() =>
    this.update$.pipe(
        ofType<heroActions.AddHero>(ADD_HERO),
        switchMap(hero => this.heroService.addHero(hero.payload)),
        map(response => {
                this.messageService.add("Adding hero to the store.");
                return new heroActions.AddHeroSuccess(response as Hero);
            },
            catchError(error => error.subscribe().switchMap(error =>{
                console.log(error)
            })),
        ),
    ),
);

getHeroes$: Observable<Action> = createEffect(() =>
    this.update$.pipe(
        ofType<heroActions.GetHeroes>(GET_HEROES),
        switchMap(hero => this.heroService.getHeroes()),
        map(response => {
            this.messageService.add("Populating store with heroes.");
            return new heroActions.GetHeroesSuccess(response as Hero[]);
        })));

updateHero$: Observable<Action> = createEffect(() =>
    this.update$.pipe(
        ofType<heroActions.UpdateHero>(UPDATE_HERO),
        switchMap(hero => this.heroService.updateHero(hero.payload)),
        map(response => {
            this.messageService.add("Updating hero in the store.");
            return new heroActions.UpdateHeroSuccess(response as Hero);
        })));

deleteHero$: Observable<Action> = createEffect(() =>
    this.update$.pipe(
        ofType<heroActions.DeleteHero>(DELETE_HERO),
        switchMap(hero => this.heroService.deleteHero(hero.payload)),
        map(response => {
            this.messageService.add("Deleting hero in the store.");
            return new heroActions.DeleteHeroSuccess(response as number);
        })));
}
