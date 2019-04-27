import { AsteriaModule } from '../../../gaia/module/AsteriaModule';
import { AsteriaData } from '../../../gaia/data/AsteriaData';
import { AbstractAsteriaModule } from '../../../gaia/module/AbstractAsteriaModule';
import { FilterListModuleConfig } from '../../config/im/FilterListModuleConfig';
import { FilterDefinition } from '../../../gaia/filter/FilterDefinition';
import { FilterCondition } from '../../../gaia/filter/FilterCondition';
import { AsteriaDataBuilder } from '../../../ouranos/util/builder/AsteriaDataBuilder';
import { AsteriaFilterManager } from '../../../ouranos/filter/AsteriaFilterManager';

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
    public process(input: AsteriaData<Array<any>>, config?: FilterListModuleConfig): Promise<AsteriaData<Array<any>>> {
        this.initFilters(config);
        const result: Promise<AsteriaData<Array<any>>> = new Promise<AsteriaData<Array<any>>>(
            (resolve, reject)=> {
                let objArr: Array<any> = this.doFilters(input.data);
                try {
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

    private initFilters(config: FilterListModuleConfig): void {
        AsteriaFilterManager.getInstance();
        if (config && config.filters) {
            config.filters.forEach((value: FilterDefinition)=> {
                this._filters.push(value);
            });
        }
    }

    private doFilters(input: Array<any>): Array<any> {
        let result: Array<any> = new Array<any>();
        let len: number = input.length;
        const filtersSize: number = this._filters.length - 1;
        let obj: any = null;
        while (len--) {
            let i: number = 0;
            obj = input[len];
            for (; i <= filtersSize; ++i) {
                if (this.applyFilter(obj, this._filters[i])) {
                    result.push(obj);
                    break;
                }
            }
        }
        return result;
    }

    

    private applyFilter(obj: any, def: FilterDefinition): boolean {
        return AsteriaFilterManager.getInstance()
                                   .getFilter(def.operator)
                                   .apply(obj, def.property, def.value);
    }
}