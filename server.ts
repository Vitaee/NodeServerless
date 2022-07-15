import express, { Application, NextFunction, Request, Response, } from 'express';
import { initDatabase } from './src/middlewares/dbinit';
import { config } from 'dotenv';
import serverless from 'serverless-http';
import { notFound, errorHandler }from './src/middlewares/handlerrors';
import routes from './src/api/routes';

const app: Application =  express();

config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(initDatabase);
app.use(notFound);
app.use(errorHandler);
app.use('/api/v1', routes)
app.set("trust proxy", true);


app.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ msg: 'Express server with TypeScript!' });
});

module.exports.handler = serverless(app);   