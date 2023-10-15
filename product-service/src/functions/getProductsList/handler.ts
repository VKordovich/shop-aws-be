import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import DatabaseService from '../../services/dynamoDb.service';
import { databaseTables } from '../../utils/utils';
import { ResponseModel } from '../../models/res.model';
import { StatusCode } from '../../enums/statusCode.enum';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const databaseService = new DatabaseService();
  const { productsTable, stockTable } = databaseTables();
  const [products, stock] = await Promise.all([
    databaseService.scanItems({ tableName: productsTable}),
    databaseService.scanItems({ tableName: stockTable}),
  ]);
  const data = {
    products: products.Items,
    stock: stock.Items
  }
  return formatJSONResponse(new ResponseModel(data, StatusCode.OK))
};

export const main = middyfy(getProductsList);
