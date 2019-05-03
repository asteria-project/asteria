import { AsteriaErrorCode } from './AsteriaErrorCode';
import { CommonChar } from './CommonChar';
import { AsteriaObject } from './AsteriaObject';

export class AsteriaError extends AsteriaObject {

    constructor(code: AsteriaErrorCode, className: string, message: string, stack?: string) {
        super('com.asteria.gaia.lang::AsteriaError');
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