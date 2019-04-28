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

    /**
     * Stores the filtering condition defined for this module.
     */
    private _condition: FilterCondition = FilterCondition.OR;

    /**
     * Stores the list of filters defined for this module.
     */
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

    /**
     * Initializes this module with the parameters defined by the module config.
     *
     * @param {FilterListModuleConfig} config the config object for this module.
     */
    private initFilters(config: FilterListModuleConfig): void {
        AsteriaFilterManager.getInstance();
        if (config && config.filters) {
            if (config.condition) {
                this._condition = config.condition;
            }
            if (config.filters) {
                config.filters.forEach((value: FilterDefinition)=> {
                    this._filters.push(value);
                });
            }
        }
    }

    /**
     * Applies all filters defines for this module to the input object list and returns the result of the operation.
     * 
     * @param {ListData<any>} input the input on which to apply filters.
     * 
     * @returns {ListData<any>} tre result of the filtering operation.
     */
    private doFilters(input: ListData<any>): ListData<any> {
        let result:ListData<any> = ListDataBuilder.getInstance().build<any>();
        let len: number = input.length;
        if (this._condition === FilterCondition.OR) {
            while (len--) {
                this.applyFiltersOr(input[len], result);
            }
        } else if (this._condition === FilterCondition.AND) {
            while (len--) {
                this.applyFiltersAnd(input[len], result);
            }
        }
        return result;
    }

    /**
     * Applies all filters defines for this module to the specified object, according to the
     * <code>FilterCondition.OR/code> condition algorithm.
     * 
     * @param {any} obj the object on whitch to apply the module filters.
     * @param {ListData<any>} result the list that contains the result of the module operation.
     */
    private applyFiltersOr(obj: any, result:ListData<any>): void {
        const filtersSize: number = this._filters.length - 1;
        let i: number = 0;
        for (; i <= filtersSize; ++i) {
            if (this.applyFilter(obj, this._filters[i])) {
                result.push(obj);
                break;
            }
        }
    }

    /**
     * Applies all filters defines for this module to the specified object, according to the
     * <code>FilterCondition.AND/code> condition algorithm.
     * 
     * @param {any} obj the object on whitch to apply the module filters.
     * @param {ListData<any>} result the list that contains the result of the module operation.
     */
    private applyFiltersAnd(obj: any, result:ListData<any>): void {
        const filtersSize: number = this._filters.length - 1;
        let i: number = 0;
        let matchAll: boolean = true;
        for (; i <= filtersSize; ++i) {
            if (this.applyFilter(obj, this._filters[i]) === false) {
                matchAll = false;
                break;
            }
        }
        if (matchAll) {
            result.push(obj);
        }
    }

    /**
     * Returns a boolean value that indicates whether the filter matches the specified object (<code>true</code>), or
     * not (<code>false</code>).
     * 
     * @param {any} obj the object on whitch to apply the filter.
     * @param {FilterDefinition} def the definition that represents the filter to apply.
     * 
     * @returns {boolean} <code>true</code> whether the filter matches the specified object; <code>false</code>
     *                    otherwise.
     */
    private applyFilter(obj: any, def: FilterDefinition): boolean {
        return AsteriaFilterManager.getInstance()
                                   .getFilter(def.operator)
                                   .apply(obj, def.property, def.value);
    }
}