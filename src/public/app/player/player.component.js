import './player.scss';
export default function player(){
    return {
        bindings: {},
        template: require('./player.html'),
        controller,
        controllerAs: 'pc'
    }
}
let scopeRef = null;
class controller {
    constructor(soundcloud, $scope){
        this.nowPlaying = {};
        this.sc = soundcloud;
        scopeRef = $scope;
        this.player = null;
        this.currentSeekTime = null;
        $scope.$watch(
            () => soundcloud.player,
            (newVal) => {
                if(newVal) {
                    this.nowPlaying = soundcloud.currentSelection;
                    this.player = newVal;

                    $scope.$watch(
                        () => this.player.currentTime()
                    );
                }
            }
        );


    }

    play(){
        this.player.play();
    }

    stop(){
        this.player.pause();
    }

}

controller.$inject = ['soundcloud', '$scope'];