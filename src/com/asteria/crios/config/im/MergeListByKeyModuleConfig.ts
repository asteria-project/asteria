
import { AsteriaModuleConfig } from '../../../gaia/gaia.index';

/**
 * The <code>MergeListByKeyModuleConfig</code> interface defines the common functionality implemented by context
 * configuration objects applyed to <code>MergeListByKeyModule</code> modules.
 */
export interface MergeListByKeyModuleConfig extends AsteriaModuleConfig {

    /**
     * The property name used for object comparison during the merge process.
     */
    key: string;

    /**
     * The storage key of the source object to merge.
     */
    source: string;
    
    /**
     * The storage key of the target object to merge.
     */
    target: string;
}