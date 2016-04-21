import { Component } from 'angular2/core';

const template: string = require('./library-menu.html');
const styles: string = require('./library-menu.scss');

@Component({
    template,
    selector: 'library-menu',
    styles: [ styles ],
})
class LibraryMenu {

    constructor() {
        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: true, // Does not change width of dropdown to that of the activator
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
        });

        $(document).ready(() => {
            // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            $('.modal-trigger').leanModal();
          });

    }

    public changeRoom(): void {
     //    $('#modal1').openModal();
    }



}

export default LibraryMenu;
