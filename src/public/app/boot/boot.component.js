
export default function boot(){
    return {
        bindings:{},
        template: `
            <ul class="collection">
                <li class="collection-item"  style="height: 45px;"ng-repeat="like in b.likes">
                    <div class="row">
                        <div class="col s6">(($index)). (( like.title ))</div>
                        <div class="col s2">Plays: ((like.playback_count))</div>
                        <div class="col s2">Favs: ((like.favoritings_count))</div>
                        <div class="col s2">
                            <a ng-click="b.play(like)" class="secondary-content" style="cursor:pointer;">
                                <i class="small material-icons">play_arrow</i>
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
        `,
        controller,
        controllerAs: 'b'
    }
}

class controller{
    constructor(soundCloud){
        this.sc = soundCloud;

        this.sc.getLikes().then( likes => {
            this.likes = likes;
        });
    }

    play(song){
        console.log('clicked');
        this.sc.stream(song);
    }


}
controller.$inject = ['soundcloud'];


