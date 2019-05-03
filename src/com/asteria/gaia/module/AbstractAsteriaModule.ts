import { AsteriaModuleConfig } from '../config/AsteriaModuleConfig';
import { AsteriaData } from '../data/AsteriaData';
import { AsteriaModule } from './AsteriaModule';
import { AsteriaObject } from '../lang/AsteriaObject';

/**
 * The abstract class for all implementations of the <code>AsteriaModule</code> interface.
 */
export abstract class AbstractAsteriaModule extends AsteriaObject implements AsteriaModule {

    /**
     * Creates a new <code>AbstractAsteriaModule</code> instance.
     * 
     * @param {string} className the fully qualified class name of this Asteria module.
     */
    protected constructor(className: string) {
        super(className || 'com.asteria.gaia.module::AbstractAsteriaModule');
        this.name = className.substring(className.lastIndexOf(':') + 1);
    }

    /**
     * @inheritdoc
     */
    public readonly name: string;

    /**
     * @inheritdoc
     */
    abstract process(input: AsteriaData<any>, config?: AsteriaModuleConfig): Promise<AsteriaData<any>>;
}