import { Component, Input } from "angular2/core";


let template  = `

<div class="queue--container">
    <ul class="collection">
        <li class="collection-item" *ngFor="#song of queue; #i = index">
           <div class="row">
            {{song.title}}  
            </div>
        </li>
    </ul>
</div>

`;

@Component({
    template,
    selector: "queue-component",
})
export default class QueueComponent {
    @Input() queue: any;

    constructor() {}


}