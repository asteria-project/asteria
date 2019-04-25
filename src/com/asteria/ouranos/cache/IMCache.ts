import { AsteriaCache } from '../../spec/cache/AsteriaCache';
import { Uuid } from '../lang/Uuid';
import { AsteriaData } from '../../spec/data/AsteriaData';

/**
 * An <code>AsteriaCache</code> interface implementation that provides "in
 * memory" data storage.
 */
export class IMCache implements AsteriaCache {

    /**
     * The reference to the identifier for this cache object.
     */
    private readonly ID: string;

    /**
     * A map that stores all objects chached within this cache.
     */
    private readonly CACHED_OBJ: Map<string, any>;

    /**
     * Creates a new <code>IMCache</code> instance.
     */
    constructor() {
        this.ID = Uuid.v4();
        this.CACHED_OBJ = new Map<string, any>();
    }

    /**
     * @inheritdoc
     */
    public getId(): string {
        return this.ID;
    }

    /**
     * @inheritdoc
     */
    public add(key: string, obj: AsteriaData<any>): void {
        this.CACHED_OBJ.set(key, obj);
    }

    /**
     * @inheritdoc
     */
    public get(key: string): AsteriaData<any> {
        return this.CACHED_OBJ.get(key);
    }

    /**
     * @inheritdoc
     */
    public has(key: string): boolean {
        return this.CACHED_OBJ.has(key);
    }
}