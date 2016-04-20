"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var Commaize = (function () {
    function Commaize() {
    }
    Commaize.prototype.transform = function (value) {
        if (value === undefined || !value) {
            return '';
        }
        return value.toString()
            .split('').reverse().join('') // Reverse String
            .match(/.{1,3}/g) // Split out sets of 3
            .join(',') // Insert commas
            .split('').reverse().join(''); // reverse back
    };
    Commaize = __decorate([
        core_1.Pipe({ name: 'commaize' }), 
        __metadata('design:paramtypes', [])
    ], Commaize);
    return Commaize;
}());
exports.Commaize = Commaize;
//# sourceMappingURL=commaize.js.map