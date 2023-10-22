import middy from "@middy/core"
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
      .use(httpErrorHandler(errorHandlerOptions))
      .use(cors(corsOptions))
}
