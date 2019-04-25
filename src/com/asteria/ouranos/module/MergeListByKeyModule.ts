import { AsteriaModule } from '../../spec/module/AsteriaModule';
import { AsteriaData } from '../../spec/data/AsteriaData';
import { AbstractAsteriaModule } from '../../spec/module/AbstractAsteriaModule';
import { MergeListByKeyModuleConfig } from '../config/MergeListByKeyModuleConfig';
import { CacheManager } from '../cache/CacheManager';
import { AsteriaCache } from '../../spec/cache/AsteriaCache';
import { AsteriaDataBuilder } from '../util/builder/AsteriaDataBuilder';

/**
 * An implementation of the <code>AsteriaModule</code> interface that merges all
 * objects in two lists, bu using a key correspondence.
 */
export class MergeListByKeyModule extends AbstractAsteriaModule
                                  implements AsteriaModule {

    /**
     * Creates a new <code>MergeListByKeyModule</code> instance.
     */
    constructor() {
        super('MergeListByKeyModule');
    }                      
    
    /**
     * @inheritdoc
     */
    public process(input: AsteriaData<any>,
                config: MergeListByKeyModuleConfig): Promise<AsteriaData<any>> {
        const result: Promise<AsteriaData<any>> =
            new Promise<AsteriaData<any>>(
                (resolve: Function, reject: Function)=> {
                    resolve(this.doMerge(config));
                }
            );
        return result;
    }

    private doMerge(config: MergeListByKeyModuleConfig): AsteriaData<any> {
        const cache: AsteriaCache = CacheManager.getInstance().getCache();
        const src1: any = cache.get(config.source1).data;
        const src2: any = cache.get(config.source2).data;
        const key: string = config.key;
        return this.buildMergedData(
            src1,
            key,
            this.getBuffer(src2, key),
        );
    }

    private getBuffer(src: Array<any>, key: string): Map<string, any> {
        const buffer: Map<string, any> = new Map<string, any>();
        let len: number = src.length;
        while (len--) {
            const obj: any = src[len];
            buffer.set(obj[key], obj);
        }
        return buffer;
    }

    private buildMergedData(src: Array<any>, key: string,
                           buffer: Map<string, any>): AsteriaData<any> {
        const result: Array<any> = new Array<any>();
        let len: number = src.length;
        while (len--) {
            const source1: any = src[len];
            const source2: any = buffer.get(source1[key]);
            result.push(Object.assign({}, source1, source2));

        }
        result.reverse();
        return AsteriaDataBuilder.getInstance().build(result);
    }
}