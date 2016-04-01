import Bookshelf from 'bookshelf';
import knex from 'db/knex';

let bookshelf = Bookshelf(knex);

['virtuals', 'registry', 'visibility'].forEach( (plugin) =>{
    bookshelf.plugin(plugin);
});

export default bookshelf;