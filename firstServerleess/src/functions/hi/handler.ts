import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

import { DynamoDB, SecretsManager, SSM,  } from 'aws-sdk';


//const dynamoDB = new DynamoDB.DocumentClient();

const hi: APIGatewayProxyHandler = async (event) => {
    
    //const params = {TableName : process.env.DYNAMO_TABLE}
    //const data = await dynamoDB.scan(params).promise();
    
    /*const ssm = new SSM({region: 'us-east-1'});
    
    
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
    }*/

    const secretManager = new SecretsManager( {region:'us-east-1'} );

    const data = await secretManager.getSecretValue( {SecretId:"can"} ).promise();
    
    var secrets: any;

    if ('SecretString' in data ) {
        secrets = data.SecretString;
    } else {
        let buff = Buffer.from(data.SecretBinary['base64'])
        secrets = buff.toString('ascii');
    }

    secrets = JSON.parse(secrets);

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                "DB_HOSTNAME": secrets.deneme1,
                "DB_USERNAME": secrets.deneme2,
                "DB_PASSWORD": secrets.deneme3
            }
        )
    }

    
    

};

export const main = middyfy(hi);
