import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

import { DynamoDB, SSM } from 'aws-sdk';


const dynamoDB = new DynamoDB.DocumentClient();

const hi: APIGatewayProxyHandler = async (event) => {
    
    //const params = {TableName : process.env.DYNAMO_TABLE}
    //const data = await dynamoDB.scan(params).promise();
    
    const ssm = new SSM({region: 'us-east-1'});
    
    
    const ssmParams = {
        Name: '/my-app/staging/userName',
        Value: 'Trying SSM in typescript!',
        Overwrite: true,
        Type: 'String'
    }

    await ssm.putParameter(ssmParams).promise();



    const ssm_data = await ssm.getParameters({
        Names: [`/my-app/staging/userName`]
    }).promise();


    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Getting all data from SSM!',
            data : ssm_data
        })
    }
};

export const main = middyfy(hi);
