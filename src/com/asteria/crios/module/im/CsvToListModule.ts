import { AsteriaModule, AsteriaData, StringData, AbstractAsteriaModule, ListData, AsteriaLogger, AsteriaErrorCode, AsteriaError, CommonChar } from '../../../gaia/gaia.index';
import { OuranosLogger, ListDataBuilder, AsteriaDataBuilder, AsteriaErrorBuilder } from '../../../ouranos/ouranos.index';
import { CsvColumnMapper } from '../../util/CsvColumnMapper';
import { CsvToListModuleConfig } from '../../config/im/CsvToListModuleConfig';
import { PropertyCastMapper } from '../../util/PropertyCastMapper';


// Static logger reference:
const LOGGER: AsteriaLogger = OuranosLogger.getLogger();

/**
 * An Asteria module that takes a CSV string as input and turns it into a list of literal JavaScript objects.
 */
export class CsvToListModule extends AbstractAsteriaModule implements AsteriaModule {

    /**
     * Creates a new <code>CsvToListModule</code> instance.
     */
    constructor() {
        super('com.asteria.crios.module.im::CsvToListModule');
    }

    /**
     * Represents a new line character.
     */
    private static readonly NEW_LINE_CHAR: string = '\r\n';
    
    /**
     * The reference to the CSV default separator.
     */
    private static readonly DEFAULT_SEPARATOR: string = CommonChar.COMMA;

    /**
     * The reference to the CSV separator. Default value is <code>,</code>.
     */
    private _separator: string = CsvToListModule.DEFAULT_SEPARATOR;

    /**
     * Indicates whether the first row must be removed (<code>true</code>), or not (<code>false</code>).
     */
    private _trimFirstRow: boolean = false;

    /**
     * The list of references used to create "columns to properties" mapping.
     */
    private _mappingRefs: Array<CsvColumnMapper> = null;

    /**
     * The reference to the object used as prototype for all list entries.
     */
    private _objModel: any = null;
    
    /**
     * @inheritdoc
     */
    public process(input: AsteriaData<StringData>, 
                   config?: CsvToListModuleConfig): Promise<AsteriaData<ListData<any>>> {
        const result: Promise<AsteriaData<ListData<any>>> = new Promise<AsteriaData<ListData<any>>>(
            (resolve, reject)=> {
                try {
                    let csvArr: Array<string> = this.buildCsvArray(input.data);
                    LOGGER.info(`CSV file parsed: ${csvArr.length} entries detected`);
                    this.initConfig(config, csvArr);
                    if (this._trimFirstRow) {
                        csvArr.splice(0, 1);
                    }
                    const objArr: ListData<any> = this.buildResultArray(csvArr);
                    LOGGER.info(`CSV conversion completed: ${objArr.length} objects created`);
                    resolve(
                        AsteriaDataBuilder.getInstance().buildListData(objArr)
                    );
                } catch (e) {
                    const error: AsteriaError = AsteriaErrorBuilder.getInstance().build(
                        AsteriaErrorCode.PROCESS_FAILURE,
                        this.getClassName(),
                        'asteria process failed: ' + e.message,
                        e.stack
                    );
                    reject(error);
                }
            }
        );
        return result;
    }

    /**
     * Initializes the module properties according to the config object.
     * 
     * @param {CsvToListModuleConfig} config the reference to the module config object.
     * @param {Array<string>} input the reference to the header line of the CSV input.
     */
    private initConfig(config: CsvToListModuleConfig, input: Array<string>): void {
        if (config) {
            this._trimFirstRow = config.trimFirstRow;
            this._separator = config.separator || CsvToListModule.DEFAULT_SEPARATOR;
            this.initColsMapping(config.colsMapping, input);
            this.initPropsCasting(config.castMapping);
        } else {
            this.initColsMapping(null, input);
        }
    }

    /**
     * Initializes casting function by using the <code>castMapping</code> list of the module config object.
     * 
     * @param {Array<PropertyCastMapper>} mapping the list of casting functions for this module.
     */
    private initPropsCasting(mapping: Array<PropertyCastMapper>): void {
        if (mapping) {
            mapping.forEach((value: PropertyCastMapper)=> {
                this.mapProperty(value);
            });
        }
    }

