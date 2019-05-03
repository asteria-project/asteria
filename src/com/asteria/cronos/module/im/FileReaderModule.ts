import { AsteriaModule, AsteriaData, AbstractAsteriaModule, StringData, AsteriaLogger, AsteriaError, AsteriaErrorCode } from '../../../gaia/gaia.index';
import { AsteriaDataBuilder, OuranosLogger, AsteriaErrorBuilder } from '../../../ouranos/ouranos.index';
import * as fs from 'fs';

// Static logger reference:
const LOGGER: AsteriaLogger = OuranosLogger.getLogger();

/**
 * A generic implementation of the <code>AsteriaModule</code> interface that reads files from a local path.
 */
export class FileReaderModule extends AbstractAsteriaModule implements AsteriaModule {

    /**
     * Creates a new <code>FileReaderModule</code> instance.
     */
    constructor() {
        super('com.asteria.cronos.module.im::FileReaderModule');
    }                      
    
    /**
     * @inheritdoc
     */
    public process(input: AsteriaData<StringData>): Promise<AsteriaData<StringData>> {
        const filePath: string = input.data.toString();
        LOGGER.info(`loading file: ${filePath}`);
        const result: Promise<AsteriaData<StringData>> = new Promise<AsteriaData<StringData>>(
            (resolve: Function, reject: Function)=> {
                fs.readFile(
                    filePath,
                    (err: NodeJS.ErrnoException, data: Buffer)=> {
                        if (err) {
                            const error: AsteriaError = AsteriaErrorBuilder.getInstance().build(
                                AsteriaErrorCode.PROCESS_FAILURE,
                                this.getClassName(),
                                'asteria process failed: ' + err.message,
                                err.stack
                            );
                            reject(error);
                        } else {
                            resolve(
                                AsteriaDataBuilder.getInstance().build(
                                    data.toString()
                                )
                            );
                        }
                    }
                );
            }
        );
        return result;
    }
}