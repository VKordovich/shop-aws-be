import { middyfy } from '@libs/lambda';
import DatabaseService, { PutItem } from '../../services/dynamoDb.service';
import { databaseTables } from '../../utils/utils';
import ProductModel from '../../models/product.model';
import { Product } from '../../interfaces/product.interface';
import { SNS } from 'aws-sdk';

const catalogBatchProcess: any = async (event) => {
  const products = event.Records.map(({body}) => body);
  const sns = new SNS({ region: 'eu-central-1' });
//todo invoke fn
  for (const productString of products) {
    const productData = JSON.parse(productString);
    const databaseService = new DatabaseService();
    const { productsTable, stockTable } = databaseTables();
    const product = new ProductModel(productData as Product).toEntityMappings();
    const productsParams: PutItem = {
      TableName: productsTable,
      Item: {
        id: product.id,
        description: product.description,
        price: product.price,
        title: product.title
      },
    };
    const stockParams: PutItem = {
      TableName: stockTable,
      Item: {
        product_id: product.id,
        count: product.count
      },
    };
    await databaseService.create(productsParams);
    await databaseService.create(stockParams);
  }

  sns.publish({
    Subject: 'Test_text',
    Message: JSON.stringify(products),
    TopicArn: process.env.SNS_ARN
  }, () => console.log('publish'))
};

export const main = middyfy(catalogBatchProcess);
