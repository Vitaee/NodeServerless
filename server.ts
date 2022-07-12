import express, { Application, NextFunction, Request, Response } from 'express';
import {User, Project} from './src/models/user';
import serverless from 'serverless-http';
import { config } from 'dotenv';
import { sequelize } from './src/db/dbinstance';

config();

const app: Application =  express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);




app.get('/', async (req: Request, res: Response): Promise<Response> => {
    
    await sequelize.sync();

    const newUser = await User.create({
        email:"test@gmail.com",
        password: "123456"
    });

    const project = await newUser.createProject({
        name: "test project"
    });

    const ourUser = await User.findByPk(1, {
        include: [User.associations.projects],
        rejectOnEmpty: true
    })

    return res.status(200).send({ msg: 'Express server with TypeScript!', user: ourUser });
});



module.exports.handler = serverless(app);   