import { TransformOptions } from 'stream';
import { AsteriaStream, AsteriaContext, CommonChar } from '../../../gaia/gaia.index';
import { CronosTransformStream } from '../../core/CronosTransformStream';
import { LinesToListConfig } from '../../config/data/LinesToListConfig';

/**
 * The <code>LinesToListStream</code> class is a transformation stream that turns a string into a list of
 * <code>AsteriaLine</code> objects.
 */
export class LinesToListStream extends CronosTransformStream implements AsteriaStream {

    /**
     * The reference to the new line regular expression.
     */
    private static readonly NEW_LINE: RegExp = /\r\n|\r|\n/g;

    /**
     * The reference to the object used as prototype for all list entries.
     */
    private _objModel: any = {
        index: -1,
        value: CommonChar.EMPTY
    };

    /**
     * Represents an incomplete line, extracted from the last chunck.
     */
    private _incompleteLine: string = null;

    private _lineNum: number = 0;

    /**
     * Create a new <code>LinesToListStream</code> instance.
     * 
     * @param {TransformOptions} opts the options config for this stream.
     */
    constructor(opts?: TransformOptions) {
        super('com.asteria.cronos.stream.data::LinesToListStream', opts);
    }

    /**
     * @inheritdoc
     */
    public init(config: LinesToListConfig, context: AsteriaContext): void {}

    /**
     * @inheritdoc
     */
    public transform(chunk: any): void {
        const input: string = CommonChar.EMPTY + chunk;
        const lastLineComplete: boolean = this.checkFinalChar(input);
        const data: Array<string> = input.split(LinesToListStream.NEW_LINE);
        const result: string = this.buildAsteriaList(data, lastLineComplete);
        this.onComplete(null, result);
    }

    private checkFinalChar(input: string): boolean {
        return input.endsWith(CommonChar.NEW_LINE) || input.endsWith('\r\n') || input.endsWith('\r');
    }

    private buildAsteriaList(data: Array<string>, lastLineComplete: boolean): string {
        let result: string = CommonChar.EMPTY;
        if (this._incompleteLine && data[0] !== CommonChar.EMPTY) {
            data[0] = this._incompleteLine + data[0];
            this._incompleteLine = null;
        }
        let i: number = 0;
        let to: number = lastLineComplete ? data.length - 2 : data.length - 1;
        for(; i <= to; ++i) {
            const obj: any = this.buildLineObj(data[i]);
            result += JSON.stringify(obj) + CommonChar.NEW_LINE;
            this._lineNum++;
        }
        if (!lastLineComplete) {
            this._incompleteLine = data[data.length - 1];
        }
        return result;
    }

    private buildLineObj(value: string): any {
        let result: any = Object.create(this._objModel);
        result.index = this._lineNum;
        result.value = value;
        return result;
    }
}