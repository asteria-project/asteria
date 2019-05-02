import { AsteriaData, AsteriaError, AsteriaLogger } from '../../gaia/gaia.index';
import { Ouranos, OuranosLogger } from '../../ouranos/ouranos.index';
import { HyperionProcessor } from '../processor/HyperionProcessor';
import { HyperionConfig } from '../config/HyperionConfig';
import { HyperionProcessConfig } from '../config/HyperionProcessConfig';
import { HyperionBaseProcessDef } from '../util/HyperionBaseProcessDef';
import { HyperionValidatorManager } from '../validator/HyperionValidatorManager';
import { HyperionValidator } from '../validator/HyperionValidator';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.hyperion.lang::Hyperion';

// Static logger reference:
const LOGGER: AsteriaLogger = OuranosLogger.getLogger();

/**
 * The <code>Hyperion</code> class is the entry point of the Hyperion framework. It provides all functionalities needed
 * for running Asteria processes defined by Plain Old JavaScript objects.
 */
export class Hyperion {

    /**
     * The reference to the processor used by this <code>Hyperion</code> instance to run Asteria modules.
     */
    private readonly PROCESSOR: HyperionProcessor = null;

    /**
     * The reference to the manager used by this <code>Hyperion</code> instance to validate a Hyperion process config.
     */
    private readonly VALIDATOR_MANAGER: HyperionValidatorManager = null;

    /**
     * Creates a new <code>Hyperion</code> instance.
     * 
     * @param {string} name the name of the session associated with the new <code>Hyperion</code> instance.
     */
    private constructor(name: string) {
        this.PROCESSOR = new HyperionProcessor(Ouranos.buildSession(name));
        this.VALIDATOR_MANAGER = new HyperionValidatorManager();
    }

    /**
     * Builds and returns a new <code>Hyperion</code> instance.
     * 
     * @param {HyperionConfig} config the description of all Asteria processes managed by this <code>Hyperion</code>
     *                                instance.
     * 
     * @return {AsteriaSession} a new <code>Hyperion</code> instance.
     */
    public static build(config: HyperionConfig): Hyperion {
        const container: Hyperion = new Hyperion(config.name);
        container.initProcessor(config);
        return container;
    }

    /**
     * Runs all processes registered in this<code>Hyperion</code> instance and returns the result of these operations.
     * 
     * @return {Promise<AsteriaData<any>>} the result of these operation defined by all processes registered in this
     *                                    <code>Hyperion</code> instance.
     */
    public run(): Promise<AsteriaData<any>> {
        return this.PROCESSOR.run();
    }

    /**
     * Runs all processes registered in this <code>Hyperion</code> instance, display the result of these operations in
     * the standard output and returns the result.
     * 
     * @return {Promise<AsteriaData<any>>} the result of these operation defined by all processes registered in this
     *                                     <code>Hyperion</code> instance.
     */
    public show(): Promise<AsteriaData<any>> {
        return this.PROCESSOR.run()
                             .then((value: AsteriaData<any>)=> {
                                console.log(value.data);
                                return value;
                             });
    }
    
    /**
     * Parses the specified Hyperion config and initializes the processor.
     */
    private initProcessor(config: HyperionConfig): void {
        config.processes.forEach((processCfg: HyperionProcessConfig)=> {
            const type: string = processCfg.type;
            const validator: HyperionValidator = this.VALIDATOR_MANAGER.getValidator(type);
            validator.validate(processCfg, (err: AsteriaError)=> {
                if (err) {
                    LOGGER.fatal(err.toString());
                } else {
                    const funcRef: string = HyperionBaseProcessDef.getProcessRef(type);
                    const processFun: Function = (this.PROCESSOR as any)[funcRef];
                    processFun.call(this.PROCESSOR, processCfg.config);
                }
            });
        });
    }
}