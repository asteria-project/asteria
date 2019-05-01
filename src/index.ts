import { Hyperion } from './com/asteria/asteria.index';
import * as path from 'path';

const csvPath: string = path.join(__dirname, 'temp-data', 'worldcitiespop-dev.csv');

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
                        cast: [
                            { prop: 'Population', ref: 'number' }
                        ]
                    }
                },
                {
                    type: 'filter',
                    config: `Population > 1000000 AND Country = 'us'`
                }
            ]
        }).run();
