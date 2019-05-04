import { AbstractAsteriaObject, StreamProcess, StreamProcessType, AsteriaStream } from '../../gaia/gaia.index';
import { FileReaderConfig } from '../config/FileReaderConfig';
import { FileReaderStream } from '../stream/FileReaderStream';

/**
 * A basic stream process that allows to read a local file.
 */
export class FileReaderProcess extends AbstractAsteriaObject implements StreamProcess {
    
    /**
     * The config object for this process.
     */
    private _config: FileReaderConfig = null;

    /**
     * Create a new <code>FileLoaderProcess</code> instance.
     */
    constructor() {
        super('com.asteria.cronos.process::FileReaderProcess');
    }

    /**
     * @implements
     */
    public getConfig(): FileReaderConfig {
        return this._config;
    }

    /**
     * @implements
     */
    public setConfig(config: FileReaderConfig): void {
        this._config = config;
    }

    /**
     * @implements
     */
    public getType(): StreamProcessType {
        return StreamProcessType.READABLE;
    }

    /**
     * @implements
     */
    public create(): AsteriaStream {
        const stream: FileReaderStream = new FileReaderStream(this._config.path);
        return stream;
    }
}
