import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as uuid from 'uuid';

import schema from './schema';
import { DynamoDB } from 'aws-sdk';

const dynamoDB = new DynamoDB.DocumentClient();

const sendErrorResponse = (errorMessage: string) => {
  return {
    statusCode: 500,
    body:JSON.stringify({
      message:`${errorMessage}`
    }),
  };

};

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const params = {
      TableName: process.env.DYNAMO_TABLE,
      Item: {
        id:uuid.v1(),
        name: `${event.body.name}`,
        description:`${event.body.description}`
      
      }
    }
    const data = await dynamoDB.put(params).promise()

    return {
      statusCode: 200,
      body: JSON.stringify( params.Item )
    }

  } catch (err){
    console.error(err)
    return sendErrorResponse(err);
  }
};




export const main = middyfy(hello);
