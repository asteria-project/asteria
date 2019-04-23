import { AsteriaModule } from '../../spec/module/AsteriaModule';
import { AsteriaData } from '../../spec/data/AsteriaData';
import { AbstractAsteriaModule } from '../../spec/module/AbstractAsteriaModule';
import { FilterListModuleConfig } from '../../spec/config/FilterListModuleConfig';
import { FilterDefinition } from '../../spec/filter/FilterDefinition';
import { AsteriaFilterManager } from '../filter/AsteriaFilterManager';
import { AsteriaDataBuilder } from '../util/AsteriaDataBuilder';
import { FilterCondition } from '../../spec/filter/FilterCondition';

/**
 * An Asteria module that filters list of literal JavaScript objects.
 */
export class FilterListModule extends AbstractAsteriaModule
                              implements AsteriaModule {

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
    public process(input: AsteriaData<Array<any>>,
            config?: FilterListModuleConfig): Promise<AsteriaData<Array<any>>> {
        this.initFilters(config);
        const result: Promise<AsteriaData<Array<any>>> = 
            new Promise<AsteriaData<Array<any>>>(
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
            config.filters.forEach((value: FilterDefinition)=>{
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