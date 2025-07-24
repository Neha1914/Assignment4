import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/stock-predictor";
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Only throw error in production if MONGODB_URI is missing
if (!process.env.MONGODB_URI && process.env.NODE_ENV === "production") {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// console.log("MongoDB URI:", uri.substring(0, 50) + "..."); // Commented out for security

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;