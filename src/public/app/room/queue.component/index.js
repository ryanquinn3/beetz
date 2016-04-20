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
var template = require('./queue.html');
var styles = require('./queue.scss');
var QueueComponent = (function () {
    function QueueComponent() {
        this.nextUp = new core_1.EventEmitter();
        $(document).ready(function () {
            $('.collapsible').collapsible({
                accordion: false,
            });
        });
    }
    QueueComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.queue) {
            this.queuedSongs = this.queue.getAllSongs();
            this.queue.getUpdateObservable().subscribe(function (newSongs) {
                _this.queuedSongs = _this.queue.getAllSongs();
                if (newSongs.length) {
                    _this.nextUp.emit(newSongs[0]);
                }
                else {
                    _this.nextUp.emit(null);
                }
            });
        }
    };
    QueueComponent.prototype.remove = function (index) {
        console.log('boy');
        this.queue.removeSongAtIndex(index);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], QueueComponent.prototype, "queue", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], QueueComponent.prototype, "nextUp", void 0);
    QueueComponent = __decorate([
        core_1.Component({
            template: template,
            selector: 'queue-component',
            styles: [styles],
        }), 
        __metadata('design:paramtypes', [])
    ], QueueComponent);
    return QueueComponent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QueueComponent;
//# sourceMappingURL=index.js.map