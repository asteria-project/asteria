import { AsteriaModule } from '../../spec/module/AsteriaModule';
import { AsteriaData } from '../../spec/data/AsteriaData';
import { AbstractAsteriaModule } from '../../spec/module/AbstractAsteriaModule';
import { AsteriaDataBuilder } from '../../ouranos/util/builder/AsteriaDataBuilder';
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
    public process(input: AsteriaData<string>): Promise<AsteriaData<string>> {
        const result: Promise<AsteriaData<string>> = new Promise<AsteriaData<string>>(
            (resolve: Function, reject: Function)=> {
                fs.readFile(
                    input.data,
                    (err: NodeJS.ErrnoException, data: Buffer)=> {
                        if(err) {
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