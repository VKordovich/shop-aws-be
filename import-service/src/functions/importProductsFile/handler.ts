import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { S3 } from 'aws-sdk';

const BUCKET = 'rs-import-storage-s3';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  console.log('Event>', JSON.stringify(event));

  const s3 = new S3({ region: 'eu-central-1' });
  const { name } = event.queryStringParameters;
  const path = `uploaded/${name}`;
  let putUrl = ''
  let status = 200;
  const params = {
    Bucket: BUCKET,
    Key: path,
    Expires: 60,
    ContentType: 'text/csv'
  }
  try {
    putUrl = s3.getSignedUrl('putObject', params);
  } catch (e) {
    status = 500;
  }
  return {
    statusCode: status,
    body: JSON.stringify(putUrl)
  }
};

export const main = middyfy(importProductsFile);
