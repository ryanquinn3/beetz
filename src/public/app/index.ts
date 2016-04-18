import 'jquery';
import 'reflect-metadata';
import 'rxjs';
import 'zone.js';
import 'es6-shim';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.min';
import 'rxjs/add/operator/map'

declare var require: any;

import entryComponent from './app.component';
import { HTTP_PROVIDERS } from 'angular2/http';
import { bootstrap } from 'angular2/platform/browser';
 
import likesService from './likes.service';
import soundcloudConnect from './soundcloud/soundcloud.service'
import sc from './soundcloud/soundcloud'
import library from './library/library.service'
import roomService from './room/room.service'

let providers = [
    HTTP_PROVIDERS,
    likesService,
    soundcloudConnect,
    sc,
    library,
    roomService
];

bootstrap(entryComponent, providers);