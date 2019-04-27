import { AsteriaModule } from '../../../gaia/module/AsteriaModule';
import { AsteriaData } from '../../../gaia/data/AsteriaData';
import { AbstractAsteriaModule } from '../../../gaia/module/AbstractAsteriaModule';
import { AsteriaDataBuilder } from '../../../ouranos/util/builder/AsteriaDataBuilder';
import { StringData } from '../../../gaia/data/StringData';
import * as fs from 'fs';

/**
 * A generic implementation of the <code>AsteriaModule</code> interface that loads files from a local path.
 */
export class FileLoaderModule extends AbstractAsteriaModule implements AsteriaModule {

    /**
     * Creates a new <code>FileLoaderModule</code> instance.
     */
    constructor() {
        super('FileLoaderModule');
    }                      
    
    /**
     * @inheritdoc
     */
    public process(input: AsteriaData<StringData>): Promise<AsteriaData<StringData>> {
        const result: Promise<AsteriaData<StringData>> = new Promise<AsteriaData<StringData>>(
            (resolve: Function, reject: Function)=> {
                fs.readFile(
                    input.data.toString(),
                    (err: NodeJS.ErrnoException, data: Buffer)=> {
                        if (err) {
                            reject(err);
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