import { handlerPath } from '@libs/handler-resolver';

export const createProduct = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        cors: true
      },
    },
  ],
  environment: {
    PRODUCTS_TABLE_NAME: process.env.PRODUCTS_TABLE_NAME,
    STOCK_TABLE_NAME: process.env.STOCK_TABLE_NAME
  }
};
