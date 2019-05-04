import { AsteriaStream } from '../../gaia/gaia.index';
import { ReadStream } from 'fs';

/**
 * The <code>FileReaderStream</code> class provides an input stream for a file.
 */
export class FileReaderStream extends ReadStream implements AsteriaStream {

    /**
     * The class name reference.
     */
    private static readonly CLASS_NAME: string = 'com.asteria.cronos.stream::FileReaderStream';

    /**
     * Create a new <code>FileReaderStream</code> instance.
     * 
     * @param {string} path the path to the file to read.
     */
    constructor(path: string) {
        super(path as any);
    }

    /**
     * @inheritdoc
     */
    public getClassName(): string {
        return FileReaderStream.CLASS_NAME;
    }
}
