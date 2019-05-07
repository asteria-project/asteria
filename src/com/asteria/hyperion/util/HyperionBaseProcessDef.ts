import { HyperionBaseProcessType } from './HyperionBaseProcessType';

/**
 * The <code>HyperionBaseProcessDef</code> static class allows to provides mapping information about Hyperion default
 * processes.
 */
export class HyperionBaseProcessDef {

    /**
     * The mapping of Hyperion default processes, by process references.
     */
    private static readonly PROCESS_DEF: Map<string, string> = new Map<string, string>([
        [HyperionBaseProcessType.READ_FILE, 'readFile'],
        [HyperionBaseProcessType.WRITE_FILE, 'writeFile'],
        [HyperionBaseProcessType.CSV_TO_LIST, 'csvToList'],
        [HyperionBaseProcessType.LINES_TO_LIST, 'linesToList'],
        [HyperionBaseProcessType.LIST_TO_CSV, 'listToCsv'],
        [HyperionBaseProcessType.FILTER, 'filter']
    ]);
    
    /**
     * Return a string that represents the reference to a default Hyperion process method.
     * 
     * @param {string} type the type reference of a default Hyperion process.
     * 
     * @returns {string} the reference to a default Hyperion process method.
     */
    public static getProcessRef(type: string): string {
        return HyperionBaseProcessDef.PROCESS_DEF.get(type);
    }
}
