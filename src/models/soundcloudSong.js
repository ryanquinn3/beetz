import bookshelf from 'models/base';



export let SoundcloudSong = bookshelf.Model.extend({
    hasTimestamps: false,
    tableName: 'soundcloudSong'
}, {

});


export let SoundcloudSongs = bookshelf.Collection.extend({
   model: SoundcloudSong 
});
