import * as uuid from 'uuid';
import { AbstractAsteriaObject } from '../../gaia/gaia.index';

/**
 * A utility that generates Genuine Unique Identifiers.
 */
export class Uuid extends AbstractAsteriaObject {

    /**
     * Creates a new <code>Uuid</code> instance.
     */
    constructor() {
        super('com.asteria.ouranos.lang::Uuid');
    }

    /**
     * Generate and return a unique identifier string according to the "version 4" of the RFC4122 specification.
     * 
     * @returns {string} a "version 4" Genuine Unique Identifiers.
     */
    public static v4(): string {
        return uuid.v4();
    }
}
