import {Sequelize} from "sequelize"
import dotenv from "dotenv"
dotenv.config()


const {DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT} = process.env

export const db = new Sequelize(
    DB_NAME!,//name of database
    DB_USERNAME!,//name of username
    DB_PASSWORD as string,//db password
    {​​​​​​​
      host: DB_HOST,
      port: DB_PORT as unknown as number, //`${DB_PORT}`,
      dialect: "postgres",
      logging: false,
      dialectOptions: {​​​​​​​
        encrypt: true,
      //  ssl: {​​​​​​​
      //    rejectUnauthorized: false,
      //  }​​​​​​​,
      }​​​​​​​,
    }​​​​​​​
  );