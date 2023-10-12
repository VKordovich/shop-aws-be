import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { getProductsBD } from '@libs/localDB';
import { Product } from '../../interfaces/product.interface';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const { productId } = event.pathParameters;
    const products = await getProductsBD();
    const product: Product | null = products.find(product => product.id === productId) ?? null;
    if(!product) throw new Error();
    return formatJSONResponse({ product });
  } catch (e) {
    throw new Error();
  }
};

export const main = middyfy(getProductsById);
