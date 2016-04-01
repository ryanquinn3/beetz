import {Router} from 'express';

import User from './models/user.js';
import SoundcloudSong from './models/soundcloudSong';

import soundCloud from './services/soundcloud';


let router = Router();
router.get('/', (req, res) => {

    return SoundcloudSong.orderBy('favoritings_count', 'DESC').fetchAll().then( songs => {
        return res.json(songs);
    });
});



export default router;