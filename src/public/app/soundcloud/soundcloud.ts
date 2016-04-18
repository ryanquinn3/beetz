import * as soundcloudSdk from "soundcloud";
import { Injectable } from "angular2/core";


export interface ScPlayer {
    play(): void;
    pause(): void;
    seek(time: number): void;
    currentTime(): number;
    setVolume(vol: number);
    getVolume(): number;
    on(event: string, handler: (event: any) => void );
}

interface SoundcloudConfig {
    client_id: string;
}

interface SoundcloudSdk {
    initialize(config: SoundcloudConfig): void;
    stream(url: string): Promise<ScPlayer>;
}

@Injectable()
export default class ScApiImpl {
    private sdk: SoundcloudSdk = soundcloudSdk;
    constructor() {
        this.sdk.initialize({
            client_id: "a3c9ce6d3b22526ecd90399cb052be8e"
        });
    }

    stream(url: string): Promise<ScPlayer> {
        return this.sdk.stream(url);
    }
}