import { AsteriaModule, AsteriaData, StringData, AsteriaLogger, AbstractAsteriaModule, ListData, AsteriaModuleConfig, CommonChar } from '../../../gaia/gaia.index';
import { CsvColumnMapper } from '../../util/CsvColumnMapper';
import { OuranosLogger } from '../../../ouranos/ouranos.index';

// Static logger reference:
const LOGGER: AsteriaLogger = OuranosLogger.getLogger();

/**
 * An Asteria module that takes list of literal JavaScript objects as input and turns it into a a CSV string.
 */
export class ListToCsvModule extends AbstractAsteriaModule implements AsteriaModule {

    /**
     * Creates a new <code>CsvToListModule</code> instance.
     */
    constructor() {
        super('com.asteria.crios.module.im::ListToCsvModule');
    }

    /**
     * Represents a new line character.
     */
    private static readonly NEW_LINE_CHAR: string = '\n';
    
    /**
     * The reference to the CSV default separator.
     */
    private static readonly DEFAULT_SEPARATOR: string = CommonChar.COMMA;

    /**
     * The reference to the CSV separator. Default value is <code>,</code>.
     */
    private _separator: string = ListToCsvModule.DEFAULT_SEPARATOR;

    /**
     * The list of references used to create "columns to properties" mapping.
     */
    private _mappingRefs: Array<CsvColumnMapper> = null;
    
    /**
     * @inheritdoc
     */
    public process(input: AsteriaData<StringData>, 
                   config?: AsteriaModuleConfig): Promise<AsteriaData<ListData<any>>> {
        const result: Promise<AsteriaData<ListData<any>>> = new Promise<AsteriaData<ListData<any>>>(
            (resolve, reject)=> {
                resolve(null);
            }
        );
        return result;
    }
}