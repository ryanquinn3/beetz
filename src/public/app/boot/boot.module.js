import angular from 'angular';
import boot from './boot.component.js';
import soundCloud from '../soundcloud/soundcloud.service';

import SoundCloud from '../soundcloud/soundcloud.module';
import player from '../player/player.module';

angular.module('app', [SoundCloud, player])
    .component('boot', boot())
    .factory('soundcloud', soundCloud)
    .config(['$interpolateProvider', ($interpolateProvider) => {
        $interpolateProvider.startSymbol('((');
        $interpolateProvider.endSymbol('))');
    }]);


angular.element(document).ready( () => {
    angular.bootstrap(document, ['app']);
});