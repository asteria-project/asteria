import { AsteriaStream } from '../../gaia/gaia.index';
import { FileWriterConfig } from '../config/FileWriterConfig';
import {  WriteStream } from 'fs';

/**
 * The <code>FileWriterStream</code> class provides an output stream for a file.
 */
export class FileWriterStream extends WriteStream implements AsteriaStream {

    /**
     * The class name reference.
     */
    private static readonly CLASS_NAME: string = 'com.asteria.cronos.stream::FileWriterStream';

    /**
     * Create a new <code>FileWriterStream</code> instance.
     * 
     * @param {string} path the path to the file to write.
     */
    constructor(path: string) {
        super(path as any);
    }

    /**
     * @inheritdoc
     */
    public getClassName(): string {
        return FileWriterStream.CLASS_NAME;
    }

    /**
     * @inheritdoc
     */
    public init(config: FileWriterConfig): void {}
}
