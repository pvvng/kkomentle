import { MongoClient, MongoClientOptions } from 'mongodb';

const url :string = process.env.NEXT_PUBLIC_MONGODB_KEY as string;
// 환경 변수가 설정되지 않았을때 오류 발생시키기
if (!url) {
    throw new Error('Please define the NEXT_PUBLIC_MONGODB_KEY environment variable inside .env.local');
}
const options: MongoClientOptions = {};
let connectDB: Promise<MongoClient>;

declare global {
  var _mongo: Promise<MongoClient> | undefined;
}

const createMongoClient = async (): Promise<MongoClient> => {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
      global._mongo = new MongoClient(url, options).connect();
    }
    return global._mongo;
  } else {
    return new MongoClient(url, options).connect();
  }
};

connectDB = createMongoClient();

export { connectDB };