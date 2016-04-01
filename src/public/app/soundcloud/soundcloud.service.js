soundCloud.$inject = ['$http', 'SCApi', '$rootScope'];
function soundCloud($http, SCApi, $rootScope){

    const sc = {
        getLikes,
        stream
    };

    sc.player = null;
    sc.currentSelection = null;


    return sc;

    function getLikes(){
        return $http.get('/api/').then( response => {
            let songs = response.data;
            songs.map( song => {
                song.title = song.title.substring(0, 50);
                return song;
            });
            return songs;
        });
    }

    function stream(song){
        sc.currentSelection = song;
        SCApi.stream(`/tracks/${song.id}`).then( playerRef => {
            sc.player = playerRef;
            $rootScope.$apply();
        });
    }


}

export default soundCloud;