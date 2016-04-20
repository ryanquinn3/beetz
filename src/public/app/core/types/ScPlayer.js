"use strict";
var ScPlayerEvent = (function () {
    function ScPlayerEvent() {
    }
    ScPlayerEvent.stateChange = 'state-change';
    ScPlayerEvent.play = 'play';
    ScPlayerEvent.playStart = 'play-start';
    ScPlayerEvent.playResume = 'play-resume';
    ScPlayerEvent.pause = 'pause';
    ScPlayerEvent.finished = 'finish';
    ScPlayerEvent.seek = 'seek';
    ScPlayerEvent.seeked = 'seeked';
    ScPlayerEvent.geoBlocked = 'geo_blocked';
    ScPlayerEvent.bufferingStart = 'buffering_start';
    ScPlayerEvent.bufferingEnd = 'buffering_end';
    ScPlayerEvent.audioError = 'audio_error';
    ScPlayerEvent.time = 'time';
    ScPlayerEvent.noStreams = 'no_streams';
    ScPlayerEvent.noProtocol = 'no_protocol';
    ScPlayerEvent.noConnection = 'no_connection';
    return ScPlayerEvent;
}());
exports.ScPlayerEvent = ScPlayerEvent;
//# sourceMappingURL=ScPlayer.js.map