export const ENV = () => process.env.ENV || "development";
export const JWT_KEY = process.env.JWT_KEY || "secret";
export const KAFKA_1 = process.env.KAFKA_1 || "kafka:9092";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT ? +process.env.PORT : 8080;
export const DATABASE = process.env.DATABASE || "appname";
export const KAFKA_ID = process.env.KAFKA_ID || "appname";
export const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

process.env.MONGO_URI = MONGO_URI;
process.env.DATABASE = DATABASE;
process.env.NODE_ENV = NODE_ENV;
process.env.KAFKA_ID = KAFKA_ID;
process.env.JWT_KEY = JWT_KEY;
process.env.KAFKA_1 = KAFKA_1;
process.env.ENV = ENV();
