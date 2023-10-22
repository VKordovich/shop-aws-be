import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import DatabaseService from '../../services/dynamoDb.service';
import { databaseTables } from '../../utils/utils';
import { ResponseModel } from '../../models/res.model';
import { StatusCode } from '../../enums/statusCode.enum';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const databaseService = new DatabaseService();
  const { productsTable } = databaseTables();
  const { Items: [data] } = await databaseService.queryItem({
    tableName: productsTable,
    id: event.pathParameters.productId
  });
  return formatJSONResponse(new ResponseModel(data, StatusCode.OK))
};

export const main = middyfy(getProductsById);
