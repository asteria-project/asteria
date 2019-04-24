import { AsteriaModuleConfig } from '../../spec/config/AsteriaModuleConfig';
import { CsvColumnMapper } from '../util/CsvColumnMapper';

/**
 * The <code>CsvToListModuleConfig</code> interface defines the common
 * functionality implemented by context configuration objects applyed to
 * <code>CsvToListModule</code> modules.
 */
export interface CsvToListModuleConfig extends AsteriaModuleConfig {

    /**
     * Indicates whether the first row must be removed (<code>true</code>), or
     * not (<code>false</code>).
     */
    trimFirstRow?: boolean;

    /**
     * A list of column indexes excluded from the object mapping.
     */
    excludedCols?: Array<number>;
    
    /**
     * A definition list used to perform object mapping.
     */
    colsMapping?: Array<CsvColumnMapper>;

    /**
     * The reference to the CSV separator. Default value is <code>,</code>.
     */
    separator?: string;
}