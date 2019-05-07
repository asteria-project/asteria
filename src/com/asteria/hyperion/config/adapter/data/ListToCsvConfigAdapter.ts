import { CsvColumnMapper, ListToCsvConfig } from '../../../../cronos/cronos.index';
import { HyperionConfigAdapter } from '../../HyperionConfigAdapter';
import { AbstractAsteriaObject } from '../../../../gaia/gaia.index';

/**
 * The <code>ListToCsvConfigAdapter</code> class allows to convert <code>list-to-csv</code> config objects.
 */
export class ListToCsvConfigAdapter extends AbstractAsteriaObject implements HyperionConfigAdapter {

    /**
     * Create a new <code>ListToCsvConfigAdapter</code> instance.
     */
    constructor() {
        super('com.asteria.hyperion.config.adapter.data::ListToCsvConfigAdapter');
    }

    /**
     * @inheritdoc
     */
    public convert(config: any): ListToCsvConfig {
        const colsMap: any[] = config.colsMap;
        let result: ListToCsvConfig = {};
        if (config.separator) {
            result.separator = config.separator;
        }
        if (colsMap) {
            const colsMapping: Array<CsvColumnMapper> = new Array<CsvColumnMapper>();
            colsMap.forEach((value: any)=> {
                colsMapping.push({
                    index: value.id,
                    property: value.prop
                });
            });
            result.colsMapping = colsMapping;
        }
        return result;
    }
}
