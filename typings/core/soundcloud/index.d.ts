interface ScConfig {
    client_id: string;
}

interface ScPlayer {
    play(): void;
    pause(): void;
    seek(time: number): void;
    currentTime(): number;
    setVolume(vol: number): void;
    getVolume(): number;
    on(event: ScPlayerEvent, handler: () => void ): void;
}

declare enum ScPlayerEvent {
    StateChange = <any>'state-change',
    Play = <any>'play',
    PlayStart = <any>'play-start',
    PlayResume = <any>'play-resume',
    Pause = <any>'pause',
    Finished = <any>'finish',
    Seek = <any>'seek',
    Seeked = <any>'seeked',
    GeoBlocked = <any>'geo_blocked',
    BufferingStart = <any>'buffering_start',
    BufferingEnd = <any>'buffering_end',
    AudioError = <any>'audio_error',
    Time = <any>'time',
    NoStreams = <any>'no_streams',
    NoProtocol = <any>'no_protocol',
    NoConnection = <any>'no_connection'
}

interface ScSdk {
    initialize(config: ScConfig): void;
    stream(url: string): Promise<ScPlayer>;
}
