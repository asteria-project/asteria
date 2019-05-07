/**
 * The <code>StreamProcessType</code> enum provides values for spefifying the type of a process consumed by an Asteria
 * stream processor.
 */
export enum StreamProcessType {

    /**
     * Specifies a reading process.
     */
    READABLE = 0,

    /**
     * Specifies a transformation process.
     */
    TRANSFORM = 1,

    /**
     * Specifies a writing process.
     */
    WRITABLE = 2
}
