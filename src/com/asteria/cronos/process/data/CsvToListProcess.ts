import { AbstractAsteriaObject, StreamProcess, StreamProcessType, AsteriaStream, AsteriaContext } from '../../../gaia/gaia.index';
import { CsvToListConfig } from '../../config/data/CsvToListConfig';
import { CsvToListStream } from '../../stream/data/CsvToListStream';

/**
 * A basic stream process that turns CSV strings into a list of POJOs.
 */
export class CsvToListProcess extends AbstractAsteriaObject implements StreamProcess {
    
    /**
     * The config object for this process.
     */
    private _config: CsvToListConfig = null;

    /**
     * Create a new <code>CsvToListProcess</code> instance.
     */
    constructor() {
        super('com.asteria.cronos.process.data::CsvToListProcess');
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
    public create(context: AsteriaContext): AsteriaStream {
        const stream: AsteriaStream = new CsvToListStream();
        stream.init(this._config, context);
        return stream;
    }
}