import { handlerPath } from '@libs/handler-resolver';

export const catalogBatchProcess = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: "arn:aws:sqs:eu-central-1:903061051266:catalogItemsQueue",
        batchSize: 5
      }
    },
  ],
};
