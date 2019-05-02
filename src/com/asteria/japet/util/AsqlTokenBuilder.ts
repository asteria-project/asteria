import { AsqlToken } from '../lang/AsqlToken';
import { AsqlTokenImpl } from '../core/AsqlTokenImpl';
import { AsqlTokenType } from '../lang/AsqlTokenType';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.japet.lang::AsqlTokenBuilder';

/**
 * A static builder for creating <code>AsqlToken</code> objects.
 */
export class AsqlTokenBuilder {

    /**
     * Creates and returns a new <code>AsqlToken</code> object.
     *
     * @param {AsqlTokenType} type the type of this AsQL token.
     * @param {any} value the value for this AsQL token.
     * 
     * @return {AsqlToken} a new <code>AsqlToken</code> object.
     */
    public static build(type: AsqlTokenType, value: any): AsqlToken {
        const token: AsqlToken = new AsqlTokenImpl(type, value);
        return token;
    }
}