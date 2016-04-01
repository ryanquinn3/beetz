import angular from 'angular';

import SoundcloudApi from 'soundcloud';


export default angular.module('Soundcloud', [])
    .factory('SCApi', () =>  {
        SoundcloudApi.initialize({
            client_id: "a3c9ce6d3b22526ecd90399cb052be8e"
        });
        return SoundcloudApi;
    })
    .name;