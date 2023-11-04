import {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerEvent
} from 'aws-lambda/trigger/api-gateway-authorizer';

const generatePolicy = (
    principalId: string,
    resource: string,
    effect = 'Allow'
): APIGatewayAuthorizerResult => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource
      }
    ]
  }
});

const basicAuthorizer = async (
    event: APIGatewayTokenAuthorizerEvent,
    _ctx: unknown,
    cb: (str: string, policy?: APIGatewayAuthorizerResult) => {}
) => {
  console.log('Event>', JSON.stringify(event));
  if(event.type !== 'TOKEN') cb('Unauthorized');

  try {
    const authToken = event.authorizationToken;
    const encodedCreds = authToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const [username, password] = buff.toString('utf-8').split(':');

    console.log(`Username ${username} AND Password ${password}`);

    const storedUserPassword = process.env[username];
    const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';
    const policy = generatePolicy(encodedCreds, event.methodArn, effect);
    cb(null, policy);
  } catch (e) {
    cb(`Unauthorized ${e.message}`)
  }

};

export const main = basicAuthorizer;
