import { AsteriaModuleConfig } from '../config/AsteriaModuleConfig';
import { AsteriaData } from '../data/AsteriaData';
import { AsteriaModule } from './AsteriaModule';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.gaia.module::AbstractAsteriaModule';

/**
 * The abstract class for all implementations of the <code>AsteriaModule</code> interface.
 */
export abstract class AbstractAsteriaModule implements AsteriaModule {

    /**
     * Creates a new <code>AbstractAsteriaModule</code> instance.
     * 
     * @param {string} name the name of this Asteria module.
     */
    protected constructor(name: string) {
        this.name = name;
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