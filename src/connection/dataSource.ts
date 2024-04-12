import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import {config} from 'dotenv';
config();

const {DB_HOST,DB_PORT,DB_USERNAME,DB_PASSWORD,DB_NAME} =process.env;



export const datasourceOptions:DataSourceOptions = {
    type: "postgres",
    host:DB_HOST,
    port:+DB_PORT || 5432,
    username:DB_USERNAME,
    password:DB_PASSWORD,
    database:DB_NAME,
    entities: [join(__dirname, "/../**/*.entity{.ts,.js}")],
    migrationsTableName: "migrations",
    logging:true,
    migrations: [join(__dirname, "../migration/*{.ts,.js}")],
    // migrationsRun: true,
    // synchronize:true 
};

export const connectDb  = new DataSource(datasourceOptions);
connectDb.initialize().then((data)=> console.log("Datasource Intitatilised!!!")).catch((e)=>console.log(e));