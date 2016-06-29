import { EventDispatcher } from "../events/EventDispatcher";
export declare class Timer extends EventDispatcher {
    private _delay;
    private _repeatCount;
    private _currentCount;
    private _iid;
    private _running;
    constructor(delay: number, repeatCount?: number);
    readonly currentCount: number;
    delay: number;
    repeatCount: number;
    reset(): void;
    readonly running: boolean;
    start(): void;
    stop(): void;
    private tick();
}
