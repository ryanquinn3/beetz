import { Component } from 'angular2/core';
import boot from './boot/boot.component.ts';
import player from './player/player.component.ts';

@Component({
    selector: 'app',
    template: ` 
        <player></player> 
        <boot></boot>
    `,
    directives: [boot, player]
})
export default class app {}