import {Router} from 'express';

import User from './models/user.js';
import {SoundcloudSong, SoundcloudSongs} from './models/soundcloudSong';

import soundCloud from './services/soundcloud';


let router = Router();
router.get('/', (req, res) => {
    return SoundcloudSong.orderBy('favoritings_count', 'DESC')
        .fetchAll()
        .then( songs => {
        return res.json(songs);
    });
});



router.get('/load', (req, res) => {
    let sc = soundCloud();
    sc.getAllLikes().then(allLikes => {
        console.log(allLikes[0]);
        let proms = [];
        allLikes.forEach(song => {
            delete song.user;
            if(song.download_url) {
                delete song.download_url;
            }
            proms.push(new SoundcloudSong(song).save(null, {method: 'insert'}).then((song)=> console.log(`saved ${song.title}`)));
        });
        Promise.all(proms).then(() => res.send('okay'));
    });

});



export default router;
