import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

import { DynamoDB } from 'aws-sdk';

const dynamoDB = new DynamoDB.DocumentClient();

const hi: APIGatewayProxyHandler = async (event) => {
    
    const params = {
        TableName : process.env.DYNAMO_TABLE
    }
    const data = await dynamoDB.scan(params).promise();
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Getting all data!',
            data : data
        })
    }
};

export const main = middyfy(hi);
