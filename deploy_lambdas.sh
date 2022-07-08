#!/bin/sh
env="production"

fileName = "env.json"
echo "Deployment started for environment: " $env

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