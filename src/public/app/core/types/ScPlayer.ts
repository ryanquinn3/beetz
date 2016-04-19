export interface ScPlayer {
    play(): void;
    pause(): void;
    seek(time: number): void;
    currentTime(): number;
    setVolume(vol: number): void;
    getVolume(): number;
    on(event: ScPlayerEvent, handler: () => void ): void;
}

export enum ScPlayerEvent {
    StateChange = 'state-change',
    Play = 'play',
    PlayStart = 'play-start',
    PlayResume = 'play-resume',
    Pause = 'pause',
    Finished = 'finish',
    Seek = 'seek',
    Seeked = 'seeked',
    GeoBlocked = 'geo_blocked',
    BufferingStart = 'buffering_start',
    BufferingEnd = 'buffering_end',
    AudioError = 'audio_error',
    Time = 'time',
    NoStreams = 'no_streams',
    NoProtocol = 'no_protocol',
    NoConnection = 'no_connection'
}
