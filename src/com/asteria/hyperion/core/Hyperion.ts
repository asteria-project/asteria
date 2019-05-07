import { AsteriaError, AbstractAsteriaObject, AsteriaStream } from '../../gaia/gaia.index';
import { Ouranos, OuranosSession, OuranosContext } from '../../ouranos/ouranos.index';
import { HyperionProcessor } from '../processor/HyperionProcessor';
import { HyperionConfig } from '../config/HyperionConfig';
import { HyperionProcessConfig } from '../config/HyperionProcessConfig';
import { HyperionBaseProcessDef } from '../util/HyperionBaseProcessDef';
import { HyperionValidatorManager } from '../validator/HyperionValidatorManager';
import { HyperionValidator } from '../validator/HyperionValidator';

/**
 * The <code>Hyperion</code> class is the entry point of the Hyperion framework. It provides all functionalities needed
 * for running Asteria processes defined by Plain Old JavaScript objects.
 */
export class Hyperion extends AbstractAsteriaObject {

    /**
     * The reference to the session holded by this <code>Hyperion</code> instance.
     */
    private readonly SESSION: OuranosSession = null;

    /**
     * The reference to the processor used by this <code>Hyperion</code> instance to run Asteria stream processes.
     */
    private readonly PROCESSOR: HyperionProcessor = null;

    /**
     * The reference to the manager used by this <code>Hyperion</code> instance to validate a Hyperion process config.
     */
    private readonly VALIDATOR_MANAGER: HyperionValidatorManager = null;

    /**
     * Create a new <code>Hyperion</code> instance.
     * 
     * @param {HyperionConfig} config the name of the session associated with the new <code>Hyperion</code> instance.
     */
    private constructor(config: HyperionConfig) {
        super('com.asteria.hyperion.lang::Hyperion');
        this.SESSION = Ouranos.createSession({ name: config.name }) as OuranosSession;
        this.PROCESSOR = new HyperionProcessor(this.SESSION);
        this.VALIDATOR_MANAGER = new HyperionValidatorManager();
        this.initProcessor(config);
    }

    /**
     * Build and return a new <code>Hyperion</code> instance.
     * 
     * @param {HyperionConfig} config the description of all Asteria processes managed by this <code>Hyperion</code>
     *                                instance.
     * 
     * @return {Hyperion} a new <code>Hyperion</code> instance.
     */
    public static build(config: HyperionConfig): Hyperion {
        return new Hyperion(config);
    }

    /**
     * Run all stream processes registered in this<code>Hyperion</code> instance and return the the reference to the 
     * last registered stream.
     */
    public run(): AsteriaStream {
        return this.PROCESSOR.run();
    }
    
    /**
     * Parse the specified Hyperion config and initialize the processor.
     */
    private initProcessor(config: HyperionConfig): void {
        config.processes.forEach((processCfg: HyperionProcessConfig)=> {
            const type: string = processCfg.type;
            const validator: HyperionValidator = this.VALIDATOR_MANAGER.getValidator(type);
            validator.validate(processCfg, (err: AsteriaError)=> {
                if (err) {
                    (this.SESSION.getContext() as OuranosContext).getLogger().fatal(err.toString());
                } else {
                    const funcRef: string = HyperionBaseProcessDef.getProcessRef(type);
                    const processFun: Function = (this.PROCESSOR as any)[funcRef];
                    processFun.call(this.PROCESSOR, processCfg.config);
                }
            });
        });
    }
}