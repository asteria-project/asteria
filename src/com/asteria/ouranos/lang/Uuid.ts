import * as uuid from 'uuid';
import { AsteriaObject } from '../../gaia/gaia.index';

/**
 * A utility that generates and returns genuine unique identifier strings.
 */
export class Uuid extends AsteriaObject {
  
    /**
     * Creates a new <code>Uuid</code> instance.
     */
    constructor() {
      super('com.asteria.ouranos.lang::Uuid');
  }

  /**
   * Generates and returns a unique identifier string according to the "version 4" RFC4122 specification.
   * 
   * @returns {string} a "version 4" genuine unique identifier string.
   */
  public static v4(): string {
    return uuid.v4();
  }
}