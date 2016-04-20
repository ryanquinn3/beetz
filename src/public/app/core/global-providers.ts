import library from '../library/library.service';
import room from '../room/room.service';
import soundcloudConnect from '../soundcloud/soundcloud.service';
import scApi from '../soundcloud/soundcloud';

const globalServices: Object[] = [
    library,
    room,
    soundcloudConnect,
    scApi,
];

export default globalServices;
