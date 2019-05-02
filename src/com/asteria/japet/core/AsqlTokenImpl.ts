import { AsqlToken } from '../lang/AsqlToken';
import { AsqlTokenType } from '../lang/AsqlTokenType';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.japet.core::AsqlTokenImpl';

/**
 * The default implementation of the <code>AsqlToken</code> interface.
 */
export class AsqlTokenImpl implements AsqlToken {

    /**
     * @inheritdoc
     */
    public readonly type: AsqlTokenType;

    /**
     * @inheritdoc
     */
    public readonly value: any;

    /**
     * Creates a new <code>AsqlTokenImpl</code> instance.
     *
     * @param {AsqlTokenType} type the type of this AsQL token.
     * @param {any} value the value for this AsQL token.
     */
    constructor(type: AsqlTokenType, value: any) {
        this.type = type;
        this.value = value;
    }
}