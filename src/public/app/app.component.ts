import { Component } from 'angular2/core';
import lib from './library/library.component';
import room from './room/room.component';
import globalProviders from './core/global-providers';

const styles: string = require('./app.scss');

@Component({
    selector: 'app',
    template: ` 
        <div class="app-container">
            <div class="lib-container">
                <library></library>   
            </div>
            <div class="room-container">
                <room></room>
            </div>
        </div>
    `,
    directives: [lib, room],
    providers: [globalProviders],
    styles: [ styles ],
})
export default class App {}
