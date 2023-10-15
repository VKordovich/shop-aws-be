import { Status } from '../enums/status.enum';
import {
    Response,
    ResponseBody,
    ResponseHeader
} from '../interfaces/res.interface';

const STATUS_MESSAGES = {
    200: Status.SUCCESS,
    400: Status.BAD_REQUEST,
    404: Status.BAD_REQUEST,
    500: Status.ERROR,
};

const RESPONSE_HEADERS: ResponseHeader = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
};

export class ResponseModel {
    private readonly body: ResponseBody;

    constructor(data = {}, readonly code = 200, message = "") {
        this.body = { data, message, status: STATUS_MESSAGES[code] };
        this.code = code;
    }

    get generate(): Response {
        return {
            statusCode: this.code,
            headers: RESPONSE_HEADERS,
            body: JSON.stringify(this.body),
        };
    };
}
