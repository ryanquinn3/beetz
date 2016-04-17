import { Component } from 'angular2/core';
import lib from './library/library.component';
import player from './player/player.component.ts';
import room from './room/room.component';

@Component({
    selector: 'app',
    template: ` 
       <div class="row">
         <div class="col s9">
            <library></library>   
         </div>
          <div class="col s3">
            <room></room>
        </div>
        </div>
    `,
    directives: [lib, room]
})
export default class app {}