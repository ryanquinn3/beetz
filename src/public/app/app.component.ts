import { Component } from 'angular2/core';
import lib from './library/library.component';
import room from './room/room.component';
import globalProviders from './core/global-providers';

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
    directives: [lib, room],
    providers: [globalProviders],
})
export default class App {}
