// Class name reference:
const CLASS_NAME: string = 'com.asteria.gaia.lang::AsteriaErrorCode';

/**
 * The <code>AsteriaErrorCode</code> enum defines all error code specified by the Asteria project.
 */
export enum AsteriaErrorCode {

    /**
     * Indicates that an Asteria process failed.
     */
    PROCESS_FAILURE = 1,

    /**
     * Indicates that a parameter is missing.
     */
    MISSING_PARAMETER = 100,

    /**
     * Indicates that a parameter is not valid.
     */
    INVALID_PARAMETER = 101
}