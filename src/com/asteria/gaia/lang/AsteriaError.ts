export class AsteriaError {

    constructor(code: number, message: string, stack?: string) {
        this.code = code;
        this.message = message;
        this.stack = stack;
    }

    public readonly code: number;

    public readonly message: string;

    public readonly stack: string;
}