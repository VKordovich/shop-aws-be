import type { AWS } from '@serverless/typescript';
import { getProductsList } from '@functions/getProductsList';
import { getProductsById } from '@functions/getProductsById';
import dynamoDbTables from './src/resources/dynamoDb.tables';
import { createProduct } from '@functions/createProduct';

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
    environment: {
      PRODUCTS_TABLE_NAME: "Products",
      STOCK_TABLE_NAME: "Stock"
    },
    region: 'eu-central-1',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DescribeTable',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem'
            ],
            Resource: "arn:aws:dynamodb:*:*:table/*"
          }
        ]
      }
    }
  },
  functions: {
    getProductsList,
    getProductsById,
    createProduct
  },
  package: { individually: true },
  resources: {
    Resources: { ...dynamoDbTables }
  }
};

module.exports = serverlessConfiguration;
