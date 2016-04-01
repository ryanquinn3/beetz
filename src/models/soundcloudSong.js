import bookshelf from 'models/base';



let SoundcloudSong = bookshelf.Model.extend({
    hasTimestamps: false,
    tableName: 'soundcloudSong'
}, {

});

export default SoundcloudSong;