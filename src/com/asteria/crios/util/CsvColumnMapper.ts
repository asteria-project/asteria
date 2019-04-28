/**
 * A utility that allows to map a column of a CSV file to an object property name.
 */
export class CsvColumnMapper {

    /**
     * The index of the column to map.
     */
    index: number;

    /**
     * The name of the property used for mapping.
     */
    property: string;

    /**
     * The function used to cast the value of the column to map.
     */
    castFunc?: Function;
}