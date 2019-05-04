import { Transform, TransformCallback } from 'stream';
import { AsteriaStream, CommonChar } from '../../gaia/gaia.index';

/**
 * The <code>CsvToListStream</code> class is a transformation stream that turns CSV chuncks into a list of POJOs.
 */
export class CsvToListStream extends Transform implements AsteriaStream {

    /**
     * The class name reference.
     */
    private static readonly CLASS_NAME: string = 'com.asteria.cronos.stream::CsvToListStream';

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
    private _separator: string = CsvToListStream.DEFAULT_SEPARATOR;

    /**
     * Indicates whether the first row must be removed (<code>true</code>), or not (<code>false</code>).
     */
    private _trimFirstRow: boolean = false;

    /**
     * The reference to the object used as prototype for all list entries.
     */
    private _objModel: any = null;

    /**
     * @inheritdoc
     */
    public getClassName(): string {
        return CsvToListStream.CLASS_NAME;
    }

    /**
     * @inherit
     */
    public _transform(chunk: any, encoding: string, callback: TransformCallback): void {
        const data: Array<string> = this.buildCsvArray('' + chunk);
        // this.push(chunk);
        const result: string = JSON.stringify(data);
        //console.log(result);
        callback(null, result);
    }

    /**
     * Builds and returns an array composed of each row of the CSV input.
     * 
     * @param {StringData} data the string representation fo the CSV input.
     * 
     * @return {Array<string>} an array composed of each row of the CSV input.
     */
    private buildCsvArray(data: string): Array<string> {
        return (data as string).split(CsvToListStream.NEW_LINE_CHAR);
    }
}