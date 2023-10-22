import { handlerPath } from '@libs/handler-resolver';

export const getProductsById = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
        cors: true
      },
    },
  ],
  environment: {
    PRODUCTS_TABLE_NAME: process.env.PRODUCTS_TABLE_NAME,
    STOCK_TABLE_NAME: process.env.STOCK_TABLE_NAME
  }
};
