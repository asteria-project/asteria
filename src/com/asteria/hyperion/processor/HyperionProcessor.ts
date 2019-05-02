import { AsteriaSession, AsteriaData, StringData, ListData } from '../../gaia/gaia.index';
import { AsteriaDataBuilder } from '../../ouranos/ouranos.index';
import { AsteriaProcessUtil } from '../util/AsteriaProcessUtil';
import { FileReaderModule } from '../../cronos/cronos.index';
import { CsvToListModule, FilterListModule } from '../../crios/crios.index';
import { CsvToListConfigAdapter } from '../config/adapter/CsvToListConfigAdapter';
import { HyperionConfigAdapter } from '../config/HyperionConfigAdapter';
import { FilterConfigAdapter } from '../config/adapter/FilterConfigAdapter';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.hyperion.processor::HyperionProcessor';

/**
 * The <code>HyperionProcessor</code> class is the core processor of the Hyperion framework.
 */
export class HyperionProcessor {

    /**
     * The reference to the Asteria session used by this processor to run Asteria modules.
     */
    private readonly SESSION: AsteriaSession = null;

    /**
     * Creates a new <code>HyperionProcessor</code> instance.
     * 
     * @param {AsteriaSession} session the Asteria session used by this processor to run Asteria modules.
     */
    public constructor(session: AsteriaSession) {
        this.SESSION = session;
    }

    /**
     * Runs all processes registered in this code>HyperionProcessor</code> instance and returns the result of these
     * operations.
     * 
     * @return {Promise<AsteriaData<any>>} the result of these operation defined by all processes registered in this
     *                                     code>HyperionProcessor</code> instance.
     */
    public run(): Promise<AsteriaData<any>> {
        return this.SESSION.getContext().getProcessManager().run();
    }

    public readFile(path: string): HyperionProcessor {
        const pathData: AsteriaData<StringData> = AsteriaDataBuilder.getInstance().buildStringData(path);
        AsteriaProcessUtil.addProcess(
            this.SESSION,
            AsteriaProcessUtil.buildProcess<StringData>(new FileReaderModule(), null, pathData)
        );
        return this;
    }

    public csvToList(config: any): HyperionProcessor {
        const adapter: HyperionConfigAdapter = new CsvToListConfigAdapter();
        AsteriaProcessUtil.addProcess(
            this.SESSION,
            AsteriaProcessUtil.buildProcess<StringData>(new CsvToListModule(), adapter.convert(config))
        );
        return this;
    }

    public filter(config: any): HyperionProcessor {
        const adapter: FilterConfigAdapter = new FilterConfigAdapter();
        AsteriaProcessUtil.addProcess(
            this.SESSION,
            AsteriaProcessUtil.buildProcess<ListData<any>>(new FilterListModule(), adapter.convert(config))
        );
        return this;
    }
}