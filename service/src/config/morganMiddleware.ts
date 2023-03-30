import morgan, { StreamOptions } from "morgan";
import logger from "../utils/logger";

const stream: StreamOptions = {
    write: message => logger.http(message),
}

function skip():boolean {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
}
const morganMiddleWare = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
)

export default morganMiddleWare;