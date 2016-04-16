import * as SoundcloudApi from 'soundcloud';
import { Injectable } from 'angular2/core';


export interface IScPlayer {
    play(): void;
    pause(): void;
    seek(time: number): void;
    currentTime(): number;
    setVolume(vol: number);
    getVolume(): number;
    on(event: string, handler: (event: any) => void );
}

interface scApi {
    initialize(config: any): void;
    stream(url: string): Promise<IScPlayer>;
}

@Injectable()
export default class ScApi {
    private sdk: scApi = SoundcloudApi;
    constructor(){
        this.sdk.initialize({
            client_id: "a3c9ce6d3b22526ecd90399cb052be8e"
        });
    }

    stream(url: string): Promise<IScPlayer> {
        return this.sdk.stream(url);
    }


}