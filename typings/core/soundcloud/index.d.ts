declare module 'soundcloud' {
    export function initialize(config: ScConfig): void;
    export function stream(url: string): Promise<ScPlayer>;
}
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
        on(event: string, handler: () => void ): void;
}



interface ScSdk {
    initialize(config: ScConfig): void;
    stream(url: string): Promise<ScPlayer>;
}
