import { HyperionBaseProcessType } from './HyperionBaseProcessType';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.hyperion.util::HyperionBaseProcessDef';

/**
 * The <code>HyperionBaseProcessDef</code> static class allows to provides mapping information about Hyperion default
 * processes.
 */
export class HyperionBaseProcessDef {

    /**
     * Contains the mapping of Hyperion default processes, by process references.
     */
    private static readonly PROCESS_DEF: Map<string, string> = new Map<string, string>([
        [HyperionBaseProcessType.READ_FILE, 'readFile'],
        [HyperionBaseProcessType.CSV_TO_LIST, 'csvToList'],
        [HyperionBaseProcessType.FILTER, 'filter']
    ]);
    
    /**
     * Returns a string that represents the reference to a default Hyperion process method.
     * 
     * @param {string} type the type reference of a default Hyperion process.
     * 
     * @returns {string} the reference to a default Hyperion process method.
     */
    public static getProcessRef(type: string): string {
        return HyperionBaseProcessDef.PROCESS_DEF.get(type);
    }
}