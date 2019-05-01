import { HyperionBaseProcessType } from '../util/HyperionBaseProcessType';

/**
 * The <code>HyperionProcessConfig</code> interface represents the configuration of an <code>Hyperion</code> session.
 */
export interface HyperionProcessConfig {

    /**
     * The type reference of the <code>Hyperion</code> process defined by this config object.
     */
    type: HyperionBaseProcessType | string;

    /**
     * The configuration specific to the <code>Hyperion</code> process specified by the <code>type</code> property.
     */
    config: any;
}