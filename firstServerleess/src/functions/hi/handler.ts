import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

const hi: APIGatewayProxyHandler = async (event) => {
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hi from serverless!',
            data : ["This is test with github actions!"]
        })
    }

};

export const main = middyfy(hi);
