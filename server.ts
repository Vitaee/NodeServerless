import express, { Application, NextFunction, Request, Response, } from 'express';
import { config } from 'dotenv';
import serverless from 'serverless-http';
import { Users, sequelize } from './src/db/dbinstance';

const app: Application =  express();

config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

const myDb = async (req:Request, res:Response, next:NextFunction) => {
    await sequelize.sync();
    next();
}

app.use(myDb);


app.get('/', async (req: Request, res: Response): Promise<Response> => {
    
    const newUser =  await Users.create({
        email:"test@gmail.com",
        password: "123456"
    });

    const project =  await newUser.createProject({
        name: "test project"
    });

    const ourUser =  await Users.findByPk(1, {
        include: [Users.associations.projects],
        rejectOnEmpty: true
    })

    return res.status(200).send({ msg: 'Express server with TypeScript!', user: ourUser });
});



module.exports.handler = serverless(app);   