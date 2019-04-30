import { AsteriaModule, AsteriaData, AbstractAsteriaModule, StringData, AsteriaLogger } from '../../../gaia/gaia.index';
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
        super('FileReaderModule');
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
                            reject(
                                AsteriaErrorBuilder.getInstance().build(0, err.message, err.stack)
                            );
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