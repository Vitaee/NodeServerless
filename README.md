<!--
title: 'AWS TypeScript Express MySQL Example'
description: 'This template demonstrates how to a rest api in to aws lambda.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/Vitaee'
authorName: 'Can İlgu.'
authorAvatar: 'https://avatars.githubusercontent.com/u/45064650?v=4'
-->


# Serverless Framework AWS TypeScript Example

This project contains express mysql rest api project with aws lambda. 

## Usage
Check simple instructions below. 

### Before Deployment
For env variables in production, i used s3 bucket. Simply upload your file to s3 then via github actions you can download from s3 to project directory to read variables.

- Setup AWS CLI for your [OS](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html)
- Upload your example file below;
```
touch env.json
nano env.json
```
```json
{
"DB_NAME":"PROD_DB_NAME",
"DB_USER":"PROD_DB_USER",
"DB_PASS":"PROD_DB_PASS",
"DB_HOST":"PROD_DB_HOST",
"DB_PORT":3306
}
```
Finally,
```
aws s3 cp env.json  s3://awsbucketvitae/

```

### Deployment

In order to deploy the project, you need to run the following command:

```bash
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying aws-node-express-api to stage dev (us-east-1)

✔ Service deployed to stack aws-node-typescript-dev (112s)
  - https://7cqzatbj16.execute-api.us-east-1.amazonaws.com/

functions:
  api: aws-node-express-api (806 B)
```

### Invocation

After successful deployment, you can test the deployed api by using the following command:

```bash
curl https://7cqzatbj16.execute-api.us-east-1.amazonaws.com/
```

Which should result in response similar to the following:

```json
{"msg":"Express server with TypeScript!"}
```

### Local development

You should create env.json file according to .env.example:
```json
{
"DB_NAME":"slsnode",
"DB_USER":"root",
"DB_PASS":"123456",
"DB_HOST":"172.17.0.3",
"DB_PORT":3306
}
```
Then simply call this command;
```bash
npm run dev
```

Which should result in response similar to the following:
```
Starting Offline at stage dev (us-east-1)

Offline [http for lambda] listening on http://localhost:3002

ANY | http://localhost:3001/{default*}       

Server ready: http://localhost:3001 🚀
```
