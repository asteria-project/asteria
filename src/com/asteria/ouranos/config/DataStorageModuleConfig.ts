import { AsteriaModuleConfig } from '../../spec/config/AsteriaModuleConfig';

/**
 * The <code>DataStorageModuleConfig</code> interface defines the common
 * functionality implemented by context configuration objects applyed to
 * <code>DataStorageModule</code> modules.
 */
export interface DataStorageModuleConfig extends AsteriaModuleConfig {

    /**
     * The reference used to store and retreive stored data.
     */
    key: string;
}