import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import httpErrorHandler from "@middy/http-error-handler"
import cors, { Options } from "@middy/http-cors"

const errorHandlerOptions = {
  fallbackMessage: 'Product not found'
}
const corsOptions: Options = {
  headers: '*'
}

export const middyfy = (handler) => {
  return middy(handler)
      .use(middyJsonBodyParser())
      .use(httpErrorHandler(errorHandlerOptions))
      .use(cors(corsOptions))
}
