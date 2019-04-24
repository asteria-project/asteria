import { AsteriaModuleConfig } from '../../spec/config/AsteriaModuleConfig';

/**
 * The <code>DistinctListModuleConfig</code> interface defines the common
 * functionality implemented by context configuration objects applyed to
 * <code>DistinctListModule</code> modules.
 */
export interface DistinctListModuleConfig extends AsteriaModuleConfig {

    /**
     * 
     */
    key: string;
}