import { handlerPath } from '@libs/handler-resolver';

export const importFileParser = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: "rs-import-storage-s3",
        event: "s3:ObjectCreated:*",
        existing: true,
        rules: [
          {
            prefix: "uploaded/"
          }
        ]
      }
    },
  ],
};
