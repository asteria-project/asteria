import { AbstractAsteriaObject, StreamProcess, StreamProcessType, AsteriaStream } from '../../gaia/gaia.index';
import { CsvToListConfig } from '../config/CsvToListConfig';
import { CsvToListStream } from '../stream/CsvToListStream';

/**
 * A basic stream process that turns CSV strings into a list of POJOs.
 */
export class CsvToListProcess extends AbstractAsteriaObject implements StreamProcess {
    
    /**
     * The config object for this process.
     */
    private _config: CsvToListConfig = null;

    /**
     * Create a new <code>FileLoaderProcess</code> instance.
     */
    constructor() {
        super('com.asteria.cronos.process::CsvToListProcess');
    }

    /**
     * @implements
     */
    public getConfig(): CsvToListConfig {
        return this._config;
    }

    /**
     * @implements
     */
    public setConfig(config: CsvToListConfig): void {
        this._config = config;
    }

    /**
     * @implements
     */
    public getType(): StreamProcessType {
        return StreamProcessType.TRANSFORM;
    }

    /**
     * @implements
     */
    public create(): AsteriaStream {
        const stream: AsteriaStream = new CsvToListStream();
        return stream;
    }
}
