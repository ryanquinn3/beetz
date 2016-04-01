import bookshelf from 'db/bookshelf';
import uuid from 'node-uuid';

bookshelf.Model = bookshelf.Model.extend({
    hasTimestamps: true,

    defaults: function defaults(){
        return {
            uuid: uuid.v4()
        }
    }
}, {
    getById: function(id){
        return new this({id: id}).fetch();
    },
    orderBy: function(column, order){
        return this.query(function(qb){
           qb.orderBy(column, order);
        });
    }
});

export default bookshelf;