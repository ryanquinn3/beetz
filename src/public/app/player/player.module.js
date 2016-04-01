import angular from 'angular';
import player from './player.component';

export default angular.module('player', [])
    .component('player', player())
    .name;