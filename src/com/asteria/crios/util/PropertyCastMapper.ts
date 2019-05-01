/**
 * A utility that allows to specify a casting fuction to an object property.
 */
export class PropertyCastMapper {

    /**
     * The name of the property to cast.
     */
    property: string;

    /**
     * The function used to cast the specified property.
     */
    castFunc: Function;
}