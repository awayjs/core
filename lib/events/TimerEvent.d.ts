import { EventBase } from "../events/EventBase";
export declare class TimerEvent extends EventBase {
    /**
     *
     */
    static TIMER: string;
    /**
     *
     */
    static TIMER_COMPLETE: string;
    constructor(type: string);
}
export default TimerEvent;
