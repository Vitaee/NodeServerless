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
