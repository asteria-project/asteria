import { StreamProcessConfig } from '../../gaia/gaia.index';

/**
 * The <code>CsvToListConfig</code> interface represents the configuration of a <code>CsvToListProcess</code> stream
 * process.
 */
export interface CsvToListConfig extends StreamProcessConfig {

    /**
     * Indicates whether the first row must be removed (<code>true</code>), or not (<code>false</code>). Default value
     * is <code>true</code>.
     */
    trimFirstRow?: boolean;

    /**
     * A list of column indexes excluded from the object mapping.
     */
    excludedCols?: Array<number>;
    
    /**
     * A definition list used to perform object mapping.
     */
    //colsMapping?: Array<CsvColumnMapper>;

    /**
     * The reference to the CSV separator. Default value is <code>,</code>.
     */
    separator?: string;
}