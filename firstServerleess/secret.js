const aws = require('aws-sdk');

const getAllSecret = async () => {
    const secretManager = new aws.SecretsManager( {region:'<your_region>'} );

    const data = await secretManager.getSecretValue( {SecretId:"<your_secter_id>"} ).promise();
    
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

module.exports.getSecrets = async () => {

    const keys = await getAllSecret();
    return {
        DB_HOSTNAME: keys.deneme1,
        DB_USERNAME: keys.deneme2,
        DB_PASSWORD: keys.deneme3,
    }
}