import { AbstractAsteriaObject, StreamProcess, StreamProcessType, AsteriaStream } from '../../gaia/gaia.index';
import { FileWriterConfig } from '../config/FileWriterConfig';
import { FileWriterStream } from '../stream/FileWriterStream';

/**
 * A basic stream process that allows to write a local file.
 */
export class FileWriterProcess extends AbstractAsteriaObject implements StreamProcess {
    
    /**
     * The config object for this process.
     */
    private _config: FileWriterConfig = null;

    /**
     * Create a new <code>FileWriterProcess</code> instance.
     */
    constructor() {
        super('com.asteria.cronos.process::FileWriterProcess');
    }

    /**
     * @implements
     */
    public getConfig(): FileWriterConfig {
        return this._config;
    }

    /**
     * @implements
     */
    public setConfig(config: FileWriterConfig): void {
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
        const stream: FileWriterStream = new FileWriterStream(this._config.path);
        stream.init(this._config);
        return stream;
    }
}
