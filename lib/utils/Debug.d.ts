/**
 *
 */
export declare class Debug {
    static THROW_ERRORS: boolean;
    static ENABLE_LOG: boolean;
    static LOG_PI_ERRORS: boolean;
    private static keyword;
    static breakpoint(): void;
    static throwPIROnKeyWordOnly(str: string, enable?: boolean): void;
    static throwPIR(clss: string, fnc: string, msg: string): void;
    private static logPIR(clss, fnc, msg?);
    static log(...args: any[]): void;
}
