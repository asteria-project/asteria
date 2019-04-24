import { AsteriaModule } from '../../spec/module/AsteriaModule';
import { AsteriaData } from '../../spec/data/AsteriaData';
import { AbstractAsteriaModule } from '../../spec/module/AbstractAsteriaModule';
import { AsteriaDataBuilder } from '../util/AsteriaDataBuilder';
import { DistinctListModuleConfig } from '../config/DistinctListModuleConfig';

/**
 * An Asteria module that takes an array as input and turns it into an array of
 * unique values.
 */
export class DistinctListModule extends AbstractAsteriaModule
                                implements AsteriaModule {

    /**
     * Creates a new <code>DistinctListModule</code> instance.
     */
    constructor() {
        super('DistinctListModule');
    }
    
    /**
     * @inheritdoc
     */
    public process(input: AsteriaData<Array<any>>,
          config?: DistinctListModuleConfig): Promise<AsteriaData<Array<any>>> {
        const result: Promise<AsteriaData<Array<any>>> = 
            new Promise<AsteriaData<Array<any>>>(
            (resolve, reject)=> {
                let uniqueArr: Array<any> = null;
                try {
                    uniqueArr = this.uniq(input.data, config.key);
                    resolve(
                        AsteriaDataBuilder.getInstance().build(uniqueArr)
                    );
                } catch (e) {
                    reject(e);
                }
            }
        );
        return result;
    }

    private uniq(inputArr: any[], key: string): any[] {
        return [...new Set(inputArr.map(item => item[key]))];
    }
}