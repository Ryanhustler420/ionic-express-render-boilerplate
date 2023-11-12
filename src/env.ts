import 'dotenv/config';

export const ENV = () => process.env.ENV || "development";
export const JWT_KEY = process.env.JWT_KEY || "secret";
export const KAFKA_1 = process.env.KAFKA_1 || "kafka:9092";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT ? +process.env.PORT : 8080;
export const DATABASE = process.env.DATABASE || "appname";
export const KAFKA_ID = process.env.KAFKA_ID || "appname";
export const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "appname";
export const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY || "-----BEGIN PRIVATE KEY-----\acdsddsd=\n-----END PRIVATE KEY-----\n";
export const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL || "firebase-adminsdk-dsdsdsd@librarysoftware-asdasd.iam.gserviceaccount.com";

process.env.FIREBASE_CLIENT_EMAIL = FIREBASE_CLIENT_EMAIL;
process.env.FIREBASE_PRIVATE_KEY = FIREBASE_PRIVATE_KEY;
process.env.FIREBASE_PROJECT_ID = FIREBASE_PROJECT_ID;
process.env.MONGO_URI = MONGO_URI;
process.env.DATABASE = DATABASE;
process.env.NODE_ENV = NODE_ENV;
process.env.KAFKA_ID = KAFKA_ID;
process.env.JWT_KEY = JWT_KEY;
process.env.KAFKA_1 = KAFKA_1;
process.env.ENV = ENV();
