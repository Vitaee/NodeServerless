#!/bin/sh
env="production"


echo "Deployment started for environment: " $env

#Creating necessary variables
fileName="env.json"
sourceLocation="s3://awsbucketvitae/${fileName}"

# Downloading the config file from S3
echo "downloading file from s3"
aws s3 cp $sourceLocation $fileName

#Deploying the lambdas via serverless
echo "Deploying to Lambda"
serverless plugin install --name serverless-esbuild serverless-dotenv-plugin serverless-offline 
serverless deploy --stage staging

echo "Lambdas deployed"

#Once done, we should delete the config file from local machine
echo "deleting config file from local"
rm $fileName


echo "Deployment complete for environment: " $env
exit 0