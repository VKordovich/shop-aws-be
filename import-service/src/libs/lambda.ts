import middy from "@middy/core"
import cors, { Options } from "@middy/http-cors"

const corsOptions: Options = {
  headers: '*'
}

export const middyfy = (handler) => {
  return middy(handler)
      .use(cors(corsOptions))
}
