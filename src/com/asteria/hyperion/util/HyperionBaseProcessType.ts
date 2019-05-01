// Class name reference:
const CLASS_NAME: string = 'com.asteria.hyperion.util::HyperionBaseProcessType';

/**
 * The <code>HyperionBaseProcessType</code> enum contains a list of constants that represent the default process types
 * provided by the Hyperion framework.
 */
export enum HyperionBaseProcessType {

    /**
     * Specifies the reference to the Hyperion "file reading" process.
     */
    READ_FILE = 'read-file',
    
    /**
     * Specifies the reference to the Hyperion process that turns a CSV file to a list of POJOs.
     */
    CSV_TO_LIST = 'csv-to-list',
    
    /**
     * Specifies the reference to the Hyperion "filtering" process.
     */
    FILTER = 'filter'
}