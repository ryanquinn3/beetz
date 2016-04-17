import request from 'request-promise';
import config from 'config';
import promise from 'bluebird';


const baseUrl = 'https://api.soundcloud.com/';
const usersUrl = `${baseUrl}users/`;
const RQID = 89985888;


const baseGet = (uri) => {
    return {
        method: 'GET',
        json: true,
        uri
    }
};

function makeGet(url){
    return request(baseGet(url));
}

class SoundCloud {

    constructor(clientId){
        this.clientId = clientId;
    }

    setUser(userId) {
        this.userId = userId;
        return this;
    }

    getUser(userId){
        let uri = `${usersUrl}${userId}`;
        uri = this._appendToken(uri);
        let opts = baseGet(uri);
        return request(opts)
    }

    getLikes(userId=null){
        if(!userId){
            if(!this.userId) throw 'stop!';

            let url = `${usersUrl}${this.userId}/favorites`;
            url = this._appendToken(url);
            return makeGet(url)
        }
    }

    makeLikesRequest(likes, url){
        console.log('sending request!');
        return makeGet(url).then( data => {
            data.collection.forEach( song => {
               likes.push(song);
            });
            if(data.next_href){
                return this.makeLikesRequest(likes, data.next_href);
            } else {
                return true;
            }
        });

    }


    getAllLikes() {

        let url = `${usersUrl}${this.userId}/favorites`;
        url = this._appendToken(url);

        let p = promise.defer();


        let likes = [];

        this.makeLikesRequest(likes, url).then(() => {
            p.resolve(likes);
        });

        return p.promise;
    }


    _appendToken(url){
        return `${url}?client_id=${this.clientId}&linked_partitioning=1`;
    }

}



export default function(){
    let sc = new SoundCloud(config.soundcloud.clientId);
    sc.setUser(RQID);

    return sc;
}






/*
"kind",
"id",
"created_at",
"user_id",
"duration",
"commentable",
"state",
"original_content_size",
"last_modified",
"sharing",
"tag_list",
"permalink",
"streamable",
"embeddable_by",
"downloadable",
"purchase_url",
"label_id",
"purchase_title",
"genre",
"title",
"description",
"label_name",
"release",
"track_type",
"key_signature",
"isrc",
"video_url",
"bpm",
"release_year",
"release_month",
"release_day",
"original_format",
"license",
"uri",
"user",
"permalink_url",
"artwork_url",
"waveform_url",
"stream_url",
"playback_count",
"download_count",
"favoritings_count",
"comment_count",
"attachments_uri"
 */