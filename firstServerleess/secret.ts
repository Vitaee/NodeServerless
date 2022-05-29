import {SecretsManager} from 'aws-sdk';

const getAllSecret = async () => {
    const secretManager = new SecretsManager( {region:'us-east-1'} );

    const data = await secretManager.getSecretValue( {SecretId:"can1"} ).promise();
    
    var secrets;

    if ('SecretString' in data ) {
        secrets = data.SecretString;
    } else {
        
        let buff = Buffer.from(data.SecretBinary['base64'])
        secrets = buff.toString('ascii');
    }

    secrets = JSON.parse(secrets);

    return secrets
}

const getSecrets = async () => {

    const keys = await getAllSecret();
    return {
        DB_HOSTNAME: keys.deneme1,
        DB_USERNAME: keys.deneme2,
        DB_PASSWORD: keys.deneme3,
    }
}

export default getSecrets;