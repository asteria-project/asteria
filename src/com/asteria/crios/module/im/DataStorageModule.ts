import { AsteriaModule, AsteriaData, AbstractAsteriaModule, AsteriaError, AsteriaErrorCode } from '../../../gaia/gaia.index';
import { DataStorageModuleConfig } from '../../config/im/DataStorageModuleConfig';
import { CacheManager, AsteriaErrorBuilder } from '../../../ouranos/ouranos.index';

/**
 * An implementation of the <code>AsteriaModule</code> interface that stores input data into the specified cache.
 */
export class DataStorageModule extends AbstractAsteriaModule implements AsteriaModule {

    /**
     * Creates a new <code>DataStorageModule</code> instance.
     */
    constructor() {
        super('com.asteria.crios.module.im::DataStorageModule');
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
                    const error: AsteriaError = AsteriaErrorBuilder.getInstance().build(
                        AsteriaErrorCode.PROCESS_FAILURE,
                        this.getClassName(),
                        'asteria process failed: ' + e.message,
                        e.stack
                    );
                    reject(error);
                }
            }
        );
        return result;
    }
}