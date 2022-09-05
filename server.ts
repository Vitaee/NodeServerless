import express, { Application, NextFunction, Request, Response, } from 'express';
import { config } from 'dotenv';
import serverless from 'serverless-http';
import routes from './src/api/routes';
import {sequelize} from './src/db/dbinstance';

const app: Application =  express();

config();

sequelize.sync( { alter: true } );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', routes)
app.set("trust proxy", true);


app.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ msg: 'Express server with TypeScript!' });
});

module.exports.handler = serverless(app);   