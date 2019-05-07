import { HyperionBaseProcessType } from '../util/HyperionBaseProcessType';
import { HyperionValidator } from './HyperionValidator';
import { ReadFileValidator } from './impl/file/ReadFileValidator';
import { CsvToListValidator } from './impl/data/CsvToListValidator';
import { FilterValidator } from './impl/data/FilterValidator';
import { ListToCsvValidator } from './impl/data/ListToCsvValidator';
import { WriteFileValidator } from './impl/file/WriteFileValidator';
import { AbstractAsteriaObject } from '../../gaia/gaia.index';
import { LinesToListValidator } from './impl/data/LinesToListValidator';

/**
 * The <code>HyperionValidatorManager</code> class provides method for working with Hyperion config validators.
 */
export class HyperionValidatorManager extends AbstractAsteriaObject {

    /**
     * Creats a new <code>HyperionValidatorManager</code> instance.
     */
    constructor() {
        super('com.asteria.hyperion.validator::HyperionValidatorManager');
    }

    /**
     * The mapping of Hyperion process validators, by process references.
     */
    private readonly VALIDATORS: Map<string, any> = new Map<string, any>([
        [HyperionBaseProcessType.READ_FILE, ReadFileValidator],
        [HyperionBaseProcessType.WRITE_FILE, WriteFileValidator],
        [HyperionBaseProcessType.CSV_TO_LIST, CsvToListValidator],
        [HyperionBaseProcessType.LINES_TO_LIST, LinesToListValidator],
        [HyperionBaseProcessType.LIST_TO_CSV, ListToCsvValidator],
        [HyperionBaseProcessType.FILTER, FilterValidator]
    ]);
    
    /**
     * Return a <code>HyperionValidator</code> instance according to the specified Hyperion process type.
     * 
     * @param {string} type the type reference of a Hyperion process.
     * 
     * @returns {HyperionValidator} the <code>HyperionValidator</code> instance related to the specified Hyperion
     *                              process type.
     */
    public getValidator(type: string): HyperionValidator {
        const ClassRef: any = this.VALIDATORS.get(type);
        return new ClassRef();
    }
}
