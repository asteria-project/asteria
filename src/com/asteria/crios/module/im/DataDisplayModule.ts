import { AsteriaModule, AsteriaData, AbstractAsteriaModule } from '../../../gaia/gaia.index';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.crios.module.im::DataDisplayModule';

/**
 * A generic implementation of the <code>AsteriaModule</code> interface that displays the data input into the JavaScript
 * console.
 */
export class DataDisplayModule extends AbstractAsteriaModule
                               implements AsteriaModule {

    /**
     * Creates a new <code>DataDisplayModule</code> instance.
     */
    constructor() {
        super('DataDisplayModule');
    }                      
    
    /**
     * @inheritdoc
     */
    public process(input: AsteriaData<any>): Promise<AsteriaData<any>> {
        const result: Promise<AsteriaData<any>> = new Promise<AsteriaData<any>>(
            (resolve: Function)=> {
                console.log(input.data);
                resolve(input);
            }
        );
        return result;
    }
}