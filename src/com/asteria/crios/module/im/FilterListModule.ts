import { AsteriaModule } from '../../../gaia/module/AsteriaModule';
import { AsteriaData } from '../../../gaia/data/AsteriaData';
import { AbstractAsteriaModule } from '../../../gaia/module/AbstractAsteriaModule';
import { FilterListModuleConfig } from '../../config/im/FilterListModuleConfig';
import { FilterDefinition } from '../../../gaia/filter/FilterDefinition';
import { FilterCondition } from '../../../gaia/filter/FilterCondition';
import { AsteriaDataBuilder } from '../../../ouranos/util/builder/AsteriaDataBuilder';
import { AsteriaFilterManager } from '../../../ouranos/filter/AsteriaFilterManager';
import { ListData } from '../../../gaia/data/ListData';
import { ListDataBuilder } from '../../../ouranos/util/builder/ListDataBuilder';
import { OuranosLogger } from '../../../ouranos/util/logging/OuranosLogger';
import { AsteriaLogger } from '../../../gaia/util/logging/AsteriaLogger';

// Static logger reference:
const LOGGER: AsteriaLogger = OuranosLogger.getLogger();

/**
 * An Asteria module that filters list of literal JavaScript objects.
 */
export class FilterListModule extends AbstractAsteriaModule implements AsteriaModule {

    /**
     * Creates a new <code>FilterListModule</code> instance.
     */
    constructor() {
        super('FilterListModule');
    }

    private _condition: FilterCondition = FilterCondition.OR;

    private _filters: Array<FilterDefinition> = new Array<FilterDefinition>();
    
    /**
     * @inheritdoc
     */
    public process(input: AsteriaData<ListData<any>>,
                   config?: FilterListModuleConfig): Promise<AsteriaData<ListData<any>>> {
        this.initFilters(config);
        const result: Promise<AsteriaData<ListData<any>>> = new Promise<AsteriaData<ListData<any>>>(
            (resolve, reject)=> {
                const data: ListData<any> = input.data;
                LOGGER.info(`entries detected: ${data.length}`);
                const objArr: ListData<any> = this.doFilters(data);
                try {
                    LOGGER.info(`entries filtered: ${objArr.length}`);
                    resolve(
                        AsteriaDataBuilder.getInstance().buildListData(objArr)
                    );
                } catch (e) {
                    reject(e);
                }
            }
        );
        return result;
    }

    private initFilters(config: FilterListModuleConfig): void {
        AsteriaFilterManager.getInstance();
        if (config && config.filters) {
            config.filters.forEach((value: FilterDefinition)=> {
                this._filters.push(value);
            });
        }
    }

    private doFilters(input: ListData<any>): ListData<any> {
        let result:ListData<any> = ListDataBuilder.getInstance().build<any>();
        let len: number = input.length;
        while (len--) {
            this.applyFilters(input[len], result);
        }
        return result;
    }

    private applyFilters(obj: any, result:ListData<any>): void {
        const filtersSize: number = this._filters.length - 1;
        let i: number = 0;
        for (; i <= filtersSize; ++i) {
            if (this.applyFilter(obj, this._filters[i])) {
                result.push(obj);
                break;
            }
        }
    }

    private applyFilter(obj: any, def: FilterDefinition): boolean {
        return AsteriaFilterManager.getInstance()
                                   .getFilter(def.operator)
                                   .apply(obj, def.property, def.value);
    }
}