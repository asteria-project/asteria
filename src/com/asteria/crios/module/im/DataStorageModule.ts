import { AsteriaModule } from '../../../gaia/module/AsteriaModule';
import { AsteriaData } from '../../../gaia/data/AsteriaData';
import { AbstractAsteriaModule } from '../../../gaia/module/AbstractAsteriaModule';
import { DataStorageModuleConfig } from '../../config/im/DataStorageModuleConfig';
import { CacheManager } from '../../../ouranos/cache/CacheManager';

/**
 * An implementation of the <code>AsteriaModule</code> interface that stores input data into the specified cache.
 */
export class DataStorageModule extends AbstractAsteriaModule implements AsteriaModule {

    /**
     * Creates a new <code>DataStorageModule</code> instance.
     */
    constructor() {
        super('DataStorageModule');
    }                      
    
    /**
     * @inheritdoc
     */
    public process(input: AsteriaData<any>, config: DataStorageModuleConfig): Promise<AsteriaData<null>> {
        const result: Promise<AsteriaData<null>> = new Promise<AsteriaData<null>>(
            (resolve: Function, reject: Function)=> {
                try {
                    CacheManager.getInstance()
                                .getCache()
                                .add(config.key, input);
                    resolve(null);
                } catch (e) {
                    reject(e);
                }
            }
        );
        return result;
    }
}