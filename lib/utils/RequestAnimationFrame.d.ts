export declare class RequestAnimationFrame {
    private _callback;
    private _callbackContext;
    private _active;
    private _rafUpdateFunction;
    private _prevTime;
    private _dt;
    private _currentTime;
    private _argsArray;
    private _getTimer;
    constructor(callback: Function, callbackContext: Object);
    /**
     *
     * @param callback
     * @param callbackContext
     */
    setCallback(callback: Function, callbackContext: Object): void;
    /**
     *
     */
    start(): void;
    /**
     *
     */
    stop(): void;
    /**
     *
     * @returns {boolean}
     */
    readonly active: boolean;
    /**
     *
     * @private
     */
    private _tick();
}
