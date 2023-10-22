import * as AWS from "aws-sdk";
import { StatusCode } from '../enums/statusCode.enum';
import { ResponseMessage } from '../enums/res.enum';
import { ResponseModel } from '../models/res.model';

export type ScanItems = AWS.DynamoDB.DocumentClient.ScanInput;
export type ScanInputOutput = AWS.DynamoDB.DocumentClient.ScanOutput;

export type QueryItem = AWS.DynamoDB.DocumentClient.QueryInput;
export type QueryItemOutput = AWS.DynamoDB.DocumentClient.QueryOutput;

export type PutItem = AWS.DynamoDB.DocumentClient.PutItemInput;
export type PutItemOutput = AWS.DynamoDB.DocumentClient.PutItemOutput;

type Item = Record<string, string>;

const documentClient = new AWS.DynamoDB.DocumentClient();

export default class DatabaseService {
    scanItems = async ({tableName}: Item): Promise<ScanInputOutput> => {
        const params = { TableName: tableName };
        const results = await this.scan(params);
        if (Object.keys(results).length) return results;

        throw new ResponseModel(
            {},
            StatusCode.NOT_FOUND,
            ResponseMessage.GET_ITEM_ERROR
        );
    };

    queryItem = async ({tableName, id}: Item): Promise<ScanInputOutput> => {
        const params: QueryItem = {
            TableName: tableName,
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: { ":id": id }
        };
        const results = await this.query(params);
        if (Object.keys(results).length) return results;

        throw new ResponseModel(
            {},
            StatusCode.NOT_FOUND,
            ResponseMessage.GET_ITEM_ERROR
        );
    };

    create = async (params: PutItem): Promise<PutItemOutput> => {
        try {
            return await documentClient.put(params).promise();
        } catch (error) {
            console.error("create-error", error);
            throw new ResponseModel({}, StatusCode.ERROR, `create-error: ${error}`);
        }
    };

    private scan = async (params: ScanItems): Promise<ScanInputOutput> => {
        try {
            return await documentClient.scan(params).promise();
        } catch (error) {
            throw new ResponseModel({}, StatusCode.ERROR, `get-error: ${error}`);
        }
    };

    private query = async (params: QueryItem): Promise<QueryItemOutput> => {
        try {
            return await documentClient.query(params).promise();
        } catch (error) {
            throw new ResponseModel({}, StatusCode.ERROR, `query-error: ${error}`);
        }
    };
}
