import { Hyperion } from './com/asteria/asteria.index';
import * as path from 'path';

const csvPath: string = path.join(__dirname, 'temp-data', 'worldcitiespop.csv');

Hyperion.build({
            name: 'UsMegaCities',
            processes: [
                {
                    type: 'read-file',
                    config: csvPath
                },
                {
                    type: 'csv-to-list',
                    config: {
                        separator: ';',
                        colsMap: [
                            { id: 0, prop: 'country' },
                            { id: 2, prop: 'city' },
                            { id: 3, prop: 'region' },
                            { id: 4, prop: 'population', castRef: 'number' },
                            { id: 5, prop: 'latitude' },
                            { id: 6, prop: 'longitude' }
                        ]
                    }
                },
                {
                    type: 'filter',
                    config: 'population GREATER_THAN 1000000 AND country LIKE \'us\''
                }
            ]
        }).show();
