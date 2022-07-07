import express, { Application, NextFunction, Request, Response } from 'express';

import serverless from 'serverless-http';
import { config } from 'dotenv';

config();

const app: Application =  express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", true);




app.get('/', (req: Request, res: Response) => {
    res.json('Express server with TypeScript!');
});


app.listen(process.env.PORT || 3000, () => {
    console.log("App is running")
});

module.exports.handler = serverless(app)