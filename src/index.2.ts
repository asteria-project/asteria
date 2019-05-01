import * as path from 'path';

const buildFilePath: Function = (fileName: string)=> { 
    return path.join(__dirname, 'temp-data', fileName);
};

const hyperionSample: any /*HyperionConfig*/ = {
    name: 'Asteria Sample Process',
    processor: {
        processList: [
            {
                name: 'FileReaderModule',
                path: buildFilePath('worldcitiespop.csv')
            },
            {
                name: 'CsvToListModule',
                config: {
                    trimFirstRow: true,
                    separator: ';',
                    colsMapping: [
                        { index: 0, property: 'country' },
                        { index: 2, property: 'city' },
                        { index: 3, property: 'region' },
                        { index: 4, property: 'population', castFuncRef: 'number' },
                        { index: 5, property: 'latitude' },
                        { index: 6, property: 'longitude' }
                    ]
                }
            },
            {
                name: 'FilterListModuleConfig',
                config: {
                    condition: 'AND',
                    filters: [
                        {
                            property: 'population',
                            operator: 'GREATER_THAN',
                            value: 1000000
                        },
                        {
                            property: 'country',
                            operator: 'LIKE',
                            value: 'us'
                        }
                    ]
                }
            }
        ]
    }
};
