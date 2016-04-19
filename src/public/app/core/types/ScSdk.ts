import { ScPlayer } from './ScPlayer';
import { ScConfig } from './ScConfig';
export interface ScSdk {
    initialize(config: ScConfig): void;
    stream(url: string): Promise<ScPlayer>;
}
