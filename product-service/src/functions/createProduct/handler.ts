import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import DatabaseService, { PutItem } from '../../services/dynamoDb.service';
import { databaseTables } from '../../utils/utils';
import { ResponseModel } from '../../models/res.model';
import { StatusCode } from '../../enums/statusCode.enum';
import ProductModel from '../../models/product.model';
import { Product } from '../../interfaces/product.interface';

const createProduct: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  const databaseService = new DatabaseService();
  const { productsTable, stockTable } = databaseTables();
  const product = new ProductModel(JSON.parse(event.body as string) as Product).toEntityMappings();
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
  return formatJSONResponse(new ResponseModel({}, StatusCode.OK))
};

export const main = middyfy(createProduct);
