import { HyperionBaseProcessType } from '../util/HyperionBaseProcessType';
import { HyperionValidator } from './HyperionValidator';
import { ReadFileValidator } from './impl/ReadFileValidator';
import { CsvToListValidator } from './impl/CsvToListValidator';
import { FilterValidator } from './impl/FilterValidator';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.hyperion.validator::HyperionValidatorManager';

/**
 * The <code>HyperionValidatorManager</code> class provides method for working with Hyperion config validators.
 */
export class HyperionValidatorManager {

    /**
     * Contains the mapping of Hyperion process validators, by process references.
     */
    private readonly VALIDATORS: Map<string, any> = new Map<string, any>([
        [HyperionBaseProcessType.READ_FILE, ReadFileValidator],
        [HyperionBaseProcessType.CSV_TO_LIST, CsvToListValidator],
        [HyperionBaseProcessType.FILTER, FilterValidator]
    ]);
    
    /**
     * Returns a <code>HyperionValidator</code> instance according to the specified Hyperion process type.
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