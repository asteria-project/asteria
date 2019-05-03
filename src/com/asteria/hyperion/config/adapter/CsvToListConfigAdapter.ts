import { CsvToListModuleConfig, PropertyCastMapper, CsvColumnMapper } from '../../../crios/crios.index';
import { HyperionConfigAdapter } from '../HyperionConfigAdapter';
import { HyperionCastRef } from '../../util/HyperionCastRef';
import { AsteriaBooleanUtil } from '../../../ouranos/ouranos.index';
import { AsteriaObject } from '../../../gaia/gaia.index';

/**
 * The <code>CsvToListConfigAdapter</code> class allows to convert <code>cvs-to-lit</code> config objects.
 */
export class CsvToListConfigAdapter extends AsteriaObject implements HyperionConfigAdapter {

    /**
     * Creates a new <code>CsvToListConfigAdapter</code> instance.
     */
    constructor() {
        super('com.asteria.hyperion.config.adapter::CsvToListConfigAdapter');
    }

    /**
     * @inheritdoc
     */
    public convert(config: any): CsvToListModuleConfig {
        const trimFirstRow: boolean = config.trimFirstRow;
        const cast: any[] = config.cast;
        const colsMap: any[] = config.colsMap;
        let result: CsvToListModuleConfig = {};
        if (trimFirstRow !== null && trimFirstRow !== undefined) {
            result.trimFirstRow = trimFirstRow;
        } else {
            result.trimFirstRow = true;
        }
        if (config.separator) {
            result.separator = config.separator;
        }
        if (colsMap) {
            const colsMapping: Array<CsvColumnMapper> = new Array<CsvColumnMapper>();
            colsMap.forEach((value: any)=> {
                colsMapping.push({
                    index: value.id,
                    property: value.prop,
                    castFunc: this.getCastFunction(value.castRef)
                });
            });
            result.colsMapping = colsMapping;
        }
        if (cast) {
            const castMapping: Array<PropertyCastMapper> = new Array<PropertyCastMapper>();
            cast.forEach((value: any)=> {
                castMapping.push({
                    property: value.prop,
                    castFunc: this.getCastFunction(value.ref)
                });
            });
            result.castMapping = castMapping;
        }
        return result;
    }

    /**
     * Returns the casting function specified by the config reference.
     * TODO: implement a casting functions registry.
     * 
     * @param {string} ref the reference to the function to get.
     * 
     * @returns {Function} the casting function specified by the config reference.
     */
    private getCastFunction(ref: string): Function {
        let result: Function = null;
        switch (ref) {
            case HyperionCastRef.NUMBER: 
                result = Number;
                break;
            case HyperionCastRef.STRING: 
                result = String;
                break;
            case HyperionCastRef.BOOLEAN: 
                result = AsteriaBooleanUtil.cast;
                break;
        }
        return result;
    }
}