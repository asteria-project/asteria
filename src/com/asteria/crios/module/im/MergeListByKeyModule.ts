import { AsteriaModule } from '../../../gaia/module/AsteriaModule';
import { AsteriaData } from '../../../gaia/data/AsteriaData';
import { AbstractAsteriaModule } from '../../../gaia/module/AbstractAsteriaModule';
import { MergeListByKeyModuleConfig } from '../../config/im/MergeListByKeyModuleConfig';
import { AsteriaCache } from '../../../gaia/cache/AsteriaCache';
import { CacheManager } from '../../../ouranos/cache/CacheManager';
import { AsteriaDataBuilder } from '../../../ouranos/util/builder/AsteriaDataBuilder';
import { ListData } from '../../../gaia/data/ListData';
import { ListDataBuilder } from '../../../ouranos/util/builder/ListDataBuilder';

/**
 * An implementation of the <code>AsteriaModule</code> interface that merges all objects in two lists, bu using a key
 * correspondence.
 */
export class MergeListByKeyModule extends AbstractAsteriaModule implements AsteriaModule {

    /**
     * Creates a new <code>MergeListByKeyModule</code> instance.
     */
    constructor() {
        super('MergeListByKeyModule');
    }                      
    
    /**
     * @inheritdoc
     */
    public process(input: AsteriaData<ListData<any>>,
                   config: MergeListByKeyModuleConfig): Promise<AsteriaData<ListData<any>>> {
        const result: Promise<AsteriaData<ListData<any>>> = new Promise<AsteriaData<ListData<any>>>(
            (resolve: Function, reject: Function)=> {
                resolve(this.doMerge(config));
            }
        );
        return result;
    }

    private doMerge(config: MergeListByKeyModuleConfig): AsteriaData<ListData<any>> {
        const cache: AsteriaCache = CacheManager.getInstance().getCache();
        const target: ListData<any> = cache.get(config.target).data as ListData<any>;
        const source: ListData<any> = cache.get(config.source).data as ListData<any>;
        const key: string = config.key;
        return this.buildMergedData(target, key, this.getBuffer(source, key));
    }

    private getBuffer(src: ListData<any>, key: string): Map<string, any> {
        const buffer: Map<string, any> = new Map<string, any>();
        let len: number = src.length;
        while (len--) {
            const obj: any = src[len];
            buffer.set(obj[key], obj);
        }
        return buffer;
    }

    private buildMergedData(tgt: Array<any>, key: string, buffer: Map<string, any>): AsteriaData<ListData<any>> {
        const result: ListData<any> = ListDataBuilder.getInstance().build<any>();
        let len: number = tgt.length;
        while (len--) {
            const target: any = tgt[len];
            const source: any = buffer.get(target[key]);
            result.push(Object.assign({}, target, source));

        }
        result.reverse();
        return AsteriaDataBuilder.getInstance().build(result);
    }
}
