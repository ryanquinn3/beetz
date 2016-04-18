export interface ScPlayer {
    play(): void;
    pause(): void;
    seek(time: number): void;
    currentTime(): number;
    setVolume(vol: number): void;
    getVolume(): number;
    on(event: string, handler: (event: any) => void ): void;
}
