import { StreamProcessConfig } from '../../gaia/gaia.index';

/**
 * The <code>FileReaderConfig</code> interface represents the configuration of a <code>FileReaderProcess</code> stream
 * process.
 */
export interface FileReaderConfig extends StreamProcessConfig {

    /**
     * The path to the local file to read.
     */
    path: string;
}