import {Options} from "@mikro-orm/core";

const config: Options = {
    entities: ['./build/src/entities', './src/entities'],
    entitiesTs: ['./src/entities'],
    dbName: 'bookstore',
    type: 'postgresql'
};

export default config;