import type { AWS } from '@serverless/typescript';
import { basicAuthorizer } from '@functions/basicAuthorizer';

const serverlessConfiguration: AWS = {
  service: 'authorization-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    region: 'eu-central-1',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: "*",
        Resource: "*"
      }
    ]
  },
  functions: { basicAuthorizer },
  package: { individually: true },
};

module.exports = serverlessConfiguration;
