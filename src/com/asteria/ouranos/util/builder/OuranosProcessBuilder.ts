import { StreamProcessBuilder, StreamProcessConfig, StreamProcess, AbstractAsteriaObject } from '../../../gaia/gaia.index';

/**
 * The default implementation of the <code>StreamProcessBuilder</code> interface.
 */
export class OuranosProcessBuilder extends AbstractAsteriaObject implements StreamProcessBuilder {

    /**
     * Stores the static reference to this singleton.
     */
    private static _instance: StreamProcessBuilder = null;

    /**
     * Create a new <code>FileLoaderProcess</code> instance.
     */
    private constructor() {
        super('com.asteria.cronos.util::OuranosProcessBuilder');
    }

    /**
     * Returns the reference to this singleton.
     * 
     * @returns {StreamProcessBuilder} the reference to this singleton.
     */
    public static getInstance(): StreamProcessBuilder {
        return OuranosProcessBuilder._instance || (OuranosProcessBuilder._instance = new OuranosProcessBuilder());
    }

    /**
     * @inheritdoc
     */
    public build(processClass: any, config?: StreamProcessConfig): StreamProcess {
        const process: StreamProcess = new processClass() as StreamProcess;
        process.setConfig(config);
        return process;
    }
}
