import { handlerPath } from '@libs/handler-resolver';

export const importProductsFile = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        authorizer: {
          arn: 'arn:aws:lambda:eu-central-1:903061051266:function:authorization-service-dev-basicAuthorizer',
          name: 'basicTokenAuthorizer',
          identitySource: 'method.request.header.Authorization',
          resultTtlInSeconds: 0,
          type: 'token'
        }
      },
    },
  ],
};
