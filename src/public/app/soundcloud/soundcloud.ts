import * as soundcloudSdk from 'soundcloud';
import { Injectable } from 'angular2/core';
import { ScSdk, ScPlayer } from '../core/types';


@Injectable()
export default class ScApiImpl {
    private sdk: ScSdk = soundcloudSdk;
    constructor() {
        this.sdk.initialize({
            client_id: 'a3c9ce6d3b22526ecd90399cb052be8e',
        });
    }

    public stream(url: string): Promise<ScPlayer> {
        return this.sdk.stream(url);
    }
}
