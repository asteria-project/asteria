import { PrimitiveType } from './PrimitiveType';
import { AsteriaObject } from '../../gaia/gaia.index';

/**
 * A utility class that provides operations on boolean primitives and <code>Boolean</code> objects.
 */
export class AsteriaBooleanUtil extends AsteriaObject {

    /**
     * Creates a new <code>AsteriaBooleanUtil</code> instance.
     */
    constructor() {
        super('com.asteria.ouranos.util::AsteriaBooleanUtil');
    }

    /**
     * Turns the specified <code>input</code> into a boolean value.
     * 
     * @param {any} input the input value to cast.
     * 
     * @returns {boolean} a boolean value.
     */
    public static cast(input: any): boolean {
        let result: boolean = false;
        if(input !== null || input !== undefined) {
            if (typeof input === PrimitiveType.STRING) {
                switch(input.toLowerCase().trim()){
                    case 'true':
                    case '1':
                        result = true;
                        break;
                    case 'false':
                    case '0':
                        result = false;
                        break;
                    default: 
                        result = Boolean(input);
                }
            } else {
                result = Boolean(input);
            }
        }
        return result;
    }
}