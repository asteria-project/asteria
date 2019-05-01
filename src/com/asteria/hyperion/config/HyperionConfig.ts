import { HyperionProcessConfig } from './HyperionProcessConfig';

/**
 * The <code>HyperionConfig</code> interface specifies the set of APIs you must implement to create configuration
 * objects in the <code>Hyperion</code> framework.
 */
export interface HyperionConfig {

    /**
     * The name of th Asteria session that holds all processes of the associated <code>Hyperion</code> processor.
     */
    name: string;

    /**
     * The list of config objects for all processes in this <code>Hyperion</code> processor.
     */
    processes: Array<HyperionProcessConfig>;
}