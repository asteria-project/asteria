import { AsteriaModule, AsteriaData, AbstractAsteriaModule } from '../../../gaia/gaia.index';

/**
 * A generic implementation of the <code>AsteriaModule</code> interface that displays the data input into the JavaScript
 * console.
 */
export class DataDisplayModule extends AbstractAsteriaModule implements AsteriaModule {

    /**
     * Creates a new <code>DataDisplayModule</code> instance.
     */
    constructor() {
        super('com.asteria.crios.module.im::DataDisplayModule');
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