import { AsteriaModule } from '../../spec/module/AsteriaModule';
import { AsteriaData } from '../../spec/data/AsteriaData';
import { AbstractAsteriaModule } from '../../spec/module/AbstractAsteriaModule';

/**
 * A generic implementation of the <code>AsteriaModule</code> interface that can
 * be used as entry point of the process treatment.
 */
export class DataInputModule extends AbstractAsteriaModule
                             implements AsteriaModule {

    /**
     * Creates a new <code>DataInputModule</code> instance.
     */
    constructor() {
        super('DataInputModule');
    }                      
    
    /**
     * @inheritdoc
     */
    public process(input: AsteriaData<any>): Promise<AsteriaData<any>> {
        const result: Promise<AsteriaData<any>> = new Promise<AsteriaData<any>>(
            (resolve: Function)=> { resolve(input); }
        );
        return result;
    }
}