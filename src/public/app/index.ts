import 'jquery';
import 'reflect-metadata';
import 'rxjs';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'es6-shim';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css';
import 'rxjs/add/operator/map';

declare var require: any;

import entryComponent from './app.component';
import { HTTP_PROVIDERS } from 'angular2/http';
import { bootstrap } from 'angular2/platform/browser';


let providers: any = [
    HTTP_PROVIDERS,
];

bootstrap(entryComponent, providers);
