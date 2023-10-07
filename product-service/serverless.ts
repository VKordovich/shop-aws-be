import type { AWS } from '@serverless/typescript';
import { getProductsList } from '@functions/getProductsList';
import { getProductsById } from '@functions/getProductsById';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    region: 'eu-central-1'
  },
  functions: {
    getProductsList,
    getProductsById
  },
  package: { individually: true }
};

module.exports = serverlessConfiguration;
