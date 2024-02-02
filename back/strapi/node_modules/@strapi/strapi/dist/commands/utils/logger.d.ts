import ora from 'ora';
export interface LoggerOptions {
    silent?: boolean;
    debug?: boolean;
    timestamp?: boolean;
}
export interface Logger {
    warnings: number;
    errors: number;
    debug: (...args: unknown[]) => void;
    info: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    log: (...args: unknown[]) => void;
    spinner: (text: string) => Pick<ora.Ora, 'succeed' | 'fail' | 'start' | 'text'>;
}
declare const createLogger: (options?: LoggerOptions) => Logger;
export { createLogger };
//# sourceMappingURL=logger.d.ts.map