    /**
     * Maps the specified <code>PropertyCastMapper</code> object with a reference registered within the internal
     * <code>CsvColumnMapper</code> list.
     *
     * @param {PropertyCastMapper} value the value to map.
     */
    private mapProperty(value: PropertyCastMapper): void {
        const prop: string = value.property;
        let found: boolean = false;
        let i: number = 0;
        for(; i <= this._mappingRefs.length - 1; ++i) {
            const mapRef: CsvColumnMapper = this._mappingRefs[i];
            if (mapRef.property === prop) {
                mapRef.castFunc = value.castFunc;
                found = true;
                break;
            }
        }
        if (!found) {
            LOGGER.warn(
                AsteriaErrorBuilder.getInstance()
                                   .build(
                                        AsteriaErrorCode.INVALID_PARAMETER,
                                        this.getClassName(),
                                        `property '${prop}' does not exist in CSV file`
                                    ).toString()
            );
        }
    }

    /**
     * Initializes the "columns to properties" mapping, regarding the specified parameters.
     * 
     * @param {Array<CsvColumnMapper>} mapping the reference to the mapping values, defined in the module config object.
     * @param {Array<string>} input the reference to the header line of the CSV input.
     */
    private initColsMapping(mapping: Array<CsvColumnMapper>, input: Array<string>): void{
        if (mapping)  {
            this._mappingRefs = mapping;
        } else {
            this._mappingRefs = new Array<CsvColumnMapper>();
            const firstRow: Array<string> = input[0].split(this._separator);
            firstRow.forEach((value: string, index: number)=> {
                this._mappingRefs.push(
                    {
                        index: index,
                        property: value
                    }
                );
            });
        }
        this.buildObjModel();
    }

    /**
     * Builds and returns an array composed of each row of the CSV input.
     * 
     * @param {StringData} data the string representation fo the CSV input.
     * 
     * @return {Array<string>} an array composed of each row of the CSV input.
     */
    private buildCsvArray(data: StringData): Array<string> {
        return (data as string).split(CsvToListModule.NEW_LINE_CHAR);
    }

    /**
     * Creates and returns the array of CSV marshaled rows.
     * 
     * @param {Array<string>} csvArr the reference to the CSV input array.
     * 
     * @return {Array<any>} the array of CSV marshaled rows.
     */
    private buildResultArray(csvArr: Array<string>): ListData<any> {
        let len: number = csvArr.length;
        const objArr: ListData<any> = ListDataBuilder.getInstance().build<any>();
        let emptyEntries: number = 0;
        while (len--) {
            const obj: any = this.buildObj(csvArr[len]);
            if (obj) {
                objArr.push(obj);
            } else {
                emptyEntries++;
            }
        }
        if (emptyEntries > 0) {
            LOGGER.info(`empty entries detected: ${emptyEntries} removed`);
        }
        objArr.reverse();
        return objArr;
    }

    /**
     * Builds and returns an object created from a CSV row. Returns <code>null</code> whether the specified row is
     * empty.
     * 
     * @param {string} csvRow a string that represents a CSV row.
     * 
     * @return {any} a vanilla JavaScript object created from a CSV row, or <code>null</code> whether the specified row
     *               is empty.
     */
    private buildObj(csvRow: string): any {
        const isEmpty: boolean = csvRow === CommonChar.EMPTY;
        let obj: any = null;
        if (!isEmpty) {
            const values: Array<string> = csvRow.split(this._separator);
            const len = this._mappingRefs.length - 1;
            let i: number = 0;
            obj = Object.create(this._objModel);
            for (; i <= len; ++i) {
                const mapper: CsvColumnMapper = this._mappingRefs[i];
                const value: any = values[mapper.index];
                const castFunc: Function = mapper.castFunc;
                obj[mapper.property] = castFunc ? castFunc(value) : value;
            };
        }
        return obj;
    }

    /**
     * Builds the object model used for creating all list items.
     */
    private buildObjModel(): void {
        this._objModel = {};
        this._mappingRefs.forEach((mapper: CsvColumnMapper)=> {
            this._objModel[mapper.property] = undefined;
        });
    }
}