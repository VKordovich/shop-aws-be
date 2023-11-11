import { middyfy } from '@libs/lambda';
import {
    S3,
    SQS
} from 'aws-sdk';
import { GetObjectRequest } from 'aws-sdk/clients/s3';
import csv from 'csv-parser';

const BUCKET = 'rs-import-storage-s3';

const importFileParser: any = async (event) => {
  const s3 = new S3({ region: 'eu-central-1' });
  const sqs = new SQS({ region: 'eu-central-1' });
  let productList = [];
  let status = 202;
  try {
      for(const record of event.Records) {
          const params: GetObjectRequest = {
              Bucket: BUCKET,
              Key: record.s3.object.key
          }
          await s3.copyObject({
              Bucket: BUCKET,
              CopySource: `${BUCKET}/${record.s3.object.key}`,
              Key: record.s3.object.key.replace('uploaded', 'parsed')
          }).promise();

          const s3Response = new Promise(function(resolve, reject) {
              s3.getObject(params).createReadStream()
                  .pipe(csv({ separator: ';' }))
                  .on("data", (data) => productList.push(data))
                  .on('error', (error) => reject(error))
                  .on('end',() => resolve(productList))
          });
          await s3Response;
          await s3.deleteObject({
              Bucket: BUCKET,
              Key: record.s3.object.key
          }).promise();

          productList.forEach((product) => {
              sqs.sendMessage({
                  QueueUrl: process.env.SQS_URL,
                  MessageBody: JSON.stringify(product)
              }, () => console.log('send msg'))
          })
      }
  } catch (e) {
      status = 500;
  }
  return {
    statusCode: status
  }
};

export const main = middyfy(importFileParser);
