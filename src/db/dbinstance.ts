import { Sequelize } from 'sequelize';
import * as mysql2 from 'mysql2';
import { ProjectModel } from '../models/project';
import { UsersModel } from '../models/user';

const db_config  = {
    db: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
}

const sequelize = new Sequelize(db_config.db, db_config.username, db_config.password, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: mysql2,
    port: parseInt(process.env.DB_PORT)
});




const Users = UsersModel(sequelize, Sequelize); 
  
const Projects = ProjectModel(sequelize, Sequelize);

Users.hasMany(Projects, {
    sourceKey: 'id',
    foreignKey: 'ownerId',
    as: 'projects', // this determines the name in `associations`!
});
  




sequelize.authenticate().then( () => {
    console.log("sequelize authenticated!")
});

/*sequelize.sync().then( () => {
    console.log('DB and Tables created!')
}).catch( (err)=> {
    console.log(err);
});*/

export { Users , Projects , sequelize}
  
