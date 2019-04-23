import { AsteriaModule } from '../../spec/module/AsteriaModule';
import { AsteriaData } from '../../spec/data/AsteriaData';
import { StringData } from '../../spec/data/StringData';
import { AbstractAsteriaModule } from '../../spec/module/AbstractAsteriaModule';
import { AsteriaDataBuilder } from '../util/AsteriaDataBuilder';
import { CsvToListModuleConfig } from '../../spec/config/CsvToListModuleConfig';
import { CsvColumnMapper } from '../../spec/util/CsvColumnMapper';

/**
 * An Asteria module that takes a CSV string as input and turns it into a list 
 * of literal JavaScript objects.
 */
export class CsvToListModule extends AbstractAsteriaModule
                             implements AsteriaModule {

    /**
     * Creates a new <code>CsvToListModule</code> instance.
     */
    constructor() {
        super('CsvToListModule');
    }

    /**
     * Represents a new line character.
     */
    private static readonly NEW_LINE_CHAR: string = '\n';
    
    /**
     * The reference to the CSV default separator.
     */
    private static readonly DEFAULT_SEPARATOR: string = ';';

    /**
     * The reference to the CSV separator. Default value is <code>;</code>.
     */
    private _separator: string = CsvToListModule.DEFAULT_SEPARATOR;

    /**
     * Indicates whether the first row must be removed (<code>true</code>), or
     * not (<code>false</code>).
     */
    private _trimFirstRow: boolean = false;

    /**
     * The list of references used to create "columns to properties" mapping.
     */
    private _mappingRefs: Array<CsvColumnMapper> = null;
    
    /**
     * @inheritdoc
     */
    public process(input: AsteriaData<StringData>,
             config?: CsvToListModuleConfig): Promise<AsteriaData<Array<any>>> {
        const result: Promise<AsteriaData<any>> = 
            new Promise<AsteriaData<Array<string>>>(
            (resolve, reject)=> {
                let objArr: Array<string> = null;
                try {
                    let csvArr: Array<string> = this.buildCsvArray(input.data);
                    this.initConfig(config, csvArr);
                    if (this._trimFirstRow) {
                        csvArr.splice(0, 1);
                    }
                    objArr = this.buildResultArray(csvArr);
                    resolve(
                        AsteriaDataBuilder.getInstance().build(objArr)
                    );
                } catch (e) {
                    reject(e);
                }
            }
        );
        return result;
    }

    /**
     * Initializes the module properties according to the config object.
     * 
     * @param {CsvToListModuleConfig} config the reference to the module
     *                                         config object.
     * @param {Array<string>} input the reference to the header line of the CSV
     *                              input.
     */
    private initConfig(config: CsvToListModuleConfig,
                       input: Array<string>): void {
        if (config) {
            this._trimFirstRow = config.trimFirstRow;
            this._separator = config.separator ||
                              CsvToListModule.DEFAULT_SEPARATOR;
            this.initColsMapping(config.colsMapping, input);
        } else {
            this.initColsMapping(null, input);
        }
    }

    /**
     * Initializes the "columns to properties" mapping, regarding the specified
     * parameters.
     * 
     * @param {Array<CsvColumnMapper>} mapping the reference to the mapping
     *                                         values, defined in the module
     *                                         config object.
     * @param {Array<string>} input the reference to the header line of the CSV
     *                              input.
     */
    private initColsMapping(mapping: Array<CsvColumnMapper>,
                            input: Array<string>): void{
        if (mapping)  {
            this._mappingRefs = mapping;
        } else {
            this._mappingRefs = new Array<CsvColumnMapper>();
            const firstRow: Array<string> = input[0].split(this._separator);
            firstRow.forEach((value: string, index: number)=> {
                this._mappingRefs.push({
                    index: index,
                    property: value
                });
            });
        }
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
    private buildResultArray(csvArr: Array<string>): Array<any> {
        let len: number = csvArr.length;
        const objArr: Array<any> = new Array<any>(len);
        while (len--) {
            objArr.splice(len, 1, this.buildObj(csvArr[len]));
        }
        return objArr;
    }

    /**
     * Builds and returns an object created from a CSV row.
     * 
     * @param {string} csvRow a string that represents a CSV row.
     * 
     * @return {any} a vanilla JavaScript object created from a CSV row.
     */
    private buildObj(csvRow: string): any {
        const values: Array<string> = csvRow.split(this._separator);
        let obj: any = {};
        this._mappingRefs.forEach((mapper: CsvColumnMapper)=> {
            obj[mapper.property] = values[mapper.index];
        });
        return obj;
    }
}