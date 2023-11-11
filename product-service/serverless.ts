import type { AWS } from '@serverless/typescript';
import { getProductsList } from '@functions/getProductsList';
import { getProductsById } from '@functions/getProductsById';
import dynamoDbTables from './src/resources/dynamoDb.tables';
import { createProduct } from '@functions/createProduct';
import { catalogBatchProcess } from '@functions/catalogBatchProcess';

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
      STOCK_TABLE_NAME: "Stock",
      SNS_ARN: { Ref: 'SNSTopic' }
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
            Resource: [
              { "Fn::GetAtt": ["ProductsTable", "Arn"] },
              { "Fn::GetAtt": ["StockTable", "Arn"] },
            ]
          },
          {
            Effect: 'Allow',
            Action: [
              "lambda:InvokeAsync",
              "lambda:InvokeFunction"
            ],
            Resource: ["*"]
          },
          {
            Effect: 'Allow',
            Action: ['sns:*'],
            Resource: { Ref: 'SNSTopic' }
          },
        ]
      }
    }
  },
  functions: {
    getProductsList,
    getProductsById,
    createProduct,
    catalogBatchProcess
  },
  package: { individually: true },
  resources: {
    Resources: {
      ...dynamoDbTables,
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: { TopicName: 'createProductTopic' }
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'vadim_kordovich@epam.com',
          Protocol: 'email',
          TopicArn: { Ref: 'SNSTopic' }
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
