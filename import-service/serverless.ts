import type { AWS } from '@serverless/typescript';
import { importProductsFile } from '@functions/importProductsFile';
import { importFileParser } from '@functions/importFileParser';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
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
        Action: [
          's3:ListBucket',
          's3:*'
        ],
        Resource: [
          { "Fn::Join": ["", ['arn:aws:s3:::', 'rs-import-storage-s3']]},
          { "Fn::Join": ["", ['arn:aws:s3:::', 'rs-import-storage-s3', '/*']]}
        ]
      }
    ]
  },
  functions: { importProductsFile, importFileParser },
  package: { individually: true }
};

module.exports = serverlessConfiguration;
