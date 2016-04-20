export interface ScPlayer {
    play(): void;
    pause(): void;
    seek(time: number): void;
    currentTime(): number;
    setVolume(vol: number): void;
    getVolume(): number;
    on(event: ScPlayerEvent, handler: () => void ): void;
}

export class ScPlayerEvent {
    public static stateChange: string = 'state-change';
    public static play: string = 'play';
    public static playStart: string = 'play-start';
    public static playResume: string = 'play-resume';
    public static pause: string = 'pause';
    public static finished: string = 'finish';
    public static seek: string = 'seek';
    public static seeked: string = 'seeked';
    public static geoBlocked: string = 'geo_blocked';
    public static bufferingStart: string = 'buffering_start';
    public static bufferingEnd: string = 'buffering_end';
    public static audioError: string = 'audio_error';
    public static time: string = 'time';
    public static noStreams: string = 'no_streams';
    public static noProtocol: string = 'no_protocol';
    public static noConnection: string = 'no_connection';
}
