
import { AsteriaModuleConfig } from '../../../gaia/config/AsteriaModuleConfig';

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
     * The storage key of the first object to merge.
     */
    source1: string;
    
    /**
     * The storage key of the second object to merge.
     */
    source2: string;
}