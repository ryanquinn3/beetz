"use strict";
require('jquery');
require('reflect-metadata');
require('rxjs');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('es6-shim');
require('materialize-css/dist/css/materialize.css');
require('materialize-css');
require('rxjs/add/operator/map');
var app_component_1 = require('./app.component');
var http_1 = require('angular2/http');
var browser_1 = require('angular2/platform/browser');
var providers = [
    http_1.HTTP_PROVIDERS,
];
browser_1.bootstrap(app_component_1.default, providers);
//# sourceMappingURL=index.js.map