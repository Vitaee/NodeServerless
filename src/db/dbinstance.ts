import { Sequelize } from 'sequelize';
import * as mysql2 from 'mysql2';
const db_config  = {
    db: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
}

export const sequelize = new Sequelize(db_config.db, db_config.username, db_config.password, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: mysql2,
    port: parseInt(process.env.DB_PORT)
});

sequelize.authenticate();