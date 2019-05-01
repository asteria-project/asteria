import { AsteriaProcessBuilder } from '../../ouranos/ouranos.index';
import { AsteriaProcess, AsteriaModule, AsteriaData, AsteriaModuleConfig, AsteriaSession } from '../../gaia/gaia.index';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.hyperion.util::AsteriaProcessUtil';

/**
 * A utility class which provides static methods for working with Asteria  processes.
 */
export class AsteriaProcessUtil {

    public static buildProcess<T>(module: AsteriaModule, config: AsteriaModuleConfig,
                                  input?: AsteriaData<T>): AsteriaProcess<T> {
        const processBuilder: AsteriaProcessBuilder = AsteriaProcessBuilder.getInstance();
        return processBuilder.build<T>(module, config, input);
    }

    
    public static addProcess(session: AsteriaSession, process: any): void {
        session.getContext().getProcessManager().add(process);
    }
}