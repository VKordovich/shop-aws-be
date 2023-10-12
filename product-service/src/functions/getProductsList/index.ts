import { handlerPath } from '@libs/handler-resolver';

export const getProductsList = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true
      },
      /*us-east-1 only*/
      // cloudFront: {
      //   behavior: {
      //     AllowedMethods: ["GET", "HEAD", "OPTIONS"],
      //     Compress: true,
      //     ViewerProtocolPolicy: "https-only",
      //     DefaultTTL: 0,
      //     ForwardedValues: {
      //       Cookies: {Forward: "none"},
      //       Headers: [
      //         "Access-Control-Request-Headers",
      //         "Access-Control-Request-Method",
      //         "Origin",
      //         "Authorization"
      //       ],
      //       QueryString: false
      //     }
      //   },
      //   eventType: 'viewer-response',
      //   origin: 'vk-rs-aws-shop.s3.eu-central-1.amazonaws.com',
      //   pathPattern: '/products*'
      // }
    }
  ],
};
