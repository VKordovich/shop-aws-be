import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { getProductsBD } from '@libs/localDB';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  try {
    const products = await getProductsBD();
    return formatJSONResponse(products);
  } catch (e) {
    throw new Error();
  }
};

export const main = middyfy(getProductsList);
