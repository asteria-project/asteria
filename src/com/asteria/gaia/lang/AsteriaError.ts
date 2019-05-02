import { AsteriaErrorCode } from './AsteriaErrorCode';
import { CommonChar } from './CommonChar';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.gaia.lang::AsteriaError';

export class AsteriaError {

    constructor(code: AsteriaErrorCode, className: string, message: string, stack?: string) {
        this.code = code;
        this.className = className;
        this.message = message;
        this.stack = stack;
    }

    public readonly code: AsteriaErrorCode;

    public readonly message: string;

    public readonly className: string;

    public readonly stack: string;

    public toString(): string {
        const stack: string = this.stack ? `, stack=${this.message}` : CommonChar.EMPTY;
        return `[AsteriaError: code=${this.code}, class=${this.className}, message=${this.message}${stack}]`;
    }
}