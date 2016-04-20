export interface ScPlayer {
    play(): void;
    pause(): void;
    seek(time: number): void;
    currentTime(): number;
    setVolume(vol: number): void;
    getVolume(): number;
    on(event: ScPlayerEvent, handler: () => void ): void;
}

export type ScPlayerEvent =
    'state-change' |
    'play' |
    'play_start' |
    'play_resume' |
    'pause' |
    'finish' |
    'seek' |
    'seeked' |
    'geo_blocked' |
    'buffering_start' |
    'buffering_end' |
    'audio_error' |
    'time' |
    'no_streams' |
    'no_protocol' |
    'no_connection';
