import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import hi from '@functions/hi';
//import getSecrets from 'secret';

const SERVICE_NAME = 'first-api'
const DYNAMO_TABLE = `${SERVICE_NAME}-dev`
//const secrets_data = getSecrets();

const serverlessConfiguration: AWS = {
  service: 'first-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DYNAMO_TABLE,
      //custom: `${secrets_data}`
      
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem"
        ],
        Resource: "*"
      },

     {
        Effect: "Allow",
        Action: [
            "ssm:GetParameter",
            "ssm:GetParameters",
            "ssm:putParameter",
            "ssm:*"
        ],
        Resource: "*"
      },
      {
        Effect: "Allow",
        Action: [
            "secretsmanager:*",
            "secretsmanager:GetSecretValue",
            "secretsmanager:DescribeSecret",
            "secretsmanager:ListSecretVersionIds",
            "secretsmanager:ListSecrets"
        ],
        Resource: "*"
      }
    ],
  },
  // import the function via paths
  functions: { hello, hi },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      FirstDynamoTable:{
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName:'id',
              AttributeType: 'S'
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',            
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits:1,
            WriteCapacityUnits:1
          },
          TableName: '${self:environment.custom.HOSTNAME}', // TASKS_TABLE: '${self:custom.tasks_table}',
          
        },
      }
    },
  },
};

module.exports = { serverlessConfiguration }
